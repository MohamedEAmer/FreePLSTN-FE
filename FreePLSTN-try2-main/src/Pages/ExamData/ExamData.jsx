import React, { useState , useContext , useEffect} from "react";
import { Button, Form, Dropdown, Col, Card } from "react-bootstrap";
import {
  BsArrowRight,
  BsTrash,
  BsCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import "./ExamData.css";
import { useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'

const ExamData = () => {
  const [showCreateExamSection, setShowCreateExamSection] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [numMCQs, setNumMCQs] = useState(0);
  const [totalMarks,setTotalMarks] = useState(0)
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [savedMcqQuestions, setSavedMcqQuestions] = useState([]);
  const [savedTfQuestions, setSavedTfQuestions] = useState([]);
  const [savedTextQuestions, setSavedTextQuestions] = useState([]);
  const [totalExamMarks, setTotalExamMarks] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningCallback, setWarningCallback] = useState(null);
  const [numWritten, setNumWritten] = useState(0);
  const [writtenQuestions, setWrittenQuestions] = useState([]);
  const [numTFs, setNumTFs] = useState(0);
  const [tfQuestions, setTFQuestions] = useState([]);
  const [error, setError] = useState('');
  const [exam , setExam] = useState([])
  const [dropdownItems, setDropdownItems] = useState(["mcq", "trueFalse", "written"]);

  const {id} = useParams()
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  
  useEffect(()=>{
    const getExam =async () =>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/exams/${id}`)
        setExam(response.data)
        // console.log(exam)
        setTotalMarks(response.data.totalMarks)
        setNumMCQs(response.data.MCQs)
        setNumTFs(response.data.TFs)
        setNumWritten(response.data.Text)
      } catch (err) {
        console.log(err)
      }
    }
    getExam()
  },[])


  const createSetting = async (e , number , type , weight , correctAnswer)=>{
    e.preventDefault();
    // setIsSubmitting(true)
    const settingData = new FormData();

    settingData.set('number',number)
    settingData.set('type',type)
    settingData.set('weight',weight)
    settingData.set('correctAnswer',correctAnswer)

    console.log(settingData)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/settings/exam/${id}` , settingData , {withCredentials: true , headers: {Authorization:`Bearer ${token}`}})

    } catch (err) {
      setError(err.response.data.message)
    }
    //  finally{
    //   setIsSubmitting(false)
    // }

  }

  const createMask = async (e)=>{
    e.preventDefault();
    // setIsSubmitting(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/masks/exam/${id}`, id ,{withCredentials: true , headers: {Authorization:`Bearer ${token}`}})
      if(response.status == 201 || response.status == 200 ){
        const path = `/`
        return navigate(path)
      }
    } catch (err) {
      setError(err.response.data.message)
    }
    //  finally{
    //   setIsSubmitting(false)
    // }

  }





  const handleExamSettingData = (e) => {
    e.preventDefault();
    setShowCreateExamSection(true);
  };

  const handleProceed = () => {
    if (selectedQuestionType === null) {
      showStatementWarning("Please select question type.");
      return;
    }
    if (selectedQuestionType === "mcq") {
      if (numMCQs <= 0) {
        showStatementWarning("Please enter a valid number of MCQs.");
        return;
      }
      const questions = [];
      for (let i = 1; i <= numMCQs; i++) {
        questions.push({
          id: i,
          weight: 0,
          correctAnswer: "",
          question: "",
        });
      }
      setMCQQuestions(questions);
    }
  };

  const handleAddNewMCQQuestion = () => {
    const newQuestion = {
      id: mcqQuestions.length + 1,
      weight: 0,
      correctAnswer: "",
      question: "",
    };
    setMCQQuestions([...mcqQuestions, newQuestion]);
    setNumMCQs(mcqQuestions.length + 1);
  };

  const handleSaveMcqQuestion = () => {
    if (mcqQuestions.length === 0) {
      showStatementWarning("You cannot save a MCQ question with zero questions.");
      return;
    }
    if (mcqQuestions.every((question) => question.correctAnswer && question.weight > 0)) {
      const savedMcqQuestion = {
        type: "mcq",
        numQuestions: numMCQs,
        totalWeight: mcqQuestions.reduce((acc, question) => acc + question.weight, 0),
        questions: mcqQuestions,
      };
      setSavedMcqQuestions([...savedMcqQuestions, savedMcqQuestion]);
      setTotalExamMarks(prevMarks => prevMarks + savedMcqQuestion.totalWeight);
      setDropdownItems((prevItems) => prevItems.filter(item => item !== selectedQuestionType));
      setSelectedQuestionType(null);
    } else {
      showStatementWarning("Please fill in all question data before saving.");
    }
  };

  // const mcqHandler = (e)=>{
  //   handleSaveMcqQuestion();
  //   createSetting(e);

  // }


  const handleDeleteMCQRow = (index) => {
    showConfirmWarning("Are you sure you want to delete this MCQ row?", () => {
      const updatedQuestions = [...mcqQuestions];
      updatedQuestions.splice(index, 1);
      setMCQQuestions(updatedQuestions);
      setNumMCQs(mcqQuestions.length - 1);
    });
  };


  const handleDeleteTFRow = (index) => {
    showConfirmWarning("Are you sure you want to delete this T/F row?", () => {
        const updatedQuestions = [...tfQuestions];
        updatedQuestions.splice(index, 1);
        setTFQuestions(updatedQuestions);
        setNumTFs(updatedQuestions.length);
    });
  };


  const handleDeleteTextRow = (index) => {
    showConfirmWarning("Are you sure you want to delete this Text row?", () => {
        const updatedQuestions = [...writtenQuestions];
        updatedQuestions.splice(index, 1);
        setWrittenQuestions(updatedQuestions);
        setNumWritten(updatedQuestions.length);
    });
  };

  const handleCloseQuestionSection = () => {
    showConfirmWarning("Are you sure you want to close this section? Unsaved changes will be lost.", () => {
      setSelectedQuestionType(null);
      setMCQQuestions([]);
      setNumMCQs(0);
    });
  };

  const showConfirmWarning = (message, callback) => {
    setWarningMessage(message);
    setWarningCallback(() => callback);
    setShowWarning(true);
  };

  const showStatementWarning = (message) => {
    setWarningMessage(message);
    setShowWarning(true);
  };

  const confirmWarning = () => {
    if (warningCallback) {
      warningCallback();
    }
    setShowWarning(false);
    setWarningCallback(null);
  };

  const cancelWarning = () => {
    setShowWarning(false);
    setWarningCallback(null);
  };

  const handleProceedTF = () => {
    if (numTFs <= 0) {
      showStatementWarning("Please enter a valid number of True/False questions.");
      return;
    }
    const questions = [];
    for (let i = 1; i <= numTFs; i++) {
      questions.push({
        id: i,
        weight: 0,
        correctAnswer: "",
        question: "",
      });
    }
    setTFQuestions(questions);
  };
  
  const handleAddNewTFQuestion = () => {
    const newQuestion = {
      id: tfQuestions.length + 1,
      weight: 0,
      correctAnswer: "",
      question: "",
    };
    setTFQuestions([...tfQuestions, newQuestion]);
    setNumTFs(tfQuestions.length + 1);
  };
  
  const handleSaveTFQuestion = () => {
    if (tfQuestions.length === 0) {
      showStatementWarning("You cannot save a True/False question with zero questions.");
      return;
    }
    if (tfQuestions.every((question) => question.correctAnswer && question.weight > 0)) {
      const savedTfQuestion = {
        type: "trueFalse",
        numQuestions: numTFs,
        totalWeight: tfQuestions.reduce((acc, question) => acc + question.weight, 0),
        questions: tfQuestions,
      };
      setSavedTfQuestions([...savedTfQuestions, savedTfQuestion]);
      setTotalExamMarks(prevMarks => prevMarks + savedTfQuestion.totalWeight);
      setDropdownItems((prevItems) => prevItems.filter(item => item !== selectedQuestionType));
      // setTFQuestions([]);
      // setNumTFs(0);
      setSelectedQuestionType(null);
    } else {
      showStatementWarning("Please fill in all question data before saving.");
    }
  };

  const handleProceedWritten = () => {
    if (numWritten <= 0) {
      showStatementWarning("Please enter a valid number of Written questions.");
      return;
    }
    const questions = [];
    for (let i = 1; i <= numWritten; i++) {
      questions.push({
        id: i,
        weight: 0,
        question: "",
      });
    }
    setWrittenQuestions(questions);
  };
  
  const handleAddNewWrittenQuestion = () => {
    const newQuestion = {
      id: writtenQuestions.length + 1,
      weight: 0,
      question: "",
    };
    setWrittenQuestions([...writtenQuestions, newQuestion]);
    setNumWritten(writtenQuestions.length + 1);
  };
  
  const handleSaveWrittenQuestion = () => {
    if (writtenQuestions.length === 0) {
      showStatementWarning("You cannot save a written question with zero questions.");
      return;
    }
    if (writtenQuestions.every((question) => question.weight > 0)) {
      const savedTextQuestion = {
        type: "written",
        numQuestions: numWritten,
        totalWeight: writtenQuestions.reduce((acc, question) => acc + question.weight, 0),
        questions: writtenQuestions,
      };
      setSavedTextQuestions([...savedTextQuestions, savedTextQuestion]);
      setTotalExamMarks(prevMarks => prevMarks + savedTextQuestion.totalWeight);
      setDropdownItems((prevItems) => prevItems.filter(item => item !== selectedQuestionType)); 
      setSelectedQuestionType(null);
    } else {
      showStatementWarning("Please fill in all question data before saving.");
    }
  };
  
  
  
  // const handleDownload = () => {
  //   const filePath = '../../../../../../SW-BE/server/MyExams/Test002-English-MCQs30TFs15Text2.pdf'; // Update this to your actual file path

  //   const link = document.createElement('a');
  //   link.href = filePath;
  //   // link.setAttribute('download', 'Test002-English-MCQs30TFs15Text2.pdf'); // Optional: specify the default file name
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  










  return (
    <div className="exam-data-container">
        <div className="exam-download-container">
            <h2>You can Download Your Exam From Here</h2>
            <Button>
                Download Exam PDF <BsArrowRight />
            </Button>
        </div>

        <div className="exam-settings-container">
            <h2>If you want to correct your exam please fill out the exam data setting</h2>
            <Button onClick={handleExamSettingData}>
                Exam Settings <BsArrowRight />
            </Button>
        </div>


      {showCreateExamSection && (
        <div className="create-exam-setting-section">
          <h3>Add Exam Settings , Total Marks : ({`${totalMarks}`})</h3>
          <Dropdown className="question-type-dropdown w-100">
            <Dropdown.Toggle variant="dark" id="question-type-dropdown">
              Choose Question Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {dropdownItems.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => setSelectedQuestionType(item)}>
                  {item === "mcq" ? "MCQ" : item === "trueFalse" ? "True/False" : "Written"}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

            {selectedQuestionType === "mcq" && (
                <div>
                <Form.Group as={Col} controlId="formGridNumMCQs">
                    <Form.Label>Number of MCQs</Form.Label>
                    <Form.Control
                    type="number"
                    value={numMCQs}
                    onChange={(e) => setNumMCQs(parseInt(e.target.value))}
                    />
                </Form.Group>

                <Button className="setting-btn" onClick={handleProceed}>Confirm</Button>

                {mcqQuestions.length > 0 && (
                    // {setType('MCQ')}
                    <div className="mcq-questions-table">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>MCQ</th>
                            <th>Weight</th>
                            <th>Correct Answer</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mcqQuestions.map((question, index) => (
                            <tr key={index}>
                            <td>MCQ {index + 1}</td>
                            <td>
                                <Form.Control
                                type="number"
                                value={question.weight}
                                onChange={(e) => {
                                    const updatedQuestions = [...mcqQuestions];
                                    updatedQuestions[index].weight = parseInt(e.target.value);
                                    setMCQQuestions(updatedQuestions);
                                    // setWeight(question.weight)
                                    // setType('MCQ')
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
                                    <Dropdown.Item
                                    onClick={() => {
                                        const updatedQuestions = [...mcqQuestions];
                                        updatedQuestions[index].correctAnswer = "A";
                                        setMCQQuestions(updatedQuestions);
                                        // setCorrectAnswer('A')
                                    }}
                                    >
                                    A
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                    onClick={() => {
                                        const updatedQuestions = [...mcqQuestions];
                                        updatedQuestions[index].correctAnswer = "B";
                                        setMCQQuestions(updatedQuestions);
                                        // setCorrectAnswer('B')
                                    }}
                                    >
                                    B
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                    onClick={() => {
                                        const updatedQuestions = [...mcqQuestions];
                                        updatedQuestions[index].correctAnswer = "C";
                                        setMCQQuestions(updatedQuestions);
                                        // setCorrectAnswer('C')
                                    }}
                                    >
                                    C
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                    onClick={() => {
                                        const updatedQuestions = [...mcqQuestions];
                                        updatedQuestions[index].correctAnswer = "D";
                                        setMCQQuestions(updatedQuestions);
                                        // setCorrectAnswer('D')
                                    }}
                                    >
                                    D
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>
                                <Button
                                  className="action-btn"
                                  onClick={(e)=>{createSetting(e,`MCQ${index+1}` , 'MCQ' ,question.weight, question.correctAnswer)}}
                                >
                                  <BsCheckCircleFill />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteMCQRow(index)}
                                >
                                    <BsTrash />
                                </Button>
                            </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Button 
                        variant="success"
                        onClick={handleAddNewMCQQuestion}
                        className="float-right setting-btn"
                    >
                        Add New MCQ Question
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveMcqQuestion}
                        className="float-right setting-btn"
                    >
                        Save MCQ Questions
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCloseQuestionSection}
                        className="float-right setting-btn"
                    >
                        Close
                    </Button>
                    </div>
                )}
                </div>
            )}
            {selectedQuestionType === "trueFalse" && (
            <div>
                <Form.Group as={Col} controlId="formGridNumTFs">
                <Form.Label>Number of True/False Questions</Form.Label>
                <Form.Control
                    type="number"
                    value={numTFs}
                    onChange={(e) => setNumTFs(parseInt(e.target.value))}
                />
                </Form.Group>

                <Button className="setting-btn" onClick={handleProceedTF}>Confirm</Button>

                {tfQuestions.length > 0 && (
                <div className="tf-questions-table">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>True/False</th>
                        <th>Weight</th>
                        <th>Correct Answer</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tfQuestions.map((question, index) => (
                        <tr key={index}>
                            <td>TF {index + 1}</td>
                            <td>
                            <Form.Control
                                type="number"
                                value={question.weight}
                                onChange={(e) => {
                                const updatedQuestions = [...tfQuestions];
                                updatedQuestions[index].weight = parseInt(e.target.value);
                                setTFQuestions(updatedQuestions);
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
                                <Dropdown.Item
                                    onClick={() => {
                                    const updatedQuestions = [...tfQuestions];
                                    updatedQuestions[index].correctAnswer = "T";
                                    setTFQuestions(updatedQuestions);
                                    }}
                                >
                                    T
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                    const updatedQuestions = [...tfQuestions];
                                    updatedQuestions[index].correctAnswer = "F";
                                    setTFQuestions(updatedQuestions);
                                    }}
                                >
                                    F
                                </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </td>
                            <td>
                              <Button
                                className="action-btn"
                                onClick={(e)=>{createSetting(e,`TF${index+1}` , 'TF' ,question.weight, question.correctAnswer)}}
                              >
                                <BsCheckCircleFill />
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteTFRow(index)}
                              >
                                  <BsTrash />
                              </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <Button
                    variant="success"
                    onClick={handleAddNewTFQuestion}
                    className="float-right setting-btn"
                    >
                    Add New True/False Question
                    </Button>
                    <Button
                    variant="primary"
                    onClick={handleSaveTFQuestion}
                    className="float-right setting-btn"
                    >
                    Save True/False Questions
                    </Button>
                    <Button
                    variant="secondary"
                    onClick={handleCloseQuestionSection}
                    className="float-right setting-btn"
                    >
                    Close
                    </Button>
                </div>
                )}
            </div>
            )}

            {selectedQuestionType === "written" && (
            <div>
                <Form.Group as={Col} controlId="formGridNumWritten">
                <Form.Label>Number of Written Questions</Form.Label>
                <Form.Control
                    type="number"
                    value={numWritten}
                    onChange={(e) => setNumWritten(parseInt(e.target.value))}
                />
                </Form.Group>

                <Button className="setting-btn" onClick={handleProceedWritten}>Confirm</Button>

                {writtenQuestions.length > 0 && (
                <div className="written-questions-table">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>Question</th>
                        <th>Weight</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {writtenQuestions.map((question, index) => (
                        <tr key={index}>
                            <td>Text {index + 1}</td>
                            <td>
                            <Form.Control
                                type="number"
                                value={question.weight}
                                onChange={(e) => {
                                const updatedQuestions = [...writtenQuestions];
                                updatedQuestions[index].weight = parseInt(e.target.value);
                                setWrittenQuestions(updatedQuestions);
                                }}
                            />
                            </td>
                            <td>
                              <Button
                                className="action-btn"
                                onClick={(e)=>{createSetting(e,`Text${index+1}` , 'Text' ,question.weight, question.correctAnswer)}}
                              >
                                <BsCheckCircleFill />
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteTextRow(index)
                                }
                              >
                                <BsTrash />
                              </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <Button
                    // variant="success"
                    onClick={handleAddNewWrittenQuestion}
                    className="float-right setting-btn"
                    >
                    Add New Written Question
                    </Button>
                    <Button
                    // variant="primary"
                    onClick={handleSaveWrittenQuestion}
                    className="float-right setting-btn"
                    >
                    Save Written Questions
                    </Button>
                    <Button
                    // variant="secondary"
                    onClick={handleCloseQuestionSection}
                    className="float-right setting-btn"
                    >
                    Close
                    </Button>
                </div>
                )}
            </div>
            )}





          {savedMcqQuestions.length > 0 && (
            <div className="saved-questions">
              <h3>Saved MCQ Questions</h3>
              <ul>
                {savedMcqQuestions.map((question, index) => (
                  <li key={index}>
                    <Card>
                      <Card.Body>
                        <h5>
                          {question.type} Question {index + 1 }
                        </h5>
                        <p>
                          Number of questions: {question.numQuestions}
                        </p>
                        <p>
                          Total weight: {question.totalWeight}
                        </p>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {savedTfQuestions.length > 0 && (
            <div className="saved-questions">
              <h3>Saved T/F Questions</h3>
              <ul>
                {savedTfQuestions.map((question, index) => (
                  <li key={index}>
                    <Card>
                      <Card.Body>
                        <h5>
                          {question.type} Question {index + 1 }
                        </h5>
                        <p>
                          Number of questions: {question.numQuestions}
                        </p>
                        <p>
                          Total weight: {question.totalWeight}
                        </p>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {savedTextQuestions.length > 0 && (
            <div className="saved-questions">
              <h3>Saved Text (Written) Questions</h3>
              <ul>
                {savedTextQuestions.map((question, index) => (
                  <li key={index}>
                    <Card>
                      <Card.Body>
                        <h5>
                          {question.type} Question {index + 1 }
                        </h5>
                        <p>
                          Number of questions: {question.numQuestions}
                        </p>
                        <p>
                          Total weight: {question.totalWeight}
                        </p>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {totalExamMarks > 0 && (
            <div>
                <h3>The Exam Total Marks = {totalExamMarks}</h3>
                <Button className="setting-btn"
                onClick={createMask}
                >
                    Save Exam
                </Button>
            </div>
          )}
          








        </div>
      )}

      {showWarning && (
        <div
          className="warning-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid black",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            animation: "fadeInOut 0.3s forwards",
          }}
        >
          <h4>Warning</h4>
          <p>{warningMessage}</p>
          {warningCallback ? (
            <>
              <Button variant="secondary" onClick={cancelWarning} className="mr-2">
                No
              </Button>
              <Button variant="primary" onClick={confirmWarning}>
                Yes
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={cancelWarning}>
              Close
            </Button>
          )}
        </div>
      )}
      {showWarning && (
        <div
          className="warning-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={cancelWarning}
        />
      )}
    </div>
  );
};

export default ExamData;
