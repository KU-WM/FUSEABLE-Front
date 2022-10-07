import React from "react";
import '../css/Posttest.css';


const CreatePost = ({user, title, file, date, content, onChange, createList}) => {
    return (
        <div className="Post">
            <input 
                name="title"
                placeholder="제목"
                onChange={onChange}
                value={title} 
            />
            <input 
                name="date"
                placeholder="마감 기간"
                onChange={onChange}
                value={date} 
            />
            <input 
                name="content"
                placeholder="내용"
                onChange={onChange}
                value={content} 
            />
            <button onClick={createList}>등록</button>
        </div>
    );
}

export default CreatePost;