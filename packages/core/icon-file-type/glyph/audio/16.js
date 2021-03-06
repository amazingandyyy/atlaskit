"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Audio16Icon = function Audio16Icon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" focusable=\"false\" role=\"presentation\"><path fill=\"#FF5630\" fill-rule=\"evenodd\" d=\"M2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm11 4.195v-.753c0-.271-.23-.468-.514-.44l-6.115.634a.565.565 0 0 0-.514.545v4.616a2 2 0 0 0-.571-.083H5a2 2 0 0 0-2 2V11a2 2 0 0 0 2 2h.286a2 2 0 0 0 2-2V5.76l4.285-.444v2.767A2 2 0 0 0 11 8h-.286a2 2 0 0 0-2 2v.286a2 2 0 0 0 2 2H11a2 2 0 0 0 2-2V4.195z\"/></svg>"
  }, props, {
    size: "small"
  }));
};

Audio16Icon.displayName = 'Audio16Icon';
var _default = Audio16Icon;
exports.default = _default;