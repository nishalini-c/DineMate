import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Assets/Css/Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleError = (err) => toast.error(err);
  const handleSuccess = () => toast.success("User registered successfully !");

  const validateForm = () => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address' }));
      isValid = false;
    }

    if (!inputValue.username.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Please enter a username' }));
      isValid = false;
    }

    if (inputValue.password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.REACT_APP_SERVER}/api/users/register`,
        inputValue,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/resveration");
        }, 1000);
      } else {
        handleSuccess(message);
      }
    } catch (error) {
      handleError('An error occurred during register');
      console.log(error);
    }

    setInputValue({
      email: '',
      password: '',
      username: '',
    });
  };

  return (
    <div className="register-container">
      <h5>Register</h5>
      <br/>
      
      <input
        type="text"
        name="username"
        value={inputValue.username}
        onChange={handleOnChange}
        placeholder="Username"
        className="register-input"
      />
      
  <input
        type="email"
        name="email"
        value={inputValue.email}
        onChange={handleOnChange}
        placeholder="Email"
        className="register-input"
      />
      
       <input
        type="password"
        name="password"
        value={inputValue.password}
        onChange={handleOnChange}
        placeholder="Create Password"
        className="register-input"
      />
      {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
      {errors.username && <span className="error" style={{ color: 'red' }}>{errors.username}</span>}
      {errors.password && <span className="error"style={{ color: 'red' }}>{errors.password}</span>}
      <br/>
      <button onClick={handleSubmit} className="register-button">
        Register
      </button>
      <br />
      <br />
      <span>Already a member?</span> <Link to="/login">Login Now</Link>
      <ToastContainer />
    </div>
  );
};

export default Register;
