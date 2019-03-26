webpackHotUpdate("main",{

/***/ "./node_modules/babel-loader/lib/index.js!./src/js/components/layout/layoutDemo/layoutDemo.js?vue&type=script&lang=js&":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./src/js/components/layout/layoutDemo/layoutDemo.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Components_list_listItem_ListItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Components/list/listItem/ListItem.vue */ \"./src/js/components/list/listItem/ListItem.vue\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'layout-demo',\n  components: {\n    ListItem: Components_list_listItem_ListItem_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    StandardButton: StandardButton\n  },\n  props: {\n    streams: {\n      type: Array,\n      required: true\n    },\n    layout: {\n      type: Object,\n      required: true\n    }\n  },\n  computed: {\n    layoutClass: function layoutClass() {\n      return \"layout-demo--layout-\".concat(this.layout.id);\n    },\n    streamLengthClass: function streamLengthClass() {\n      return \"streams--\".concat(this.streams.length);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/js/components/layout/layoutDemo/layoutDemo.js?./node_modules/babel-loader/lib");

/***/ })

})