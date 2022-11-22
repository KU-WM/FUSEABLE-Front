import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './AddList.css'


function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);

  const getId = () => {
    let id = KanbanList.length > 0 ? KanbanList.length : 0;
    return id;
  }

  const addItem = () => {
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
  };


  return (
    <>
      <button className="Add_btn" onClick={addItem}>Add</button>
    </>
  )
}

export default AddList;