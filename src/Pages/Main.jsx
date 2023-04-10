import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Logo from '../images/Logo.png';
import Kanban from '../Kanban/Kanban';
import NoticeBanner from '../Notice/NoticeBanner';
import "../css/SideBar.css"
import { useEffect } from 'react';
import axios from 'axios';
import { userInProjectState } from '../recoil';
import { useRecoilState } from 'recoil';
import MyCalendar from './CalendarTest';
import NoticeList from '../Notice/NoticeList';
import MyDocument from './MyDocument'


function Main () {
  const [modalOpen, setModalOpen] = useState(false);
  const [crewsOpen, setcrewsOpen] = useState(false);
  const [userInproject, setUserInProject] = useRecoilState(userInProjectState);
  
  const selectedProjectTitle = window.localStorage.getItem("selectedProjectTitle");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  var switchCode = window.localStorage.getItem("switchCode") ? window.localStorage.getItem("switchCode") : 0;

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/project/${selectedProjectId}/crews`
      )
      .then((response) => 
      {
        setUserInProject(clearData(userInproject));
        (response.data.crews).map((data) => {
          return setUserInProject((oldUserInproject) => [
            ...oldUserInproject,
            {
              userId: data.userId,
              userName: data.userName,
              userPicture: data.userPicture,
            },
          ])
        })
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  console.log("Crews : ", userInproject);

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const Modal = (props) => {
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const datahandler = () => {
    if(switchCode == 0) {
      console.log("Kanban Loading");
      return (
        <Kanban />
      )
    }
    else if(switchCode == 1) {
      console.log("Switchcode1 Loading");
      return (
        <NoticeList />
      )
    }
    else if(switchCode == 2) {
      console.log("Switchcode2 Loading");
      return (
        <MyCalendar className="calendar"></MyCalendar>
      )
    }
    else if(switchCode == 3) {
      console.log("Switchcode3 Loading");
      return (
        <MyDocument />
      )
    }
    else {
      console.log("Loading Error from Main Select!\n\n");
    }
  }

  const switchToKanban = () => {
    console.log("SwitchCode : ", switchCode);
    window.localStorage.setItem("switchCode", 0);
    window.location.reload();
  }

  const switchToNotice = () => {
    console.log("SwitchCode : ", switchCode);
    window.localStorage.setItem("switchCode", 1);
    window.location.reload();
  }

  const switchToCalendar = () => {
    console.log("SwitchCode : ", switchCode);
    window.localStorage.setItem("switchCode", 2);
    window.location.reload();
  }

  const switchToMyDocument = () => {
    console.log("SwitchCode : ", switchCode);
    window.localStorage.setItem("switchCode", 3);
    window.location.reload();
  }



  return (
    <React.Fragment>
      <div className='container'>
        <div className='Temp'>
          <div className='Main-header'>
            <div className='logo'>
              <img src={Logo} alt="Logo" className='logo' onClick={switchToKanban}/>
            </div>
            <div className='crewmate'>
              <button className='btn btn-primary showCrawmate' onClick={openCrews}>참여 인원</button>
            </div>
            <Crews open={crewsOpen} close={closeCrews} header="참여 인원"></Crews>
            <div className='sidebarBtn'>
              <button className='btn btn-primary sidebar' onClick={openModal}>
                Side
              </button>
              <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
            </div>
          </div>
          <div className='Main-mainbody'>
            <div className='Main-interface'>
              <div className='Main-notice' onClick={switchToNotice}>
                공지사항
              </div>
              <div className='Main-calendar' onClick={switchToCalendar}>
                일정
                {/* <Link className='textLink' to="/main/calendar">일정</Link> */}
              </div>
              <div className='Main-mydocument' onClick={switchToMyDocument}>
                내가 작성한 문서
              </div>
              <div className='Main-myproject'>
                <Link className='textLink' to="/start">진행중인 프로젝트</Link>
              </div>
              <div className='Main-notice-banner'>
                <NoticeBanner className='NoticeBanner' />
              </div>
            </div>
            <div className={switchCode == 3 ? 'Main-Mydocument' : 'Main-main'}>
              <div className='Main-projectname' onClick={switchToKanban}>
                {selectedProjectTitle}
              </div>
              <div className="Main-progress">
                {datahandler()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}


export default Main;