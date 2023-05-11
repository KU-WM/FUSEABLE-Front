import React from 'react';
import '../css/Start.scss';
import { projectListState } from '../recoil';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Logo from '../images/Logo.png';
import EditProjectList from './EditProjectList';


function Start () {
  
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [modalOpen, setModalOpen] = useState(false);

  window.localStorage.setItem("switchCode", 0);
  // console.log("START PAGE");
  const getId = () => {
    let id = projectList.length > 0 ? projectList[projectList.length - 1].id + 1 : 1;
    return id;
  }

  const addItem = async() => {
    var title = document.getElementById('InputProjectName').value;

    if (title)
    setProjectList((oldProjectList) => [
      ...oldProjectList,
      {
        id: getId(),
        title: title,
      },
    ]);

    closeModal();
    const userCode = window.localStorage.getItem("userCode");

    console.log("title", title);

    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/api/project/create/${userCode}`,
        data: 
          {
            title,
            title,
          },
      })
      .then((response) => {
        console.log("response", response)
        console.log("response data title", response.data.title);
        window.location.reload();
      })
    }
    catch(e) {
      console.log(e);
    }

    // console.log("REDIRECT START PAGE");
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
                  <input
                    id='InputProjectName'
                    className="Input_ProjectName"
                    placeholder='Project Name'
                  />
                  <input type='button'
                    className="Add"
                    defaultValue='등록'
                    onClick={addItem}
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
    )
  }

  useEffect(() => {(async() => {
    {
      try {
      const userCode = Number(window.localStorage.getItem("userCode"));
      const res = await axios
      .get(
        `http://localhost:8080/api/project/${userCode}`
      )
      .then((response) => 
      {
        console.log("Response : ", response.data.projects);
        setProjectList(clearData(projectList));
        if (response.data.projects) 
        {(response.data.projects).map((data) => {
        return setProjectList((oldprojectList) => [
          ...oldprojectList,
          {
            id: data.projectId,
            title: (data.title[0] == '{') ? data.title.slice(10,data.title.length - 2) : data.title,
            bookmarkState: data.bookmark,
          },
        ])
      })
      }
      })
    }
    catch (e) {
      console.error(e);
    }
  }
    })();
  },[])

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const dataHandler = () => {
    const bookmarkedProjects = projectList.filter((data) => data.bookmarkState === true);
    const unbookmarkedProjects = projectList.filter((data) => data.bookmarkState === false);
  
    return [
      ...bookmarkedProjects.map((item) => (
        <EditProjectList className='textLink' key={item.id} item={item}></EditProjectList>
      )),
      ...unbookmarkedProjects.map((item) => (
        <EditProjectList className='textLink' key={item.id} item={item}></EditProjectList>
      )),
    ];
  };

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const kakaoNickname = window.localStorage.getItem("kakaoNickname");
  const kakaoProfileImg = window.localStorage.getItem("kakaoProfileImg");

  // console.log("kakaoProfileImg : ", kakaoProfileImg);
  // console.log("Logo : ", Logo);


  return (
    <React.Fragment>
      <div className='container'>
        <div className='Start-header'>
          <div className='logo'>
            <img src={Logo} alt="logo" />
          </div>
          <img className='kakaoProfileImg' src={kakaoProfileImg.slice(1,kakaoProfileImg.length - 1)} alt="kakaoProfileImg" ></img>
        </div>
        <div className='Start-mainbody'>
          <div className='userNickname'>
            <strong>{kakaoNickname.slice(1,kakaoNickname.length - 1)}</strong>
            <span> 유저님 환영합니다</span>
          </div>
          <button className="btn btn-primary Start-addBtn" onClick={openModal}>프로젝트 생성</button>
        </div>
        <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>  
        <div className='Start-projectList'>
          {dataHandler()}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Start;