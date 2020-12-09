"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Comments can be grouped.
 */
function CommentGroup(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content,
      minimal = props.minimal,
      size = props.size,
      threaded = props.threaded;
  var classes = (0, _classnames["default"])('ui', size, (0, _lib.useKeyOnly)(collapsed, 'collapsed'), (0, _lib.useKeyOnly)(minimal, 'minimal'), (0, _lib.useKeyOnly)(threaded, 'threaded'), 'comments', className);
  var rest = (0, _lib.getUnhandledProps)(CommentGroup, props);
  var ElementType = (0, _lib.getElementType)(CommentGroup, props);
  return /*#__PURE__*/_react["default"].createElement(ElementType, _extends({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

CommentGroup.handledProps = ["as", "children", "className", "collapsed", "content", "minimal", "size", "threaded"];
CommentGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: _propTypes["default"].elementType,

  /** Primary content. */
  children: _propTypes["default"].node,

  /** Additional classes. */
  className: _propTypes["default"].string,

  /** Comments can be collapsed, or hidden from view. */
  collapsed: _propTypes["default"].bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Comments can hide extra information unless a user shows intent to interact with a comment. */
  minimal: _propTypes["default"].bool,

  /** Comments can have different sizes. */
  size: _propTypes["default"].oneOf(_lodash["default"].without(_lib.SUI.SIZES, 'medium')),

  /** A comment list can be threaded to showing the relationship between conversations. */
  threaded: _propTypes["default"].bool
};
var _default = CommentGroup;
exports["default"] = _default;

//# sourceMappingURL=CommentGroup.js.map