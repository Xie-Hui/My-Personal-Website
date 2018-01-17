"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Shuffle=window.Shuffle,Demo=function(e){this.element=e,this.shuffle=new Shuffle(e,{itemSelector:".picture-item",easing:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",speed:300,sizer:e.querySelector(".my-sizer-element")}),this.addShuffleEventListeners(),this._activeFilters=[],this.addFilterButtons(),this.mode="exclusive"};Demo.prototype.toggleMode=function(){"additive"===this.mode?this.mode="exclusive":this.mode="additive"},Demo.prototype.addShuffleEventListeners=function(){this.shuffle.on(Shuffle.EventType.LAYOUT,function(e){console.log("layout. data:",e)}),this.shuffle.on(Shuffle.EventType.REMOVED,function(e){console.log("removed. data:",e)})},Demo.prototype.addFilterButtons=function(){var e=document.querySelector(".button-group");if(console.log("options: ",e),e){var t=Array.from(e.children);console.log("filterButtons:",t),t.forEach(function(e){e.addEventListener("click",this._handleFilterClick.bind(this),!1)},this)}},Demo.prototype._handleFilterClick=function(e){var t=e.currentTarget,o=t.classList.contains("active"),i=t.getAttribute("data-value");if(console.log("btn: ",t),console.log("btnGroup: ",i),"additive"===this.mode)o?this._activeFilters.splice(this._activeFilters.indexOf(i)):this._activeFilters.push(i),t.classList.toggle("active"),this.shuffle.filter(this._activeFilters);else{this._removeActiveClassFromChildren(t.parentNode);var n=Shuffle.ALL_ITEMS;o?t.classList.remove("active"):(t.classList.add("active"),"all"!==i&&(n=JSON.parse(i))),console.log("filterGroup: ",n),console.log("typeof ",void 0===n?"undefined":_typeof(n)),this.shuffle.filter(n)}},Demo.prototype._removeActiveClassFromChildren=function(e){for(var t=e.children,o=t.length-1;o>=0;o--)t[o].classList.remove("active")},document.addEventListener("DOMContentLoaded",function(){window.demo=new Demo(document.querySelector(".my-shuffle-container"))});
//# sourceMappingURL=porjects.js.map
