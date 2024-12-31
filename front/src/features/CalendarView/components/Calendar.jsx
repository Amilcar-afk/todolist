import React, { useContext, useState, useEffect } from "react";
import Scheduler from "react-mui-scheduler";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/CalendarView.css";
import { HeaderContext } from "../../../contexts/HeaderContext.jsx";
import {TaskContext} from "../../../contexts/TaskContext.jsx";

export default function Calendar() {
  const { isDarkMode } = useContext(HeaderContext);
  const { userTasks = [] } = useContext(TaskContext);
  const [theme, setTheme] = useState(createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  }));

  console.log(userTasks);
  

  const config = {
    options: {
      transitionMode: "zoom",
      startWeekOn: "mon",
      defaultMode: "month",
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
      disableTimeline: true,
      disableWeekView: true,
      disableDayView: true,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: false,
      showDatePicker: true,
    }
  };

  // const events = [
  //   {
  //     id: "event-1",
  //     label: "Consultation médicale",
  //     groupLabel: "Dr Shaun Murphy",
  //     user: "Dr Shaun Murphy",
  //     color: "#f28f6a",
  //     border: "solid 5px",
  //     date: "2024-12-12",
  //     createdAt: new Date(),
  //     createdBy: "Kristina Mayer",
  //   },
  //   {
  //     id: "event-2",
  //     label: "Réunion avec client",
  //     groupLabel: "Dr Claire Brown",
  //     user: "Dr Claire Brown",
  //     color: "#099ce5",
  //     date: "2024-12-13",
  //     createdAt: new Date(),
  //     createdBy: "Kristina Mayer",
  //     style: { border: "2px solid green" },
  //   },
  //   {
  //     id: "event-3",
  //     label: "Consultation TMR",
  //     groupLabel: "Dr Menlendez Hary",
  //     user: "Dr Menlendez Hary",
  //     color: "#263686",
  //     date: "2024-12-13",
  //     createdAt: new Date(),
  //     createdBy: "Kristina Mayer",
  //     style: { border: "2px solid #d9534f" },
  //   },
  //   {
  //     id: "event-4",
  //     label: "Consultation prénatale",
  //     groupLabel: "Dr Shaun Murphy",
  //     user: "Dr Shaun Murphy",
  //     color: "#f28f6a",
  //     date: "2024-12-15",
  //     createdAt: new Date(),
  //     createdBy: "Kristina Mayer",
  //     style: { border: "2px solid #d9534f" },
  //   }
  // ];

  const formatTasksToEvents = () => {
    if (Array.isArray(userTasks)) {
      return userTasks.map(task => {
        const taskDate = new Date(task.date);

        if (isNaN(taskDate.getTime())) {
          console.warn(`Invalid date for task: ${task.name}`);
          return null; // or return a default event if needed
        }
  
        return {
          id: `event-${task.id}`,
          label: task.name,
          groupLabel: task.creator,
          user: task.creator,
          color: "#099ce5",
          date: taskDate.toISOString().split('T')[0], // extract the date part (YYYY-MM-DD)
          createdAt: new Date(),
          createdBy: task.creator,
          style: { border: "2px solid #d9534f" },
        };
      }).filter(event => event !== null);  // filter out any null events due to invalid date
    } else {
      return [];
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="azerty dark:bg-gray-900 dark:text-white bg-white p-4 shadow-md">
        <Scheduler
          locale="fr-FR"
          events={formatTasksToEvents().map((event) => ({
            ...event,
            startHour: "00:00 AM",
            endHour: "11:59 PM",
            style: event.style,
          }))}
          legacyStyle={false}
          options={config.options}
          toolbarProps={config.toolbarProps}
        />
      </div>
    </ThemeProvider>
  );
}
