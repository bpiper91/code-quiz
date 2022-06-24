// array to store all quiz questions
var quiz = [
    {
        question: "Commonly used data types DO NOT include ______.",
        choices: [  "1. strings",
                    "2. booleans",
                    "3. alerts",
                    "4. numbers"    ],
        answer: 2
      },
      {
        question: "The condition in an if / else statement is enclosed within ______.",
        choices: [  "1. parentheses", 
                    "2. curly brackets", 
                    "3. quotes", 
                    "4. square brackets"    ],
        answer: 0
      },
      {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: [  "1. numbers and strings",
                    "2. other arrays",
                    "3. booleans",
                    "4. all of the above"    ],
        answer: 3
      },
      {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: [  "1. commas",
                    "2. curly brackets",
                    "3. quotes",
                    "4. parentheses"    ],
        answer: 2
      },
      {
        question: "A useful tool to print content to the debugger during development and debugging is ______.",
        choices: [  "1. JavaScript",
                    "2. terminal / bash",
                    "3. for loops",
                    "4. console.log"    ],
        answer: 3
      }
];

// array to store order of questions in quiz
var questionOrder = [];
// array to keep track of questions that have been asked
var quizAnswered = [];




// add event listener to start button (bottom of page)

// load first question and start timer

// add listener to element containing answer choice buttons

// test for correct or incorrect answer

    // if correct, display feedback and load next question

    // if incorrect, display feedback, decrease time, and load next question

// if time = 0 or all questions are answered, end game

    // prompt to enter initials and save score

    // compare score to localStorage high score

    // show leaderboard



// points for correct answer
var correctAnswerValue = 5;
// starting time limit for finishing quiz
var timeLimit = 60;
// penalty for wrong answer (seconds)
var penalty = 15;
// amount of time a pop-up stays on screen (seconds)
var popUpTime = 0.8

var highScoreButton = document.querySelector(".high-score-btn");
var startButtonElement = document.getElementById("start-btn");
var questionContentElement = document.querySelector("#question-content");
var questionTextElement = document.getElementById("question-text");
var score = 0;
var timeRemaining = timeLimit;
var totalScore = 0;
var countdown;





// view high scores
var leaderboard = function() {
    // clear timer
    clearInterval(countdown);

    // switch to leaderboard page content
    questionTextElement.innerText = "High Scores";

    document.querySelector("#save-initials").removeEventListener("click", storeScore);
    document.querySelector("#discard-score").removeEventListener("click", leaderboard);

    // check for elements and remove if necessary    
    // check for final score and save/discard buttons
    if (document.querySelector("#endgame-content")) {
        document.querySelector("#endgame-content").remove();
    };
    //check for answer choices
    if (document.querySelector("#answer-list")) {
        document.querySelector("#answer-list").remove();
    };
    // check for pop-up
    if (document.querySelector("#pop-up")) {
        document.querySelector("#pop-up").remove();
    };

    // create new question-content div
    var newDivElement = document.createElement("div");
    newDivElement.setAttribute("id","question-content");
    
    // get high scores from localStorage and compile to list in descending order
    if (!localStorage.getItem("highScores")) {
        newDivElement.innerHTML = "<p>There are no high scores to display.</p>";
    } else {
        var newUnordList = document.createElement("ul");
        newUnordList.className = "high-scores";
        
        var highScores = localStorage.getItem("highScores");
        highScores = JSON.parse(highScores);

        for (i=0; i < highScores.length; i++) {
            var newListItem = document.createElement("li");
            newListItem.className = "high-score";
            newListItem.innerText = (i + 1) + ". " + highScores[i].score + " - " + highScores[i].initials;
            newUnordList.appendChild(newListItem);
        }
        // append list to question content div
        newDivElement.appendChild(newUnordList);
    };
    
    // append question content div to question block div
    document.getElementById("question-block").appendChild(newDivElement);

    var startOverButton = document.createElement("button");
    startOverButton.className = "start-btn";
    startOverButton.setAttribute("id","start-btn");
    startOverButton.innerText = "Start Quiz";
    document.getElementById("question-block").appendChild(startOverButton);

    // add new listener for Start Over button
    startButtonElement = document.querySelector("#start-btn");
    startButtonElement.addEventListener("click", takeQuiz);

    // add buton to clear high scores
    var clearScoresButton = document.createElement("button");
    clearScoresButton.className = "score-btn";
    clearScoresButton.setAttribute("id","clear-scores");
    clearScoresButton.innerText = "Clear High Scores";
    document.getElementById("question-block").appendChild(clearScoresButton);

    // add new listener for Clear High Scores button
    startButtonElement = document.querySelector("#clear-scores");
    startButtonElement.addEventListener("click", function() {
        // confirm clearing High scores
        if (confirm("Are you sure you want to clear the high scores?") == true) {
            // reset leaderboard
            highScores = [ {
                score: 0,
                initials: ""
            } ];

            // store empty leaderboard
            localStorage.setItem("highScores", JSON.stringify(highScores));
        };
        
        // delete leaderboard
        document.querySelector("#question-content").remove();

        // re-create empty leaderboard
        var newDivElement = document.createElement("div");
        newDivElement.setAttribute("id","question-content");
        
        var newUnordList = document.createElement("ul");
        newUnordList.className = "high-scores";
        
        var highScores = localStorage.getItem("highScores");
        highScores = JSON.parse(highScores);

        for (i=0; i < highScores.length; i++) {
            var newListItem = document.createElement("li");
            newListItem.className = "high-score";
            newListItem.innerText = (i + 1) + ". " + highScores[i].score + " - " + highScores[i].initials;
            newUnordList.appendChild(newListItem);
        }
        // append list to question content div
        newDivElement.appendChild(newUnordList);
    } );
};


// store saved score and initials and then go to leaderboard
var storeScore = function() {
    var playerInitials = document.querySelector("#initials-input").value;

    // if there's no stored high scores in localStorage, create an object and store it
    if (!localStorage.getItem("highScores")) {
        
        var highScores = [ {
                        score: totalScore,
                        initials: playerInitials
                        } ];

        localStorage.setItem("highScores", JSON.stringify(highScores));

    } else {
        // if there are stored scores, pull them from localStorage
        var highScores = localStorage.getItem("highScores");
        highScores = JSON.parse(highScores);

        // add current score to the array
        var myScore = {
                        score: totalScore,
                        initials: playerInitials
                        };
        
        highScores.push(myScore);
        // if there are more than 5 scores, sort them in ascending order and remove the first one
        while (highScores.length > 5) {
            highScores = highScores.sort(function(a , b) {return b.score - a.score}).slice(0, -1);
        };

        // regardless of number, sort in descending order
        highScores.sort(function(a , b) {return b.score - a.score})

        localStorage.setItem("highScores", JSON.stringify(highScores));

        leaderboard();
    };
}


var endQuiz = function() {
    // clear timer
    clearInterval(countdown);
    
    // update timer to reflect time you ended with
    document.querySelector("#time").innerText = timeRemaining

    // get score
    totalScore = score + timeRemaining;

    // clear question elements
    if (document.getElementById("pop-up")) {
        document.getElementById("pop-up").remove();
    };

    document.getElementById("answer-list").removeEventListener("click", loadNextQuestion);
    document.getElementById("answer-list").remove();

    // change heading text
    questionTextElement.innerText = "All done!"

    // create question content div
    var newDivElement = document.createElement("div");
    newDivElement.setAttribute("id","endgame-content");
    if(timeRemaining !== 1) {
        newDivElement.innerHTML = "<p>You answered " + (score / correctAnswerValue) + " out of " + quiz.length + " questions correctly with " + timeRemaining + " seconds remaining, for a score of " + totalScore + ".</p>"
    } else {
        newDivElement.innerHTML = "<p>You answered " + (score / correctAnswerValue) + " out of " + quiz.length + " questions correctly with 1 second remaining, for a score of " + totalScore + ".</p>"
    };

    // add input and buttons for saving score and initials    
    var newLabelElement = document.createElement("label");
    newLabelElement.setAttribute("for","initials-input");
    newLabelElement.innerText = "Enter your initials to save your score";
    newDivElement.appendChild(newLabelElement);

    var newInputElement = document.createElement("input");
    newInputElement.setAttribute("type","text");
    newInputElement.setAttribute("name","initials-input");
    newInputElement.setAttribute("id","initials-input");
    newInputElement.setAttribute("placeholder","Your initials");
    newDivElement.appendChild(newInputElement);

    var saveScoreButton = document.createElement("button");
    saveScoreButton.className = "score-btn";
    saveScoreButton.setAttribute("id","save-initials");
    saveScoreButton.innerText = "Save Score";
    newDivElement.appendChild(saveScoreButton);

    var discardScoreButton = document.createElement("button");
    discardScoreButton.className = "score-btn";
    discardScoreButton.setAttribute("id","discard-score");
    discardScoreButton.innerText = "Discard Score";
    newDivElement.appendChild(discardScoreButton);

    // add question content div
    document.getElementById("question-block").appendChild(newDivElement);

    // add event listener for both buttons
    document.querySelector("#save-initials").addEventListener("click", storeScore);
    document.querySelector("#discard-score").addEventListener("click", leaderboard);

    // view leaderboard when View High Scores is clicked
    highScoreButton.addEventListener("click", leaderboard);
};






// load every question after first one
var loadNextQuestion = function() {
    // clear timer temporarily
    clearInterval(countdown);

    // check previous answer before loading next question
    if (event.target.dataset.choice == quiz[questionOrder[0]].answer) {
        var gotItRight = true;
        // add point(s) for correct answer
        score = score + correctAnswerValue;
    } else {
        var gotItRight = false;
        // deduct time penalty for wrong answer, and stop at 0
        timeRemaining = Math.max(0, timeRemaining - penalty);
        document.querySelector("#time").innertext = timeRemaining;
    };

    // check for time remaining
    if (timeRemaining === 0) {
        endQuiz();
        return false;
    }
    
    // check for remaining questions
    quizAnswered.push(questionOrder[0]);
    questionOrder.splice(0,1);

    if (quizAnswered.length === quiz.length) {
        endQuiz();
        return false;
    }

    // check for lingering pop-up
    if (document.getElementById("pop-up")) {
        document.getElementById("pop-up").remove()
    };

    // change question text to new question
    questionTextElement.innerText = quiz[questionOrder[0]].question;

    // remove previous question answer choices
    document.getElementById("answer-list").remove();

    // re-add answer list element
    var answerListElement = document.createElement("div");
    answerListElement.className = "answer-list";
    answerListElement.setAttribute("id","answer-list");
    document.getElementById("question-block").appendChild(answerListElement);

    // check previous answer and provide feedback
    if (gotItRight) {
        // create pop-up for correct answer and add to question block div
        var popUpFeedback = document.createElement("div");
        popUpFeedback.className = "pop-up";
        popUpFeedback.setAttribute("id","pop-up");
        popUpFeedback.innerHTML = "<p class='correct'>That's correct! Keep it up!</p>";
        document.getElementById("question-block").appendChild(popUpFeedback);

    } else {
        // create pop-up for incorrect answer and add to question block div
        var popUpFeedback = document.createElement("div");
        popUpFeedback.className = "pop-up";
        popUpFeedback.setAttribute("id","pop-up");
        popUpFeedback.innerHTML = "<p class='incorrect'>That's incorrect! Time deducted.</p>";
        document.getElementById("question-block").appendChild(popUpFeedback);
    };

    // add new answer choices
    for (i=0; i < quiz[questionOrder[0]].choices.length; i++) {
        // for each choice, add the button and assign a data-choice attribute
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.className = "answer-choice";
        answerChoiceButton.setAttribute("data-choice", i);
        answerChoiceButton.innerText = quiz[questionOrder[0]].choices[i];
        answerListElement.appendChild(answerChoiceButton);
    };

    // remove pop-up after x seconds
    setTimeout(function() {document.querySelector("#pop-up").remove()}, (popUpTime * 1000));

    // add listener for answer choices and load next question if time is left
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);

    // view leaderboard when View High Scores is clicked
    highScoreButton.addEventListener("click", leaderboard);

    // start timer
    countdown = setInterval(function() {
        // decrease time every second
        timeRemaining = timeRemaining - 1;
        document.querySelector("#time").innerText = timeRemaining;
        // if the timer runs out, go to endgame screen
        if (timeRemaining === 0) {
            clearInterval(countdown);
            endQuiz();
        };
    }, 1000);
};


// load the first question after Start Game is clicked
var loadFirstQuestion = function() {    
    
    // remove start button event listener
    startButtonElement.removeEventListener("click", takeQuiz);
    
    // remove instructions and start button
    startButtonElement.remove();
    questionContentElement = document.querySelector("#question-content");
    questionContentElement.remove();
    
    // change heading text to question text
    questionTextElement.innerText = quiz[questionOrder[0]].question;

    // add answer list element
    var answerListElement = document.createElement("div");
    answerListElement.className = "answer-list";
    answerListElement.setAttribute("id","answer-list");
    document.getElementById("question-block").appendChild(answerListElement);

    // add answer choices
    for (i=0; i < quiz[questionOrder[0]].choices.length; i++) {
        // for each choice, add the button and assign a data-choice attribute
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.className = "answer-choice";
        answerChoiceButton.setAttribute("data-choice", i);
        answerChoiceButton.innerText = quiz[questionOrder[0]].choices[i];
        answerListElement.appendChild(answerChoiceButton);
    };

    // add listener for answer - if answered before timer hits 0, go to next question
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);

    // view leaderboard when View High Scores is clicked
    highScoreButton.addEventListener("click", leaderboard);

    // start timer
    countdown = setInterval(function() {
        // decrease time every second
        timeRemaining = timeRemaining - 1;
        document.querySelector("#time").innerText = timeRemaining;
        // if the timer runs out, go to endgame screen
        if (timeRemaining === 0) {
            clearInterval(countdown);
            endQuiz();
        };
    }, 1000);
};



// start game
var takeQuiz = function() {
    // empty arrays and reset variables (necessary after 1st time taking quiz)
    questionOrder.length = 0;
    quizAnswered.length = 0;
    score = 0;
    totalScore = 0;
    
    // determine question order
    var questionNums = [];
    // store each question number as a string in a temporary array
    for (i=0; i < quiz.length; i++) {
        questionNums.push(i.toString());
    };
    // create a random order of question numbers in the question order array
    while (questionNums.length !== 0) {
        indexNum = Math.floor(Math.random() * questionNums.length);
        questionOrder.push(questionNums[indexNum]);
        questionNums.splice(indexNum,1);
    };
    // convert question numbers from string to number in order array
    for (i=0; i < questionOrder.length; i++) {
        questionOrder[i] = parseInt(questionOrder[i]);
    };

    // set timer
    timeRemaining = timeLimit;
    document.querySelector("#time").innerText = timeRemaining;

    // display the first question
    loadFirstQuestion();
    
};




// set timer on page load
document.querySelector("#time").innerText = timeLimit;

// start game when Start Quiz button is clicked
startButtonElement.addEventListener("click", takeQuiz);

// view leaderboard when View High Scores is clicked
highScoreButton.addEventListener("click", leaderboard);

