import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const Reservation = ({ selectedEventData }) => {
  const dummyData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    contact: `Contact ${index + 1}@example.com`,
    reservationTime: selectedEventData ? `${selectedEventData.date} 10:0${(index % 9) + 1}:00` : `2023-10-0${(index % 9) + 1} 10:00`,
    status: ['Confirmed', 'Cancel Requested', 'Cancelled'][Math.floor(Math.random() * 3)],
    cancel: false,
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteredData(
      data.filter(item =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.contact.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.id.toString().includes(event.target.value)
      )
    );
  };

  const handleFilter = (status) => {
    if (status === 'All') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.status === status));
    }
  };

  const handleCancel = (id) => {
    setData(data.map(item =>
      item.id === id ? { ...item, cancel: !item.cancel, status: item.cancel ? 'Confirmed' : 'Cancel Requested' } : item
    ));
    setFilteredData(filteredData.map(item =>
      item.id === id ? { ...item, cancel: !item.cancel, status: item.cancel ? 'Confirmed' : 'Cancel Requested' } : item
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      {selectedEventData ? (
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#2d3748', fontWeight: 600 }}>
            {`${selectedEventData.type} (${selectedEventData.space}) 예약자 관리`}
          </Typography>
          <Box sx={{ display: 'flex', mb: 2, alignItems: 'center', gap: 2 }}>
            <Typography sx={{ mr: 2 }}>참석자: {selectedEventData.attendees} / {selectedEventData.maxAttendees}</Typography>
            <Typography>날짜: {selectedEventData.date} ~ {selectedEventData.enddate}</Typography>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <TextField
              label="이름 전화번호 검색"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              size="small"
            />
            <Button variant="contained" onClick={() => handleSearch({ target: { value: searchTerm } })}>검색</Button>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => handleFilter('Confirmed')}>승인</Button>
            <Button variant="outlined" onClick={() => handleFilter('Cancel Requested')}>취소 요청</Button>
            <Button variant="outlined" onClick={() => handleFilter('Cancelled')}>취소됨</Button>
            <Button variant="outlined" onClick={() => handleFilter('All')}>All</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>예약 시간</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>취소 승인</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.reservationTime}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={item.cancel}
                      onChange={() => handleCancel(item.id)}
                      disabled={item.status === 'Cancelled'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography variant="h6" sx={{ color: '#718096' }}>
          예약 데이터를 선택해 주세요.
        </Typography>
      )}
    </Box>
  );
};

export default Reservation;