import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { GrInProgress } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { BiSolidMedal } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./GradExams.css";
import { Questions } from "../../data";

function GradeExamsSlide({ images }) {
  const [filtersState, setFiltersState] = useState({});
  const [uniqueQOrders, setUniqueQOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    const uniqueOrders = [...new Set(Questions.map((q) => q.QOrder))];
    setUniqueQOrders(uniqueOrders);
  }, []);

  useEffect(() => {
    if (uniqueQOrders.length > 0) {
      const initialFiltersState = {};
      uniqueQOrders.forEach((order) => {
        initialFiltersState[order] = {
          grades: Array(
            Questions.filter((q) => q.QOrder === order).length
          ).fill(null),
          inputValues: Array(
            Questions.filter((q) => q.QOrder === order).length
          ).fill(""),
          inputDisabled: Array(
            Questions.filter((q) => q.QOrder === order).length
          ).fill(false),
          currentIndex: 0,
          filteredQuestions: Questions.filter((q) => q.QOrder === order),
        };
      });
      setFiltersState(initialFiltersState);
      setActiveFilter(uniqueQOrders[0]);
    }
  }, [uniqueQOrders]);

  const calculateOverallProgress = () => {
    const totalQuestions = Questions.length;
    const totalGraded = Object.values(filtersState).reduce(
      (acc, filter) =>
        acc + filter.grades.filter((grade) => grade !== null).length,
      0
    );
    return (totalGraded / totalQuestions) * 100;
  };

  const calculateTotalUngradedQuestions = () => {
    let ungradedQuestions = 0;
    Object.values(filtersState).forEach((filter) => {
      ungradedQuestions += filter.grades.filter(
        (grade) => grade === null
      ).length;
    });
    return ungradedQuestions;
  };

  const handleGradeChange = (index, grade) => {
    if (grade === "" || isNaN(grade)) {
      alert("Please enter a valid grade.");
      return;
    }

    const question = filtersState[activeFilter].filteredQuestions[index];
    if (grade < 0 || grade > question.fullMark) {
      alert(`Grade must be between 0 and ${question.fullMark}.`);
      return;
    }

    const newGrades = [...filtersState[activeFilter].grades];
    newGrades[index] = parseInt(grade);

    setFiltersState({
      ...filtersState,
      [activeFilter]: {
        ...filtersState[activeFilter],
        grades: newGrades,
      },
    });

    if (index + 1 === filtersState[activeFilter].filteredQuestions.length) {
      const nextFilterIndex =
        (uniqueQOrders.indexOf(activeFilter) + 1) % uniqueQOrders.length;
      setActiveFilter(uniqueQOrders[nextFilterIndex]);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index + 1);
    }
  };

  const handleInputChange = (event, index) => {
    const newInputValues = [...filtersState[activeFilter].inputValues];
    newInputValues[index] = event.target.value;

    setFiltersState({
      ...filtersState,
      [activeFilter]: {
        ...filtersState[activeFilter],
        inputValues: newInputValues,
      },
    });
  };

  return (
    <div className="container">
      <div className="remaining-counter">
        <span className="remaining-label">
          <GrInProgress
            style={{ marginRight: "5px", color: "yellow", fontSize: "36px" }}
          />
          <span>Ungraded Questions: {calculateTotalUngradedQuestions()}</span>
        </span>
        <div className="filter-buttons">
          {uniqueQOrders.map((order) => (
            <button
              key={order}
              className={`filter-button ${
                order === activeFilter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(order)}
            >
              Q {order}
            </button>
          ))}
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${calculateOverallProgress()}%` }}
        >
          <span className="progress-text">
            {Math.round(calculateOverallProgress())}%
          </span>
        </div>
      </div>
      <Carousel
        data-bs-theme="dark"
        interval={9999999999}
        className="carouselMain"
        touch="true"
        activeIndex={currentIndex}
        onSelect={(index) => setCurrentIndex(index)}
      >
        {filtersState[activeFilter]?.filteredQuestions.map(
          (Question, index) => (
            <Carousel.Item key={index} className="Carousel-Item">
              <img
                className="d-block w-100 sliderImage"
                src={Question.src}
                alt={Question.alt}
                style={{ border: "solid, #d3f36b, 3px" }}
              />
              <Carousel.Caption className="questionInputGrade">
                <div className="input-section">
                  <input
                    autoFocus
                    type="number"
                    placeholder="Enter Grade"
                    className="input-field"
                    required
                    value={filtersState[activeFilter]?.inputValues[index] || ""}
                    onChange={(event) => handleInputChange(event, index)}
                    max={Question.fullMark}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                  <button
                    className="send-button"
                    onClick={() =>
                      handleGradeChange(
                        index,
                        parseInt(filtersState[activeFilter]?.inputValues[index])
                      )
                    }
                  >
                    <MdSend className="inputArrow" />
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "-20px",
                  }}
                >
                  <div style={{ padding: "10px", flex: 1 }}>
                    <span
                      style={{
                        color: "#ffd700",
                        marginRight: "5px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <IoPersonSharp />
                    </span>
                    <span
                      style={{
                        color: "#d3f36b",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    >
                      Student ID
                    </span>
                    <span style={{ color: "#d3f36b", fontSize: "18px" }}>
                      {Question.studentId}
                    </span>
                  </div>
                  <div style={{ padding: "10px", flex: 1 }}>
                    <span
                      style={{
                        color: "#FF7F50",
                        marginRight: "5px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <BiSolidMedal />
                    </span>
                    <span
                      style={{
                        color: "#d3f36b",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    >
                      Full Mark
                    </span>
                    <span style={{ color: "#d3f36b", fontSize: "18px" }}>
                      {Question.fullMark}
                    </span>
                  </div>
                  <div style={{ padding: "10px", flex: 1 }}>
                    <span
                      style={{
                        color: "#3CB371",
                        marginRight: "5px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <FaBookmark />
                    </span>
                    <span
                      style={{
                        color: "#d3f36b",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    >
                      Graded
                    </span>
                    <span style={{ color: "#d3f36b", fontSize: "18px" }}>
                      {filtersState[activeFilter]?.grades[index] !== null
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                </div>
                <Link to="/view-results" className="update-button-link">
                  <button>Update</button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          )
        )}
      </Carousel>
    </div>
  );
}

export default GradeExamsSlide;
