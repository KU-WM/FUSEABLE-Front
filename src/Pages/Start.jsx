import React from 'react';
import '../css/Start.css';
import { Link } from 'react-router-dom';


function Start () {
  return (
    <header>
      <div className='startheader'>
        <div className='logo'>
          LOGO
        </div>
        <div className='userid'>
          USER ID
        </div>
      </div>
      <div className='mainbody'>
        <div className='profile'>
          User Profile
        </div>
        <div className='projectlist'>
          <Link className='textLink' to="/main">Main Page</Link>
        </div>
      </div>
    </header>
  )
}


export default Start;