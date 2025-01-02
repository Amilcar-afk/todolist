import React, { useContext, useState, useEffect } from "react";
import Scheduler from "react-mui-scheduler";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/CalendarView.css";
import { HeaderContext } from "../../../contexts/HeaderContext.jsx";
import { TaskContext } from "../../../contexts/TaskContext.jsx";

export default function Calendar() {
  const { isDarkMode } = useContext(HeaderContext);
  const { userTasks = [] } = useContext(TaskContext);

  const [theme, setTheme] = useState(createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  }));

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    },
  };

  const formatTasksToEvents = () => {
    if (Array.isArray(userTasks)) {
      return userTasks.map(task => {
        const taskDate = new Date(task.date);

        if (isNaN(taskDate.getTime())) {
          console.warn(`Invalid date for task: ${task.name}`);
          return null;
        }

        return {
          id: `event-${task.id}`,
          label: task.name,
          groupLabel: task.creator,
          user: task.creator,
          color: "#099ce5",
          date: taskDate.toISOString().split('T')[0],
          createdAt: new Date(),
          createdBy: task.creator,
          style: { border: "2px solid #d9534f" },
        };
      }).filter(event => event !== null);
    } else {
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    const formattedEvents = formatTasksToEvents();
    setTimeout(() => {
      setEvents(formattedEvents);
      setLoading(false);
    }, 500);
  }, [userTasks]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="azerty dark:bg-gray-900 dark:text-white bg-white p-4 shadow-md">
        {loading ? (
          <div className="flex justify-center items-center h-[540px]">
            <p className="text-gray-500 dark:text-gray-400">
              Chargement des événements...
            </p>
          </div>
        ) : events.length > 0 ? (
          <Scheduler
            locale="fr-FR"
            events={events.map((event) => ({
              ...event,
              startHour: "00:00 AM",
              endHour: "11:59 PM",
              style: event.style,
            }))}
            legacyStyle={false}
            options={config.options}
            toolbarProps={config.toolbarProps}
          />
        ) : (
          <div className="flex justify-center items-center h-[540px]">
            <p className="text-gray-500 dark:text-gray-400">
              Chargement...
            </p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
