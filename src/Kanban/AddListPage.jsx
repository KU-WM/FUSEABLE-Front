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
import { useRecoilState } from 'recoil';
import ReactDatePicker from "react-datepicker";


var countNew = 1;

function AddListPage () {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const [modalOpen, setModalOpen] = useState(false);
  const [crewsOpen, setcrewsOpen] = useState(false);
  const [userInproject, setUserInProject] = useRecoilState(userInProjectState);
  const [selectedDate, seleteDate] = useState(new Date());
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  
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
    let id = KanbanList.length > 0 ? (KanbanList.length - 1) : 0;
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

  const Add = () => {
    var textTitle = document.getElementById('inputNewTitle').value;
    var textContent = document.getElementById('inputNewContent').value;
    var textDeadline = document.getElementById('inputDeadline').value;

    addItem(textTitle, textContent, textDeadline);
  }

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
            setImgBase64((imgBase64) => [
              ...imgBase64, 
              {
                fileName: uploadFiles[i].name, 
                fileUrl: base64Sub,
              },
            ]);
          }

        }
      }
    }

  }

  const addItem = async(textTitle, textContent, textDeadline) => {
    console.log("Base64 : ", imgBase64);

    const formData = new FormData();

    const deadline = (textDeadline.slice(6,10) + "-" + textDeadline.slice(0,2) + "-" + textDeadline.slice(3,5))

    // formData.append("arrayId", (getId() - 1));
    // formData.append("step", title);
    // formData.append("title", textTitle);
    // formData.append("content", textContent);
    // formData.append("endAt", deadline);

    for(let i = 0; i < imgBase64.length; i++) {
      formData.append("files", imgBase64[i])
    }
    setKanbanList((oldKanbanList) => [
      ...oldKanbanList,
      {
        id: getId(),
        progress: title,
        title: textTitle,
        content: textContent,
        deadline: textDeadline,
        files: formData,
      },
    ]);

    try {
      const res = await axios
      .post(
        `http://localhost:8080/api/project/main/${userCode}/${selectedProjectId}`,
        {
          arrayId: getId(),
          step: title,
          title: textTitle,
          content: textContent,
          endAt: textDeadline,
          file: formData,
        },
      )
      .then((response) => {
        console.log(response)
      })
    }
    catch(e) {
      console.log(e);
    }
  };

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
    return (
      <div className='note'>
        <div className='note-content'>
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
                  <form 
                      name='file'
                      encType='multipart/form-data'
                      onSubmit={Add}
                      >
                    <input type="file" id="FileUpload" onChange={fileUpload} multiple>
                    </input>
                  </form>
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
        </div>
        <div className='note-comment'>
          
        </div>  
      </div>
    )
  }

  const goToKanban = () => {
    console.log("SwitchCode : ", switchCode);
    sessionStorage.setItem("switchCode", 0);
    navigate('/main')
  }

  const goToNotice = () => {
    console.log("SwitchCode : ", switchCode);
    sessionStorage.setItem("switchCode", 1);
    navigate('/main')
  }

  const goToCalendar = () => {
    console.log("SwitchCode : ", switchCode);
    sessionStorage.setItem("switchCode", 2);
    navigate('/main')
  }

  const goToMyDocument = () => {
    console.log("SwitchCode : ", switchCode);
    sessionStorage.setItem("switchCode", 3);
    navigate('/main')
  }

  return (
    <React.Fragment>
      <div className='container'>
        <div className='Temp'>
          <div className='Main-header'>
            <div className='logo'>
              <img src={Logo} alt="Logo" className='logo' onClick={goToKanban}/>
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


export default AddListPage;