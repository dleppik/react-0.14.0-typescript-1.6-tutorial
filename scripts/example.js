///<reference path="../types/react/react.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var initialData = [
    { id: "1", author: "Bob Smith", text: "Hello!" },
    { id: "2", author: "Frank Lynn", text: "Greetings!" }
];
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox(props, context) {
        _super.call(this, props, context);
        this.state = { data: initialData };
    }
    CommentBox.prototype.addComment = function (comment) {
        var comments = this.state.data;
        comment.id = "" + (1 + comments.length);
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
    };
    CommentBox.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", {"className": "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList, {"data": this.state.data}), React.createElement(CommentForm, {"onCommentSubmit": function (comment) { return _this.addComment(comment); }})));
    };
    return CommentBox;
})(React.Component);
var CommentForm = (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm() {
        _super.apply(this, arguments);
    }
    /** Clear an HTML input value and return its contents. */
    CommentForm.prototype.clearRefValue = function (name) {
        var input = this.refs[name];
        var result = input.value.trim();
        input.value = '';
        return result;
    };
    CommentForm.prototype.handleCommentSubmit = function (e) {
        e.preventDefault();
        var author = this.clearRefValue("author");
        var text = this.clearRefValue("text");
        this.props.onCommentSubmit({ author: author, text: text });
    };
    CommentForm.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", {"className": "commentForm", "onSubmit": function (e) { _this.handleCommentSubmit(e); }}, React.createElement("input", {"type": "text", "placeholder": "Your name", "ref": "author"}), React.createElement("input", {"type": "text", "placeholder": "Say something...", "ref": "text"}), React.createElement("input", {"type": "submit", "value": "Post"})));
    };
    return CommentForm;
})(React.Component);
var VlComment = (function (_super) {
    __extends(VlComment, _super);
    function VlComment() {
        _super.apply(this, arguments);
    }
    VlComment.prototype.render = function () {
        return (React.createElement("div", {"className": "comment"}, React.createElement("h2", {"className": "commentAuthor"}, this.props.author), this.props.children));
    };
    return VlComment;
})(React.Component);
var CommentList = (function (_super) {
    __extends(CommentList, _super);
    function CommentList() {
        _super.apply(this, arguments);
    }
    CommentList.prototype.render = function () {
        var p = this.props;
        var commentNodes = p.data.map(function (comment) {
            return (React.createElement(VlComment, {"key": comment.id, "author": comment.author}, comment.text));
        });
        return (React.createElement("div", {"className": "commentList"}, commentNodes));
    };
    return CommentList;
})(React.Component);
React.render(React.createElement(CommentBox, null), document.getElementById('content'));
