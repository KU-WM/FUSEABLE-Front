import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
<<<<<<< HEAD
=======
import APP from '../Animation/index';
import Logo from '../images/Logo.png';
import App from '../Animation/index'
>>>>>>> d267d66b1e0eaddc9d8afa625f382f76724ca4b5
import Kanban from '../Kanban/Kanban';
import Logo from '../images/Logo.png';


function Main () {

  return (
    <header>
      <div className='header'>
        <div className='logo'>
<<<<<<< HEAD
          <Link className='textLink' to="/main">
            <img src={Logo} alt="Logo" className='logo'/>
          </Link>
=======
          <img src={Logo} alt="Logo" />
>>>>>>> d267d66b1e0eaddc9d8afa625f382f76724ca4b5
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
            일정
          </div>
          <div className='mydocument'>
            내가 작성한 문서
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
            프로젝트 이름
          </div>
          <div className="progress">
            <Kanban />
          </div>
        </div>
      </div>
    </header>
  )
}


export default Main;