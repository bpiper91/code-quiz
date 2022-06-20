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




var startButtonElement = document.getElementById("start-btn");
var questionContentElement = document.getElementById("question-content");
var questionTextElement = document.getElementById("question-text");





var endQuiz = function() {

}




// load every question after first one
var loadNextQuestion = function() {
    // check previous answer before loading next question
    if (event.target.dataset.choice == quiz[questionOrder[0]].answer) {
        var gotItRight = true;
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
    // remove instructions and start button
    startButtonElement.remove();
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
    // determine question order
    var questionNums = []
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







    
}






// start game when Start Quiz button is clicked
startButtonElement.addEventListener("click", takeQuiz);

