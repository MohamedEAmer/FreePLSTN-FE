import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import "./Login-Registration.css";
import Lottie from "lottie-react";
import LoginAnime from "../../images/fqB9DVSy6f.json";
import axios from 'axios'

const RegistrationPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [error , setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value}
    })
  }

  const registerUser = async (e)=>{
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;

      if(!newUser){
        setError("Couldn't register user. Please try again.")
      }
      navigate('/login')
    } catch (error) {
        setError(error.response.data.message);
    }
    //  finally{
    //   setIsSubmitting(false)
    // }
  }


  return(
  <div className="register-container">
    <form className="form-group" onSubmit={registerUser}>
      
      <h2>Register</h2>

      <div className="rl-images">
        <Lottie animationData={LoginAnime} loop={true} />
      </div>
      <div className="social-signup"></div>
      <div>
        <input type="text" name="name"
              value={userData.name}
              onChange={changeInputHandler}
              autoFocus
              required placeholder="Full Name" />
      </div>
      <div>
        <input type="email" name="email"               
              value={userData.email}
              onChange={changeInputHandler}
              required placeholder="email" />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={changeInputHandler}
          required
          placeholder="password"
        />
      </div>
      <div>
        <input
          type="password"
          name="password2"
          value={userData.password2}
          onChange={changeInputHandler}
          required
          placeholder="confirmPassword"
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?{" "}
      <Link to="/login" className="landing-button">
        Login
      </Link>
    </p>
  </div>)
  

};


export default RegistrationPage;
