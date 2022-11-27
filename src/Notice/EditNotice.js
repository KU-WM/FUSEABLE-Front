import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { noticeListState } from "../recoil";


function EditNotice ({item}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
  const index = noticeList.findIndex((listItem) => listItem === item);

  const navigate = useNavigate();

  const editItem = async() => {
    var textTitle = document.getElementById('InputNoticeTitle').value;
    var textContent = document.getElementById('InputNoticeContent').value;

    const newList = replaceItemAtIndex(noticeList, index, {
      ...item,
      title: textTitle,
      content: textContent,
    });

    setNoticeList(newList);

    try {
      const res = await axios
      .put(
        `http://localhost:8080/api/articles/${item.id}`,
        {
          title: textTitle,
          content: textContent,
        }
      )
      .then((response) => {
        console.log(response);
      })
    }
    catch(e) {
      console.log(e);
    }

    closeModal();

    navigate('/main/notice');
  };

  const deleteItem = async() =>{
    const newList = removeItemAtIndex(noticeList, index);

    setNoticeList(newList);

    try {
      const res = await axios
      .delete(
        `http://localhost:8080/api/articles/${item.id}`,
      )
      .then((response) => {
        console.log(response);
      })
    }
    catch(e) {
      console.log(e);
    }

    closeModal();
    
    navigate('/main/notice');
  };

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
                    id="InputNoticeTitle"
                    className="Input_title"
                    type="text"
                    defaultValue={item.title || ''}
                    placeholder='Title'
                  />
                </li>
                <li>
                  <input
                    id="InputNoticeContent"
                    className="Input_content"
                    type="text"
                    defaultValue={item.content || ''}
                    placeholder='Content'
                  />
                </li>
                <li>
                  <input type='button'
                    className="Edit"
                    defaultValue='수정'
                    onClick={editItem}
                  />
                </li>
                <li>
                  <input type='button'
                    className="Edit"
                    defaultValue='삭제'
                    onClick={deleteItem}
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

  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
      <div> 
        {index + 1}
        {item.title}
      </div>
      <button className="Edit_btn" onClick={openModal}>수정</button>
      <button className="Delete_btn" onClick={deleteItem}>삭제</button>
      
    </React.Fragment>
  )
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default EditNotice;