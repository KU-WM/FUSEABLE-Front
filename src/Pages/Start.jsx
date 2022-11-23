import React from 'react';
import '../css/Start.css';
import { Link } from 'react-router-dom';
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

    let data = {
      title: title,
      user: Number(window.localStorage.getItem("profile"))
    }

    console.log("Data : ", data)

    try {
      const res = await axios
      .post(
        "http://localhost:8080/api/project",data,{
          headers: {
            "Content-Type": `application/json`,
          },}
      )
      .then((response) => {
        if(response.id == (getId() - 1))
          console.log("True id")
        if(response.title == title)
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
    {try {
      const UserProfile = window.localStorage.getItem("profile");
      const res = await axios
      .get(
        'http://localhost:8080/api/project'
      )
      .then((response) => 
      {
       if (projectList.length != response.data.length)
        {
          setProjectList(clearData(projectList));
          (response.data).map((data) => {
          setProjectList((oldprojectList) => [
            ...oldprojectList,
            {
              id: data.id,
              title: data.title,
            },
          ])
        })}
      })
    }
    catch (e) {
      console.error(e);
    }}
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

  return (
    <React.Fragment>
      <div className='startheader'>
        <div className='logo'>
          <img src={Logo} alt="logo" />
        </div>
        <div className='userid'>
          USER ID
        </div>
      </div>
      <div className='mainbody'>
        <div className='profile'>
          User Profile
        </div>
        <button className="Edit_btn" onClick={openModal}>등록</button>
      </div>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>  
      {dataHandler()}
    </React.Fragment>
  )
}

export default Start;