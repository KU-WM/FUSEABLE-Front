// import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Link, Routes, useNavigate} from 'react-router-dom';
import Login from './Pages/Login';
import Redirect from './Pages/Redirect';
import Logout from './Pages/Logout';


const App = () => {
  return (

    <BrowserRouter>

      {/* <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/redirect">Redirect</Link>
        </li>
      </ul>        */}
      <Routes>
        <Route path='/' exact element={<Login />}></Route>
        <Route path='/redirect' element={<Redirect />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
