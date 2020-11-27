'use strict';

(function () {
  const emailInput = document.querySelector(`.subscribe__email`);
  const emailForm = document.querySelector(`.subscribe__form`);
  
  const validateEmail = function (email) {
    const emailInput = document.querySelector(`.subscribe__email`);
    const re = /\S+@\S+\.\S+/;

    if (re.test(email)) {
      emailInput.setCustomValidity(``);
    } else {
      emailInput.setCustomValidity('Пример - shop@cats.ru');
    }
    emailInput.reportValidity();
  };

  emailInput.addEventListener(`input`, function () {
    validateEmail(emailInput.value);
  });

  emailForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    validateEmail(emailInput.value);
    this.submit();
  });
})();