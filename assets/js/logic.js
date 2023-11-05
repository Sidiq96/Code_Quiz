// Event Listeners
document.getElementById('start').addEventListener('click', startQuiz);
// quiz variables
let currentQuestionIndex = 0;
let timeLeft = 60; 
// Initial time left for the quiz
let score = 0; 
let timerInterval;

// html elements
const startScreen = document.getElementById('start-screen');
const questionsScreen = document.getElementById('questions');
const endScreen = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const feedbackElement = document.getElementById('feedback');

// function to start the quiz
function startQuiz(){
    startScreen.classList.add('hide');
    questionsScreen.classList.remove('hide');
    startTimer();
    displayQuestion();
}

// Function to start the timer
function startTimer(){
    timerInterval = setInterval(function (){
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if(timeLeft <= 0){
            endQuiz();
        }

    },1000);
}


