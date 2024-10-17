import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import RegisterPage from "./features/Auth/RegisterPage";
import AuthProvider from "./contexts/AuthContext";
import LoginPage from "./features/Auth/LoginPage";
import ToDoListDashboardPage from "./features/ToDoListDashboard/ToDoListDashboardPage";


function App() {
  const [message, setMessage] = useState('');

  /*useEffect(() => {
    fetch('http://localhost:8000/api/hello')
        .then(response => response.text())
        .then(message => setMessage(message));
  }, []);*/

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
      <BrowserRouter>
          <AuthProvider>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/todolist" element={<ToDoListDashboardPage/>} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;