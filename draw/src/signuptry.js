import React, { useState } from "react";
import "./login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




var url = "http://localhost:50434/api/users";



export default function SignUp() {
  const [Email, setEmail] = useState(null);
  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [UserID, setUserID] = useState(0);
  const [Password, setPassword] = useState(null);
  const navigate = useNavigate();


  const btnSignUp = async () => {
    let s = await AddUser(
      FirstName,
      LastName,
      Email,
      Password
    );
    console.log("returned value=" + s);

    setUserID({ UserID: s.User_ID });

    console.log("user_id is =" + UserID);

    if (s == null) {
      alert("didnt insert into db!");
    } else {
      alert("נרשמת בהצלחה!");

      navigate('/', {state: {fullname: `${FirstName} ${LastName}`}})

    }
  };

  const AddUser = async (FirstName, LastName, Email, Password) => {
    let returnedObj = null;

    let obj2Send = {
      First_Name: FirstName,
      Last_Name: LastName,
      Email: Email,
      Pass: Password
    };

    await fetch(url, {
      method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
      body: JSON.stringify(obj2Send),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        console.log(data);
        if (!data.toString().includes("could not insert")) {
          console.log(data.email);
          console.log(data.pass);
          returnedObj = data;
        } else {
          console.log("didnt inserted!");
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });

    return returnedObj;
  };





  return (
    <div className="background-image">
    <div className="login-form">
      <h2>Sign Up &#128523; </h2>
      <div className="signup-style">
        <label className="signup-style">
          First name
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
          />
        </label>
      </div>

      <div className="signup-style">
        <label className="signup-style">
          Last name
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
          />
        </label>
      </div>

      <div className="signup-style">
        <label className="signup-style">
          Email address
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email address"
          />
        </label>
      </div>

      <div className="signup-style">
        <label className="signup-style">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </label>
      </div>

      <button className="button-LoginSign" onClick={btnSignUp}>Sign Up </button>
      <div style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link to="/login" className="link-style">
          Login here
        </Link>
      </div>
    </div>
  </div>
  );
}
