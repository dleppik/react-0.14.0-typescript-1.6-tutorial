///<reference path="../types/react/react.d.ts"/>

interface CommentItem {  // "Comment" already defined in lib.es6.d.ts
    id? : string;
    author: string;
    text: string;
}

interface SimpleProps extends React.DOMAttributesBase<any> {
    data?: CommentItem[];
    onCommentSubmit?: Function;
}

interface SimpleState {
    data? : CommentItem[];
}

var initialData = [
    {id: "1", author: "Bob Smith", text: "Hello!"},
    {id: "2", author: "Frank Lynn", text: "Greetings!"}
];


class CommentBox extends React.Component<SimpleProps,SimpleState> {
    constructor(props?: SimpleProps, context?: any) {
        super(props, context);
        this.state = {data: initialData};
    }

    addComment(comment : CommentItem) {
        let comments = this.state.data;
        comment.id = ""+(1+comments.length);
        let newComments = comments.concat([comment]);
        this.setState({data: newComments});
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={(comment) => this.addComment(comment)} />
            </div>
        );
    }
}

class CommentForm extends React.Component<SimpleProps,SimpleState> {

    /** Clear an HTML input value and return its contents. */
    private clearRefValue(name : string) : string {
        let input = (this.refs[name] as any) as HTMLInputElement;
        let result = input.value.trim();
        input.value = '';
        return result;
    }

    handleCommentSubmit(e : React.SyntheticEvent) {
        e.preventDefault();
        let author = this.clearRefValue("author");
        let text   = this.clearRefValue("text");
        this.props.onCommentSubmit({author: author, text: text});
    }

    render() {
        return (
            <form className="commentForm" onSubmit={(e) => {this.handleCommentSubmit(e)} }>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
}

interface CommentProps extends SimpleProps {
    author: string;
    text?: string;
}

class VlComment extends React.Component<CommentProps,SimpleState> {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
}


class CommentList extends React.Component<SimpleProps,SimpleState> {
    render() {
        var p = this.props;
        var commentNodes = p.data.map(function(comment) {
            return (
                <VlComment key={comment.id} author={comment.author}>{comment.text}</VlComment>
            ) as any;
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>);
    }
}



React.render(
    <CommentBox />,
    document.getElementById('content')
);
