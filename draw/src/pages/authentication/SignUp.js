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
  const [ConfirmPassword, setConfirmPassword] = useState(null);

  // הוספת עיצוב של שגיאה לשדה הרצוי
  const [errorDesignFirst,setErrorDesignFirst]=useState("1");
  const [errorDesignLast,setErrorDesignLast]=useState("2");
  const [errorDesignEmail,setErrorDesignEmail]=useState("3");
  const [errorDesignPassword,setErrorDesignPass]=useState("4");
  const [errorDesignConfirmPassword,setErrorDesignConfirmPassword]=useState("5");

  
// הוספת הודעת שגיאה לשדה הרצוי
  const [errorFirst,setErrorFirst]=useState("");
  const [errorLast,setErrorLast]=useState("");
  const [errorEmail,setErrorEmail]=useState("");
  const [errorPassword,setErrorPassword]=useState("");
  const [errorConfirmPassword,setErrorConfirmPassword]=useState("");

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
      window.location.reload()
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



  const validateForm = () => {
    let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mailChk= pattern.test(String(Email).toLowerCase());
     pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,14}/;

    let passChk = pattern.test(String(Password));
    if(FirstName!==null&&LastName!==null&&mailChk===true&&passChk===true&&Password===ConfirmPassword)
    {
      setErrorDesignFirst("")
      setErrorFirst('')
      setErrorDesignLast("")
      setErrorLast('')
      setErrorDesignEmail("")
      setErrorEmail('')
      setErrorPassword('')
      setErrorDesignPass("")
      setErrorConfirmPassword('')
      setErrorDesignConfirmPassword('')
      btnSignUp()

    }
    if(FirstName===null||FirstName==="")
    {
      setErrorDesignFirst("errorDesign")
      setErrorFirst('First Name required!!')
    }
    else{
      setErrorDesignFirst("0")
      setErrorFirst('')
    }
    if(LastName===null||LastName==="")
    {
      setErrorDesignLast("errorDesign")
      setErrorLast('Last Name required!!')
    }
    else{
      setErrorDesignLast("1")
      setErrorLast('')
    }
    if(mailChk!==true)
    {
      setErrorDesignEmail("errorDesign")
      setErrorEmail('invalid email adress')
    }
    else{
      setErrorDesignEmail("2")
      setErrorEmail('')
    }
    if(passChk!==true)
    {
      if(Password===null||Password==="")
      setErrorPassword('Password required!!')
      else
      setErrorPassword('required:letters,numbers,8 characters long!!')
      setErrorDesignPass("errorDesign")
    }
    else{
      setErrorPassword('')
      setErrorDesignPass("3")
    }
    if(Password!==ConfirmPassword)
    {
      if(ConfirmPassword===null||ConfirmPassword==="")
      setErrorConfirmPassword('confirmation required!!')
      else
      setErrorConfirmPassword('passwords dont match!')
      setErrorDesignConfirmPassword('errorDesign')
    }
    else{
      setErrorConfirmPassword('')
      setErrorDesignConfirmPassword('4')
    }
  //   if(passChk===true&&mailChk===true&&FirstName!=null&&LastName!=null)
  //   {
  //   setMsg("")

  //   }
  //  else
  //  setMsg('Error,wrong entries or not full')
    
  };

  return (
<div className="form-comp cfb">
      <h1>Create an Account!</h1>
      <form className="sign-up-form cfb">
        <label>
          First Name:
          <br/>
          <input id={errorDesignFirst} className="inputAuth"     onChange={(e) => setFirstName(e.target.value)}
            type="text" />
        </label>
        <div style={{ fontSize: 15, color: "red" }}>{errorFirst}</div>
        <label>
          Last Name:
          <br/>
          <input id={errorDesignLast} className="inputAuth"        onChange={(e) => setLastName(e.target.value)}
            type="text" />
        </label>
        <div style={{ fontSize: 15, color: "red" }}>{errorLast}</div>
        <label>
          Email:
          <br/>
          <input id={errorDesignEmail} className="inputAuth"    onChange={(e) => setEmail(e.target.value)}
            type="text"/>
        </label>
        <div style={{ fontSize: 15, color: "red" }}>{errorEmail}</div>
        <label>
          Password:
          <br/>
          <input id={errorDesignPassword} className="inputAuth"        onChange={(e) => setPassword(e.target.value)}
            type="password"/>
        </label>
        <div style={{ fontSize: 15, color: "red" }}>{errorPassword}</div>
        <label>
         Confirm Password:
          <br/>
          <input id={errorDesignConfirmPassword} className="inputAuth"        onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"/>
        </label>
        <div style={{ fontSize: 15, color: "red" }}>{errorConfirmPassword}</div>
        <br/>
        <button type="button" className="buttonAuth"  onClick={validateForm}>
          Sign Up!
        </button>
      </form>
    </div>

  );
}
