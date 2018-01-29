/**
$(".menu-toggle").on('click', function() {
  $(this).toggleClass("on");
  $('.menu-section').toggleClass("on");
  $("nav ul").toggleClass('hidden');
  $('#wrapper').toggleClass('hidden');
});
*/
const app = (() => {
	let body;
	let menu;
	let menu_bar;
	let menuItems;
  let wrapper;

	const init = () => {
		body = document.querySelector('body');
		menu = document.querySelector('.menu-icon');
		menu_bar = document.querySelector('.menu-bar');;
		console.log("menu-bar: ", menu_bar);
		menuItems = document.querySelectorAll('.nav__list-item');
    //wrapper = document.querySelector('#wrapper');

		applyListeners();
	}

	const applyListeners = () => {
		menu.addEventListener('click', () => {
      toggleClass(body, 'nav-active');
			toggleClass(menu_bar, 'menu-active');
      //toggleClass(wrapper, 'hidden')
    });
	}

	const toggleClass = (element, stringClass) => {
    //console.log("element: ", element);
    if (!element.classList.contains(stringClass)) {
      element.classList.add(stringClass);
    }
		else
			element.classList.remove(stringClass);
	}

	init();
})();
