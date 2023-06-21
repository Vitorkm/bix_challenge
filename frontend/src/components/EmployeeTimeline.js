import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import api from '../services/api';
import { useEffect, useState } from 'react';

export default function EmployeeTimeline(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/employee_companies/?employee_id=${props.id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Timeline position="alternate">
      {data.map((item) => (
        <>
          <TimelineItem key={item.id}>
          <TimelineOppositeContent color="text.secondary">
            {item.date_joined}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color : "#fff" }} >Joined {item.company_name}</TimelineContent>
        </TimelineItem>
        {item.date_left &&
          <TimelineItem key={item.id}>
          <TimelineOppositeContent color="text.secondary">
            {item.date_left}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color : "#fff" }} >Left from {item.company_name}</TimelineContent>
        </TimelineItem>
        }
        </>
      ))
      }
    </Timeline>
  );
}