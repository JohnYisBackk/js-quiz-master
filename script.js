"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

const quizScreen = document.getElementById("quizScreen");
const questionCounter = document.getElementById("questionCounter");
const scoreCounter = document.getElementById("scoreCounter");
const progressBar = document.getElementById("progressBar");
const questionText = document.querySelector("#questionText");
const answersBox = document.getElementById("answersBox");
const feedbackText = document.getElementById("feedbackText");
const nextBtn = document.getElementById("nextBtn");

const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");

// ======================================================
// QUIZ DATA
// ======================================================

const questions = [
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Object Model",
      "Data Object Method",
      "Digital Order Mode",
      "Display Object Map",
    ],
    correctAnswer: "Document Object Model",
  },

  {
    question: "Which keyword is used to create a variable that can change?",
    answers: ["const", "let", "fixed", "static"],
    correctAnswer: "let",
  },

  {
    question: "What does addEventListener do?",
    answers: [
      "Adds CSS to an element",
      "Listens for user actions",
      "Creates a new HTML file",
      "Deletes an element",
    ],
    correctAnswer: "Listens for user actions",
  },

  {
    question: "Which method is used to loop through an array?",
    answers: ["forEach()", "querySelector()", "push()", "trim()"],
    correctAnswer: "forEach()",
  },

  {
    question: "What does textContent change?",
    answers: [
      "The text inside an element",
      "The element ID",
      "The CSS file",
      "The browser URL",
    ],
    correctAnswer: "The text inside an element",
  },
];

// ======================================================
// QUIZ STATE
// ======================================================

let score;

let currentQuestionIndex = 0;

let answerSelected = false;

// ======================================================
// SCREEN SYSTEM
// ======================================================

function showScreen(screenName) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");

  if (screenName === "start") startScreen.classList.remove("hidden");
  if (screenName === "quiz") quizScreen.classList.remove("hidden");
  if (screenName === "result") resultScreen.classList.remove("hidden");
}

// ======================================================
// START QUIZ FUNCTION
// ======================================================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  showScreen("quiz");

  renderQuestion();
}
// ======================================================
// RENDER QUESTION FUNCTION
// ======================================================

function renderQuestion() {
  answerSelected = false;

  feedbackText.classList.add("hidden");
  nextBtn.classList.add("hidden");

  answersBox.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  scoreCounter.textContent = `Score: ${score}`;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.classList.add("answer-btn");
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(button, answer);
    });

    answersBox.appendChild(button);
  });
}

// ======================================================
// CHECK ANSWER FUNCTION
// ======================================================

function checkAnswer(button, selectedAnswer) {
  if (answerSelected === true) return;

  answerSelected = true;

  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    button.classList.add("correct");
    feedbackText.textContent = "Correct answer!";
  } else {
    button.classList.add("wrong");
    feedbackText.textContent = "Wrong answer!";

    const allButtons = document.querySelectorAll(".answer-btn");

    allButtons.forEach((btn) => {
      if (btn.textContent === currentQuestion.correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach((btn) => {
    btn.disabled = true;
  });

  feedbackText.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  scoreCounter.textContent = `Score ${score}`;
}

// ======================================================
// NEXT QUESTION FUNCTION
// ======================================================

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// ======================================================
// SHOW RESULT FUNCTION
// ======================================================

function showResult() {
  showScreen("result");

  finalScore.textContent = `You scored ${score} / ${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent = "Perfect score. You crushed it.";
  } else if (score >= questions.length / 2) {
    resultMessage.textContent = "Good job. Keep Practising.";
  } else {
    resultMessage.textContent = "Not bad. Try again and improve.";
  }
}

// ======================================================
// EVENT LISTENERS
// ======================================================

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", startQuiz);

// ======================================================
// INITIAL STATE
// ======================================================

showScreen("start");
