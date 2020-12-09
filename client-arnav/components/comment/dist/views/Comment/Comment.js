"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _CommentAction = _interopRequireDefault(require("./CommentAction"));

var _CommentActions = _interopRequireDefault(require("./CommentActions"));

var _CommentAuthor = _interopRequireDefault(require("./CommentAuthor"));

var _CommentAvatar = _interopRequireDefault(require("./CommentAvatar"));

var _CommentContent = _interopRequireDefault(require("./CommentContent"));

var _CommentGroup = _interopRequireDefault(require("./CommentGroup"));

var _CommentMetadata = _interopRequireDefault(require("./CommentMetadata"));

var _CommentText = _interopRequireDefault(require("./CommentText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * A comment displays user feedback to site content.
 */
function Comment(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content;
  var classes = (0, _classnames["default"])((0, _lib.useKeyOnly)(collapsed, 'collapsed'), 'comment', className);
  var rest = (0, _lib.getUnhandledProps)(Comment, props);
  var ElementType = (0, _lib.getElementType)(Comment, props);
  return /*#__PURE__*/_react["default"].createElement(ElementType, _extends({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Comment.handledProps = ["as", "children", "className", "collapsed", "content"];
Comment.propTypes = {
  /** An element type to render as (string or function). */
  as: _propTypes["default"].elementType,

  /** Primary content. */
  children: _propTypes["default"].node,

  /** Additional classes. */
  className: _propTypes["default"].string,

  /** Comment can be collapsed, or hidden from view. */
  collapsed: _propTypes["default"].bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
};
Comment.Author = _CommentAuthor["default"];
Comment.Action = _CommentAction["default"];
Comment.Actions = _CommentActions["default"];
Comment.Avatar = _CommentAvatar["default"];
Comment.Content = _CommentContent["default"];
Comment.Group = _CommentGroup["default"];
Comment.Metadata = _CommentMetadata["default"];
Comment.Text = _CommentText["default"];
var _default = Comment;
exports["default"] = _default;

//# sourceMappingURL=Comment.js.map