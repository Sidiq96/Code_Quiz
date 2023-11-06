// Event Listeners
document.getElementById("start").addEventListener("click", startQuiz);
// quiz variables
let currentQuestionIndex = 0;
let timeLeft = 60;
// Initial time left for the quiz
let score = 0;
let timerInterval;

// html elements
const startScreen = document.getElementById("start-screen");
const questionsScreen = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const feedbackElement = document.getElementById("feedback");

// function to start the quiz
function startQuiz() {
  startScreen.classList.add("hide");
  questionsScreen.classList.remove("hide");
  startTimer();
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionTitle = document.getElementById("question-title");
  const choicesElement = document.getElementById("choices");

  questionTitle.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", () => checkAnswer(choice));
    choicesElement.appendChild(choiceButton);
  });
}

// this function to check the user's answer
function checkAnswer(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.correctAnswer) {
    feedbackElement.textContent = "Correct! ";
    score += 10;
    // this will increase the score if the question is answered correctly
  } else {
    feedbackElement.textContent = "Wrong -10 seconds";
    // this will deduct time for an incorrect answer
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}
// this function will allow the user to move on to the next question

// this function will end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionsScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScoreElement.textContent = score;
}
