"use strict";var app=function(){var e=void 0,o=void 0,n=void 0,c=void 0,t=function(){o.addEventListener("click",function(){console.log("clicked!"),i(e,"nav-active"),console.log("hello!!"),i(n,"menu-active"),console.log("menu-bar: ",n)})},i=function(e,o){e.classList.contains(o)?e.classList.remove(o):e.classList.add(o)};!function(){e=document.querySelector("body"),o=document.querySelector(".menu-icon"),n=document.querySelector(".menu-bar"),console.log("menu-bar: ",n),c=document.querySelectorAll(".nav__list-item"),t()}()}();
//# sourceMappingURL=dsds.js.map
