import React from 'react';
import '../css/App.css';


function Login () {
  return (
    <div className="App">
      <header className="App-header">
        <a href={process.env.REACT_APP_LoginURL}>
          <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
          />
        </a>
        <a href={process.env.REACT_APP_LogoutURL} id="logout-btn">Logout</a>
      </header>
    </div>
  )
}


export default Login;