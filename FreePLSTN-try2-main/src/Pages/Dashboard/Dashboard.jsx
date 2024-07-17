import React, { useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import Examicon from "../../images/ExamIcon.png";
import "./Dashboard.css";
import axios from 'axios';
import { UserContext } from '../../context/userContext'

const Dashboard = () => {
  const [Exams, setExams] = useState([]);
  const {currentUser} = useContext(UserContext)

  useEffect(()=>{
    const getExams = async () => {
      // setIsLoading(true)

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/exams/users/${currentUser.id}`)
        setExams(response?.data)
      } catch (err) {
        console.log(err)          
      }

      // setIsLoading(false)
    }
    getExams();
  },[])

  return (
    <>
      <div className="container">
        <div>
          <Link to="/create-exam">
            <button className="addButton">+ Create</button>
          </Link>
        </div>

        {Exams.length > 0 ? (
          <div className="dashboard-container">
            {Exams.map((Exam) => (
              <div className="Exam-container">
                <Link to={`/upload-exam/${Exam._id}`}>
                  <h2>Exam Name: {Exam.name}</h2>
                  <h2>Exam Code: {Exam.examCode}</h2>
                  <h2>Questions: Mcq-{Exam.MCQs} T/F-{Exam.TFs} Text-{Exam.Text}</h2>
                  <h2>Total Marks:{Exam.totalMarks}</h2>
                  <div className="Des-img">
                    <img src={Examicon} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="Exam-container">
            <p>No courses Founded</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
