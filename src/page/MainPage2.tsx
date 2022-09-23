import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import React, { useState, useEffect } from 'react';
import 'utils/pageStyle.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const arrEvent: any = [];
  const hostID: any = useParams();
  console.log(hostID.uuid);

  useEffect(() => {
    axios.get(`/letters/events/all`).then((res) => {
      for (let i = 0; i < 3; i += 1) {
        arrEvent[i] = res.data[i].uuid;
      }
      setEventList(arrEvent);
    });
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const { id } = event.currentTarget; // 이벤트 아이디
    navigate('/mailwritepage', { state: [hostID.uuid, id] });
  };

  const handleBirthClick = () => {
    navigate('/mailwritepage', { state: [hostID.uuid, 'birth'] });
  };

  if (hostID.uuid === 'asd') {
    // 여기 에이피아이 검사해야함
    return (
      <div
        className="flex justify-center font-press-start  h-screen"
        style={{ backgroundColor: ColorSystem.MainColor.Primary }}
      >
        <span className="text-white flex items-center text-3xl">잘못된 링크입니다.</span>
      </div>
    );
  }
  return (
    <div
      className="flex justify-center font-press-start  h-screen"
      style={{ backgroundColor: ColorSystem.MainColor.Primary }}
    >
      {/* 2023 */}
      <button
        onClick={handleClick}
        id={eventList[2]}
        type="button"
        className="scaleup flex justify-center h-fit w-60 md:w-80 lg:w-2/6"
      >
        <img src="images/newyearimg.png" alt="a" className="" />
      </button>

      {/* 편지 */}
      <div className="flex flex-col absolute top-5 left-5 md:m-10 w-20 md:w-28 lg:w-1/12 ">
        <button onClick={handleBirthClick} type="button" className="scaleup">
          <img src="images/letterimg.png" alt="a" />
        </button>
      </div>
      {/* 추석 */}
      <button
        onClick={() => alert('업데이트 예정입니다.')}
        className="scaleup absolute bottom-0 left-0 w-60 md:w-80 lg:w-1/4"
        type="button"
      >
        <img src="images/thankimg.png" alt="a" />
      </button>
      {/* 크리스마스 */}
      <button onClick={handleClick} id={eventList[0]} type="button">
        <img
          src="images/treeimg.png"
          alt="a"
          className="scaleup absolute bottom-0 right-0 m-1 md:m-3  w-60 md:w-80 lg:w-2/6 "
        />
      </button>
      {/* 호박 선물 */}
      <div className="flex flex-row absolute bottom-0 right-0 w-60 md:w-80 lg:w-2/5 ">
        <button onClick={handleClick} className="scaleup" type="button" id={eventList[1]}>
          <img src="images/halloweenimg.png" alt="a" className="origin-center hover:origin-top" />
        </button>
        <button onClick={() => alert('업데이트 예정입니다.')} className="scaleup" type="button">
          <img src="images/valentineimg.png" alt="a" />
        </button>
      </div>
    </div>
  );
}

export default MainPage;