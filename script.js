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
    if (isWinningMove(event.target)) {
      setTimeout(function () {
        // Bonus 1: při výhře zobraz confirm, pokud uživatel klikne na Ok, načti znovu stránku
        let result = confirm('Vyhrál hráč s kolečky.');
        if (result) {
          location.reload();
        }
      }, 300);
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
      setTimeout(function () {
        // Bonus 1: při výhře zobraz confirm, pokud uživatel klikne na Ok, načti znovu stránku
        let result = confirm('Vyhrál hráč s křížky.');
        if (result) {
          location.reload();
        }
      }, 300);
    }
  } else {
    event.target.className === 'board__field--circle' ||
      event.target.className === 'board__field--cross';
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

  //-------------------DIAGONÁLNĚ-----------------
  let DiagonallyUpLeftToRight = 1; // Jednička pro právě vybrané políčko
  // Koukni doprava nahoru
  let r = origin.row;
  let c = origin.column;
  while (
    c > 0 &&
    r < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c + 1))
  ) {
    DiagonallyUpLeftToRight++;
    r -= 1;
    c += 1;
    console.log(DiagonallyUpLeftToRight);
  }
  // Koukni doleva dolů
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c - 1))
  ) {
    DiagonallyUpLeftToRight++;
    r += 1;
    c -= 1;
    console.log(DiagonallyUpLeftToRight);
  }

  if (DiagonallyUpLeftToRight >= symbolsToWin) {
    return true;
  }

  let DiagonallyUpRightToLeft = 1;
  // Koukni doleva nahoru
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c - 1))
  ) {
    DiagonallyUpRightToLeft++;
    r -= 1;
    c -= 1;
    console.log(DiagonallyUpRightToLeft);
  }

  // Koukni doprava dolů
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c + 1))
  ) {
    DiagonallyUpRightToLeft++;
    r += 1;
    c += 1;
    console.log(DiagonallyUpRightToLeft);
  }

  if (DiagonallyUpRightToLeft >= symbolsToWin) {
    return true;
  }

  return false;
};
