import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    Button,
    Grid2,
    Fade,
    LinearProgress
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Home = ({ setSelectedMenu }) => {
    const eventData = [
        { space: '대강당', type: '공연', date: '2025-03-05', enddate: '2025-03-07', attendees: 150, maxAttendees: 200, color: '#ff6b6b', memo: 30 },
        { space: '소공연장', type: '워크숍', date: '2025-03-06', enddate: '2025-03-06', attendees: 14, maxAttendees: 30, color: '#ffd93d', memo: 2 },
        { space: '세미나1', type: '강연', date: '2025-03-07', enddate: '2025-03-07', attendees: 50, maxAttendees: 200, color: '#4ecdc4', memo: 2 },
        { space: '세미나2', type: '워크숍', date: '2025-03-08', enddate: '2025-03-08', attendees: 20, maxAttendees: 30, color: '#4ecdc4', memo: 0 },
        { space: '갤러리', type: '전시', date: '2025-03-09', enddate: '2025-03-09', attendees: 200, maxAttendees: 250, color: '#4ecdc4', memo: 19 },
    ];

    const reservationStats = [
        { space: '대강당', reserved: 150, capacity: 200 },
        { space: '소공연장', reserved: 14, capacity: 30 },
        { space: '세미나실1', reserved: 50, capacity: 200 },
        { space: '세미나실2', reserved: 20, capacity: 30 },
        { space: '갤러리', reserved: 200, capacity: 250 },
    ];

    const cancellationRequests = [
        { name: '김철수', space: '대강당', requestDate: '2025-03-06', status: '요청됨' },
        { name: '이영희', space: '소공연장', requestDate: '2025-03-07', status: '요청됨' },
        { name: '박민수', space: '세미나실1', requestDate: '2025-03-08', status: '요청됨' },
        { name: '최지은', space: '세미나실2', requestDate: '2025-03-09', status: '요청됨' },
        { name: '조현주', space: '갤러리', requestDate: '2025-03-09', status: '요청됨' },
    ];
    
    const [showCalendar, setShowCalendar] = React.useState(false);

    const handleCalendarToggle = () => {
        setShowCalendar(!showCalendar);
    };

    const handleMemoClick = () => {
        setSelectedMenu("커뮤니케이션");
    };
    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            p: 4
        }}>
            <Box sx={{ 
                flexGrow: 1, 
                maxWidth: 1400, 
                mx: 'auto', 
                width: '100%'
            }}>
               
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 4,
                        background: 'rgba(255, 255, 255, 0.9)',
                        p: 2,
                        borderRadius: 2,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: '#2d3748', 
                                fontWeight: 500,
                                letterSpacing: 1,
                                marginLeft: '10px'
                            }}
                        >
                             전체현황 대시보드
                        </Typography>
                        <Box>
                        <Button 
                                variant="outlined" 
                                size="medium"
                                sx={{ 
                                    mr: 1,
                                    borderColor: '#4a90e2',
                                    color: '#4a90e2',
                                    '&:hover': { 
                                        backgroundColor: '#4a90e2', 
                                        color: 'white',
                                        borderColor: '#4a90e2'
                                    },
                                    transition: 'all 0.3s'
                                }}
                            >
                                오늘 이벤트만 보기
                            </Button>
                            <Button 
                                variant="outlined" 
                                size="medium"
                                onClick={handleCalendarToggle}
                                sx={{ 
                                    mr: 1,
                                    borderColor: '#4a90e2',
                                    color: '#4a90e2',
                                    '&:hover': { 
                                        backgroundColor: '#4a90e2', 
                                        color: 'white',
                                        borderColor: '#4a90e2'
                                    },
                                    transition: 'all 0.3s'
                                }}
                            >
                                캘린더로 보기
                            </Button>
                        </Box>
                    </Box>

                {showCalendar ? (
                    <Fade in={showCalendar}>
                        <Paper sx={{ 
                            p: 3, 
                            borderRadius: 12,
                            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                            background: 'white'
                        }}>
                            <Typography variant="h5" sx={{ mb: 2, color: '#2d3748', fontWeight: 600 }}>
                                이벤트 캘린더
                            </Typography>
                            <Calendar
                                localizer={localizer}
                                events={eventData.map(event => ({
                                    title: `${event.type} (${event.space})`,
                                    start: new Date(event.date),
                                    end: new Date(event.enddate),
                                    allDay: true,
                                }))}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 600, borderRadius: 8 }}
                            />
                        </Paper>
                    </Fade>
                ) : (
                    <>
                        <Grid2 container spacing={1} sx={{ mb: 2 }}>
                            {eventData.map((event, index) => (
                                <Grid2 size={{ xs: 12, sm: 2.4 }} key={index} sx={{ width: '100%', position: 'relative' }}>
                                    <Card 
                                        onClick={() => handleCardClick(event)}
                                        sx={{ 
                                            p: 1, 
                                            borderRadius: 12,
                                            background: 'white',
                                            boxShadow: `0 4px 15px rgba(0,0,0,0.05), 0 0 0 3px ${event.color}`,
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'translateY(-5px)' },
                                            height: '200px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                            margin: '5px',
                                            overflow: 'visible'
                                        }}
                                    >
                                        {event.memo !== 0 && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    right: '-15px',
                                                    backgroundColor: '#ff6b6b',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    padding: '5px 15px',
                                                    borderRadius: '50px',
                                                    border: `2px solid ${event.color}`,
                                                    zIndex: 1000,
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '0.9rem',
                                                    cursor: 'pointer',
                                                        "&::after": {
                                                            content: '""',
                                                            position: 'absolute',
                                                            bottom: '-7px',
                                                            left: '10px',
                                                            width: 0,
                                                            height: 0,
                                                            borderLeft: '8px solid transparent',
                                                            borderRight: '8px solid transparent',
                                                            borderTop: `8px solid #ff6b6b`,
                                                 }
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMemoClick(event);
                                                  }}
                                            >
                                                {event.memo}
                                            </Box>
                                        )}
                                        
                                        <CardContent>
                                            <Typography variant="h6" sx={{ color: '#2d3748', fontWeight: 600, mb: 1 }}>
                                                {event.type}
                                            </Typography>
                                            {event.color === '#ff6b6b' && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '25px',
                                                        right: '40px',
                                                        color: '#ff6b6b',
                                                        fontWeight: 600,
                                                        zIndex: 1000
                                                    }}
                                                >
                                                    마감임박
                                                </Box>
                                            )}
                                            <Typography variant="subtitle2" sx={{ color: '#718096', mb: 1 }}>
                                                {event.space}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                                                {event.date} ~ {event.enddate}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                                                예약자수 {event.attendees} 잔여좌석 {event.maxAttendees - event.attendees}
                                            </Typography>
                                            <Box sx={{ mb: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(event.attendees / event.maxAttendees) * 100}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: '#e0e0e0',
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: event.color
                                                        }
                                                    }}
                                                />
                                                <Typography variant="caption" sx={{ color: event.color, ml: 1 }}>
                                                    {`${Math.round((event.attendees / event.maxAttendees) * 100)}%`}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>

                        <Grid2 container spacing={3}>
                            <Grid2 size={{ xs: 14, md: 4.5 }}>
                                <Paper sx={{ 
                                    p: 3, 
                                    borderRadius: 12,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                    background: 'white'
                                }}>
                                    <Typography variant="h5" sx={{ mb: 1, color: '#2d3748', fontWeight: 600 }}>
                                        공간별 예약 현황
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ data: reservationStats.map(d => d.space), scaleType: 'band' }]}
                                        series={[
                                            { data: reservationStats.map(d => d.reserved), label: '예약자 수', color: '#4a90e2' },
                                            { data: reservationStats.map(d => d.capacity - d.reserved), label: '잔여 좌석 수', color: '#95e1d3' }
                                        ]}
                                        width={400}
                                        height={300}
                                    />
                                </Paper>
                            </Grid2>
                            <Grid2 item xs={14} md={6}>
                                <Paper sx={{ 
                                    p: 3, 
                                    borderRadius: 12,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                    background: 'white',
                                }}>
                                    <Typography variant="h5" sx={{ mb: 2, color: '#2d3748', fontWeight: 600 }}>
                                        인기 이벤트
                                    </Typography>
                                    <BarChart
                                        layout="horizontal"
                                        yAxis={[{
                                            data: eventData
                                                .sort((a, b) => b.attendees - a.attendees)
                                                .map(d => d.space),
                                            scaleType: 'band'
                                        }]}
                                        series={[
                                            { 
                                                data: eventData
                                                    .sort((a, b) => b.attendees - a.attendees)
                                                    .map(d => d.attendees), 
                                                label: '예약자 수',
                                                valueFormatter: (value) => `${value}명`,
                                            }
                                        ]}
                                        colors={eventData.map(d => d.color)}
                                        width={200}
                                        height={300}
                                        slotProps={{
                                            legend: { hidden: true },
                                        }}
                                    />
                                </Paper>
                            </Grid2>
                            <Grid2 item xs={12} md={3}>
                                <Paper style={{width:380, height:350, overflowY:'auto'}} sx={{ 
                                    p: 3, 
                                    borderRadius: 12,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                    background: 'white'
                                }}>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <Typography variant="h5" sx={{ color: '#2d3748', fontWeight: 600 }}>
                                            예약 취소 요청
                                        </Typography>
                                        <button style={{marginRight: '10px'}}>전체취소승인</button>
                                    </div>
                                    <Box>
                                        {cancellationRequests.map((request, index) => (
                                            <Box key={index} sx={{ mb: 2, borderBottom: '1px solid #e0e0e0', paddingBottom: 1 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {request.name} - {request.space}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#777' }}>
                                                    요청 일자: {request.requestDate}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#f44336' }}>
                                                    상태: {request.status}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid2>
                        </Grid2>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Home;