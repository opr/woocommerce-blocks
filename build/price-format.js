this.wc=this.wc||{},this.wc.priceFormat=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=163)}({163:function(e,r,t){"use strict";t.r(r),t.d(r,"getCurrencyFromPriceResponse",(function(){return y})),t.d(r,"getCurrency",(function(){return b})),t.d(r,"formatPrice",(function(){return d}));var n=t(2),o=t.n(n),i=t(6),u=t.n(i),c=t(7);function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach((function(r){o()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var p,a,l={code:c.CURRENCY.code,symbol:c.CURRENCY.symbol,thousandSeparator:c.CURRENCY.thousandSeparator,decimalSeparator:c.CURRENCY.decimalSeparator,minorUnit:c.CURRENCY.precision,prefix:(p=c.CURRENCY.symbol,a=c.CURRENCY.symbolPosition,{left:p,left_space:" "+p,right:"",right_space:""}[a]||""),suffix:function(e,r){return{left:"",left_space:"",right:e,right_space:" "+e}[r]||""}(c.CURRENCY.symbol,c.CURRENCY.symbolPosition)},y=function(e){if(!e||"object"!==u()(e))return l;var r=e.currency_code,t=e.currency_symbol,n=e.currency_thousand_separator,o=e.currency_decimal_separator,i=e.currency_minor_unit,c=e.currency_prefix,f=e.currency_suffix;return{code:r||"USD",symbol:t||"$",thousandSeparator:"string"==typeof n?n:",",decimalSeparator:"string"==typeof o?o:".",minorUnit:Number.isFinite(i)?i:2,prefix:"string"==typeof c?c:"$",suffix:"string"==typeof f?f:""}},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s(s({},l),e)},d=function(e,r){if(""===e||void 0===e)return"";var t="number"==typeof e?e:parseInt(e,10);if(!Number.isFinite(t))return"";var n=b(r),o=t/Math.pow(10,n.minorUnit),i=n.prefix+o+n.suffix,u=document.createElement("textarea");return u.innerHTML=i,u.value}},2:function(e,r){e.exports=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e},e.exports.default=e.exports,e.exports.__esModule=!0},6:function(e,r){function t(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=t=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),t(r)}e.exports=t,e.exports.default=e.exports,e.exports.__esModule=!0},7:function(e,r){!function(){e.exports=this.wc.wcSettings}()}});