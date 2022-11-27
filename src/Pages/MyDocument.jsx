import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MyDocument.css';
import Logo from '../images/Logo.png';
import { useEffect } from 'react';
import axios from 'axios';
import { myDocumentState } from '../recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';


function MyDocument () {
  const mydocument = useRecoilValue(myDocumentState)
  const [mydocumentSet, setmydocumentSet] = useRecoilState(myDocumentState);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, seleteDate] = useState(new Date());
  
  const selectedProjectTitle = window.localStorage.getItem("selectedProjectTitle");
  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  const Modal = (props) => {
    const { open, close, header, item } = props;
  
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
                  <div
                    className="Input_title"
                    placeholder='Title'
                  >
                    {item.title}
                  </div>
                </li>
                <li>
                  <div
                    className="Input_content"
                    type="text"
                    placeholder='Content'
                  >
                    {item.content}
                  </div>
                </li>
                <li>
                  <div 
                    type="text"
                    className="Input_deadline"
                  >
                    {item.deadline}
                  </div>
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

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/project/main/mynote/${userCode}/${selectedProjectId}`
      )
      .then((response) => 
      {
        setmydocumentSet(clearData(mydocumentSet));
        (response.data.note).map((data) => {
          return setmydocumentSet((oldMydocument) => [
            ...oldMydocument,
            {
              id: data.arrayId,
              title: data.title,
              content: data.content,
              deadline: (data.endAt.slice(5, 7) + "/" + data.endAt.slice(8, 10) + "/" + data.endAt.slice(0, 4)),
              progress: data.step,
            },
          ])
        })
        console.log("Response: ", response.data.note);
        console.log("Data : ", mydocument);
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

  const dataHandler = (progress) => {
    return mydocument
    .map((item) => 
    <React.Fragment key={item.id}>
      <Modal open={modalOpen} close={closeModal} header="My Document" item={item}></Modal> 
      <span className='myDocumentList'>{item.id}. </span>
      <span className='myDocumentList' onClick={openModal} >
        {item.title}
      </span>
    </React.Fragment>);
  }

  return (
    <header>
      <div className='header'>
        <div className='logo'>
          <Link className='textLink' to="/main">
            <img src={Logo} alt="Logo" className='logo'/>
          </Link>
        </div>
        <div className='sidebar'>
          BTN
          <div className='sidebtn'>
    
          </div>
        </div>
      </div>
      <div className='mainbody'>
        <div className='interface'>
          <div className='create-project'>
            Create Project
          </div>
          <div className='notice'>
            <Link className='textLink' to="/main/notice">공지사항</Link>
          </div>
          <div className='calendar'>
            <Link className='textLink' to="/main/calendar">일정</Link>
          </div>
          <div className='mydocument'>
           <Link className='textLink' to="/main/mydocument">내가 작성한 문서</Link>
          </div>
          <div className='myproject'>
            <Link className='textLink' to="/start">진행중인 프로젝트</Link>
          </div>
          <div className='notice-banner'>
            공지사항 배너
          </div>
        </div>
        <div className='main'>
          <div className='projectname'>
            <Link className='textLink' to="/main">{selectedProjectTitle}</Link>
          </div>
          <div className="myDocument">
            <div>Document List</div>
            <span>순서</span><span className='myDocumentTitle'>제목</span>
            {dataHandler()}    
          </div>
        </div>
      </div>
    </header>
  )
}


export default MyDocument;