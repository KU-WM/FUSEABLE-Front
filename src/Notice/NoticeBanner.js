import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import React from "react";
import 'swiper/css'
import { noticeListState } from "../recoil";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../css/swiper.css'


function NoticeBanner() {
  const noticeListSet = useRecoilValue(noticeListState);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);
  
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");


  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/articles/list/${selectedProjectId}`
      )
      .then((response) => 
      {
        console.log("EFFECT : ", response);
        setNoticeList(clearData(noticeList));
        (response.data).map((data) => {
          return setNoticeList((oldNoticeList) => [
            ...oldNoticeList,
            {
              id: data.id,
              title: data.title,
              content: data.content,
            },
          ])
        })
        // console.log("Response: ", response.data.note);
        console.log("Data : ", noticeListSet);
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

  return (
    <Swiper 
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      loop={true}
      pagination={{clickable: true}}
      autoplay={{delay: 2000}}
      onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {noticeListSet.map((slide) => (<SwiperSlide key={slide.id}>{slide.title}</SwiperSlide>))}
    </Swiper>
  )
}

export default NoticeBanner;