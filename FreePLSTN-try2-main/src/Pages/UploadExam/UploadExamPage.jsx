import React, { useState, useEffect,useContext, useRef } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";
import { BsCircleFill, BsCheckCircleFill, BsPencil } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../context/userContext'
import "./UploadExam.css";

const UploadExamPage = () => {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [examData, setExamData] = useState(null);
  const [settingId, setSettingId] = useState(null);
  const { id } = useParams();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  useEffect(() => {
    const getExam = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/exams/${id}`);
        setExamData(response.data);
        setSettingId(response.data.mySettings);
      } catch (err) {
        console.error(err);
      }
    };
    getExam();
  }, [id]);

  useEffect(() => {
    const getSetting = async () => {
      if (settingId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/settings/${settingId}`);
          const settingsQuestions = response.data.questions;
          const mcqQuestionsArray = Array.from({ length: examData.MCQs }, (_, index) => ({
            id: `MCQ${index + 1}`,
            type:'MCQ',
            weight: settingsQuestions[index]?.weight || 0,
            correctAnswer: settingsQuestions[index]?.correctAnswer || null,
          }));
          const tfQuestionsArray = Array.from({ length: examData.TFs }, (_, index) => ({
            id: `TF${index + 1}`,
            type:'TF',
            weight: settingsQuestions[index]?.weight || 0,
            correctAnswer: settingsQuestions[index]?.correctAnswer || null,
          }));
          const textQuestionArray = Array.from({ length: examData.Text }, (_, index) => ({
            id: `Text${index + 1}`,
            type:'Text',
            weight: settingsQuestions[index]?.weight || 0,
          }));
          setQuestions([...mcqQuestionsArray, ...tfQuestionsArray, ...textQuestionArray]);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getSetting();
  }, [examData, settingId]);

  const editSetting = async (index) => {
    const question = questions[index];
    const updatedData = {
        number: question.id, 
        type: question.type, 
        weight: question.weight,
        correctAnswer: question.correctAnswer,
    };
    console.log(question,settingId,updatedData)

    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/settings/${settingId}`,
            updatedData,{withCredentials: true , headers: {Authorization:`Bearer ${token}`}}
        );

        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], ...response.data.questions[index] };
        setQuestions(updatedQuestions);
    } catch (error) {
        console.error('Error updating settings:', error);
    }
};


  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const updatedFiles = uploadedFiles.map((file) => ({
        name: file.name,
        status: "Uploaded successfully",
      }));
      setUploadedFiles(updatedFiles);
      setUploading(false);
      setHidden(false);
    }, 2000);
  };

  const handleSaveSettings = () => {
    setDisabled(false);
  };

  return (
    <div className="upload-exam-container">
      <h2>Instructions</h2>
      <p>Ensure the exam photos are clear and readable.</p>
      <p>You can Update a question answer by updating the answer and click in the {<BsPencil />} icon in the Action column.</p>
      <p>You can give the mark of the question to all students by changing the answer to correct by using the {<BsCheckCircleFill />} icon in the Action column.</p>
      <p>If there is no changes in the Exam Marks Settings just click on Save Settings Button.</p>
      <h2>Exam Marks Setting</h2>
      <div className="mcq-questions-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Question</th>
              <th>Weight</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question.id}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={question.weight}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].weight = parseInt(e.target.value);
                      setQuestions(updatedQuestions);
                    }}
                  />
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="dark" id={`dropdown-${index}`}>
                      {question.correctAnswer ? (
                        <BsCheckCircleFill />
                      ) : (
                        <BsCircleFill />
                      )}
                      &nbsp;{question.correctAnswer || "Choose answer"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {['A', 'B', 'C', 'D'].map(option => (
                        <Dropdown.Item
                          key={option}
                          onClick={() => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].correctAnswer = option;
                            setQuestions(updatedQuestions);
                          }}
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <Button
                    className="action-btn"
                    onClick={() => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].correctAnswer = "correct";
                      setQuestions(updatedQuestions);
                    }}
                  >
                    <BsCheckCircleFill />
                  </Button>
                  <Button className="action-btn" variant="primary"
                  onClick={() => editSetting(index)}>
                    <BsPencil />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant="primary"
          onClick={handleSaveSettings}
          className="float-right setting-btn"
        >
          Confirm Settings
        </Button>
      </div>
      <h2>Upload Exam Answers</h2>
      <form onSubmit={handleUpload}>
        <div className="upload-form">
          <label htmlFor="examImages">Upload Exam</label>
          <FaFileUpload size={24} />
          <input
            type="file"
            id="examImages"
            name="examImages"
            multiple
            required
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className={`upload-page-btn ${disabled ? 'disabled-btn' : ''}`}
          disabled={disabled}
          onClick={() => setHidden(false)}
        >
          {uploading ? "Uploading..." : "Upload Exam"}
        </button>
        {!hidden && (
          <div>
            <Link to="/grade-exams">
              <h2>Go Grade Exam</h2>
              <button className="upload-page-btn">Go Grade Exam</button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadExamPage;
