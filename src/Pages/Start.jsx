import React from 'react';
import '../css/Start.css';
import { Link } from 'react-router-dom';


function Start () {
  return (
    <header>
      <div id='startHeader'>
        <div class='Logo'>
          LOGO
        </div>
        <div class='UserId'>
          USER ID
        </div>
      </div>
      <div class='mainBody'>
        <div class='profile'>
          User Profile
        </div>
        <div class='projectList'>
          <Link to="/main">Main Page</Link>
        </div>
      </div>
    </header>
  )
}


export default Start;