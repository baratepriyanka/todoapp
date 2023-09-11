import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate} from "react-router-dom";
import Axios from 'axios';

export default function Signup() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/signup`;
  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputVal.email==="")
    {
      toast.error("please enter the Email");
    }else if(inputVal.password ===""){
     toast.error("please enter the Password");
    }else{
      Axios.post(url, {
        email: inputVal.email,
        password: inputVal.password,  
      },{headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
        toast.success("added data");
        // console.log(res)
        navigate('/')
      }).catch((error) => {
        console.log(error);
       alert("you have entered incorrect value");
      })
    }
  };
 
  return (
    <>
      <div className="post">
        <div className="container-app">
          <form className="form" onSubmit={handleSubmit}>
            <div className="formcontent">
              <h3 className="title">Register</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="text"
                  name="email"
                  className="form-control mt-1"
                  placeholder="john.doe@example.com"
                  value={inputVal.email}
                  onChange={handleChange}
                />
               
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={inputVal.password}
                  onChange={handleChange}
                />
               
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
              Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
