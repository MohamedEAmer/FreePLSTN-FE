import React from "react";
import { Carousel } from 'react-bootstrap';
import Lottie from "lottie-react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { 
  FaShapes, FaFileAlt, FaQuestionCircle, FaCheckSquare, FaBalanceScale, FaPen, FaMagic, FaBullseye, FaDesktop, FaCalculator, FaMicroscope, FaLanguage, FaUniversity, FaCode, FaPlug, FaPalette, FaRegCheckCircle 
} from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

import slide1Animation from "../../images/6bZlW7kmHv.json";
import slide2Animation from "../../images/iMa9iapyli.json";
import htuslide1Animation from "../../images/XTMpMHh2cT.json";
import htuslide2Animation from "../../images/tRFCz4SBJB.json";
import "./Landing.css"; 
import CustomNavbar from "./CustomNavbar"; 

const subjects = [
  { icon: <FaCalculator />, label: "Math" },
  { icon: <FaMicroscope />, label: "Biology" },
  { icon: <FaLanguage />, label: "Languages" },
  { icon: <FaUniversity />, label: "History" },
  { icon: <FaCode />, label: "Programming" },
  { icon: <FaPlug />, label: "Electronics" },
  { icon: <FaPalette />, label: "Art" },
  { icon: <FaShapes />, label: "Geometry" },
];

const create = [
  { icon: <FaFileAlt />, label: "Grade exams in paper format" },
  { icon: <FaQuestionCircle />, label: "Multiple types of questions" },
  { icon: <FaCheckSquare />, label: "MCQ" },
  { icon: <FaBalanceScale />, label: "True/False" },
  { icon: <FaPen />, label: "Short answer" },
  { icon: <FaMagic />, label: "Automatic bubble grading" },
  { icon: <FaBullseye />, label: "Maximum accuracy" },
  { icon: <FaDesktop />, label: "Intuitive interface" },
];

const LandingPage = () => {
  return (
    <div className="landing-container">
      <CustomNavbar className="landing-navbar" />
      <div className="hero-section"  style={{marginBottom: '0px', padding:'30px'}}
>
        <Carousel
          className="hero-carousel"
          interval={3000}
          controls={false} 
          indicators={true} 
          slide 
        >
          <Carousel.Item>
            <div className="carousel-item-container">
              <div className="carousel-content">
                <h2>Tailor-Made Exam Solutions</h2>
                <p>
                  <span className="highlight">freePLSTN's</span> builds paper layout and structure that align with your test needs
                </p>
                <button className="btn btn-primary">
                  Discover Features <span className="arrow-icon">&rarr;</span>
                </button>
              </div>
              <div className="carousel-lottie">
                <Lottie animationData={slide2Animation} />
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-container">
              <div className="carousel-content">
                <h2>Grading Taking Too Long?</h2>
                <p>
                  Grade exams with a single hand using <span className="highlight">freePLSTN's</span> fast-rate exam evaluation system!
                </p>
                <button className="btn btn-primary">
                  Learn More <span className="arrow-icon">&rarr;</span>
                </button>
              </div>
              <div className="carousel-lottie">
                <Lottie animationData={slide1Animation} style={{ width: '65%', marginLeft: '100px', marginTop: '50px' }} />
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
          

      <div className="arrow-down-container">
        <MdOutlineKeyboardDoubleArrowDown className="arrow-down-icon"  style={{fontSize: '100px'}}/>
      </div>

      <div id="how-to-use" className="how-to-use-section">
        <div className="carousel-div">
          <Carousel
            className="how-to-use-carousel"
            interval={999999999999} 
            controls={false} 
            style={{marginTop: '50px', padding: ' 0px 100px'}}
          >
            <Carousel.Item>
              
              <div className="carousel-item-container">
                <div className="carousel-lottie">
                  <Lottie animationData={htuslide2Animation} style={{ width: '70%', height: 'auto' }} />
                </div>
                <div className="carousel-content">
                  <div>
                    <h2>Grade anything in no time!</h2>
                    <ul style={{ listStyleType: 'none', padding: 0, marginTop: '50px'}}>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Select a pre-made exam
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Upload your answers sheet
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Let freePLSTN's system generate the bubble grades
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Start evaluating answers with our intuitive interface
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn-primary">
                    Learn More <span className="arrow-icon">&rarr;</span>
                  </button>
                </div>
              </div>
              <div className="additional-content">
                <div>
                  <h2 className="highlight">Grade all Subjects</h2>
                  <div className="subs">
                    {subjects.map((subject, index) => (
                      <div key={index} className="sub">
                        <div className="icon">{subject.icon}</div>
                        <h6>{subject.label}</h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

                     <div className="black-section">
                <div className="black-section-group">
                  <h3>Time Saved</h3>
                  <p>70% +</p>
                </div>
                <div className="black-section-group">
                  <h3>Subjects</h3>
                  <p>10+</p>
                </div>
                <div className="black-section-group">
                  <h3>Accuracy</h3>
                  <p>99% +</p>
                </div>
              </div>
          
              <div className="carousel-item-container" style={{padding: '50px'}}>
                <div className="carousel-content">
                  <h2>Customize exams with flexible layouts</h2>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '16px', marginTop: '50px' }}>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Give your exam a unique name
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Choose from a variety of question types
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Add detailed question information
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '20px' }}>
                        <FaRegCheckCircle color="yellow" style={{ marginRight: '8px' }} />
                        Save your question effortlessly
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn-primary">
                    Explore Features <span className="arrow-icon">&rarr;</span>
                  </button>
                </div>
                <div className="carousel-lottie">
                  <Lottie animationData={htuslide1Animation} />
                </div>
              </div>
              <div className="additional-content">
                <div>
                  <h2 className="highlight">Design your desired paper</h2>
                  <div className="creates">
                    {create.map((item, index) => (
                      <div key={index} className="create-item">
                        <div className="icon">{item.icon}</div>
                        <h6>{item.label}</h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

       
              
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <footer className="footer">
      <div className="footer-logo">
        <BsFillCheckSquareFill className="logo-icon" />
        freePLSTN
      </div>
      <div className="footer-links">
        <div className="left-links">
          <ul>
            <li>
              <ScrollLink to="how-to-use" smooth={true} duration={500} className="footer-navlink">
                <a href="#" style={{textDecoration: 'none'}}>How to use</a>
              </ScrollLink>
            </li>
            <li>
              <NavLink className="footer-navlink" activeClassName="active" to="/create-exam">
                Create Exam
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="right-links">
          <ul>
            <li>
              <NavLink className="footer-navlink" activeClassName="active" to="/profile">
                <FaUser className="footer-icons" />
              </NavLink>
            </li>
            <li>
              <NavLink className="footer-navlink" activeClassName="active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="footer-navlink login" activeClassName="active" to="/register">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">&copy; 2024 FreePLSTN. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default LandingPage;
