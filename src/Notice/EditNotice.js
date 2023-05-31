import axios from "axios";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { noticeListState } from "../recoil";
import "../css/Pages/NoticeSet.css";
import BookmarkTrue from '../images/bookmarkT.png';
import BookmarkFalse from '../images/bookmarkF.png';


function EditNotice ({item}) {
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
  const index = noticeList.findIndex((listItem) => listItem === item);

  const navigate = useNavigate();

  const editNotice = () => {
    sessionStorage.setItem("selectedNotice", JSON.stringify(item));
    navigate('/main/editnoticepage')
  }

  return (
    <React.Fragment>
      <div className="noticeContainer" onClick={editNotice}>
        <div className="Notice_bookmark_img">
          <img 
            src={item.bookmark ? BookmarkTrue : BookmarkFalse} 
            style={{width: "15px", height: "15px"}}></img>
        </div>
        <div className="NoticeIndex">{index + 1}</div>
        <div className="NoticeTitle">{item.title}</div>
        <div className="user">{item.user}</div>  
        <div className="startAt">{item.startAt}</div>  
      </div>
    </React.Fragment>
  )
}


export default EditNotice;