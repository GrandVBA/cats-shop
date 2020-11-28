`use strict`;

(function () {
  const catsList = document.querySelector(`.cats__list`);
  const body = document.querySelector(`body`);

  const notificationHandler = function (evt) {
    
    if (evt.target && evt.target.matches(`path`)) {

      const notificationTemplate = document.querySelector(`#notification`)
        .content
        .querySelector(`.add-to-favorites`);
      const notificationElement = notificationTemplate.cloneNode(true);
      
      evt.target.classList.toggle(`active-like`);
      body.appendChild(notificationElement);
      
      notificationElement.classList.add(`show-notification`);
      setTimeout(function () {
        notificationElement.remove();
      }, 3000);

      if (evt.target.classList.contains(`active-like`)) {
        notificationElement.textContent = `Добавлен в избранное`;
      } else {
        notificationElement.textContent = `Удалён из избранного`;
      }
    }
  };

  catsList.addEventListener(`click`, notificationHandler);
})()