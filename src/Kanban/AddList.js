import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import '../css/Kanban/AddList.css'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


var countNew = 1;

function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, seleteDate] = useState(new Date());
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  var tempTitle = countNew == 1 ? "" :  window.localStorage.getItem("tempNewTitle")
  var tempContent = countNew == 1 ? "" :  window.localStorage.getItem("tempNewContent")

  countNew = 1;

  const getId = () => {
    let id = KanbanList.length > 0 ? (KanbanList.length - 1) : 0;
    return id;
  }

  const Add = () => {
    var textTitle = document.getElementById('inputNewTitle').value;
    var textContent = document.getElementById('inputNewContent').value;
    var textDeadline = document.getElementById('inputDeadline').value;

    addItem(textTitle, textContent, textDeadline);

    closeModal();
  }

  const setDate = (date) => {
    tempTitle = document.getElementById('inputNewTitle').value;
    tempContent = document.getElementById('inputNewContent').value;

    window.localStorage.setItem("tempNewTitle", tempTitle)
    window.localStorage.setItem("tempNewContent", tempContent)

    countNew++;
    seleteDate(date);
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
                    id="inputNewTitle"
                    className="Input_title"
                    type="text"
                    placeholder='Title'
                    defaultValue={tempTitle || ''}
                  />
                </li>
                <li>
                  <ReactDatePicker 
                    selected={selectedDate}
                    onChange={date => setDate(date)}
                    id="inputDeadline"
                    type="text"
                    className="Input_deadline"
                  />
                </li>
                <li>
                  <input type="file" id="FileUpload" onChange={fileUpload} multiple>
                  </input>
                </li>
                <li>
                  <textarea
                    id="inputNewContent"
                    className="Input_content"
                    type="text"
                    placeholder='Content'
                    defaultValue={tempContent || ''}
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

  const fileUpload = () => {
    const uploadFiles = document.getElementById("FileUpload").files
    for(var i = 0; i < (uploadFiles).length; i++) {
      console.log(uploadFiles[i]);
    }

    setImgFile(uploadFiles);
    setImgBase64([]);

    for(let i = 0; i < uploadFiles.length; i++) {
      if (uploadFiles[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(uploadFiles[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          // console.log("Base64 : ", base64);

          if(base64) {
            let base64Sub = base64.toString();
            setImgBase64(imgBase64 => [...imgBase64, [uploadFiles[i].name ,base64Sub]]);
          }
        }
      }
    }
  }

  const addItem = async(textTitle, textContent, textDeadline) => {
    setKanbanList((oldKanbanList) => [
      ...oldKanbanList,
      {
        id: getId(),
        progress: title,
        title: textTitle,
        content: textContent,
        deadline: textDeadline,
        files: imgBase64,
      },
    ]);


    const deadline = (textDeadline.slice(6,10) + "-" + textDeadline.slice(0,2) + "-" + textDeadline.slice(3,5))

    const data = {
      arrayId: (getId() - 1),
      step: title,
      title: textTitle,
      content: textContent,
      endAt: deadline,
      files: imgBase64,
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
  };


  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
      <button className="Add_btn" onClick={openModal}>+</button>
    </React.Fragment>
  )
}

export default AddList;