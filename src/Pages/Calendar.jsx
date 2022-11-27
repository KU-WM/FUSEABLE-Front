import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png';
import { useState } from 'react';
import MyCalendar from './CalendarTest';


function CalendarDisplay () {

  const selectedProjectTitle = window.localStorage.getItem("selectedProjectTitle");

  return (
    <header>
      <div className='header'>
        <div className='logo'>
          <Link className='textLink' to="/main">
            <img src={Logo} alt="Logo" className='logo'/>
          </Link>
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
            <Link className='textLink' to="/main/calendar">일정</Link>
          </div>
          <div className='mydocument'>
            <Link className='textLink' to="/main/mydocument">내가 작성한 문서</Link>
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
          <Link className='textLink' to="/main">{selectedProjectTitle}</Link>
          </div>
          <div className="calendar">
            <MyCalendar></MyCalendar>
          </div>
        </div>
      </div>
    </header>
  )
}


export default CalendarDisplay;