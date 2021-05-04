'use strict';
// // proměnná --> kdo je na tahu
// let turn = 'circle';

// // Funkce dělá:
// // - přidej políčku příslušnou třídu (kdo je na tahu)
// // - zobrazí na políčku příslušný obrázek (křížek nebo kolečko)
// // - změní v hlavičce ukazatel, kdo je na tahu
// // - střídá, kdo je na tahu
// // - pokud v kliknutém políčku už je nějaký symbol, nereaguje na klik
// // BONUS - na již vyplněná políčka se nedá  dostat klávesou tab

// const turnElm = document.querySelector('.hraje');

// const move = (event) => {
//   if (turn === 'circle') {
//     event.target.classList.add('board__field--circle');
//     event.target.innerHTML = '<img src="img/circle.svg" alt="circle turn" />';
//     turnElm.innerHTML =
//       'HRAJE: <img class="turn turn--cross" src="img/cross.svg" alt="cross turn" />';
//     event.target.disabled = true;
//     turn = 'cross';
//   } else if (turn === 'cross') {
//     event.target.classList.add('board__field--cross');
//     event.target.innerHTML = '<img src="img/cross.svg" alt="cross turn" />';
//     turnElm.innerHTML =
//       'HRAJE: <img class="turn turn--circle" src="img/circle.svg" alt="circle turn" />';
//     event.target.disabled = true;
//     turn = 'circle';
//   } else if (
//     event.target.className === 'board__field--circle' ||
//     event.target.className === 'board__field--cross'
//   ) {
//   }
// };
// // //Pomocí posluchače událostí po kliknutí na políčko se provede funkce move
// const buttons = document.querySelectorAll('.board__field');
// for (let i = 0; i < buttons.length; i += 1) {
//   buttons[i].addEventListener('click', move);
// }

// ---- POSLEDNÍ ÚKOL:  kontrolovat, jestli jeden z hráčů vyhrál----

// -------POMOCNÉ FUNKCE-------
// // 1. přichystej funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.
// const getSymbol = (field) => {
//   if (field.classList.contains('board__field--cross')) {
//     return 'cross';
//   } else if (field.classList.contains('board__field--circle')) {
//     return 'circle';
//   }
// };

// // 2. Napiš funkci getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.
// const boardSize = 10; // 10x10
// const fields = document.querySelectorAll('.board__field');

// const getField = (row, column) => fields[row * boardSize + column];

// // 3. Napiš funkci getPosition(field), která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, …

// const getPosition = (field) => {
//   let fieldIndex = 0;
//   while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
//     fieldIndex++;
//   }

//   return {
//     row: Math.floor(fieldIndex / boardSize),
//     column: fieldIndex % boardSize,
//   };
// };

// -------S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní. Nový kód navaž na event listener ze čtvrtého úkolu.

// 1. Vytvoř funkci isWinningMove(field), která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false.
// const symbolsToWin = 5;
// const isWinningMove = (field) => {
//   const origin = getPosition(field);
//   const symbol = getSymbol(field);

//   let i;

//   let inRow = 1; // Jednička pro právě vybrané políčko
//   // Koukni doleva
//   i = origin.column;
//   while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
//     inRow++;
//     i--;
//   }

//   // Koukni doprava
//   i = origin.column;
//   while (
//     i < boardSize - 1 &&
//     symbol === getSymbol(getField(origin.row, i + 1))
//   ) {
//     inRow++;
//     i++;
//   }

//   if (inRow >= symbolsToWin) {
//     return true;
//   }

//   let inColumn = 1;
//   // Koukni nahoru
//   i = origin.row;
//   while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
//     inColumn++;
//     i--;
//   }

//   // Koukni dolu
//   i = origin.row;
//   while (
//     i < boardSize - 1 &&
//     symbol === getSymbol(getField(i + 1, origin.column))
//   ) {
//     inColumn++;
//     i++;
//   }

//   if (inColumn >= symbolsToWin) {
//     return true;
//   }

//   return false;
// };
// 2. Funkci isWinningMove pusť s každým nově přidaným symbolem.

// 3. Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.

// ---------------------FINÁLNÍ KÓD------------------------
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
      // Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.
      alert('Vyhrál hráč s kolečky.');
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
      // Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.
      alert('Vyhrál hráč s křížky.');
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

  return false;
};

// BONUS
// 1. Při výhře místo alertu zobraz confirm. Pokud uživatel klikne na Ok, načti znovu stránku zavoláním location.reload().
// 2. Jako výhru počítej i pět stejných symbolů na diagonále. (Rada: nahoru diagonála vpravo = nejen odečíst řádek, ale i přičíst sloupec atp.)
