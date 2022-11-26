import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './AddList.css'


function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
 
  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId")
  
  const projectId = Number(window.localStorage.getItem("selectedProjectId"))
  console.log("ProjectedId : ", projectId);

  const getId = () => {
    let id = KanbanList.length > 0 ? KanbanList[KanbanList.length - 1].id : 0;
    return id;
  }

  const addItem = async() => {
    setKanbanList((oldKanbanList) => [
      ...oldKanbanList,
      {
        id: getId(),
        title: '',
        content: '',
        deadline: '',
        progress: title,
      },
    ]);

    try {
      const res = await axios
      .post(
        `http://localhost:8080/api/project/main/${userCode}/${selectedProjectId}`,
        {
          id: getId() - 1,
          progress: title,
        },
      )
      .then((response) => {
        console.log(response)
      })
    }
    catch(e) {
      console.log(e);
    }

  };


  return (
    <>
      <button className="Add_btn" onClick={addItem}>+</button>
    </>
  )
}

export default AddList;