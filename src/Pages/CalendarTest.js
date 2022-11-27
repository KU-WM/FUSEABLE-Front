import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';


class MyCalendar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calendar-wrapper">
        <FullCalendar 
          defaultView="dayGridMonth"
          plugins={[ dayGridPlugin ]} 
          aspectRatio={1}
           />
      </div>
    )
  }
}

export default MyCalendar;
