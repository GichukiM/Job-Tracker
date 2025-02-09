import React, { useState } from "react";
import './index.css';
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Dashboardhome from "./components/Dashboardhome";
import { UserProvider } from "./pages/context/UserContext";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { FaUser, FaClock, FaRegCalendarAlt, FaStar, FaTasks } from 'react-icons/fa';
import EmployeesProfile from "./components/EmployeesProfile";
import EmployeeList from "./components/EmployeeList";
import LeaveManagement from "./components/LeaveManager";

const AppContent = () => {
  const location = useLocation();
  
  const isAuthRoute = ["/", "/LogIn", "/Register"].includes(location.pathname);
  const hideWelcomeMessage = ["/dashboard", "/dashboard/manage-employees", "/dashboard/profile", "/dashboard/LeaveManagement"].includes(location.pathname);
  

  return (
    <div className="flex w-full h-screen mt-10">
      {isAuthRoute ? (
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <Routes>
            <Route exact path='/' element={<LogIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/Register' element={<Register />} />
          </Routes>
        </div>
      ) : (
        <div className="w-full flex ">
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route index element={<Dashboardhome />} />
              <Route path="manage-employees" element={<EmployeeList />} />
              <Route path="profile" element={<EmployeesProfile />} />
              <Route path="LeaveManagement" element={<LeaveManagement />} />
            </Route>
          </Routes>
        </div>
      )}

      {!hideWelcomeMessage && isAuthRoute && (
        <div className="hidden relative lg:flex h-full w-1/2 bg-gray-200 flex flex-col items-center rounded-l-lg justify-center p-8 shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">Welcome to KaziTracker</h1>
          <p className="text-lg text-gray-700 mb-8">
            Step into a world where your professional journey is streamlined and efficient. At KaziTracker, expect to:
          </p>
          <ul className="list-none text-left text-gray-700 space-y-8">
            <li className="flex items-center space-x-6">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <FaUser />
              </div>
              <span>Seamlessly manage your employee profile and personal information.</span>
            </li>
            <li className="flex items-center space-x-6">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <FaClock />
              </div>
              <span>Effortlessly track attendance and manage your work hours.</span>
            </li>
            <li className="flex items-center space-x-6">
              <div className="bg-red-500 text-white p-2 rounded-full">
                <FaRegCalendarAlt />
              </div>
              <span>Apply for and manage leave with ease.</span>
            </li>
            <li className="flex items-center space-x-6">
              <div className="bg-yellow-500 text-white p-2 rounded-full">
                <FaStar />
              </div>
              <span>Receive constructive feedback and performance reviews.</span>
            </li>
            <li className="flex items-center space-x-6">
              <div className="bg-purple-500 text-white p-2 rounded-full">
                <FaTasks />
              </div>
              <span>Stay on top of tasks and deadlines with our task management tools.</span>
            </li>
          </ul>
          <p className="text-lg text-gray-700 mt-10">
            Join us and experience a new era of workforce management. Your efficient, organized, and productive future begins here.
          </p>
        </div>
      )}
      
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
