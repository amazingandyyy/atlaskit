"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EditorAddonIcon = function EditorAddonIcon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M8.691 14.932c-.184.546-.336.797-.719 1.011-.851.478-1.54.299-2.033-.532-.498-.837-.31-1.52.547-2 .388-.218.673-.217 1.251-.1.078.017.139.029.19.038l-1.434-2.414a.333.333 0 0 1 .123-.461L8.64 9.339a.333.333 0 0 1 .49.222c.023.113.065.22.127.325.439.737 1.006.885 1.769.457.757-.425.906-.962.47-1.694a1.075 1.075 0 0 0-.226-.271.333.333 0 0 1 .054-.544l2.023-1.135a.333.333 0 0 1 .45.12l1.447 2.437c.019-.05.04-.11.066-.187.184-.546.336-.797.719-1.012.851-.477 1.54-.298 2.033.533.498.837.31 1.52-.547 2-.26.146-.521.193-.816.169a3.345 3.345 0 0 1-.435-.07 7.373 7.373 0 0 0-.19-.037l1.434 2.413c.095.16.04.369-.124.46l-2.11 1.184a.333.333 0 0 1-.496-.28 1.03 1.03 0 0 0-.15-.51c-.438-.738-1.005-.886-1.768-.458-.758.425-.906.963-.471 1.694.1.168.225.29.384.386a.333.333 0 0 1-.009.576l-2.11 1.184a.333.333 0 0 1-.449-.12l-1.447-2.436c-.019.05-.04.11-.066.187z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg>"
  }, props));
};

EditorAddonIcon.displayName = 'EditorAddonIcon';
var _default = EditorAddonIcon;
exports.default = _default;