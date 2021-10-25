const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const score = document.getElementById("score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(localStorage);

finalScore.innerText = mostRecentScore;

// username.addEventListener("keyup", () => {
// saveScoreBtn.disabled = !username.value;
// });

/*let saveHighScore = (e) => {
  // e.preventDefault();
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
}; */

//saveScoreBtn.
document.getElementById("saveScoreBtn").addEventListener("click", (e) => {
  // e.preventDefault();
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
  finalScore.innerText = "0";
  // window.location.assign("/");
});
