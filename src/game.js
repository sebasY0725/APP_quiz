let question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const buttonMain = document.getElementById("btn");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availabeQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=25&type=multiple")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    // console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };
      questions.push(formattedQuestion.question);
      // console.log(questions);
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 5 + 1);
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    // questions= loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// constantes
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

let startGame = () => {
  questionCounter = 0;
  score = 0;
  availabeQuestions = [...questions];
  getNewQuestion();
};

let getNewQuestion = () => {
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
const incrementScore = (num) => {
  score += num;
  console.log(score);
  scoreText.innerText = score;
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
    } else {
      window.location.assign("/end.html");
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

buttonMain.addEventListener("click", () => {
  localStorage.setItem("mostRecentScore", score);
  window.location.assign("/end.html");
});
