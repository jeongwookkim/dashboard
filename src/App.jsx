import React, { useState } from 'react';
import Sidetab from './component/Sidetab';
import Content from './component/Content';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('전체 현황');
  const [selectedEventData, setSelectedEventData] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <Sidetab setSelectedMenu={setSelectedMenu} setSelectedEventData={setSelectedEventData} />
      <Content selectedMenu={selectedMenu} selectedEventData={selectedEventData} setSelectedMenu={setSelectedMenu}/>
    </div>
  );
}

export default App;