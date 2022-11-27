import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './AddList.css'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, seleteDate] = useState(new Date());

  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  const navigate = useNavigate();

  const getId = () => {
    let id = KanbanList.length > 0 ? KanbanList[KanbanList.length - 1].id + 1 : 0;
    return id;
  }

  const Add = () => {
    var textTitle = document.getElementById('inputTitle').value;
    var textContent = document.getElementById('inputContent').value;
    var textDeadline = document.getElementById('inputDeadline').value;

    addItem(textTitle, textContent, textDeadline);

    closeModal();
  }

  const Modal = (props) => {
    const { open, close, header } = props;
  
    return (
      <div className={open ? 'openedModal' : 'modal'}>
        {open ? (
          <section>
            <div>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </div>
            <main>
              {props.children}
              <ul>
                <li>
                  <input
                    id="inputTitle"
                    className="Input_title"
                    type="text"
                    placeholder='Title'
                  />
                </li>
                <li>
                  <input
                    id="inputContent"
                    className="Input_content"
                    type="text"
                    placeholder='Content'
                  />
                </li>
                <li>
                  <ReactDatePicker 
                    selected={selectedDate}
                    onChange={date => seleteDate(date)}
                    id="inputDeadline"
                    type="text"
                    className="Input_deadline"
                  />
                </li>
                <li>
                  <input type='button'
                    className="Add"
                    defaultValue='생성'
                    onClick={Add}
                  />
                </li>
              </ul>
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addItem = async(textTitle, textContent, textDeadline) => {
    setKanbanList((oldKanbanList) => [
      ...oldKanbanList,
      {
        id: getId(),
        progress: title,
        title: textTitle,
        content: textContent,
        deadline: textDeadline,
      },
    ]);


    const deadline = (textDeadline.slice(6,10) + "-" + textDeadline.slice(0,2) + "-" + textDeadline.slice(3,5))

    const data = {
      arrayId: (getId() - 1),
      step: title,
      title: textTitle,
      content: textContent,
      endAt: deadline,
    };

    console.log("data : ", data);

    try {
      const res = await axios
      .post(
        `http://localhost:8080/api/project/main/${userCode}/${selectedProjectId}`,
        data,
      )
      .then((response) => {
        console.log(response)
      })
    }
    catch(e) {
      console.log(e);
    }

    navigate("/main");

  };


  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
      <button className="Add_btn" onClick={openModal}>+</button>
    </React.Fragment>
  )
}

export default AddList;