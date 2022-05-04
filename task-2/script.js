/***
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
*/
function init() {
  const space = " ".repeat(30);

  const btn = document.querySelector(".btn");
  btn.addEventListener('click', () => {
    alert (`Размер экрана девайса/монитора:\n${space}ширина - ${window.screen.width}px, высота - ${window.screen.height}px;\n
Размер экрана с учётом полосы прокрутки:\n${space}ширина - ${window.innerWidth}px, высота - ${window.innerHeight}px;\n
Размер экрана без учёта полосы прокрутки:\n${space}ширина - ${document.documentElement.clientWidth}px, высота - ${document.documentElement.clientHeight}px;
`)
  });
}

window.onload = init();