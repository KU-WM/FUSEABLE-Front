import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetData = () => {
  const res = axios('/dummy/dummyKanban.json')
  .then((data) => {console.log("data", data)
  window.localStorage.setItem("data" , JSON.stringify(data))})

  const data = window.localStorage.getItem("data");

  console.log("User Data", JSON.parse(data));

  return 0;
};


export default GetData;