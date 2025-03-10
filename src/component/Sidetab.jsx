import React, { useState } from 'react';
import '../css/Sidetab.css';

const Sidetab = ({ setSelectedMenu, setSelectedEventData }) => {
  
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const eventData = [
    { space: '대강당', type: '공연', date: '2025-03-05', enddate: '2025-03-07', attendees: 150, maxAttendees: 200, color: '#ff6b6b' },
    { space: '소공연장', type: '워크숍', date: '2025-03-06', enddate: '2025-03-06', attendees: 14, maxAttendees: 30, color: '#ffd93d' },
    { space: '세미나실1', type: '강연', date: '2025-03-07', enddate: '2025-03-07', attendees: 50, maxAttendees: 200, color: '#4ecdc4' },
    { space: '세미나실2', type: '워크숍', date: '2025-03-08', enddate: '2025-03-08', attendees: 20, maxAttendees: 30, color: '#4ecdc4' },
    { space: '갤러리', type: '전시', date: '2025-03-09', enddate: '2025-03-09', attendees: 200, maxAttendees: 250, color: '#4ecdc4' },
  ];
  
  const handleMenuClick = (menu) => {
    if (menu === "이벤트별 예약자 관리") {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      setSelectedMenu(menu);
      setIsSubMenuOpen(false);
    }
  };

  const handleSubMenuClick = (subMenu) => {
    const selectedEvent = eventData.find(event => 
      `${event.type} (${event.space}) ${event.date}` === subMenu
    );
    setSelectedSubMenu(subMenu);
    setSelectedMenu(`이벤트별 예약자 관리 > ${subMenu}`);
    setSelectedEventData(selectedEvent);
    setIsSubMenuOpen(false);
  };

  const mainMenus = ["전체 현황", "이벤트별 예약자 관리", "인기 이벤트", "커뮤니케이션"];
  const subMenus = eventData.map(event => `${event.type} (${event.space}) ${event.date}`);

  return (
    <div className="sidetab">
      <div style={{backgroundColor:'white', color:'black', textAlign:'center',padding:'3px', borderRadius: '20px', margin: '5px 20px 20px 20px'}}>일반관리자</div>
      <ul>
        {mainMenus.map((menu) => (
          <li key={menu} onClick={() => handleMenuClick(menu)}>
            {menu}
            {menu === "이벤트별 예약자 관리" && isSubMenuOpen && (
              <ul className="submenu">
                {subMenus.map((subMenu) => (
                  <li key={subMenu} onClick={() => handleSubMenuClick(subMenu)}>
                    {subMenu}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidetab;