import { COLS_COUNT, ROWS_COUNT, generateRows } from './generateField';

generateRows(ROWS_COUNT, COLS_COUNT);

const fieldObject = [];
const fieldNode = document.querySelector('.field');
fieldNode.querySelectorAll('.row').forEach(e => {
  const cells = e.querySelectorAll('.cell');
  const row = [];
  cells.forEach(c => {
    row.push(c);
    c.addEventListener('click', CellClickHandler);
  });
  fieldObject.push(row);
});

// Varibles
const players = [
  { name: 'cross', className: 'ch', plural: 'X' },
  { name: 'round', className: 'r', plural: 'O' },
];
const winClassesNames = ['horizontal', 'vertical', 'diagonal-right', 'diagonal-left'];
let turns = [];
let cancelledTurns = [];
const fieldSize = fieldObject.length;

// Button & Logic
const wonTitleElement = document.querySelector('.won-title');
const wonMessageElement = document.querySelector('.won-message');
const undoButton = document.querySelector('.undo-btn');
const redoButton = document.querySelector('.redo-btn');
const restartButton = document.querySelector('.restart-btn');
undoButton.addEventListener('click', Undo);
redoButton.addEventListener('click', Redo);
restartButton.addEventListener('click', ResetGame);

const saved = JSON.parse(localStorage.getItem('Moves'));
if (saved && saved.length > 0) {
  const savedTurns = saved[0];
  const savedCancelledTurns = saved[1];
  savedTurns.forEach(e => Move(FromCellID(e.target), e.player));
  if (savedCancelledTurns && savedCancelledTurns.length > 0) cancelledTurns = savedCancelledTurns;
}

// Reset and End Game
function EndGame(player = false, cells = null) {
  wonTitleElement.classList.remove('hidden');
  if (player) {
    wonMessageElement.textContent = `${player.plural} wins!`;
    cells[0].forEach(e => {
      e.classList.add(cells[1]);
      e.classList.add('win');
    });
  } else {
    wonMessageElement.textContent = 'Draw!';
  }
  redoButton.disabled = true;
  undoButton.disabled = true;
  return true;
}

window.addEventListener('storage', function(event) {
  if (event.key === 'Moves' && event.oldValue !== event.newValue) {
    resetGame(true);
    const savedCancelledTurns = JSON.parse(saved)[1];
    savedMoves = JSON.parse(saved)[0];
    if (savedTurns) savedTurns.forEach(e => Move(FromCellID(e.target), e.player, true));
    if (savedCancelledTurns && savedCancelledTurns.length > 0) cancelledTurns = savedCancelledTurns;
    ManageButtons();
  }
});

function UpdateLocalStorage() {
  localStorage.setItem('Moves', JSON.stringify([turns, cancelledTurns]));
}

// Cell Logic && Move
function CellClickHandler(e) {
  if (wonTitleElement.classList.contains('hidden')) {
    const player = players[turns.length % players.length];
    Move(e.target, player);
  }
}

function Move(target, player, copied = false) {
  cancelledTurns = [];
  target.classList.add(player.className);
  turns.push({ target: target.id, player });
  ManageButtons();
  CheckForWin(target, fieldObject, player);
  if (!copied) localStorage.setItem('Moves', JSON.stringify([turns, cancelledTurns]));
}

function FromCellID(id) {
  return document.querySelector(`#${id}`);
}

function CheckForWin(target, field, player) {
  // Horizontaly
  const horizontal = field.filter(e => e.includes(target))[0];
  if (horizontal.every(e => e.classList.contains(player.className))) {
    return EndGame(player, [horizontal, 'horizontal']);
  }
  // Vertically
  const vertical = Array.from(
    document.querySelectorAll(`.cell:nth-child(3n+${((+target.id.slice(2) % 3) + 1).toString()})`)
  );
  if (vertical.every(e => e.classList.contains(player.className))) {
    return EndGame(player, [vertical, 'vertical']);
  }
  // Major diagonal
  if (+target.id.slice(2) % (fieldSize + 1) === 0) {
    const diagonalMajor = Array.from(document.querySelectorAll('.cell')).filter(
      e => +e.id.slice(2) % (fieldSize + 1) === 0
    );
    if (diagonalMajor.every(e => e.classList.contains(player.className))) {
      return EndGame(player, [diagonalMajor, 'diagonal-right']);
    }
  }
  // Minor diagonal
  if (+target.id.slice(2) % (fieldSize - 1) === 0) {
    const diagonalMinor = Array.from(document.querySelectorAll('.cell')).filter(
      e =>
        +e.id.slice(2) % (fieldSize - 1) === 0 && +e.id.slice(2) !== 0 && +e.id.slice(2) !== fieldSize * fieldSize - 1
    );
    if (diagonalMinor.every(e => e.classList.contains(player.className))) {
      return EndGame(player, [diagonalMinor, 'diagonal-left']);
    }
  }
  // Draw
  if (document.querySelectorAll('.cell:not(.ch):not(.r) ').length === 0) {
    return EndGame(false);
  }

  return false;
}

function ResetGame(copied = false) {
  fieldNode.querySelectorAll('.cell').forEach(e => {
    players.forEach(p => e.classList.remove(p.className));
    winClassesNames.forEach(p => e.classList.remove(p));
    e.classList.remove('win');
  });
  undoButton.disabled = true;
  redoButton.disabled = true;
  wonTitleElement.classList.add('hidden');
  turns = [];
  cancelledTurns = [];
  if (copied !== true) localStorage.setItem('Moves', JSON.stringify([]));
}

// UI Logic
function ManageButtons() {
  redoButton.disabled = cancelledTurns.length === 0;
  undoButton.disabled = turns.length === 0;
  if (!wonTitleElement.classList.contains('hidden')) {
    redoButton.disabled = undoButton.disabled = true;
  }
}

function Undo() {
  const turn = turns.pop();
  cancelledTurns.push(turn);
  players.forEach(e => {
    FromCellID(turn.target).classList.remove(e.className);
  });
  ManageButtons();
  UpdateLocalStorage();
}

function Redo() {
  const turn = cancelledTurns.pop();
  turns.push(turn);
  FromCellID(turn.target).classList.add(turn.player.className);
  ManageButtons();
  UpdateLocalStorage();
}
