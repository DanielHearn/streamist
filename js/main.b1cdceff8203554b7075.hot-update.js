webpackHotUpdate("main",{

/***/ "./node_modules/babel-loader/lib/index.js!./src/js/components/list/listItem/listItem.js?vue&type=script&lang=js&":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./src/js/components/list/listItem/listItem.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Components_inputs_buttons_standardButton_StandardButton_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Components/inputs/buttons/standardButton/StandardButton.vue */ \"./src/js/components/inputs/buttons/standardButton/StandardButton.vue\");\n/* harmony import */ var Components_inputs_buttons_iconButton_IconButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Components/inputs/buttons/iconButton/IconButton.vue */ \"./src/js/components/inputs/buttons/iconButton/IconButton.vue\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'list-item',\n  components: {\n    StandardButton: Components_inputs_buttons_standardButton_StandardButton_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    IconButton: Components_inputs_buttons_iconButton_IconButton_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  props: {\n    handleActive: {\n      type: Boolean,\n      default: false,\n      required: false\n    }\n  },\n  data: function data() {\n    return {\n      title: this.itemName\n    };\n  },\n  watch: {\n    title: function title() {\n      this.$emit('test', this.title);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/js/components/list/listItem/listItem.js?./node_modules/babel-loader/lib");

/***/ })

})