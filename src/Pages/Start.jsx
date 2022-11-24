import React from 'react';
import '../css/Start.css';
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

  const getId = () => {
    let id = projectList.length > 0 ? projectList.length : 0;
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
    const ress = window.localStorage.getItem("userCode")
    console.log(window.localStorage.getItem("userCode"))
    console.log(JSON.stringify(ress));

    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/api/project/create/`,
        data: 
          {
            title: title,
            kakaoId: window.localStorage.getItem("kakaoId")
          },
      })
      .then((response) => {
        if(response.id === (getId() - 1))
          console.log("True id")
        if(response.title === title)
          console.log("True title")  
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
        console.log("Response : ", response);
        if (projectList.length !== response.data.length)
        {
          setProjectList(clearData(projectList));
          if (response.data > 0) 
          {(response.data).map((data) => {
          return setProjectList((oldprojectList) => [
            ...oldprojectList,
            {
              id: data.id,
              title: data.title,
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