(()=>{"use strict";console.log("BACKGROUND script is running"),function(){return n=this,o=void 0,c=function*(){const n=yield fetch("https://api.coingecko.com/api/v3/coins/list");return yield n.json()},new((t=void 0)||(t=Promise))((function(i,e){function s(n){try{a(c.next(n))}catch(n){e(n)}}function r(n){try{a(c.throw(n))}catch(n){e(n)}}function a(n){var o;n.done?i(n.value):(o=n.value,o instanceof t?o:new t((function(n){n(o)}))).then(s,r)}a((c=c.apply(n,o||[])).next())}));var n,o,t,c}().then((n=>{!function(n){const o={coins:n};new Promise((n=>{chrome.storage.local.set(o,(()=>{n()}))}))}(n),console.log("Coins fetched")})),function(n){const o={coinIds:[{id:"bitcoin",symbol:"btc",name:"bitcoin"}]};new Promise((n=>{chrome.storage.local.set(o,(()=>{n()}))}))}()})();