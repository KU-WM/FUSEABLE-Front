import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddList({title}) {

  const navigate = useNavigate();

  const CreateNote = () => {
    sessionStorage.setItem("tempProgress", title);
    navigate('../addlistpage');
  }


  return (
    <React.Fragment>
      <button className="Add_btn" onClick={CreateNote}>+</button>
    </React.Fragment>
  )
}

export default AddList;