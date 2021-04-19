'use strict';

//reagovat na uživatelův výběr políčka - Podle toho, kdo je na tahu, budeš přidávat do herní plochy kolečka nebo křížky a v levém horním rohu zobrazovat, čí tah následuje.

// proměnná --> kdo je na tahu
let turn = 'circle';

// Funkce move dělá:
// - přidej políčku příslušnou třídu (kdo je na tahu)
// - zobrazí na políčku příslušný obrázek (křížek nebo kolečko)
// - změní v hlavičce ukazatel, kdo je na tahu
// - střídá, kdo je na tahu

const turnElm = document.querySelector('.hraje');

const move = (event) => {
  if (turn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.innerHTML = '<img src="img/circle.svg" alt="circle turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--circle" src="img/circle.svg" alt="circle turn" />';
    turn = 'cross';
  } else if (turn === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.innerHTML = '<img src="img/cross.svg" alt="cross turn" />';
    turnElm.innerHTML =
      'HRAJE: <img class="turn turn--cross" src="img/cross.svg" alt="cross turn" />';
    turn = 'circle';
  }
};
// //Pomocí posluchače událostí po kliknutí na políčko se provede funkce move
const buttons = document.querySelectorAll('.board__field');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', move);
}
