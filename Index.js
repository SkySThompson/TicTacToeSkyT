const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const iconSelect = document.getElementById('icon-select');

let circleTurn;
let playerIcons = ['x', 'circle']; // Default icons

startGame();

// Fix for restart button not working
restartButton.addEventListener('click', () => {
  startGame();
});

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.classList.remove('winning'); // Remove previous winning highlight
    cell.classList.remove('animate'); // Reset animation class
    cell.removeEventListener('click', handleClick); // Remove old click event
    cell.addEventListener('click', handleClick, { once: true }); // Add new click event
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? playerIcons[1] : playerIcons[0]; // Use selected icons
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(playerIcons[1]); // Use selected icons
  } else {
    board.classList.add(playerIcons[0]);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    if (combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })) {
      // Animate the winning cells with a glow effect
      combination.forEach(index => {
        cellElements[index].classList.add('winning');
      });
      return true;
    }
    return false;
  });
}
