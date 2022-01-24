/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredCoins": () => (/* binding */ setStoredCoins),
/* harmony export */   "getStoredCoins": () => (/* binding */ getStoredCoins),
/* harmony export */   "setStoredTicker": () => (/* binding */ setStoredTicker),
/* harmony export */   "getStoredTicker": () => (/* binding */ getStoredTicker)
/* harmony export */ });
function setStoredCoins(coins) {
    const vals = {
        coins,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredCoins() {
    const keys = ['coins'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.coins) !== null && _a !== void 0 ? _a : []);
        });
    });
}
function setStoredTicker(ticker) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ ticker: ticker }, function () {
            console.log('Value is set to ' + ticker);
            resolve();
        });
    });
}
function getStoredTicker() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['ticker'], function (result) {
            var _a;
            console.log('Value currently is ' + result.ticker);
            resolve((_a = result.ticker) !== null && _a !== void 0 ? _a : '');
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");

console.log('CONTENTSCRIPT is running');
window.addEventListener('mouseup', getSelection);
function getSelection() {
    let selectedTicker = window
        .getSelection()
        .toString()
        .trim()
        .toLowerCase();
    console.log('mouseup eventListener');
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredCoins)().then((coinList) => {
        if (coinList.some((coin) => coin.symbol === selectedTicker)) {
            (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredTicker)(selectedTicker);
            console.log(`${selectedTicker} FOUND`);
        }
        else {
            console.log(`${selectedTicker} NA`);
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map