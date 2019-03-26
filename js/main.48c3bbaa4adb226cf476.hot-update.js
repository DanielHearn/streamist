webpackHotUpdate("main",{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/preset/presetListing/PresetListing.vue?vue&type=template&id=0d9e0cd2&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/preset/presetListing/PresetListing.vue?vue&type=template&id=0d9e0cd2& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"list-item\",\n    { staticClass: \"preset-listing\" },\n    [\n      _c(\"template\", { slot: \"header\" }, [\n        _c(\"div\", { staticClass: \"column\" }, [\n          _c(\"input\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model\",\n                value: _vm.presetName,\n                expression: \"presetName\"\n              }\n            ],\n            attrs: { contenteditable: \"true\", type: \"text\" },\n            domProps: { value: _vm.presetName },\n            on: {\n              input: function($event) {\n                if ($event.target.composing) {\n                  return\n                }\n                _vm.presetName = $event.target.value\n              }\n            }\n          })\n        ]),\n        _vm._v(\" \"),\n        _c(\n          \"div\",\n          { staticClass: \"column\" },\n          [\n            _c(\n              \"standard-button\",\n              {\n                attrs: {\n                  buttonClasses: \"button--accent\",\n                  disabled: !_vm.orderedStreams.length\n                },\n                nativeOn: {\n                  click: function($event) {\n                    return _vm.loadPreset($event)\n                  }\n                }\n              },\n              [_vm._v(\"Watch\")]\n            )\n          ],\n          1\n        )\n      ]),\n      _vm._v(\" \"),\n      _c(\"template\", { slot: \"content\" }, [\n        _c(\n          \"div\",\n          { staticClass: \"input-container space-between\" },\n          [\n            !_vm.editMode\n              ? _c(\"icon-button\", {\n                  staticClass: \"button--secondary\",\n                  attrs: {\n                    iconName: _vm.$options.icons.edit,\n                    title: \"Edit Preset\"\n                  },\n                  nativeOn: {\n                    click: function($event) {\n                      return _vm.toggleEditMode($event)\n                    }\n                  }\n                })\n              : _c(\"icon-button\", {\n                  staticClass: \"button--secondary active\",\n                  attrs: {\n                    iconName: _vm.$options.icons.close,\n                    title: \"Close Preset Editing\"\n                  },\n                  nativeOn: {\n                    click: function($event) {\n                      return _vm.toggleEditMode($event)\n                    }\n                  }\n                }),\n            _vm._v(\" \"),\n            _c(\"icon-button\", {\n              staticClass: \"button--tertiary\",\n              attrs: {\n                iconName: _vm.$options.icons.remove,\n                hasWarningColor: true,\n                title: \"Delete Preset\"\n              },\n              nativeOn: {\n                click: function($event) {\n                  return _vm.deletePreset($event)\n                }\n              }\n            })\n          ],\n          1\n        ),\n        _vm._v(\" \"),\n        !_vm.orderedStreams.length\n          ? _c(\n              \"div\",\n              { staticStyle: { margin: \"0.25em\", \"margin-top\": \"0.5em\" } },\n              [\n                _c(\"p\", { staticClass: \"text-warning\" }, [\n                  _vm._v(\"Edit preset to add streams\")\n                ])\n              ]\n            )\n          : _vm._e(),\n        _vm._v(\" \"),\n        _vm.editMode\n          ? _c(\n              \"div\",\n              { staticClass: \"preset-listing-edit\" },\n              [\n                _c(\n                  \"p\",\n                  {\n                    staticClass: \"text-sub-heading\",\n                    staticStyle: { \"margin-bottom\": \"0.25em\" }\n                  },\n                  [_vm._v(\"Streams\")]\n                ),\n                _vm._v(\" \"),\n                _c(\"input-form\", {\n                  attrs: { placeholder: \"Channel Name\" },\n                  on: { submit: _vm.newPresetStream }\n                }),\n                _vm._v(\" \"),\n                _c(\n                  \"list\",\n                  [\n                    _vm.orderedStreams.length\n                      ? _c(\n                          \"draggable\",\n                          {\n                            attrs: {\n                              options: {\n                                ghostClass: \"ghost\",\n                                removeCloneOnHide: true\n                              }\n                            },\n                            on: {\n                              start: function($event) {\n                                _vm.drag = true\n                              },\n                              end: function($event) {\n                                _vm.drag = false\n                              }\n                            },\n                            model: {\n                              value: _vm.orderedStreams,\n                              callback: function($$v) {\n                                _vm.orderedStreams = $$v\n                              },\n                              expression: \"orderedStreams\"\n                            }\n                          },\n                          _vm._l(_vm.orderedStreams, function(stream, index) {\n                            return _c(\"list-item\", {\n                              key: index,\n                              staticClass: \"preset-listing-item\",\n                              class: { \"drag--active\": _vm.drag },\n                              attrs: {\n                                itemName: stream,\n                                actionName: _vm.$options.icons.remove,\n                                actionNameIsIcon: true,\n                                actionClass: \"button--tertiary button--warning\",\n                                handleActive: true\n                              },\n                              on: {\n                                click: function($event) {\n                                  _vm.deleteStreamFromPreset(index)\n                                }\n                              }\n                            })\n                          }),\n                          1\n                        )\n                      : _c(\"p\", [_vm._v(\"No streams in preset\")])\n                  ],\n                  1\n                )\n              ],\n              1\n            )\n          : _vm._e()\n      ])\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/js/components/preset/presetListing/PresetListing.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

})