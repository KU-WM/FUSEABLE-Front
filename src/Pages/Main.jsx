import React from 'react';
import '../css/Main.css';


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
          <div>
            메뉴 1
          </div>
          <div>
            메뉴 2
          </div>
          <div>
            메뉴 3
          </div>
          <div>
            메뉴 4
          </div>
          <div>
            메뉴 5
          </div>
          <div>
            공지사항 배너
          </div>
        </div>
        <div className='main'>
          <div className='projectname'>
            프로젝트 이름
          </div>
          <div className='progress'>
            진행 1
          </div>
          <div className='progress'>
            진행 2
          </div>
          <div className='progress'>
            진행 3
          </div>
          <div className='progress'>
            진행 4
          </div>
        </div>
      </div>
    </header>
  )
}


export default Main;