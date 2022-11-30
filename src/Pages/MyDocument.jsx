import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MyDocument.css';
import Logo from '../images/Logo.png';
import { useEffect } from 'react';
import axios from 'axios';
import { myDocumentState, userInProjectState } from '../recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import NoticeBanner from '../Notice/NoticeBanner';
import MyDocumentList from './MyDocumentList';


function MyDocument () {
  const mydocument = useRecoilValue(myDocumentState)
  const [mydocumentSet, setmydocumentSet] = useRecoilState(myDocumentState);
  const [selectedDate, seleteDate] = useState(new Date());
  const [crewsOpen, setcrewsOpen] = useState(false);
  const [userInproject, setUserInProject] = useRecoilState(userInProjectState);
  
  const selectedProjectTitle = window.localStorage.getItem("selectedProjectTitle");
  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");



  const [SideBarOpen, setSideBarOpen] = useState(false);

  const Crews = (props) => {
    const { open, close } = props;

    const userDataHandler = () => {
      return userInproject
      .map((user) => <div className='UserInProject' key={user.userId}>{user.userName} <img className='UserInProjectProfileImg' src={user.userPicture} alt="User Image" ></img> </div>)
    }
  
    return (
      <div className={open ? 'openedCrew' : 'crew'}>
        {open ? (
          <section>
            <div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              {userDataHandler()}
            </main>
            <footer>
              
            </footer>
          </section>
        ) : null}
      </div>
    )
  }

  const openCrews = () => {
    setcrewsOpen(true);
  };

  const closeCrews = () => {
    setcrewsOpen(false);
  };

  const SideBar = (props) => {
    const { open, close } = props;
  
    return (
      <div className={open ? 'openedModal' : 'modal'}>
        {open ? (
          <section>
            <div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              <ul>
                <li>
                  인원 초대
                </li>
                <li>
                  기능 추가 대기 2
                </li>
                <li>
                  기능 추가 대기 3
                </li>
                <li>
                  기능 추가 대기 4
                </li>
              </ul>
            </main>
            <footer>
              
            </footer>
            <a href={process.env.REACT_APP_LogoutURL} id="logout-btn">Logout</a>
          </section>
        ) : null}
      </div>
    )
  }

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
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
    var sequence = 1;
    return mydocument
    .map((item) => <MyDocumentList key={sequence} order={sequence++} item={item} ></MyDocumentList> )
  }

  return (
    <React.Fragment>
    <header>
      <div className='header'>
        <div className='logo'>
          <Link className='textLink' to="/main">
            <img src={Logo} alt="Logo" className='logo'/>
          </Link>
        </div>
        <div className='crewmate'>
          <button className='showCrawmate' onClick={openCrews}>참여 인원</button>
        </div>
        <Crews open={crewsOpen} close={closeCrews} header="참여 인원"></Crews>
        <div className='sidebarBtn'>
          <button className='sidebar' onClick={openSideBar}>
            Side
          </button>
          <SideBar open={SideBarOpen} close={closeSideBar} header="Modal heading"></SideBar>
        </div>
      </div>
      <div className='mainbody'>
        <div className='interface'>
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
            <NoticeBanner className='NoticeBanner' />
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
    </React.Fragment>
  )
}


export default MyDocument;