import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import RegisterPage from "./features/Auth/RegisterPage";
import AuthProvider from "./contexts/AuthContext";
import LoginPage from "./features/Auth/LoginPage";
import ToDoListDashboardPage from "./features/ToDoListDashboard/ToDoListDashboardPage";
import TaskProvider from "./contexts/TaskContext";
import {ToastContainer} from "react-toastify";
import LogoutPage from "./features/Auth/LogoutPage";


function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <TaskProvider>
                <Routes>
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/logout" element={<LogoutPage/>} />
                    <Route path="/todolist" element={<ToDoListDashboardPage/>} />
                </Routes>
                <ToastContainer/>
              </TaskProvider>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;