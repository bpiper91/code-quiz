// array to store all quiz questions
var quiz = [
    {
        question: "The correct answer to this question is answer choice 3",
        choices: [  "1. answer choice 0",
                    "2. answer choice 1",
                    "3. the correct answer",
                    "4. answer choice 3"    ],
        answer: 2
      },
      {
        question: "The correct answer to this question is answer choice 2",
        choices: [  "1. answer choice 0", 
                    "2. the correct answer", 
                    "3. answer choice 2", 
                    "4. answer choice 3"    ],
        answer: 1
      },
      {
        question: "The correct answer to this question is answer choice 1",
        choices: [  "1. the correct answer",
                    "2. answer choice 1",
                    "3. answer choice 2",
                    "4. answer choice 3"    ],
        answer: 0
      },
      {
        question: "The correct answer to this question is answer choice 4",
        choices: [  "1. answer choice 0",
                    "2. answer choice 1",
                    "3. answer choice 2",
                    "4. the correct answer"    ],
        answer: 3
      },
      {
        question: "The correct answer to this question is answer choice 3 (2 of these)",
        choices: [  "1. answer choice 0",
                    "2. answer choice 1",
                    "3. the correct answer",
                    "4. answer choice 3"    ],
        answer: 2
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



var highScoreButton = document.querySelector(".high-score-btn");
var startButtonElement = document.getElementById("start-btn");
var questionContentElement = document.querySelector("#question-content");
var questionTextElement = document.getElementById("question-text");
var score = 0;
var timeRemaining = 1;
var totalScore = 0;


// view high scores
var leaderboard = function() {
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

    // add new listener for start over button
    startButtonElement = document.querySelector("#start-btn");
    startButtonElement.addEventListener("click", takeQuiz);
}



// store saved score and initials and then go to leaderboard
var storeScore = function() {
    var playerInitials = document.querySelector("#initials-input").value;
    debugger;
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

        // add current score to the array and save only the top 5
        var myScore = {
                        score: totalScore,
                        initials: playerInitials
                        };
        
        highScores.push(myScore);
        // if there are more than 5 scores, sort them in ascending order and remove the first one
        while (highScores.length > 5) {
            highScores = highScores.sort(function(a , b) {return a.score - b.score}).slice(1, highScores.length - 1);
        };

        // regardless of number, sort in descending order
        highScores.sort(function(a , b) {return b.score - a.score})

        localStorage.setItem("highScores", JSON.stringify(highScores));

        leaderboard();
    };
}


var endQuiz = function() {
    
    
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
    newDivElement.innerHTML = "<p>You answered " + score + " correctly with " + timeRemaining + " seconds remaining, for a score of " + totalScore + ".</p>"

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
};






// load every question after first one
var loadNextQuestion = function() {
    // check previous answer before loading next question
    if (event.target.dataset.choice == quiz[questionOrder[0]].answer) {
        var gotItRight = true;
        score = score + 1;
    } else {
        var gotItRight = false;
    };
    
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

        // deduct time
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

    // remove pop-up after X seconds
    //setTimeout(document.getElementById("pop-up").remove(), 5000);

    // start function over when a new answer is chosen
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);
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

    // get chosen answer
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);
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

    loadFirstQuestion();







    
};






// start game when Start Quiz button is clicked
startButtonElement.addEventListener("click", takeQuiz);

// view leaderboard when View High Scores is clicked
highScoreButton.addEventListener("click", leaderboard);

