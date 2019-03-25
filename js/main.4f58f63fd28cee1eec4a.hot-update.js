webpackHotUpdate("main",{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/chat/chatItem/ChatItem.vue?vue&type=template&id=8be53338&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/chat/chatItem/ChatItem.vue?vue&type=template&id=8be53338& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"stream-chat\" }, [\n    _c(\n      \"select\",\n      {\n        directives: [\n          {\n            name: \"model\",\n            rawName: \"v-model\",\n            value: _vm.newChatName,\n            expression: \"newChatName\"\n          }\n        ],\n        on: {\n          change: [\n            function($event) {\n              var $$selectedVal = Array.prototype.filter\n                .call($event.target.options, function(o) {\n                  return o.selected\n                })\n                .map(function(o) {\n                  var val = \"_value\" in o ? o._value : o.value\n                  return val\n                })\n              _vm.newChatName = $event.target.multiple\n                ? $$selectedVal\n                : $$selectedVal[0]\n            },\n            _vm.loadChat\n          ]\n        }\n      },\n      [\n        _c(\"option\", [_vm._v(_vm._s(_vm.newChatName))]),\n        _vm._v(\" \"),\n        _vm._l(_vm.filteredStreams, function(stream) {\n          return _c(\"option\", { key: stream.embedPlayerID }, [\n            _vm._v(_vm._s(stream.streamName))\n          ])\n        })\n      ],\n      2\n    ),\n    _vm._v(\" \"),\n    _c(\n      \"div\",\n      { staticClass: \"chat-controls\" },\n      [\n        _c(\"icon-button\", {\n          attrs: {\n            iconName: _vm.$options.icons.refresh,\n            title: \"Refresh Chat\"\n          },\n          nativeOn: {\n            click: function($event) {\n              return _vm.refresh($event)\n            }\n          }\n        }),\n        _vm._v(\" \"),\n        _vm.removeAvailable\n          ? _c(\"icon-button\", {\n              attrs: {\n                iconName: _vm.$options.icons.remove,\n                title: \"Remove Chat\"\n              },\n              nativeOn: {\n                click: function($event) {\n                  return _vm.remove($event)\n                }\n              }\n            })\n          : _vm._e()\n      ],\n      1\n    ),\n    _vm._v(\" \"),\n    _vm.chatVisible\n      ? _c(\"iframe\", {\n          attrs: { frameborder: \"0\", scrolling: \"no\", id: _vm.id, src: _vm.src }\n        })\n      : _vm._e()\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/js/components/chat/chatItem/ChatItem.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

})