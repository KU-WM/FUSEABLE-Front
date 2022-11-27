// import logo from './logo.svg';
import React from 'react';
// import './css/Login.css';
import './App.scss'
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from './Pages/Login';
import Redirect from './Pages/Redirect';
import Logout from './Pages/Logout';
import Start from './Pages/Start';
import Main from './Pages/Main';
import Kanban from './Kanban/Kanban';
import Notice from './Pages/Notice';
import GetData from './Kanban/getData';
import MyDocument from './Pages/MyDocument';
import CalendarDisplay from './Pages/Calendar';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login />}></Route>
        <Route path='/redirect' element={<Redirect />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/kanban' element={<Kanban />}></Route>
        <Route path='/main/notice' element={<Notice />}></Route>
        <Route path='/getdata' element={<GetData />}></Route>
        <Route path='/main/mydocument' element={<MyDocument />}></Route>
        <Route path='/main/calendar' element={<CalendarDisplay />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
