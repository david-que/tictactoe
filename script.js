const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restartBtn");
const spaces = [];
const o_text = "O";
const x_text = "X";
let currentPlayer = o_text;

const gameboard = document.querySelector("#gameboard");

//make grid
function createBoard(size) {
  let gridArea = size * size;
  for (let i = 0; i < gridArea; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameboard.appendChild(cell);
    cell.id = i;
  }
  gameboard.style.display = "grid";
  gameboard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

window.addEventListener("DOMContentLoaded", createBoard(3));

function boxClicked() {
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.addEventListener("click", markBox);
  }
}

boxClicked();

function markBox(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playText.innerText = `${currentPlayer} has won!`;
      return;
    }
    currentPlayer = currentPlayer === o_text ? x_text : o_text;
  }
}

// const boxClicked = (e) => {
//   const id = e.target.id;
//   if (!spaces[id]) {
//     spaces[id] = currentPlayer;
//     e.target.innerText = currentPlayer;

//     if (playerHasWon()) {
//       playText.innerText = `${currentPlayer} has won!`;
//       return;
//     }
//     currentPlayer = currentPlayer === o_text ? x_text : o_text;
//   }
// };

const playerHasWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      console.log(`${currentPlayer} wins up top.`);
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      console.log(`${currentPlayer} wins on the left.`);
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      console.log(`${currentPlayer} wins diagonally.`);
      return true;
    }
  } else if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      console.log(`${currentPlayer} wins on the right.`);
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      console.log(`${currentPlayer} wins on the bottom.`);
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      console.log(`${currentPlayer} wins vertically in the middle.`);
      return true;
    }
    if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
      console.log(`${currentPlayer} wins diagonally.`);
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      console.log(`${currentPlayer} wins horizontally in the middle`);
      return true;
    }
  }
};

function restart() {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  playText.innerText = `Let's Play`;
  currentPlayer = o_text;
}

restartBtn.addEventListener("click", restart);
// drawBoard();
