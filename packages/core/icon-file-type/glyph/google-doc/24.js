"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var GoogleDoc24Icon = function GoogleDoc24Icon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path fill=\"#2196F3\" fill-rule=\"evenodd\" d=\"M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm12.049 5l-5.422.055 4.677 8.15 5.422-.055L15.049 5zM4 14.108l2.757 4.697 4.677-8.15-2.757-4.697L4 14.108zm6.646.141L7.982 19h9.354L20 14.249h-9.354z\"/></svg>"
  }, props, {
    size: "medium"
  }));
};

GoogleDoc24Icon.displayName = 'GoogleDoc24Icon';
var _default = GoogleDoc24Icon;
exports.default = _default;