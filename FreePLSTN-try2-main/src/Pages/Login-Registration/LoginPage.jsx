// LoginPage.js
import { Link , useNavigate} from "react-router-dom";
import LoginAnime from "../../images/fqB9DVSy6f.json";
import "./Login-Registration.css";
import Lottie from "lottie-react";
import React, { useState , useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/userContext'

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [error , setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value}
    })
  }
  const {setCurrentUser} = useContext(UserContext)


  const loginUser = async (e)=>{
    e.preventDefault();
    setError('');
    console.log(userData);
    // setIsSubmitting(true)

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", userData);
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
    } catch (error) {
      console.log(error);
    } 
    // finally{
    //   setIsSubmitting(false)
    // }
  }

  return (
    <div className="login-container">
      <form className="form-group" onSubmit={loginUser}>
        <h2>Sign In</h2>
        <div className="rl-images">
          <Lottie animationData={LoginAnime} loop={true} />
        </div>
        <div className="social-signup"></div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={changeInputHandler}
          required
          className="Email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={changeInputHandler}
          required
          className="password"
        />
        <button type="submit" className="btn primary lo">
          Login
        </button>
      </form>
      <small>
        You Don't have an account?
        <Link to="/register" className="landing-button">
          {" "}
          Register
        </Link>
      </small>
    </div>
  );
};

export default LoginPage;
