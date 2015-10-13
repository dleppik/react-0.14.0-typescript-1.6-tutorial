# react-0.14.0-typescript-1.6-tutorial
Modified React 0.14.0 tutorial working with TypeScript 1.6.2

This is a quick and dirty rewrite of parts of the [React Tutorial](http://facebook.github.io/react/docs/tutorial.html) that works with TypeScript 1.6. I've only implemented the client-side portions, and a few minor things have been renamed. This is intended as a sample when working through the tutorial, rather than a replacement for the tutorial.

This is my first encounter with React, so I make no claims that I've found the best implementation, only that it works for me. Many of the issues I encountered are likely to go away within a matter of months.

The interesting file is `scripts/example.tsx`, which compiles to `scripts/example.js`.

Notable issues when doing the tutorial in TypeScript
----

1.  WebStorm 11 EAP (my IDE) and/or TypeScript doesn't know that React has split out ReactDOM, so ReactDOM is not used. This results in deprecation warnings.
2.  React has two styles for creating components, `React.createClass` and subclassing Component. The tutorial does the former, TypeScript needs the latter.
3.  Because of scope issues with `this`, you can't call object methods directly from JSX, e.g.: `<CommentForm onCommentSubmit={addComment} />`, you need to wrap methods in a closure, i.e.: `<CommentForm onCommentSubmit={(comment) => this.addComment(comment)} />`
