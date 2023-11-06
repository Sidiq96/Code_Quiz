// Event Listeners
document.getElementById("start").addEventListener("click", startQuiz);
document.getElementById("submit").addEventListener("click", submitScore);
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
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
    } else {
      endQuiz();
      // time has reached zero, so this will the end the quiz
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
    displayFeedback("Correct!");
    correctSoundEffect();
    score += 10;
    // this will increase the score if the question is answered correctly
  } else {
    displayFeedback("Wrong");
    incorrectSoundEffect();
    // this will deduct time for an incorrect answer
    timeLeft -= 10;
  }
  //   this is used to keep track of the current question which displayed to the user. it also helps keep track of which question to display to the user, and when you increment it, it effectively points to the next question in the array.
  currentQuestionIndex++;
  // this if statement checks to see if they are any more questions
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// this function will end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  //   this will hide the question screen once the quiz has been ended
  questionsScreen.classList.add("hide");
  //   this will hide the end screen when the last question which was answered
  endScreen.classList.remove("hide");
  finalScoreElement.textContent = score;
}
// this function will handle score submission
function submitScore() {
  const initials = document.getElementById("initials").value;
  // check if the initials are not empty
  if (initials.trim() !== "") {
    // retrieves the existing scores or creates an empty array
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    // this creates an object to show the user's score
    const userScore = {
      initials: initials,
      score: score, // Use the score variable from the quiz
    };
    // add the user's score to the score array
    scores.push(userScore);

    // this save the scores in the local storage
    localStorage.setItem("scores", JSON.stringify(scores));

    // this will redirect the user to the start screen
    questionsScreen.classList.add("hide");
    endScreen.classList.add("hide");
    startScreen.classList.remove("hide");
  }
}

// this function is to display the feedback so they user will know of they answered correctly or not
function displayFeedback(message) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
  feedbackElement.classList.remove("hide");
  // adds a timeout which will hide the feedback after one second
  setTimeout(function () {
    feedbackElement.classList.add("hide");
  }, 1000);
}

// this function is for playing the sound effect when the user answers the question correctly
function correctSoundEffect() {
  const Audio = document.getElementById("correct-sound");
  Audio.play();
}
// this function is for playing the sound effect when the user answers the question incorrectly
function incorrectSoundEffect() {
  const Audio1 = document.getElementById("incorrect-sound");
  Audio1.play();
}
