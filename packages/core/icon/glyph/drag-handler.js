"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DragHandlerIcon = function DragHandlerIcon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"10\" cy=\"8\" r=\"1\"/><circle cx=\"14\" cy=\"8\" r=\"1\"/><circle cx=\"10\" cy=\"16\" r=\"1\"/><circle cx=\"14\" cy=\"16\" r=\"1\"/><circle cx=\"10\" cy=\"12\" r=\"1\"/><circle cx=\"14\" cy=\"12\" r=\"1\"/></g></svg>"
  }, props));
};

DragHandlerIcon.displayName = 'DragHandlerIcon';
var _default = DragHandlerIcon;
exports.default = _default;