(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["MyFile"],{

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! exports provided: c, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return b; });\n// export 只能导出一个接口\n// export let a = 1;\n// export let b = 2;\nlet a = 1;\nlet b = 2; // 一起导出a,b两个接口\n// as 语法可以重命名\n\nsetInterval(() => {\n  a++;\n}, 1000);\n // {a,b,default:hello}\n// export default 'hello'\n// export default => {b as default}\n\n//# sourceURL=webpack:///./src/a.js?");

/***/ })

}]);