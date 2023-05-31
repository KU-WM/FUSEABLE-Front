import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Pages/Main.scss';
import Logo from '../images/Logo.png';
import { kanbanListState } from "../recoil";
import NoticeBanner from '../Notice/NoticeBanner';
import "../css/Pages/SideBar.css"
import { useEffect } from 'react';
import axios from 'axios';
import { userInProjectState } from '../recoil';
import { useRecoilState, useRecoilValue } from "recoil";
import { noticeListState } from "../recoil";
import ReactDatePicker from "react-datepicker";
import Copy from '../images/copy.png';
import OnAlarm from '../images/onAlarm.png';
import OffAlarm from '../images/offAlarm.png';
import '../css/Kanban/AddListPage.scss';
import '../css/Pages/NoticePage.scss';


var countNew = 1;

function AddNoticePage () {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const [modalOpen, setModalOpen] = useState(false);
  const [crewsOpen, setcrewsOpen] = useState(false);
  const [userInproject, setUserInProject] = useRecoilState(userInProjectState);
  const [selectedDate, seleteDate] = useState(new Date());
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [getInviteCode, setGetInviteCode] = useState(false);
  const [InviteCode, setInviteCode] = useState();
  const [alarmNote, setAlarmNote] = useState([]);
  const [openAlarm, setOpenAlarm] = useState(false);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
  const noticeListSet = useRecoilValue(noticeListState);
  
  
  const userCode = sessionStorage.getItem("userCode");
  const title = sessionStorage.getItem("tempProgress");
  console.log("Progress : ", title);
  const selectedProjectTitle = sessionStorage.getItem("selectedProjectTitle");
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  var tempTitle = countNew == 1 ? "" :  sessionStorage.getItem("tempNewTitle")
  var tempContent = countNew == 1 ? "" :  sessionStorage.getItem("tempNewContent")

  var switchCode = sessionStorage.getItem("switchCode") ? sessionStorage.getItem("switchCode") : 0;
  const navigate = useNavigate();

  countNew = 1;

  const getId = () => {
    console.log("GetId: ", KanbanList.slice(-1)[0]);
    let id = KanbanList.length > 0 ? KanbanList.slice(-1)[0].id : 1;
    return id;
  }
  
  const setDate = (date) => {
    tempTitle = document.getElementById('inputNewTitle').value;
    tempContent = document.getElementById('inputNewContent').value;

    sessionStorage.setItem("tempNewTitle", tempTitle)
    sessionStorage.setItem("tempNewContent", tempContent)

    countNew++;
    seleteDate(date);
  }

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

  const fileUpload = (e) => {

    const file = e.target.files;

    for(var i = 0; i < (file).length; i++) {
      console.log("test:", file[i]);
    }

    setImgFile(file)
  }

  const Alarm = (props) => {
    const { open, close } = props;
  
    return (
      <div className={open ? 'openAlarmBack' : 'closeAlarmBack'}>
        <div className={open ? 'openAlarm' : 'closeAlarm'}>
          {open ? (
            <section>
              <div className='modalHeader'>
                {props.header}
                <button className="close" onClick={close}>
                  close
                </button>      
              </div>
              <main>
                {alarmDataHandler()}
              </main>
              <footer>
        
              </footer>
            </section>
          ) : null}
        </div>
      </div>
    )
  }

  const alarmDataHandler = () => {
    console.log("Note: ", alarmNote);
    return alarmNote.map((data) => {
      return <div key={data.noteId} className='alarmTitle'>{data.endAt} || {data.title}</div>
    })
  }

  const addItem = async() => {
    var title = document.getElementById('addTitle').value;
    var content = document.getElementById('addContent').value;
    var deadline = document.getElementById('addDeadline').value;

    const startAt = (deadline.slice(6,10) + "-" + deadline.slice(0,2) + "-" + deadline.slice(3,5))

    console.log("INPUT : ", title, content);
    setNoticeList((oldNoticeList) => [
      ...oldNoticeList,
      {
        id: getId(),
        title: title,
        content: content,
        startAt: startAt,
        bookmark: true,
      },
    ]);
    closeModal();

    console.log("NOTICE : ", noticeListSet);

    try {
      const res = await axios
      .post(
        `http://localhost:8080/api/articles/${userCode}/${selectedProjectId}`,
        {
          title: title,
          content: content,
          startAt: startAt,
        }
      )
      .then((response) => {
        console.log("Add Notice", response);
      })

      navigate("/main");
      window.location.reload();
    }
    catch(e) {
      console.log("ERROR : ", e);
    }

    window.location.reload();
  };

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const GetInviteCode = (props) => {
    const { open, close, header } = props;
  
    return (
      <div className={open ? 'openGetInviteCodeBack' : 'closeGetInviteCode'}>
        <div className={open ? 'openGetInviteCode' : 'closeGetInviteCode'}>
          {open ? (
            <section>
              <div className='modalHeader'>
                {header}
              </div>
              <main>
                {props.children}
                <input
                  id='GetInviteCode'
                  className="Get_InviteCode"
                  value={InviteCode}
                  readOnly
                />
                <img src={Copy} 
                  alt="Copy" 
                  className='copy' 
                  onClick={copyData}
                  style={
                    {
                      "width" : "20px",
                      "height" : "20px"
                    }
                  }
                />
              </main>
              <footer>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>
            </section>
          ) : null}
        </div>
      </div>
    )
  }

  const Modal = (props) => {
    const { open, close } = props;
  
    return (
      <div className={open ? 'openedSideBar' : 'closedSideBar'}>
        {open ? (
          <section>
            <div className='modalHeader'>
              <div>부가기능</div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              <ul>
                <li>
                  <button className='btn btn-primary' onClick={goToScheduleAll}>Schedule</button>
                </li>
                <li>
                  <button className='btn btn-primary showCrawmate' onClick={openCrews}>참여 인원</button>
                </li>
                <li>
                  <button className="btn btn-primary Start-addBtn" onClick={openGetInviteCode}>초대 코드 발급</button>
                </li>
              </ul>
            </main>
            <footer>
              <button>
                <a href={process.env.REACT_APP_LogoutURL} id="logout-btn">Kakao Logout</a>
              </button>
              <button onClick={onLogout} id="Google-logout-btn">Google Logout</button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }

  const onLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  const openGetInviteCode = async() => {
    try {
      const res = await axios
      .get(
        `http://localhost:8080/api/project/invite/${userCode}/${selectedProjectId}`
      )
      .then((response) => {
          console.log("InviteCode: ", response);
          setInviteCode(response.data.inviteCode);
        }
      )
    }
    catch(e) {
      console.log(e);
    }

    closeModal();
    setGetInviteCode(true);
  };

  const closeGetInviteCode = () => {
    setGetInviteCode(false);
  };

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
            <div className='modalHeader'>
              <div>
                참여 인원
              </div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              {userDataHandler()}
            </main>
          </section>
        ) : null}
      </div>
    )
  }

  const copyData = () => {
    const inviteCodeToCopy = document.getElementById("GetInviteCode").value;
    console.log(inviteCodeToCopy);

    try {
      navigator.clipboard.writeText(inviteCodeToCopy);
      alert("복사되었습니다")
    }
    catch (e) {
      alert("복사 에러");
      console.log(e);
    }
  }

  const openCrews = () => {
    closeModal();
    setcrewsOpen(true);
  };

  const closeCrews = () => {
    setcrewsOpen(false);
  };

  const datahandler = () => {
    return (
      <section className='notice_page'>
        <ul>
          <li>
            <span>제목</span>
            <input
              id="addTitle"
              className="Input_title"
              type="text"
              defaultValue={tempTitle || ''}
              placeholder='Title'
            />
          </li>
          <li>
            <span>등록일자</span>
            <ReactDatePicker 
              selected={selectedDate}
              onChange={date => setDate(date)}
              id="addDeadline"
              type="text"
              className="Input_deadline"
              readOnly={true}
            />
          </li>
          <li>
            <span>내용</span>
            <textarea
              id="addContent"
              className="Input_content"
              type="text"
              defaultValue={tempContent || ''}
              placeholder='Content'
            />
          </li>
          <li className='button'>
            <input type='button'
              className="Add"
              defaultValue='등록'
              onClick={addItem}
            />
            <input type='button' defaultValue="close" className="close" onClick={goToNotice}>
            </input>
          </li>
        </ul>
      </section>
    )
  }

  const goToKanban = () => {
    sessionStorage.setItem("Main_switchCode", 0);
    navigate('/main')
  }

  const goToNotice = () => {
    sessionStorage.setItem("Main_switchCode", 1);
    navigate('/main')
  }

  const goToCalendar = () => {
    sessionStorage.setItem("Main_switchCode", 2);
    navigate('/main')
  }

  const goToMyDocument = () => {
    sessionStorage.setItem("Main_switchCode", 3);
    navigate('/main')
  }

  const goToScheduleAll = () => {
    sessionStorage.setItem("Main_switchCode", 4);
    navigate('/main')
  }
  
  const getOpenAlarm = () => {
    setOpenAlarm(true);
  }
  
  const getCloseAlarm = () => {
    setOpenAlarm(false);
  }

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/project/note/alarmNote/${selectedProjectId}`
      )
      .then((response) => 
      {
        console.log("AlarmNote: ", response.data);
        (response.data)
        .filter((data) => data.step !== "DONE")
        .map((data) => {
          return setAlarmNote((oldAlarmNote) => [
            ...oldAlarmNote,
            data
          ])
        })
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  return (
    <React.Fragment>
      <div className='pageSpace'>
        <div className='Temp'>
          <div className='Main-header'>
            <div className='logo'>
              <img src={Logo} alt="Logo" className='logo' onClick={goToKanban}/>
            </div>
            <img 
              src={alarmNote.length ? OnAlarm : OffAlarm} 
              style={{"width" : "20px", "height" : "20px"}}
              className='alarmNote'
              onClick={getOpenAlarm}
              ></img>
            <Alarm open={openAlarm} close={getCloseAlarm} header="마감 임박!"></Alarm>
            <Crews open={crewsOpen} close={closeCrews} header="참여 인원"></Crews>
            <div className='sidebarBtn'>
              <button className='btn btn-primary sidebar' onClick={openModal}>
                Side
              </button>
              <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>          
              <GetInviteCode open={getInviteCode} close={closeGetInviteCode} header="초대코드"></GetInviteCode>  
            </div>
          </div>
          <div className='Main-mainbody'>
            <div className='Main-interface'>
              <div className='Main-notice' onClick={goToNotice}>
                공지사항
              </div>
              <div className='Main-calendar' onClick={goToCalendar}>
                일정
              </div>
              <div className='Main-mydocument' onClick={goToMyDocument}>
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
              <div className='Main-projectname' onClick={goToKanban}>
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


export default AddNoticePage;