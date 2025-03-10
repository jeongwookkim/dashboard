import React from 'react';
import '../css/Content.css';
import Home from './Home';
import Reservation from './Reservation';
import PopularEvent from './PopularEvent';
import Communication from './Communication';

const Content = ({ selectedMenu, selectedEventData, setSelectedMenu}) => {
  const defaultMenu = "전체 현황";
  const currentMenu = selectedMenu || defaultMenu;

  return (
    <div className="content">
      {currentMenu === "전체 현황" && <Home setSelectedMenu={setSelectedMenu} />}
      {currentMenu.startsWith("이벤트별 예약자 관리 >") && <Reservation selectedEventData={selectedEventData} />}
      {currentMenu === "인기 이벤트" && <PopularEvent />}
      {currentMenu === "커뮤니케이션" && <Communication />}
    </div>
  );
};

export default Content;