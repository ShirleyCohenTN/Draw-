import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';


var url = "http://localhost:50434/api/users";

// THE USER_ID is null for some reason

export default function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [errorDesignEmail, setErrorDesignEmail] = useState("1");
    const [errorDesignPassword, setErrorDesignPass] = useState("2");
    const navigate = useNavigate();

    useEffect(() => {
        if (Email !== null || Email !== "") {
            setErrorDesignEmail("1")
        }
        if (Password !== null || Password !== "") {
            setErrorDesignPass("2")
        }
    }, [Email, Password]);

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
                    { "Content-Type": "application/json", Accept: "application/json" }
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
            alert("שגיאת התחברות");
        }

    };

    const chkFields = () => {
        let flag = false
        if (Email === null || Email === "") {
            setErrorDesignEmail("errorDesign")
            flag = true;
        }
        if (Password === null || Password === "") {
            setErrorDesignPass("errorDesign")
            flag = true;
        }
        if (!flag) {
            btnLogin()
        }
    }

    return (<div className="form-comp cfb">
        <h1>Sign In!</h1>
        <form className="sign-up-form cfb">
            <label style={{ fontSize: '16px' }}>
                Email:
                <br />
                <input id={errorDesignEmail} className="inputAuth" // value={this.state.EmailValue}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    type="text"
                    placeholder="Email" />      </label>
            <label style={{ fontSize: '16px' }}>
                Password:
                <br />
                <input id={errorDesignPassword} className="inputAuth"// value={this.state.PasswordValue}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Password" />
            </label>
            <br />
            <button type="button" onClick={chkFields} className="buttonAuth">
                Sign In!
            </button>
        </form>
    </div>);
}
