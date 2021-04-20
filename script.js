'use strict';
// proměnná --> kdo je na tahu
let turn = 'circle';

// Funkce dělá:
// - přidej políčku příslušnou třídu (kdo je na tahu)
// - zobrazí na políčku příslušný obrázek (křížek nebo kolečko)
// - změní v hlavičce ukazatel, kdo je na tahu
// - střídá, kdo je na tahu
// - pokud v kliknutém políčku už je nějaký symbol, nereaguje na klik
// BONUS - na již vyplněná políčka se nedá  dostat klávesou tab

const turnElm = document.querySelector('.hraje');

const move = (event) => {
  if (turn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.innerHTML = '<img src="img/circle.svg" alt="circle turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--cross" src="img/cross.svg" alt="cross turn" />';
    event.target.disabled = true;
    turn = 'cross';
  } else if (turn === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.innerHTML = '<img src="img/cross.svg" alt="cross turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--circle" src="img/circle.svg" alt="circle turn" />';
    event.target.disabled = true;
    turn = 'circle';
  } else if (
    event.target.className === 'board__field--circle' ||
    event.target.className === 'board__field--cross'
  ) {
  }
};
// //Pomocí posluchače událostí po kliknutí na políčko se provede funkce move
const buttons = document.querySelectorAll('.board__field');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', move);
}
