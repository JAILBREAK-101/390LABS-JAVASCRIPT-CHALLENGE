const gameDetails = [
  {
    levelNumber: 1,
    levelDifficulty: "Very easy",
    levelInstruction: "you are to guess a number between 1 to 50",
    levelRange: {
      min: 1,
      max: 50,
    },
    // levelTries: 4
  },
  {
    levelNumber: 2,
    levelDifficulty: "Easy",
    levelInstruction: "you are to guess a number between 1 to 100",
    levelRange: {
      min: 1,
      max: 100,
    },
    // levelTries: 4
  },
  {
    levelNumber: 3,
    levelDifficulty: "Challenging",
    levelInstruction: "you are to guess a number between 1 to 250",
    levelRange: {
      min: 1,
      max: 250,
    },
    // levelTries: 4
  },
  {
    levelNumber: 4,
    levelDifficulty: "Hard",
    levelInstruction: "you are to guess a number between 1 to 400",
    levelRange: {
      min: 1,
      max: 400,
    },
    // levelTries: 4
  },
  {
    levelNumber: 5,
    levelDifficulty: "Very Hard",
    levelInstruction: "you are to guess a number between 1 to 550",
    levelRange: {
      min: 1,
      max: 550,
    },
    // levelTries: 4
  },
  {
    levelNumber: 6,
    levelDifficulty: "Extremely Hard",
    levelInstruction: "you are to guess a number between 1 to 700",
    levelRange: {
      min: 1,
      max: 700,
    },
    // levelTries: 4
  },
  {
    levelNumber: 7,
    levelDifficulty: "Expert Mode",
    levelInstruction: "you are to guess a number between 1 to 850",
    levelRange: {
      min: 1,
      max: 850,
    },
    // levelTries: 4
  },
  {
    // Exception for this, win three times in each of the levels from level 4 downward
    levelNumber: 8,
    levelDifficulty: "Don't do this one🔥",
    levelInstruction: "you are to guess a number between 1 to 1000",
    levelRange: {
      min: 1,
      max: 1000,
    },
    bonusLevel: true,
    // levelTries: 4
  },
];

let scoreMark = 10;
let scoresValue = Number(document.querySelector(".header__score").innerText);
const numberOfTries = Number(
  document.querySelector(".header__tries").innerText
);
const level = Number(document.querySelector(".header__level").innerText);

const playButton = document.querySelector(".guess-game__play-button");
const startButton = document.querySelector(".guess-game__start-button");

const homepageUI = document.querySelector(".guess-game__home");
const selectionUI = document.querySelector(".guess__game-selection");
const gameplayUI = document.querySelector(".guess__game-gameplay");

const guessForm = document.querySelector(".guess-game__form");
const guessInput = document.querySelector(".guess-game__input");
const guessButton = document.querySelector(".guess-game__button");
let triesCountEl = document.querySelector(".tries-count");
let triesCount = Number(triesCountEl.innerText);

const userGuess = document.querySelector(".guess-game__your-guess");
const correctNo = document.querySelector(".guess-game__corret-no");

// Initiate Local Storage.

const gameLevels = Array.from(
  document.querySelectorAll(".level__radio-button")
);

const revealTexts = Array.from(
  document.querySelector(".guess-game__reveal-text").children
);

const playAgainBtn = document.querySelector(".guess-game__gameplay-buttons")
  .children[0];

const endGameBtn = document.querySelector(".guess-game__gameplay-buttons")
  .children[1];

// functions.
playButton.addEventListener("click", () => {
  switchUI(homepageUI, selectionUI);
});

let pickLevel = () => {
  gameLevels.filter((level) => {
    if (level.checked === false) return;
    if (level.checked === true) {
      displayLevelInfo(level);
    }
  });
  switchUI(selectionUI, gameplayUI);
};

let calculateScores = (guess, correctNo) => {
  guess === correctNo ? scoresValue + scoreMark : scoresValue - scoreMark;
};

let storeScores = (currentScore) => {
  JSON.stringify(localStorage.setItem("userScore", currentScore));
};

let displayLevelInfo = (level) => {
  gameDetails.filter((detail) => {
    if (parseInt(level.value) === detail.levelNumber) {
      const levelNumber = (document.querySelector(".level__value").innerText =
        detail.levelNumber);
      const levelDescription = (document.querySelector(
        ".level__description"
      ).innerText = detail.levelInstruction);
      const levelDifficulty = (document.querySelector(
        ".level__difficulty"
      ).innerText = detail.levelDifficulty);

      guessButton.addEventListener("click", (e) => {
        e.preventDefault();
        startGame(detail);
      });
    }
  });
};

let switchUI = (currentUI, newUI) => {
  currentUI.classList.add("hidden");
  newUI.classList.remove("hidden");
};

let startGame = (value) => {
  checkGuess(value);
};

let clearInput = () => {
  guessInput.value = "";
};

let decrementNoOfTries = (count, score) => {
  clearInput();
  --count.innerText;
  if (count.innerText == 0) {
    gameOver(score);
  }
};

let checkGuess = (value) => {
  let generatedNumber =
    Math.ceil(Math.random() * value.levelRange.max) + value.levelRange.min;
  if (guessInput.value === "") return;
  userGuess.innerText = guessInput.value;
  correctNo.innerText = generatedNumber;
  value === generatedNumber
    ? gameWon()
    : decrementNoOfTries(triesCountEl, score);
  calculateScores(value, generatedNumber);
};

let gameWon = () => {
  guessForm.classList.add("stop-game");
  revealTexts[1].classList.remove("hidden");
};

let gameOver = (score) => {
  guessForm.classList.add("stop-game");
  guessInput.blur();
  revealTexts[0].classList.remove("hidden");
  endGameBtn.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
  storeScores(score);
};

let endGameForNew = () => {};

let playAgain = () => {};

startButton.addEventListener("click", pickLevel);
