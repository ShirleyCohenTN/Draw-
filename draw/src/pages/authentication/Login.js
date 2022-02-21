import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link} from "react-router-dom";

var url = "http://localhost:50434/api/users";

//THE USER_ID is null for some reason

export default function Login() {
  const [Email, setEmail] = useState("");
  const [UserID, setUserID] = useState(0);
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();



  const btnLogin = async () => {
    console.log(1);

    console.log(Email + "," + Password);

    let s = await checkUserDetails(
      Email,
      Password
    );
    
    console.log("returned value=" + s + "and id = " +s.User_ID);
    setUserID(s.User_ID)

    if (s != null) 
    {
      console.log("user_id is =" + UserID);
      alert("התחברת בהצלחה!");
      navigate('/')

      console.log("h1");
     
    } else {
      console.log("err login!");
      alert("שגיאת התחברות");
    }
  };

  const checkUserDetails = async (Email, Password) => {
    console.log("we are in func checkUserDetails, email = " + Email);

    try {
      let result = await fetch(url + `?email=${Email}&pass=${Password}`, {
        method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      let resultData = result.json();
      console.log("meowwww");
      console.log(resultData);

      if (resultData) {
        return resultData;
      } else {
        alert("unable to login");
      }
    } catch (e) {
      console.log("Error Login", e);
      alert("lo mevin");
    }

  };





  return (
<div className="background-image">
        <div className="login-form">
          <h2>Log In &#128523; </h2>
          <p>Please login to start drawing! &#128513; </p>

          <label className="full-width-input">
            Email <FaUserAlt />
            <input
              // value={this.state.EmailValue}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </label>

          <label className="full-width-input">
            Password
            <input
              // value={this.state.PasswordValue}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </label>

          <button
            type="button"
            className="button-LoginSign"
            onClick={btnLogin}
          >
            Login
          </button>

          <div style={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="link-style">
              register
            </Link>
          </div>
        </div>
      </div>
  );
}
