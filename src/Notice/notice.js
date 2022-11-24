import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { noticeListState } from "../recoil";


function NoticeList () {
  const [modalOpen, setModalOpen] = useState(false);
  const [NoticeList, setNoticeList] = useRecoilState(noticeListState);

  const getId = () => {
    let id = NoticeList.length > 0 ? NoticeList.length : 0;
    return id;
  }

  const addItem = () => {
    var title = document.getElementById('InputNoticeTitle').value;
    var content = document.getElementById('InputNoticeContent').value;
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
  };

  // const editItem = (title, content, deadline) => {
  //   const newList = replaceItemAtIndex(kanbanList, index, {
  //     ...item,
  //     title: title,
  //     content: content,
  //     deadline: deadline,
  //   });

  //   setNoticeList(newList);
  // };

  // const deleteItem = () =>{
  //   const newList = removeItemAtIndex(kanbanList, index);

  //   setNoticeList(newList);
  // };

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
    return NoticeList
    .map((item) => <div className='textLink' key={item.id} >{item.title}<br />{item.content}</div> );
  }

  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
      <button className="Edit_btn" onClick={openModal}>수정</button>
      {dataHandler()}
    </React.Fragment>
  )
}

export default NoticeList;