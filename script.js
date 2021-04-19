'use strict';

//reagovat na uživatelův výběr políčka - Podle toho, kdo je na tahu, budeš přidávat do herní plochy kolečka nebo křížky a v levém horním rohu zobrazovat, čí tah následuje.
//Vytvoř si proměnnou, ve které bude uloženo kdo je na tahu. Začíná vždy kolečko, tak rovnou do proměnné přiřaď řetězec 'circle'.

let turn = 'circle';

//Pomocí posluchače událostí po kliknutí na políčko:
// Přidej políčku příslušnou třídu podle toho, kdo je zrovna na tahu. Například board__field--circle, resp. board__field--cross.

const move = (event) => {
  if (turn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.innerHTML = '<img src="img/circle.svg" alt="circle move" />';
    turn = 'cross';
  } else if (turn === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.innerHTML = '<img src="img/cross.svg" alt="cross move" />';
    turn = 'circle';
  }
};

const buttons = document.querySelectorAll('.board__field');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', move);
}

// const turnElm = document.querySelector('.move');
// moveElm.src = 'img/circle.svg';

// Nastyluj políčka tak, aby nezobrazovala nic nebo kolečka a křížky podle tříd z předchozího kroku.

// Změň hodnotu proměnné z 'circle' na 'cross', případně z 'cross' na 'circle'.

// Uprav v levém horním rohu výpis, kdo je na tahu.

// ------------SMILEY-------------:
// const selectSmiley = (event) => {
//   event.target.classList.add('btn-smiley--selected');
// };

// const buttons = document.querySelectorAll('.btn-smiley');
// for (let i = 0; i < buttons.length; i += 1) {
//   buttons[i].addEventListener('click', selectSmiley);
// }
