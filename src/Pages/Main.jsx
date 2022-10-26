import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import APP from '../Animation/Posttest'


function Main () {
  return (
    <header>
      <div className='header'>
        <div className='logo'>
          Logo
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
            공지사항
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
          <div className='progress'>
            진행 1
            <div className='content'>
              <div className='test1'>
                <APP />
              </div>
            </div>
          </div>
          <div className='progress'>
            진행 2
            <div className='content'>
              <div className='test1'>
                <APP />
              </div>
            </div>
          </div>
          <div className='progress'>
            진행 3
            <div className='content'>
              <div className='test1'>
                <APP />
              </div>
            </div>
          </div>
          <div className='progress'>
            진행 4
            <div className='content'>
              <div className='test1'>
                <APP />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Main;