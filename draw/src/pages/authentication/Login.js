import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../App.css';
import {FaUserAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

var url = "http://localhost:50434/api/users";

// THE USER_ID is null for some reason

export default function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const btnLogin = async () => {
        console.log(1);
        console.log(Email + "," + Password);

        let s = await checkUserDetails(Email, Password);
        console.log("returned value=" + s + "and id = " + s.User_ID); // here the it returns the right User ID ( id = 1)
        if (s != null) {
            alert("התחברת בהצלחה!");
            navigate('/drawing', {
                state: {
                    userID: s.User_ID,
                    fullName: s.First_Name + " " + s.Last_Name
                }
            })
        } else {
            console.log("err login!");
            alert("failed to login");
        }
    };

    const checkUserDetails = async (Email, Password) => {
        console.log("we are in func checkUserDetails, email = " + Email);

        try {
            let result = await fetch(url + `?email=${Email}&pass=${Password}`, {
                method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers(
                    {"Content-Type": "application/json", Accept: "application/json"}
                )
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


    return (    <div className="form-comp cfb">
    <h1>Sign In!</h1>
    <form className="sign-up-form cfb">
      <label>
        Email:
        <br/>
        <input className="inputAuth" // value={this.state.EmailValue}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    type="text"
                    placeholder="Email"/>      </label>
      <label>
        Password:
        <br/>
        <input className="inputAuth"// value={this.state.PasswordValue}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Password"/>
      </label>
      <br/>
      <button type="button" onClick={btnLogin} className="buttonAuth">
        Sign In!
      </button>
    </form>
  </div>);
}
