import React from 'react';
import '../css/Start.css';
import { projectListState } from '../recoil';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Logo from '../images/Logo.png';
import EditProjectList from './EditProjectList';
import QueryString from 'qs';


function Start () {
  
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [modalOpen, setModalOpen] = useState(false);

  const getId = () => {
    let id = projectList.length > 0 ? projectList.length + 1 : 1;
    return id;
  }

  const addItem = async() => {
    var title = document.getElementById('InputProjectName').value;
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
          },
      })
      .then((response) => {
        console.log("response", response)
        console.log("response data title", response.data.title);
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
        if (projectList.length !== response.data.projects.length)
        {
          setProjectList(clearData(projectList));
          if (response.data.projects) 
          {(response.data.projects).map((data) => {
          return setProjectList((oldprojectList) => [
            ...oldprojectList,
            {
              id: data.projectId,
              title: (data.title[0] == '{') ? data.title.slice(10,data.title.length - 2) : data.title,
            },
          ])
        })}
        else {
          console.log("Null Array");
        }
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
    return projectList
    .map((item) => <EditProjectList className='textLink' key={item.id} item={item}></EditProjectList>);
  }

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const kakaoNickname = window.localStorage.getItem("kakaoNickname");
  const kakaoProfileImg = window.localStorage.getItem("kakaoProfileImg");

  // console.log("kakaoProfileImg : ", kakaoProfileImg);
  // console.log("Logo : ", Logo);


  return (
    <React.Fragment>
      <div className='startheader'>
        <div className='logo'>
          <img src={Logo} alt="logo" />
        </div>
        <img className='kakaoProfileImg' src={kakaoProfileImg.slice(1,kakaoProfileImg.length - 1)} alt="kakaoProfileImg" ></img>
      </div>
      <div className='mainbody'>
        <div className='userid'>
          {kakaoNickname.slice(1,kakaoNickname.length - 1)}
        </div>
        <button className="Edit_btn" onClick={openModal}>등록</button>
      </div>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>  
      {dataHandler()}
    </React.Fragment>
  )
}

export default Start;