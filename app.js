let gameSeq = [];
let userSeq = [];
const btns = ["yellow","green","red","purple"];

let started = false;
let level = 0;
let highScore = Number(localStorage.getItem("highScore") || 0);

const h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level} (Best: ${highScore})`;

  const randIdx = Math.floor(Math.random() * btns.length);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log("gameSeq:", gameSeq);
  gameflash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    const score = Math.max(0, level - 1);

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game over! your score was <b>${score}</b><br>press any key to start<br>your highest score is <b>${highScore}</b>`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 150);

    reset();
  }
}

function btnPress() {
  const btn = this;
  userflash(btn);

  const useColor = btn.getAttribute("id");
  userSeq.push(useColor);

  checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}