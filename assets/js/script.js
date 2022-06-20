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
      }
];

// array to store order of questions in quiz
var questionOrder = []

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

var currentQuestion = 0;



// load every question after first one
var loadNextQuestion = function() {
    // check for lingering pop-up
    if (document.getElementById("pop-up")) {
        document.getElementById("pop-up").remove()
    };

    // check previous answer before loading next question
    if (event.target.dataset.choice == quiz[currentQuestion].answer) {
        var gotItRight = true;
    } else {
        var gotItRight = false;
    };
    
    // load next question
    currentQuestion = currentQuestion + 1;

    // change question text to new question
    questionTextElement.innerText = quiz[currentQuestion].question;

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

    // add answer choices
    for (i=0; i < quiz[currentQuestion].choices.length; i++) {
        // for each choice, add the button and assign a data-choice attribute
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.className = "answer-choice";
        answerChoiceButton.setAttribute("data-choice", i);
        answerChoiceButton.innerText = quiz[currentQuestion].choices[i];
        answerListElement.appendChild(answerChoiceButton);
    };

    // remove pop-up after X seconds
    //setTimeout(document.getElementById("pop-up").remove(), 5000);

    // get chosen answer
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);

};


// load a new question
var loadFirstQuestion = function() {    
    // remove instructions and start button
    startButtonElement.remove();
    questionContentElement.remove();
    
    // change heading text to question text
    questionTextElement.innerText = quiz[currentQuestion].question;

    // add answer list element
    var answerListElement = document.createElement("div");
    answerListElement.className = "answer-list";
    answerListElement.setAttribute("id","answer-list");
    document.getElementById("question-block").appendChild(answerListElement);


    // add answer choices
    for (i=0; i < quiz[currentQuestion].choices.length; i++) {
        // for each choice, add the button and assign a data-choice attribute
        var answerChoiceButton = document.createElement("button");
        answerChoiceButton.className = "answer-choice";
        answerChoiceButton.setAttribute("data-choice", i);
        answerChoiceButton.innerText = quiz[currentQuestion].choices[i];
        answerListElement.appendChild(answerChoiceButton);
    };

    // get chosen answer
    document.getElementById("answer-list").addEventListener("click", loadNextQuestion);
};

// start game
var takeQuiz = function() {

}



// start game when Start Quiz button is clicked
startButtonElement.addEventListener("click", loadFirstQuestion);

