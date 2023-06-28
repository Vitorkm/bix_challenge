import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


export default function EmployeeTimeline(props) {
  const { data } = props;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1e1e1e",
        borderColor: "#1e1e1e",
        border: "10px solid #1e1e1e",
        borderRadius: "10px",
      }}
    >
      <Grid item xs={12}>
        <Box>
          <Timeline position="alternate">
            {data.map((item) => {
              switch (item.type) {
                case "date_start":
                  return (
                    <TimelineItem key={item.id}>
                  <TimelineOppositeContent color="text.secondary">
                    {item.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: "#fff" }}>
                    Went on vacation
                  </TimelineContent>
                </TimelineItem>
                  );
                case "date_end":
                  return (
                    <TimelineItem key={item.id}>
                  <TimelineOppositeContent color="text.secondary">
                    {item.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: "#fff" }}>
                    Came back from vacation
                  </TimelineContent>
                </TimelineItem>
                  );
                case "date_joined":
                  return (
                    <TimelineItem key={item.id}>
                  <TimelineOppositeContent color="text.secondary">
                    {item.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: "#fff" }}>
                    Joined {item.company_name}
                  </TimelineContent>
                </TimelineItem>
                  );
                case "date_left":
                  return (
                    <TimelineItem key={item.id}>
                  <TimelineOppositeContent color="text.secondary">
                    {item.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: "#fff" }}>
                    Left from {item.company_name}
                  </TimelineContent>
                </TimelineItem>
                  );
              }
})}
          </Timeline>
        </Box>
      </Grid>
    </div>
  );
}
