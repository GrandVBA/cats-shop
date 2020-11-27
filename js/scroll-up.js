'use strict';

(function () {
  const upBtn = document.querySelector('.up-btn');

  window.scrollUp = {
    showBtnHandler: function () {
      const scrolled = window.pageYOffset;
      const coords = document.documentElement.clientHeight / 2;
  
      if (scrolled > coords) {
        upBtn.classList.add('up-btn-show');
      }
      if (scrolled < coords) {
        upBtn.classList.remove('up-btn-show');
      }
    },

    upHandler: function () {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -9);
        setTimeout(window.scrollUp.upHandler, 0);
      }
    }
  }

  window.addEventListener('scroll', function () {
    window.scrollUp.showBtnHandler();
  });
  
  upBtn.addEventListener('click', function () {
    window.scrollUp.upHandler();
  });
})();