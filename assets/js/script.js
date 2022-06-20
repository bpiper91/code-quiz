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
        correct: 1
      },
      {
        question: "The correct answer to this question is answer choice 1",
        choices: [  "1. the correct answer",
                    "2. answer choice 1",
                    "3. answer choice 2",
                    "4. answer choice 3"    ],
        correct: 0
      }
];

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
var answerChoiceButton = document.getElementsByClassName("answer-choice");

var currentQuestion = 0;

// load a new question
var loadQuestion = function() {    
    // remove instructions and start button
    startButtonElement.remove();
    questionContentElement.remove();
    
    // change heading text to question text
    questionTextElement.innerText = quiz[currentQuestion].question;

    // add answer list element
    var answerListElement = document.createElement("div");
    answerListElement.className = "answer-list";
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
};

// start game
var takeQuiz = function() {

}



// start game when Start Quiz button is clicked
startButtonElement.addEventListener("click", loadQuestion);

