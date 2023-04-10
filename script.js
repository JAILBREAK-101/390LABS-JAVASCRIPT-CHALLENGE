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
let scoresValueEl = document.querySelector(".header__score");
const userTriesEl = document.querySelector(".header__tries");
const levelEl = document.querySelector(".header__level");
let userTriesVal = parseInt(userTriesEl.innerText);

const playButton = document.querySelector(".guess-game__play-button");
const startButton = document.querySelector(".guess-game__start-button");

const homepageUI = document.querySelector(".guess-game__home");
const selectionUI = document.querySelector(".guess-game__selection");
const gameplayUI = document.querySelector(".guess-game__gameplay");

const guessForm = document.querySelector(".guess-game__form");
const guessInput = document.querySelector(".guess-game__input");
const guessButton = document.querySelector(".guess-game__button");
let triesCountEl = document.querySelector(".tries-count");
let triesCount = Number(triesCountEl.innerText);

const userGuess = document.querySelector(".guess-game__your-guess");
const correctNo = document.querySelector(".guess-game__correct-no");

const endGameModal = document.querySelector('.endGame');
const playGameModal = document.querySelector('.playGame');

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
  
// COME BACK FOR THE SCORE LOGIC WHEN THE USER WINS.
// COME BACK FOR THE LOGIC FOR THE FUNCTIONAL BUTTONS OF EACH MODAL (YES AND NO).

// functions.
playButton.addEventListener("click", () => {
  switchUI(homepageUI, selectionUI);
});

let pickLevel = () => {
  gameLevels.map((level) => {
    if (level.checked === true) {
      displayLevelInfo(level);
    }
    if (level.checked === false) return;
  });
  switchUI(selectionUI, gameplayUI);
};

let calculateScores = (guess, correctNo) => guess === correctNo ? (parseInt(scoresValueEl.innerText) += scoreMark): null;
// (parseInt(scoresValueEl.innerText -= scoreMark))

let aggregateTries = (value) => {
  ++value.innerText;
}

// storeUserScore(score, tries, level);
let updateValues = (score, tries, level) => {
  storeUserScore(score, tries.innerText, level);
}

let storeUserScore = (currentScore, currentUserTries, currentLevel) => {
  localStorage.setItem("userScore", `Level ${currentLevel} in ${currentUserTries} tries = ${currentScore}`);
};

let displayLevelInfo = (level) => {
  gameDetails.filter((detail) => {
    if (parseInt(level.value) === detail.levelNumber) {
      // undeclared but used.
      const levelNumber = (document.querySelector(".level__value").innerText =
        detail.levelNumber);
      const levelDescription = (document.querySelector(
        ".level__description"
      ).innerText = detail.levelInstruction);
      const levelDifficulty = (document.querySelector(
        ".level__difficulty"
      ).innerText = detail.levelDifficulty);

      // update the level as the game starts on the screen
      levelEl.innerText = detail.levelNumber;

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

let startGame = (value) => checkGuess(value);

let checkGuess = (value) => {
  let generatedNumber =
    Math.ceil(Math.random() * 2) + value.levelRange.min;
  if (guessInput.value === "") return;
  userGuess.innerText = guessInput.value;
  correctNo.innerText = generatedNumber;

  parseInt(guessInput.value) === generatedNumber
    ? gameWon(value, generatedNumber, parseInt(scoresValueEl.innerText), userTriesEl, levelEl.innerText)
    : decrementNoOfTries(triesCountEl, value, generatedNumber, parseInt(scoresValueEl.innerText), userTriesEl, levelEl.innerText);
};

let clearInput = () => (guessInput.value = "");

let decrementNoOfTries = (tries, userVal, compVal, score, userTries, level) => {
  --tries.innerText;
  clearInput();
  calculateScores(userVal, compVal);
  aggregateTries(userTries);
  if (tries.innerText == 0) {
    gameOver(score, userTries, level);
  }
};

let gameWon = (userVal, compVal, score, userTries, level) => {
  stopGame();
  aggregateTries(userTries);
  revealTexts[1].classList.remove("hidden");
  calculateScores(userVal, compVal);
  updateValues(score, userTries, level);
  // guessForm.classList1.add("stop-game");
};

let gameOver = (score, userTries, level) => {
  stopGame();
  revealTexts[0].classList.remove("hidden");
  updateValues(score, userTries, level);
};

let stopGame = () => {
  guessInput.blur();
  hideButtons();
}

let hideButtons = () => {
  endGameBtn.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
}

let resetAll = (targetUI) => {
  triesCountEl.innerText = 4;
  userGuess.innerText = "";
  correctNo.innerText = "?";
  switchUI(gameplayUI, targetUI);
};

let endGame = () => { 
  // onUserRequest("end game", resetAll(homepageUI))
  endGameModal.classList.remove('hidden');
};

let playAgain = () => {
  // onUserRequest("play again", resetAll(selectionUI))
  playGameModal.classList.remove('hidden');
};

startButton.addEventListener("click", pickLevel);
playAgainBtn.addEventListener("click", playAgain);
endGameBtn.addEventListener("click", endGame);
