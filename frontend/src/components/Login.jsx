import React, { useState } from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    // Clear the corresponding error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleError = (err) =>
    toast.error(err);

  const handleSuccess = (msg) =>
  toast.success("Your Login successfully!"); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If form is not valid, return early
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/users/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, message, role} = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          if (role === "admin") {
            // Redirect to the admin panel
            navigate("/admin");
          } else {
          navigate("/resveration"); 
        }
      }, 1000);
      } 
    } catch (error) {
      handleError('An error occurred during login');
      console.log(error);
    }

    setInputValue({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <h5>Login</h5>
      <br />
      
      <input type="text" name="email" value={email} onChange={handleOnChange} placeholder="Email" className="login-input"
      />
      {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
      <br/>

      <input
        type="password"
        name="password"
        value={password}
        onChange={handleOnChange}
        placeholder="Password"
        className="login-input"
      />
      {errors.password && <span className="error" style={{ color: 'red' }}>{errors.password}</span>}
      <br/>
      
      <button onClick={handleSubmit} className="login-button">
        Login
      </button>
      
      <br/><br/> <br/>
      <span>Not a member?</span> <Link to="/register">Register</Link>
      
      <ToastContainer/>
    </div>
  );
};

export default Login;
