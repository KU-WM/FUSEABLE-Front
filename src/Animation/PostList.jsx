import React from "react";

const Post = ({post}) => {
    return (
        <div>
            <b>{post.title}</b>
            <div>{post.date}</div>
            <div>{post.content}</div>
        </div>
    );
}

const PostList = ({posts}) => {
    return (
      <div>
        {posts.map(post => (
          <Post post={post} key={post.id}/>
        ))}
      </div>
    );
}

export default PostList;