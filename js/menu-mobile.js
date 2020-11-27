'use strict';

(function () {
  const menuToggle = document.querySelector(`.toggle`);
  const menuToggleSvg = document.querySelector(`.toggle__svg`);
  const navHeader = document.querySelector(`.nav`);

  const menuToggleHandler = function () {

    if (navHeader.classList.contains(`show-menu`) === false) {
      navHeader.classList.add(`show-menu`);
      menuToggleSvg.style.transform = `rotate(180deg)`;
      menuToggleSvg.style.transition = `.3s`;
    } else {

      menuToggleSvg.style.transform = `rotate(0)`;

      setTimeout(function () {
        navHeader.classList.add(`close-menu`);

        if (navHeader.classList.contains(`show-menu`, `close-menu`)) {

          setTimeout(function () {
            navHeader.classList.remove(`show-menu`, `close-menu`);
          }, 1000);
        }
      }, 300);
    }
  };

  menuToggle.addEventListener(`click`, menuToggleHandler);
})()