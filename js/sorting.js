'use strict';

(function () {
  const sortAgeBtn = document.querySelector(`.sorting__link--age`);
  const sortAgeSvg = document.querySelector(`.sorting__svg--age`);
  const sortPriceBtn = document.querySelector(`.sorting__link--price`);
  const sortPriceSvg = document.querySelector(`.sorting__svg--price`);
  
  window.sorting = {
    deleteElements: function () {
      const cats = document.querySelectorAll(`.cat`);
      for (let i = 0; i < cats.length; i++) {
        cats[i].remove();
      }
    },

    getValueInArray: function (elements, array) {
      for (let i = 0; i < elements.length; i++) {
        let val = elements[i].textContent.replace(/\s/g, '');
        
        array.push(Number(val));
      }
    },
  
    getAgesArray: function () {
      const ages = document.querySelectorAll(`.description__age--value`);
      const agesArr = [];
  
      window.sorting.getValueInArray(ages, agesArr);
  
      return agesArr;
    },
  
    getPricesArray: function () {
      const prices = document.querySelectorAll(`.cat__price--value`);
      const pricesArr = [];
  
      window.sorting.getValueInArray(prices, pricesArr);
  
      return pricesArr;
    },

    getSmallToLargArr: function (arr, dataAttribute) {
      const catsSortedArr = arr.sort ((a, b) => a.getAttribute(dataAttribute) - b.getAttribute(dataAttribute));
      return catsSortedArr;
    },

    getLargToSmallArr: function (arr, dataAttribute) {
      const catsSortedArr = arr.sort ((a, b) => b.getAttribute(dataAttribute) - a.getAttribute(dataAttribute));
      return catsSortedArr;
    },

    getSortedList: function (dataAttribute, parametr, sortingType) {
      const cats = document.querySelectorAll(`.cat`);
      const catsList = document.querySelector(`.cats__list`);
  
      const fragment = document.createDocumentFragment();
      const catsArr = Array.from(cats);
  
      window.sorting.deleteElements();
      
      for (let i = 0; i < catsArr.length; i++) {
        catsArr[i].setAttribute(dataAttribute, parametr[i]);
      }
  
      sortingType(catsArr, dataAttribute);
  
      for (let i = 0; i < sortingType(catsArr, dataAttribute).length; i++) {
        fragment.appendChild(sortingType(catsArr, dataAttribute)[i]);
      }
      catsList.appendChild(fragment);
  
      return catsList;
    },

    sortHandler: function (svg, arr) {
      svg.classList.toggle(`toggle-sort`);
  
      if (svg.classList.contains(`toggle-sort`)) {
        window.sorting.getSortedList('data-age', arr, window.sorting.getSmallToLargArr);
      } else {
        window.sorting.getSortedList('data-age', arr, window.sorting.getLargToSmallArr);
      }
    }
  };

  sortAgeBtn.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.debounce(function () {
      window.sorting.sortHandler(sortAgeSvg, window.sorting.getAgesArray());
    });
  });

  sortPriceBtn.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.debounce(function () {
      window.sorting.sortHandler(sortPriceSvg, window.sorting.getPricesArray());
    });
  });
})();