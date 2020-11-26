'use strict';

(function () {
  const sortAgeBtn = document.querySelector(`.sorting__link--age`);
  const sortAgeSvg = document.querySelector(`.sorting__svg--age`);
  const sortPriceBtn = document.querySelector(`.sorting__link--price`);
  const sortPriceSvg = document.querySelector(`.sorting__svg--price`);
  const upBtn = document.querySelector('.up-btn');
  const emailInput = document.querySelector(`.subscribe__email`);
  const catsList = document.querySelector(`.cats__list`);
  const notificationMessage = document.querySelector(`.add-to-favorites`);

  const deleteElements = function () {
    const cats = document.querySelectorAll(`.cat`);
    for (let i = 0; i < cats.length; i++) {
      cats[i].remove();
    }
  };

  const getValueInArray = function (elements, array) {
    for (let i = 0; i < elements.length; i++) {
      let val = elements[i].textContent.replace(/\s/g, '');
      
      array.push(Number(val));
    }
  };

  const getAgesArray = function () {
    const ages = document.querySelectorAll(`.description__age--value`);
    const agesArr = [];

    getValueInArray(ages, agesArr);

    return agesArr;
  };

  const getPricesArray = function () {
    const prices = document.querySelectorAll(`.cat__price--value`);
    const pricesArr = [];

    getValueInArray(prices, pricesArr);

    return pricesArr;
  };

  const getSmallToLargArr = function (arr, dataAttribute) {
    const catsSortedArr = arr.sort ((a, b) => a.getAttribute(dataAttribute) - b.getAttribute(dataAttribute));
    return catsSortedArr;
  };

  const getLargToSmallArr = function (arr, dataAttribute) {
    const catsSortedArr = arr.sort ((a, b) => b.getAttribute(dataAttribute) - a.getAttribute(dataAttribute));
    return catsSortedArr;
  };

  const getSortedList = function (dataAttribute, parametr, sortingType) {
    const cats = document.querySelectorAll(`.cat`);
    const catsList = document.querySelector(`.cats__list`);

    const fragment = document.createDocumentFragment();
    const catsArr = Array.from(cats);

    deleteElements();
    
    for (let i = 0; i < catsArr.length; i++) {
      catsArr[i].setAttribute(dataAttribute, parametr[i]);
    }

    sortingType(catsArr, dataAttribute);

    for (let i = 0; i < sortingType(catsArr, dataAttribute).length; i++) {
      fragment.appendChild(sortingType(catsArr, dataAttribute)[i]);
    }
    catsList.appendChild(fragment);

    return catsList;
  };

  const sortHandler = function (evt, svg, arr) {
    evt.preventDefault();
    svg.classList.toggle(`toggle-sort`);

    if (svg.classList.contains(`toggle-sort`)) {
      getSortedList('data-age', arr, getSmallToLargArr);
    } else {
      getSortedList('data-age', arr, getLargToSmallArr);
    }
  };

  const scrollHandler = function () {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight / 2;

    if (scrolled > coords) {
      upBtn.classList.add('up-btn-show');
    }
    if (scrolled < coords) {
      upBtn.classList.remove('up-btn-show');
    }
  };

  const upHandler = function () {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -10);
      setTimeout(upHandler, 0);
    }
  };

  const notificationHandler = function (evt) {
    if (evt.target && evt.target.matches(`path`)) {
      
      notificationMessage.classList.add(`show-notification`);
      setTimeout(function () {
        notificationMessage.classList.remove(`show-notification`);
      }, 4000);
    }
  };

  const validateEmail = function (email) {
    const emailInput = document.querySelector(`.subscribe__email`);
    const re = /\S+@\S+\.\S+/;

    if (re.test(email)) {
      emailInput.setCustomValidity('');
    } else {
      emailInput.setCustomValidity('Пример - example@email.com');
    }
    emailInput.reportValidity();
  };

  sortAgeBtn.addEventListener(`click`, function (evt) {
    sortHandler(evt, sortAgeSvg, getAgesArray());
  });

  sortPriceBtn.addEventListener(`click`, function (evt) {
    sortHandler(evt, sortPriceSvg, getPricesArray());
  });

  window.addEventListener('scroll', function () {
    scrollHandler();
  });
  
  upBtn.addEventListener('click', function () {
    upHandler();
  });

  emailInput.addEventListener(`input`, function () {
    validateEmail(emailInput.value);
  });

  catsList.addEventListener(`click`, notificationHandler);
})();