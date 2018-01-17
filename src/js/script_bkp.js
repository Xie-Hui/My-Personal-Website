'use strict';

var Shuffle = window.Shuffle;

var Demo = function (element) {
  this.categories = Array.from(document.querySelectorAll('.button-group button'));

  this.shuffle = new Shuffle(element, {
    itemSelector: '.picture-item',
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.my-sizer-element',
    speed: 500
  });

  this.filters = {
    categories: [],
  };

  this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
 */
Demo.prototype._bindEventListeners = function () {
  this._onCategoryChange = this._handleCategoryChange.bind(this);

  this.categories.forEach(function (input) {
    input.addEventListener('click', this._onCategoryChange);
  }, this);

};


/**
 * Get the values of each `active` button.
 *df @return {Array.<string>}
 */
Demo.prototype._getCurrentCategoryFilters = function () {
  return this.categories.filter(function (button) {
    return button.classList.contains('active');
  }).map(function (button) {
    return button.getAttribute('data-value');
  });
};

/**
 * A color button was clicked. Update filters and display.
 *e @param {Event} evt Click event object.
 */
Demo.prototype._handleCategoryChange = function (evt) {
  var button = evt.currentTarget;

  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.categories.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  }

  this.filters.categories = this._getCurrentCategoryFilters();
  this.filter();
};

/**
 * Filter shuffle based on the current state of filters.
 */

Demo.prototype.filter = function () {
  //console.log("this");
  //console.log("shuffleAll: ", Shuffle.ALL_ITEMS);
  //console.log(typeof Shuffle.ALL_ITEMS);
  //this.shuffle.filter(['city', 'nature'])
  //this.filter(Shuffle.ALL_ITEMS);
  var filterGroup
  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
    //this.shuffle.filter(['city', 'nature'])
    //var category = document.querySelector('.my-shuffle-container').getAttribute('data-groups')
    //console.log("category: ", this.shuffle.filter(Shuffle.ALL_ITEMS));
    //this.shuffle.filter(category)
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }

};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * s@return {boolean}
 */
Demo.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * s@param {Element} element Element to test.
 * s@return {boolean} Whether it satisfies all current filters.
 */
Demo.prototype.itemPassesFilters = function (element) {
  var categories = this.filters.categories;
  var category = element.getAttribute('data-groups');

  // If there are active color filters and this color is not in that array.
  console.log("categories: ", categories);
  console.log("category: ", category);
  if (categories.length > 0 && !categories.includes(category)) {
    return false;
  }

  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('.my-shuffle-container'));
});
