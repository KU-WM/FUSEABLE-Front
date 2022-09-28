// import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from './Pages/Login';
import Redirect from './Pages/Redirect';
import Logout from './Pages/Logout';
import Start from './Pages/Start';
import Main from './Pages/Main';


const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login />}></Route>
        <Route path='/redirect' element={<Redirect />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/main' element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
