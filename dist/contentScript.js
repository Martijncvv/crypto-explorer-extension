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
/* harmony export */   "setStoredCoinList": () => (/* binding */ setStoredCoinList),
/* harmony export */   "getStoredCoinList": () => (/* binding */ getStoredCoinList),
/* harmony export */   "setStoredCoins": () => (/* binding */ setStoredCoins),
/* harmony export */   "getStoredCoins": () => (/* binding */ getStoredCoins)
/* harmony export */ });
function setStoredCoinList(coins) {
    const vals = {
        coins,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredCoinList() {
    const keys = ['coins'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.coins) !== null && _a !== void 0 ? _a : []);
        });
    });
}
function setStoredCoins(coinIds) {
    const vals = {
        coinIds,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredCoins() {
    const keys = ['coinIds'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.coinIds) !== null && _a !== void 0 ? _a : []);
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

console.log('CONTENTSCRIPT is running');
document.addEventListener('selectionchange', getSelection);
function getSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        let selectedTicker = window
            .getSelection()
            .toString()
            .trim()
            .replace(/[#$?!.,:"']/g, '')
            .toLowerCase();
        if (selectedTicker !== '' && selectedTicker.length < 7) {
            console.log(`Potential ticker selected: ${selectedTicker}`);
            const coinList = yield (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredCoinList)();
            const filteredCoinTickers = coinList.filter((coin) => coin.symbol === selectedTicker);
            let coinIds = [];
            filteredCoinTickers.forEach((coin) => {
                coinIds.push({
                    id: coin.id,
                    symbol: coin.symbol,
                    name: coin.name,
                });
            });
            (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCoins)(coinIds);
        }
    });
}
// window.addEventListener('load', main)
// function main() {
// 	let followedBy = document.body.textContent.search('Followed by ')
// 	// let followedBy = window.find('Followed by ')
// 	let followers = document.body.textContent.search('Followers')
// 	// let followers = window.find('Followers')
// 	let following = document.body.textContent.search('Following')
// 	// let following = window.find('Following')
// 	console.log('followedBy', followedBy)
// 	console.log('followers', followers)
// 	console.log('following', following)
// let followedByelement = document.getElementsByClassName(
// 	'css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0'
// )
// console.log("followedByelement", followedByelement)
// let followedByelement = document.getElementsByTagName('div')
// for (let element of followedByelement) {
// 	console.log('element.textContent', element.textContent)
// 	if (element.textContent.includes("Followed by ") {
// 		element.style['background-color'] = '#FF00FF'
// 	}
// 	else (
// 		element.style['background-color'] = '#FFFF00'
// 	)
// }
// let elements = document.querySelectorAll('div')
// for (let element of elements) {
// 	let copy = element
// 	while (copy.firstChild) {
// 		copy.removeChild(copy.lastChild)
// 	}
// 	if (copy.textContent.includes('Followed by ')) {
// 		console.log('element', copy)
// 	}
// 	// console.log('', element)
// }
// }
// let followedByelement = document.getElementsByClassName(
// 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41 r-1cwl3u0 r-19u6a5r r-bcqeeo r-qvutc0'
// )
// let elements = document.querySelectorAll('div')
// // let elements = document.getElementsByTagName('a')
// // let paragraphs = document.querySelectorAll('div.css-901oao')
// // let paragraphs = document.getElementsByTagName('div')
// // let paragraphs = document.getElementsByClassName(
// // 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41'
// // )
// // let elements = document.body.innerHTML
// // let elements = document.getElementsByClassName(
// // 	'css-901oao r-14j79pv r-1wbh5a2 r-37j5jr r-n6v787 r-16dba41 r-1cwl3u0 r-19u6a5r r-bcqeeo r-qvutc0'
// // )
// for (let element of elements) {
// 	console.log(element)
// 	if (element.innerHTML === 'Followed by ') {
// 		element.style['background-color'] = '#FF00FF'
// 	}
// }
// document.body.innerHTML = document.body.innerHTML.replace(
// 	new RegExp('Followed by ', 'g'),
// 	'nobody'
// )

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map