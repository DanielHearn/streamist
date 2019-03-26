webpackHotUpdate("main",{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/streamFavorites/streamFavoritesControls/StreamFavoritesControls.vue?vue&type=template&id=7ae9dc17&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/streamFavorites/streamFavoritesControls/StreamFavoritesControls.vue?vue&type=template&id=7ae9dc17& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm.streamFavorites\n    ? _c(\"div\", { staticClass: \"stream-favorites\" }, [\n        _c(\n          \"div\",\n          { staticClass: \"menu-item-row\" },\n          [\n            !_vm.favoritesAvailable\n              ? _c(\"p\", { staticClass: \"text\" }, [\n                  _vm._v(\"No channels in your favorites.\")\n                ])\n              : _vm._e(),\n            _vm._v(\" \"),\n            _vm._l(_vm.streamFavorites, function(favorite) {\n              return _c(\n                \"list\",\n                { key: favorite.id },\n                [\n                  _c(\n                    \"list-item\",\n                    [\n                      _c(\"template\", { slot: \"header\" }, [\n                        _c(\"div\", { staticClass: \"column\" }, [\n                          _c(\"p\", [_vm._v(_vm._s(favorite.streamName))])\n                        ]),\n                        _vm._v(\" \"),\n                        _c(\n                          \"div\",\n                          { staticClass: \"column\" },\n                          [\n                            _c(\"icon-button\", {\n                              attrs: {\n                                iconName: _vm.$options.icons.favorited,\n                                buttonClasses: \"button--secondary\",\n                                title: \"Remove channel from favorites\"\n                              },\n                              nativeOn: {\n                                click: function($event) {\n                                  _vm.$emit(\n                                    \"unfavorite-channel\",\n                                    favorite.streamName\n                                  )\n                                }\n                              }\n                            }),\n                            _vm._v(\" \"),\n                            _c(\n                              \"standard-button\",\n                              {\n                                attrs: { buttonClasses: \"button--accent\" },\n                                nativeOn: {\n                                  click: function($event) {\n                                    _vm.loadSelectedFavorite(\n                                      favorite.streamName\n                                    )\n                                  }\n                                }\n                              },\n                              [_vm._v(\"Watch\")]\n                            )\n                          ],\n                          1\n                        )\n                      ])\n                    ],\n                    2\n                  )\n                ],\n                1\n              )\n            })\n          ],\n          2\n        ),\n        _vm._v(\" \"),\n        _c(\n          \"div\",\n          { staticClass: \"menu-item-row\" },\n          [\n            _c(\n              \"standard-button\",\n              {\n                attrs: {\n                  disabled: !_vm.favoritesAvailable,\n                  buttonClasses: \"button--secondary\"\n                },\n                nativeOn: {\n                  click: function($event) {\n                    _vm.$emit(\"clear-favorites\")\n                  }\n                }\n              },\n              [_vm._v(\"Clear Favorites\")]\n            )\n          ],\n          1\n        )\n      ])\n    : _vm._e()\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/js/components/streamFavorites/streamFavoritesControls/StreamFavoritesControls.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

})