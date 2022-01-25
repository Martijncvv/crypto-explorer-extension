/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchCoinsList": () => (/* binding */ fetchCoinsList),
/* harmony export */   "fetchCoinInfo": () => (/* binding */ fetchCoinInfo)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list';
function fetchCoinsList() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(COINGECKO_COINS_LIST_API);
        const data = yield res.json();
        return data;
    });
}
function fetchCoinInfo(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        const data = yield res.json();
        return data;
    });
}
// https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredCoins": () => (/* binding */ setStoredCoins),
/* harmony export */   "getStoredCoins": () => (/* binding */ getStoredCoins),
/* harmony export */   "setStoredCoinsInfo": () => (/* binding */ setStoredCoinsInfo),
/* harmony export */   "getStoredCoinsInfo": () => (/* binding */ getStoredCoinsInfo)
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
function setStoredCoinsInfo(coinsInfo) {
    const vals = {
        coinsInfo,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredCoinsInfo() {
    const keys = ['coinsInfo'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.coinsInfo) !== null && _a !== void 0 ? _a : []);
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
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");
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
window.addEventListener('mouseup', getSelection);
function getSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        let selectedTicker = window
            .getSelection()
            .toString()
            .trim()
            .replace(/[#$?!.,:]/g, '')
            .toLowerCase();
        if (selectedTicker === '') {
            return;
        }
        console.log('mouseup eventListener');
        const coinList = yield (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredCoins)();
        console.log('CoinList: ', coinList);
        const filteredCoins = yield coinList.filter((coin) => coin.symbol === selectedTicker);
        console.log('FilteredCoins: ', filteredCoins);
        console.log('selectedTicker: ', selectedTicker);
        let coinsInfo = [];
        yield Promise.all(filteredCoins.map((coin) => __awaiter(this, void 0, void 0, function* () {
            let coinInfo = yield (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.fetchCoinInfo)(coin.id);
            coinsInfo.push(coinInfo);
        })));
        yield console.log('coinsInfo1: ', coinsInfo);
        // await coinsInfo.sort((a, b) => {
        // 	if (a.coingecko_rank === 0 || a.coingecko_rank === null) {
        // 		a.coingecko_rank = 9999
        // 	}
        // 	if (b.coingecko_rank === 0 || b.coingecko_rank === null) {
        // 		b.coingecko_rank = 9999
        // 	}
        // 	return a.coingecko_rank - b.coingecko_rank
        // })
        // await console.log('coinsInfo2: ', coinsInfo)
        yield (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCoinsInfo)(coinsInfo);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map