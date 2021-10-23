const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  // saveScoreBtn.disabled = !username.nodeValue;
});

let saveHighScore = (e) => {
  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(10);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  console.log("Saved");
  //  window.location.assign("/");
};

saveHighScore();
