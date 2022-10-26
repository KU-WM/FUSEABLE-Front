import React from "react";
import { useState } from "react";
import { useRef } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

const App = () => {
  const [inputs, setInputs] = useState({
    title:'',
    date:'',
    content:''
  });
  const {title, date, content} = inputs;
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  };

  const [posts, setPost] = useState([
    {
      id:1,
      title:"Hello",
      date:"10/07",
      content:"JS WORLD"
    }
  ]);

  const listId = useRef(2);
  const createList = () => {
    const post = {
      id: listId.current,
      title,
      date,
      content
    };
    setPost(posts.concat(post));

    setInputs({
      title:'',
      date:'',
      content:''
    });
    listId.current += 1;
  }

  return (
    <>
      <PostList posts={posts} />
      <CreatePost 
        title={title} 
        date={date} 
        content={content} 
        onChange={onChange}
        createList={createList}
      />
      
    </>
  );
}

export default App;