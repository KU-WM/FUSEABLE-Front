import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './AddList.css'


function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
  
  const projectId = Number(window.localStorage.getItem("selectedProjectId"))
  console.log("ProjectedId : ", projectId);

  const getId = () => {
    let id = KanbanList.length > 0 ? KanbanList.length : 0;
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
        `/${projectId}/main`,
        {
          id: getId() - 1,
          title: '',
          content: '',
          deadline: '',
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
      <button className="Add_btn" onClick={addItem}>Add</button>
    </>
  )
}

export default AddList;