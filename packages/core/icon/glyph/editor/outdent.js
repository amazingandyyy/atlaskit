"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EditorOutdentIcon = function EditorOutdentIcon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M9 9V7l-3 3 3 3v-2h2.51a.49.49 0 0 0 .49-.505v-.99A.495.495 0 0 0 11.51 9H9zm4-1.495c0-.279.228-.505.491-.505h5.018a.49.49 0 0 1 .491.505v.99a.503.503 0 0 1-.491.505h-5.018A.49.49 0 0 1 13 8.495v-.99zm0 4c0-.279.228-.505.491-.505h5.018a.49.49 0 0 1 .491.505v.99a.503.503 0 0 1-.491.505h-5.018a.49.49 0 0 1-.491-.505v-.99zm-6 4c0-.279.229-.505.5-.505h11c.276 0 .5.214.5.505v.99a.506.506 0 0 1-.5.505h-11a.495.495 0 0 1-.5-.505v-.99z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg>"
  }, props));
};

EditorOutdentIcon.displayName = 'EditorOutdentIcon';
var _default = EditorOutdentIcon;
exports.default = _default;