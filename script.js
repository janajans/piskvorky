'use strict';

//reagovat na uživatelův výběr políčka - Podle toho, kdo je na tahu, budeš přidávat do herní plochy kolečka nebo křížky a v levém horním rohu zobrazovat, čí tah následuje.
//Vytvoř si proměnnou, ve které bude uloženo kdo je na tahu. Začíná vždy kolečko, tak rovnou do proměnné přiřaď řetězec 'circle'.

// let turn = 'circle';
// const turnElm = document.querySelector('.move');
// moveElm.src = 'img/circle.svg';

//Pomocí posluchače událostí po kliknutí na políčko:
// Přidej políčku příslušnou třídu podle toho, kdo je zrovna na tahu. Například board__field--circle, resp. board__field--cross.

const move = (event) => {
  event.target.classList.add('board__field--circle');
  event.target.innerHTML = '<img src="img/circle.svg" alt="circle move" />';
};
// function chngimg() {
//   var img = document.getElementById('imgplus').src;
//   if (img.indexOf('Plus.gif')!=-1) {
//       document.getElementById('imgplus').src  = 'Images/Minus.gif';
//   }
//    else {
//      document.getElementById('imgplus').src = 'Images/Plus.gif';
//  }

const buttons = document.querySelectorAll('.board__field');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', move);
}

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
