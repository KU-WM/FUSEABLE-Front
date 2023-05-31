import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { noticeListState } from "../recoil";
import EditNotice from "./EditNotice";
import "../css/Pages/NoticeSet.css";
import { useNavigate } from "react-router-dom";


function NoticeList () {
  const noticeListSet = useRecoilValue(noticeListState);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);

  const navigate = useNavigate();

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/articles/list/${selectedProjectId}`
      )
      .then((response) => 
      {
        setNoticeList(clearData(noticeList));
        console.log("Notice List : ", response.data);
        (response.data).map((data) => {
          return setNoticeList((oldNoticeList) => [
            ...oldNoticeList,
            {
              id: data.id,
              title: data.title,
              content: data.content,
              startAt: data.startAt,
              user: data.user.accountNickname,
              bookmark: data.bookmark,
            },
          ])
        })
        // console.log("Response: ", response.data.note);
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }



  const dataHandler = () => {
    const bookmarkedNoticeList = noticeListSet.filter((data) => data.bookmark == true);
    const notBookmarkedNoticeList = noticeListSet.filter((data) => data.bookmark == false);

    return [
      bookmarkedNoticeList
      .map((item) => <EditNotice key={item.id} item={item}></EditNotice>),
      notBookmarkedNoticeList
      .map((item) => <EditNotice key={item.id} item={item}></EditNotice>)
    ]
  }

  const addNotice = () => {
    navigate('/main/addnoticepage')
  }

  return (
    <React.Fragment>
      <button className="NoticeAddBtn" onClick={addNotice}>등록</button>
      <div className="noticeContainer">
        <div className="NoticeBookmark">북마크</div>
        <div className="NoticeIndex">게시 ID</div>
        <div className="NoticeTitle">제목</div>
        <div className="user">작성자</div>
        <div className="startAt">작성일</div> 
      </div>

      {dataHandler()}
    </React.Fragment>
  )
}

export default NoticeList;