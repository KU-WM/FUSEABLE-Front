import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { noticeListState } from "../recoil";
import EditNotice from "./EditNotice";


function NoticeList () {
  const [modalOpen, setModalOpen] = useState(false);
  const noticeListSet = useRecoilValue(noticeListState);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
  const userCode = window.localStorage.getItem("userCode");
  const [selectedDate, seleteDate] = useState(new Date());

  const navigate = useNavigate()

  const getId = () => {
    let id = noticeList.length > 0 ? noticeList[noticeList.length - 1].id + 1 : 1;
    return id;
  }

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/articles`
      )
      .then((response) => 
      {
        setNoticeList(clearData(noticeList));
        (response.data).map((data) => {
          return setNoticeList((oldNoticeList) => [
            ...oldNoticeList,
            {
              id: data.id,
              title: data.title,
              content: data.content,
            },
          ])
        })
        // console.log("Response: ", response.data.note);
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const addItem = async() => {
    var title = document.getElementById('InputNoticeTitle').value;
    var content = document.getElementById('InputNoticeContent').value;

    console.log("INPUT : ", title, content);
    setNoticeList((oldNoticeList) => [
      ...oldNoticeList,
      {
        id: getId(),
        title: title,
        content: content,
        bookmark: false,
      },
    ]);
    closeModal();

    console.log("NOTICE : ", noticeListSet);
    
    navigate('/main/notice');

    try {
      const res = await axios
      .post(
        `http://localhost:8080/api/articles/${userCode}`,
        {
          title: title,
          content: content,
        }
      )
      .then((response) => {
        console.log(response);
      })
    }
    catch(e) {
      console.log(e);
    }

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
                    placeholder='Title'
                  />
                </li>
                <li>
                  <ReactDatePicker 
                    selected={selectedDate}
                    id="editDeadline"
                    type="text"
                    className="Input_deadline"
                  />
                </li>
                <li>
                  <input
                    id="InputNoticeContent"
                    className="Input_content"
                    type="text"
                    placeholder='Content'
                  />
                </li>
                <li>
                  <input type='button'
                    className="Edit"
                    defaultValue='등록'
                    onClick={addItem}
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

  const dataHandler = () => {
    return noticeListSet
    .map((item) => <EditNotice key={item.id} item={item}></EditNotice> );
  }

  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
      <button className="ADD_btn" onClick={openModal}>등록</button>
      {dataHandler()}
    </React.Fragment>
  )
}

export default NoticeList;