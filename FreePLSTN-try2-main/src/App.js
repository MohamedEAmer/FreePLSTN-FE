import React from "react";
import { BrowserRouter as Router ,Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login-Registration/LoginPage.jsx";
import RegistrationPage from "./Pages/Login-Registration/RegistrationPage.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ExamData from "./Pages/ExamData/ExamData";
import CreateExamPage from "./Pages/CreateExamPage.jsx";
import UploadExamPage from "./Pages//UploadExam/UploadExamPage.jsx";
import DarkVariantExample from "./Pages/GradeExamsSlide/GradeExamsSlide.jsx";
import ViewResultsPage from "./Pages/ViewResults/ViewResultsPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import Navbar from "./Pages/Navbar/Navbar.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Logout from "./Pages/Logout/Logout.jsx";
import LandingPage from "./Pages/Landing/LandingPage.jsx";
import UserProvider from './context/userContext';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/*id for the user */}
        <Route path="/create-exam" element={<CreateExamPage />} />
        <Route path="/my-exam/:id" element={<ExamData />} />{/*id for the exam */}
        <Route path="/upload-exam/:id" element={<UploadExamPage />} />{/*id for the exam */}
        <Route path="/grade-exams" element={<DarkVariantExample />} />
        <Route path="/grade-exams-slide" element={<DarkVariantExample />} />
        <Route path="/view-results" element={<ViewResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />{/*id for the user */}
        <Route path="/" exact element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
}

const WrappedApp = () => (
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);

export default WrappedApp;
