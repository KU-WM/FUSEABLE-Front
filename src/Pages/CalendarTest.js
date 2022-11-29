import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./MyCalendar.css"

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import { useRecoilValue } from "recoil";
import { kanbanListState } from "../recoil";


const MyCalendar = () => {
  const kanbanList = useRecoilValue(kanbanListState);

  const  data = kanbanList.map((data) => ({title: `${data.title}`, date: `${data.deadline}`}))


    return (
      <div className="calendar-wrapper">
        <FullCalendar 
          plugins={[ dayGridPlugin ]} 
          aspectRatio={1.8}
          events={data}
           />
      </div>
    )
}

export default MyCalendar;
