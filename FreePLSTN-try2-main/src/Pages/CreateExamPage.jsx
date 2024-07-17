import React, { useState,useContext } from "react";
import { Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import './CreateExamPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext'

const CreateExamPage = () => {
  const [examName, setExamName] = useState("");
  const [examMarks, setExamMarks] = useState('');
  const [examCode, setExamCode] = useState("");
  const [mcqNumber, setMcqNumber] = useState("");
  const [tfNumber, setTfNumber] = useState("");
  const [textNumber, setTextNumber] = useState("");
  const [textQuestions, setTextQuestions] = useState([]);
  const [ error , setError] = useState('');

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  const handleTextNumberChange = (e) => {
    const value = e.target.value;
    const number = parseInt(value, 10);
    setTextNumber(value);
    if (!isNaN(number) && number > 0) {
      setTextQuestions(new Array(number).fill(1));
    } else {
      setTextQuestions([]);
    }
  };

  const handleTextQuestionChange = (index, value) => {
    if (value < 0) return; // Prevent negative numbers
    const updatedQuestions = textQuestions.map((q, i) => (i === index ? value : q));
    setTextQuestions(updatedQuestions);
  };

  const createExam = async (e)=>{
    e.preventDefault();
    // setIsSubmitting(true)
    
    const examData = new FormData();

    examData.set('name', examName);
    examData.set('totalMarks', examMarks);
    examData.set('examCode', examCode);
    examData.set('MCQs', mcqNumber);
    examData.set('TFs', tfNumber);
    examData.set('Text', textNumber);
    examData.set('textLines', JSON.stringify(textQuestions));
    console.log(textQuestions)
    try {
      const response = await axios.post("http://localhost:5000/api/exams" ,
      examData ,
      {withCredentials: true , headers: {Authorization:`Bearer ${token}`}})

      const exam = response.data;
      if(response.status == 201 || response.status == 200){
        const path = `/my-exam/${exam._id}`
        return navigate(path)
      }
    } catch (err) {
      setError(err.response.data.message)
    }
    //  finally{
    //   setIsSubmitting(false)
    // }

  }

  return (
    <div className="create-exam-container">
      <h2>Create Exam</h2>
      <form onSubmit={createExam}>
        <div className="form-group">
          <h3>Enter Exam Name:</h3>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            placeholder="Exam Name"
          />
          <h3>Enter Exam Code:</h3>
          <input
            type="text"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            required
            placeholder="Exam Code"
          />
          <h3>Enter Exam Total Marks:</h3>
          <input
            type="number"
            value={examMarks}
            onChange={(e) => setExamMarks(e.target.value)}
            required
            placeholder="Exam Total Marks"
          />
          <h3>Enter the number of MCQ questions:</h3>
          <input
            type="text"
            value={mcqNumber}
            onChange={(e) => setMcqNumber(e.target.value)}
            required
            placeholder="The number of multiple choice questions"
          />
          <h3>Enter the number of True/False questions:</h3>
          <input
            type="text"
            value={tfNumber}
            onChange={(e) => setTfNumber(e.target.value)}
            required
            placeholder="The number of true or false questions"
          />
          <h3>Enter the number of Text questions:</h3>
          <input
            type="number"
            value={textNumber}
            onChange={handleTextNumberChange}
            required
            placeholder="The number of written questions"
            min="0"
          />
          <div className="text-question-container">
            {textQuestions.map((lines, index) => (
              <div key={index}>
                <label>Number of lines The Text Question {index + 1}:</label>
                <input
                  type="number"
                  value={lines}
                  onChange={(e) => handleTextQuestionChange(index, parseInt(e.target.value, 10))}
                  min="0"
                />
              </div>
            ))}
          </div>
          <Button type="submit" disabled={!examName}>
            Create <BsArrowRight />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExamPage;
