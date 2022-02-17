import React, { Component } from "react";
import "./login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import background from "./images/bfsyJ1.jpg";

var url = "http://localhost:50434/api/users";

//לשאול את דרור למה יש לי שגיאה של failed to fetch


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      FirstName: "",
      LastName: "",
      EmailValue: "",
      PasswordValue: "",
    };
    console.log(this.state.EmailValue);
  }

  FirstNameChange = (e) => {
    this.setState({ FirstName: e.target.value });
  };

  LastNameChange = (e) => {
    this.setState({ LastName: e.target.value });
  };

  EmailChange = (e) => {
    this.setState({ EmailValue: e.target.value }, () =>
      console.log(this.state.EmailValue)
    );
  };

  PasswordChange = (e) => {
    this.setState({ PasswordValue: e.target.value });
  };

  btnSignUp = async () => {
    let s = await this.AddUser(
      this.state.FirstName,
      this.state.LastName,
      this.state.EmailValue,
      this.state.PasswordValue
    );
    console.log("returned value=" + s);

    this.setState({ user_id: s.user_id });

    console.log("user_id is =" + this.state.user_id);

    if (s == null) {
      alert("didnt insert into db!");
    } else {
      alert("נרשמת בהצלחה!");

      await this.setState(
        { fullname: `${this.state.FirstName} ${this.state.LastName}` },
        () => {
          this.props.history.push({
            pathname: "/DrawPage/",
            state: { UserObj: s}
          });
        }
      );
    }
  };

  AddUser = async (FirstName, LastName, EmailValue, PasswordValue) => {
    let returnedObj = null;

    let obj2Send = {
      First_Name: FirstName,
      Last_Name: LastName,
      Email: EmailValue,
      Pass: PasswordValue
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

  render() {
    return (
      <div className="background-image">
        <form onSubmit={this.signIn} className="login-form">
          <h2>Sign Up &#128523; </h2>
          <div className="signup-style">
            <label className="signup-style">
              First name
              <input
                onChange={this.FirstNameChange}
                type="text"
                placeholder="First name"
              />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Last name
              <input
                onChange={this.LastNameChange}
                type="text"
                placeholder="Last name"
              />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Email address
              <input
                onChange={this.EmailChange}
                type="text"
                placeholder="Email address"
              />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Password
              <input
                onChange={this.PasswordChange}
                type="password"
                placeholder="Password"
              />
            </label>
          </div>

          <button className="button-LoginSign" onClick={this.btnSignUp}>Sign Up </button>
          <div style={{ marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to="/login" className="link-style">
              Login here
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
