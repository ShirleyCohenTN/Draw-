import React, { useState } from "react";
import '../../App.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




var url = "http://localhost:50434/api/users";

//אני עדיין מקבלת שגיאת 400 בעת הרשמה אבל זה כן נרשם לי

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

      navigate('/', {state: {userID : s.User_ID, fullName: s.First_Name + " " + s.Last_Name}})

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
<div className="form-comp cfb">
      <h1>Create an Account!</h1>
      <form className="sign-up-form cfb">
        <label>
          First Name:
          <br/>
          <input className="inputAuth"        onChange={(e) => setFirstName(e.target.value)}
            type="text" />
        </label>
        <label>
          Last Name:
          <br/>
          <input className="inputAuth"        onChange={(e) => setLastName(e.target.value)}
            type="text" />
        </label>
        <label>
          Email:
          <br/>
          <input className="inputAuth"    onChange={(e) => setEmail(e.target.value)}
            type="text"/>
        </label>
        <label>
          Password:
          <br/>
          <input className="inputAuth"        onChange={(e) => setPassword(e.target.value)}
            type="password"/>
        </label>
        <br/>
        <button className="buttonAuth"  onClick={btnSignUp}>
          Sign Up!
        </button>
      </form>
    </div>
  );
}
