const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById('score');
const timerEl = document.getElementById('timer');
const gameContainerEl = document.getElementById('game-container')
const hsContainerEl = document.getElementById('hs-container')
const finalScoreEl = document.getElementById('final-score')
const initialsEl = document.querySelector('#initials')
const correct_answer = 20;
const max_questions = 5;
const saveScoreBtnEL = document.getElementById('saveScoreBtn')
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let highscores = [];
let questions = [
    {
        question: "Commonly used data types DO NOT include",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: 3
    }, {
        question: "The condition in an if/else statement is enclosed with which of the following?",
        choice1: "Quotes",
        choice2: "Curly Brackets",
        choice3: "Parentheses",
        choice4: "Square Brackets",
        answer: 3
    }, {
        question: "Arrays in JavaScript can be used to store which of the following?",
        choice1: "Numbers and Strings",
        choice2: "Other Arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        answer: 4
    }, {
        question: "String Values must be enclosed within which of the following when being assigned to variables?",
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Quotes",
        choice4: "Parentheses",
        answer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        choice1: "JavaScript",
        choice2: "Terminal/Bash",
        choice3: "For Loops",
        choice4: "console.log",
        answer: 4
    }
]

//constants


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    timerStart();
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        // return window.location.assign("./highscores.html");
        clearScreen();
        finalScoreEl.innerHTML = score;
        showHSScreen();
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === 'correct') {
            incrementScore(correct_answer);
        };
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
var timeLeft = 75;
var timer;

function timerStart() {
    timer = setInterval(function () {
        timeLeft--;
        timerEl.innerHTML = timeLeft;
        if (timeLeft === 0) {
            setTimeout(function () {
                clearScreen();
                finalScoreEl.innerHTML = score;
                showHSScreen();
                // return window.location.assign("./highscores.html");
            }, 500);
            clearInterval(timer);
        }
    }, 100);
}
function clearScreen() {
    gameContainerEl.classList.add("hide");
}
function showHSScreen() {
    hsContainerEl.classList.remove("hide");
}
function saveHS(event) {
    event.stopPropagation();
    event.preventDefault();
    let temp = initialsEl;
    console.log(temp)
    // ask teacher in office hours initials not saving or logging into console.
    let playerHS = [{
        initials: initialsEl.innerText, 
        finalScore: finalScoreEl.innerText
    }]
    console.log(playerHS)
    localStorage.setItem("highscores", JSON.stringify(playerHS))
}

//add another function function getFromLocal() {
//   highscores = JSON.parse(localStorage.getItem("highscores"));
//   return highscores; }
//

//push highscore value to highscore array.
// keep only top 5 high scores
// restyle highscore page
// restyle buttons
// restyle timer
startGame();
saveScoreBtnEL.addEventListener("click", saveHS);