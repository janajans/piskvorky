'use strict';

let turn = 'circle';
const turnElm = document.querySelector('.hraje');

const move = (event) => {
  if (turn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.innerHTML = '<img src="img/circle.svg" alt="circle turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--cross" src="img/cross.svg" alt="cross turn" />';
    event.target.disabled = true;
    turn = 'cross';
    // zjisti při každém tahu, jestli se nejedná o výherní
    let result;
    if (isWinningMove(event.target)) {
      // Bonus 1: při výhře zobraz confirm, pokud uživatel klikne na Ok, načti znovu stránku
      result = confirm('Vyhrál hráč s kolečky.');
      if ((result = true)) {
        location.reload();
      }
    }
  } else if (turn === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.innerHTML = '<img src="img/cross.svg" alt="cross turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--circle" src="img/circle.svg" alt="circle turn" />';
    event.target.disabled = true;
    turn = 'circle';
    // zjisti při každém tahu, jestli se nejedná o výherní
    if (isWinningMove(event.target)) {
      // Bonus 1: při výhře zobraz confirm, pokud uživatel klikne na Ok, načti znovu stránku
      let result = confirm('Vyhrál hráč s křížky.');
      if ((result = true)) {
        location.reload();
      }
    }
  } else if (
    event.target.className === 'board__field--circle' ||
    event.target.className === 'board__field--cross'
  ) {
  }
};

const buttons = document.querySelectorAll('.board__field');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', move);
}

// getSymbol --> pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined
const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

// GetField --> pro číslo řádku a sloupce vrátí příslušný prvek
const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.board__field');

const getField = (row, column) => fields[row * boardSize + column];

// getPosition --> pro dané políčko vrátí objekt s číslem řádku a sloupce
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// isWinningMove(field) --> podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět, vrátí true / false
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let DiagonallyUpLeftToRight = 1; // Jednička pro právě vybrané políčko
  // Koukni doprava nahoru
  let x = origin.row;
  let y = origin.column;
  while (
    x > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x - 1, y + 1))
  ) {
    DiagonallyUpLeftToRight++;
    y++;
    x--;
  }
  // Koukni doleva dolů
  while (
    x > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x + 1, y - 1))
  ) {
    DiagonallyUpLeftToRight++;
    y--;
    x++;
  }

  if (DiagonallyUpLeftToRight >= symbolsToWin) {
    return true;
  }

  let DiagonallyUpRightToLeft = 1;
  // Koukni doleva nahoru
  while (
    x > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x - 1, y - 1))
  ) {
    DiagonallyUpRightToLeft++;
    y--;
    x--;
  }

  // Koukni doprava dolů
  while (
    x > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x + 1, y + 1))
  ) {
    DiagonallyUpRightToLeft++;
    y++;
    x++;
  }

  if (DiagonallyUpRightToLeft >= symbolsToWin) {
    return true;
  }

  return false;
};
