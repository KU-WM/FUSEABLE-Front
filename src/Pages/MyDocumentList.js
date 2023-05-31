import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const MyDocumentList = ({order, item}) => {
  const navigate = useNavigate();

  const editNote = () => {
    sessionStorage.setItem("selectedNote", JSON.stringify(item))
    navigate('/main/editlistpage');
  }
  
  return (
    <React.Fragment key={item.id}>
      <div className='myDocumentList'>
        <div className='myDocumentListOrder'>{order}. </div>
        <div className='myDocumentListTitle' onClick={editNote} >
          {item.title}
        </div>
      </div>
    </React.Fragment>
  )
  
}

export default MyDocumentList;