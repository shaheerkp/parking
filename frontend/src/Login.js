import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import "./login.css"

const Login = () => {
    const navigate = useNavigate();
    const [username,setUsername]=useState(``)
    const [pass,setPass]=useState(``)
    const submitForm=(e)=>{
        e.preventDefault() 
        if(!username){
            alert(`Enter valid username`)
            return
        }
        if(!pass){
            alert(`Enter password`)
            return
        }
        if(username===`root`&&pass===`root123@#`){
            localStorage.setItem(`user`,true)
            navigate("/book");
        }else{
            alert(`Invalid username or password`)
        }
        
    }
  return (
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form onSubmit={submitForm}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                value={pass}
                onChange={(e)=>{setPass(e.target.value)}}

              />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              LOGIN
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
