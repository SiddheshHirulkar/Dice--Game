// Variable Declarations
const diceButton = document.querySelector(".btn-roll");

let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;
let playerOneMainScore = 0; /*document.querySelector("#player-1-status").value*/
let playerTwoMainScore = 0; /*document.querySelector("#player-2-status").value*/

// const playerOneTurn = document.querySelector(".playground__player-1");

// Generate random number for dice
const generateDiceValue = () => {
  let value = Math.trunc(Math.random() * 10);

  // Check for value = 0
  if (value === 0) value += Math.trunc(Math.random() * 10);

  // Check for values more than 6
  if (value > 6) value -= 6;

  return value;
};

// Add click event to Roll Dice button
diceButton.addEventListener("click", rollDice);

function rollDice() {
  // Generate random values for the dice
  const diceButtonValue = generateDiceValue();

  // Render the respective value image for the dice
  document.querySelector(".dice").removeAttribute("src");
  document
    .querySelector(".dice")
    .setAttribute("src", `img/dice-${diceButtonValue}.png`);

  let playerOneTurn = document.querySelector(".playground__player-1");
  let isPlayerOneTurn = playerOneTurn.classList.contains("player--selected");

  // Condition when value of the dice is 1
  if (diceButtonValue === 1) {
    // check for the first players turn
    if (isPlayerOneTurn) {
      // if the dice value is 1 set the current score to 0
      playerOneCurrentScore = 0;

      // if the dice value is 1 swap the player
      document
        .querySelector(".playground__player-1")
        .classList.remove("player--selected");
      document
        .querySelector(".playground__player-2")
        .classList.add("player--selected");
      document.querySelector("#player-1-current").innerHTML = 0;
    } else {
      // if the dice value is 1 set the current score to 0
      playerTwoCurrentScore = 0;

      // if the dice value is 1 swap the player
      document
        .querySelector(".playground__player-2")
        .classList.remove("player--selected");
      document
        .querySelector(".playground__player-1")
        .classList.add("player--selected");
      document.querySelector("#player-2-current").innerHTML = 0;
    }
  } else {
    // increment the current score as per dice value
    if (isPlayerOneTurn) {
      playerOneCurrentScore += diceButtonValue;
      document.querySelector(
        "#player-1-current"
      ).innerHTML = playerOneCurrentScore;
    } else {
      playerTwoCurrentScore += diceButtonValue;
      document.querySelector(
        "#player-2-current"
      ).innerHTML = playerTwoCurrentScore;
    }
  }
}

// ------------------- For hold button ---------------------
const holdButton = document.querySelector(".btn-hold");

holdButton.addEventListener("click", holdClick);

function holdClick() {
  let playerOneTurn = document.querySelector(".playground__player-1");
  let isPlayerOneTurn = playerOneTurn.classList.contains("player--selected");

  // check for the player tern and add the current score to the main score
  if (isPlayerOneTurn) {
    playerOneMainScore += playerOneCurrentScore;
    playerOneCurrentScore = 0;
    document.querySelector("#player-1-status").innerHTML = playerOneMainScore;
    document.querySelector("#player-1-current").innerHTML = 0;
  } else {
    playerTwoMainScore += playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
    document.querySelector("#player-2-status").innerHTML = playerTwoMainScore;
    document.querySelector("#player-2-current").innerHTML = 0;
  }

  // -------- When any of the player wins the game

  if (playerOneMainScore > 50 || playerTwoMainScore > 50) {
    if (playerOneMainScore > 50) {
      const winnerTitle = document.querySelector(".winner-title-1");
      winnerTitle.style.visibility = "visible";
    } else {
      const winnerTitle = document.querySelector(".winner-title-2");
      winnerTitle.style.visibility = "visible";
    }
    holdButton.removeEventListener("click", holdClick);
    diceButton.removeEventListener("click", rollDice);
  }
}

// --------------------- For New Game button -------------------------
const newGame = document.querySelector(".btn-new");

newGame.addEventListener("click", function () {
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;
  playerOneMainScore = 0;
  playerTwoMainScore = 0;

  document.querySelector("#player-1-status").innerHTML = 0;
  document.querySelector("#player-1-current").innerHTML = 0;
  document.querySelector("#player-2-status").innerHTML = 0;
  document.querySelector("#player-2-current").innerHTML = 0;

  // Check for the player one's tern if not make it player1's tern
  let playerOneTurn = document.querySelector(".playground__player-1");
  let isPlayerOneTurn = playerOneTurn.classList.contains("player--selected");

  if (!isPlayerOneTurn) {
    document
      .querySelector(".playground__player-2")
      .classList.remove("player--selected");
    playerOneTurn.classList.add("player--selected");
  }

  document.querySelector(".dice").removeAttribute("src");
  document.querySelector(".dice").setAttribute("src", `img/dice-1.png`);

  // Add winner title
  let winnerTitle = document.querySelector(".winner-title-1");
  winnerTitle.style.visibility = "hidden";
  winnerTitle = document.querySelector(".winner-title-2");
  winnerTitle.style.visibility = "hidden";

  // Add event to disabled buttons
  holdButton.addEventListener("click", holdClick);
  diceButton.addEventListener("click", rollDice);
});
