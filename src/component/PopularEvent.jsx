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
import { LineChart } from '@mui/x-charts/LineChart';

const Services = () => {
    const eventData = [
        { space: '대강당', type: '공연', date: '2025-03-05', enddate: '2025-03-07', attendees: 150, maxAttendees: 200, color: '#ff6b6b', memo: 30 },
        { space: '소공연장', type: '워크숍', date: '2025-03-06', enddate: '2025-03-06', attendees: 14, maxAttendees: 30, color: '#ffd93d', memo: 2 },
        { space: '세미나실1', type: '강연', date: '2025-03-07', enddate: '2025-03-07', attendees: 50, maxAttendees: 200, color: '#4ecdc4', memo: 2 },
        { space: '세미나실2', type: '워크숍', date: '2025-03-08', enddate: '2025-03-08', attendees: 20, maxAttendees: 30, color: '#4ecdc4', memo: 0 },
        { space: '갤러리', type: '전시', date: '2025-03-09', enddate: '2025-03-09', attendees: 200, maxAttendees: 250, color: '#4ecdc4', memo: 19 },
    ];
    const data = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        attendees: Math.floor(Math.random() * 100) + 1,
    })).reverse();

    const dates = data.map((entry) => {
        const d = new Date(entry.date);
        return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    const attendees = data.map((entry) => entry.attendees);

    return (
        <Box sx={{ padding: 3, backgroundColor: '#9d9c9c' }}>
            
            <Grid2 size={{ xs: 12, md: 5 }}>
                <Paper sx={{ 
                    p: 3, 
                    borderRadius: 12,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    background: 'white',
                }}>
                    <Typography variant="h4" gutterBottom>
                        인기 이벤트
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        (지난 7일간 예약자수 기준)
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
                        width={600}
                        height={300}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    />
                    <LineChart
                        xAxis={[{ data: dates, label: 'Date', scaleType: 'point' }]} 
                        series={[{ data: attendees, label: 'attendees', area: false, color: '#00bcd4' }]} 
                        width={600}
                        height={300}
                        sx={{
                    '& .MuiChartsAxis-line': { stroke: '#1976d2' },
                    '& .MuiChartsAxis-tick': { stroke: '#1976d2' },
                    '& .MuiChartsLegend-root': { color: '#000' },
                }}
            />
                </Paper>
            </Grid2>
        </Box>
    );
};

export default Services;