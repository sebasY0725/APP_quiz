const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availabeQuestions = [];

let questions = [
  {
    question: "Dentro de que HTML ponemos el JavaScript? ",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "Cual es la sintaxis correcta para referirse a un script externo llamado algo.js?? ",
    choice1: "<script href= 'algo.js'>",
    choice2: "<script name= 'algo.js'>",
    choice3: "<script src= 'algo.js'>",
    choice4: "<script file= 'algo.js'>",
    answer: 3
  },
  {
    question: "Como escribes 'Hola mundo' en una caja de alerta'? ",
    choice1: "msgBox('Hola mundo');",
    choice2: "alertBox('Hola mundo');",
    choice3: "msg('Hola mundo');",
    choice4: "alert('Hola mundo');",
    answer: 4
  }
];
// constantes
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availabeQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availabeQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // debe enviarlo a la pagina final
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Pregunta${questionCounter}/${MAX_QUESTIONS}`;
  // hora de actualizar la barra de progreso
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availabeQuestions.length);
  currentQuestion = availabeQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availabeQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
