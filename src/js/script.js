'use strict';

var Shuffle = window.Shuffle;

var Demo = function (element) {
  this.element = element;

  this.shuffle = new Shuffle(element, {
    itemSelector: '.picture-item',
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    speed: 300,
    sizer: element.querySelector('.my-sizer-element'),
    isCentered: false
  });

  // Log events.
  this.addShuffleEventListeners();

  this._activeFilters = [];

  this.addFilterButtons();

  this.mode = 'exclusive';
};

Demo.prototype.toggleMode = function () {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

/**
 * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
 * for them like you normally would (with jQuery for example).
 */
Demo.prototype.addShuffleEventListeners = function () {
  this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
    console.log('layout. data:', data);
  });

  this.shuffle.on(Shuffle.EventType.REMOVED, function (data) {
    console.log('removed. data:', data);
  });
};

Demo.prototype.addFilterButtons = function () {
  //var options = document.querySelector('.filter-options');
  var options = document.querySelector('.button-group')
  console.log("options: ", options);
  if (!options) {
    return;
  }

  var filterButtons = Array.from(options.children);
  //console.log('filterButtons:', filterButtons);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

Demo.prototype._handleFilterClick = function (evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-value');
  console.log("btn: ", btn);
  console.log("btnGroup: ", btnGroup);
  //console.log("isActive: ", isActive);

  // You don't need _both_ of these modes. This is only for the demo.

  // For this custom 'additive' mode in the demo, clicking on filter buttons
  // doesn't remove any other filters.
  if (this.mode === 'additive') {
    // If this button is already active, remove it from the list of filters.
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    btn.classList.toggle('active');

    // Filter elements
    this.shuffle.filter(this._activeFilters);

  // 'exclusive' mode lets only one filter button be active at a time.
  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup = Shuffle.ALL_ITEMS;
    if (isActive) {
      btn.classList.remove('active');
    } else {
      btn.classList.add('active');
      if (btnGroup !== `all`) {
        filterGroup = JSON.parse(btnGroup);
      }
      //filterGroup = btnGroup
    }
    console.log("filterGroup: ", filterGroup);
    console.log("typeof ", typeof(filterGroup));
    this.shuffle.filter(filterGroup);
    //this.shuffle.filter(Shuffle.ALL_ITEMS)
  }
};

Demo.prototype._removeActiveClassFromChildren = function (parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }
};


document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('.my-shuffle-container'));
  window.demo.shuffle.layout();
  //window.demo.shuffle.update();
});
