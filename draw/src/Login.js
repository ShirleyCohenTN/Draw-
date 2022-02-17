import React, { Component } from "react";
import "./login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link} from "react-router-dom";

import background from "./images/bfsyJ1.jpg";

var url = "http://localhost:50434/api/users";
//var navigate = useNavigate();

//לשאול את דרור למה יש לי שגיאה של failed to fetch

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailValue: "shilychanxd@hotmail.com",
      PasswordValue: "12345",
      user_id: "",

      showErrLbl: false,
    };
    console.log(this.state.EmailValue);
  }


  
  EmailChange = (e) => {
    this.setState({ EmailValue: e.target.value }, () =>
      console.log(this.state.EmailValue)
    );
  };

  PasswordChange = (e) => {
    this.setState({ PasswordValue: e.target.value });
  };

  btnLogin = async () => {
    console.log(1);

    console.log(this.state.EmailValue + "," + this.state.PasswordValue);

    let s = await this.checkUserDetails(
      this.state.EmailValue,
      this.state.PasswordValue
    );
    console.log("returned value=" + s);

    if (s != null) {
      this.setState({ user_id: s.user_id });
      console.log("user_id is =" + this.state.user_id);
      this.setState({ showErrLbl: false }, () => {
        this.props.history.push({
          pathname: "/DrawPage/",
          state: { UserObj: s }
        });
      });
      // Alert.alert("התחברת בהצלחה!");
      console.log("h1");
      // console.log("add to localStorage")
      // await localStorage.setItem('user_id', JSON.stringify(this.state.user_id))
    } else {
      console.log("err login!");
      this.setState({ showErrLbl: true });
      alert("שגיאת התחברות");
    }
  };

  checkUserDetails = async (Email, Password) => {
    // let returnedObj = null;
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
      // alert(e);
    }

    //  // Call the fetch function passing the url of the API as a parameter
    //   .then((resp) => resp.json()) // Transform the data into json
    //   .then(function (data) {
    //     console.log("meow");
    //     console.log(data);
    //     if (data != null) {
    //       console.log(data.Email);
    //       console.log(data.Password);
    //       returnedObj = data;
    //     } else {
    //       console.log("wrong email or password!");
    //       returnedObj = null;
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     alert(err);

    //   });

    // return returnedObj;
  };

  render() {
    return (
      <div className="background-image">
        <form className="login-form">
          <h2>Log In &#128523; </h2>
          <p>Please login to start drawing! &#128513; </p>

          <label className="full-width-input">
            Email <FaUserAlt />
            <input
              value={this.state.EmailValue}
              onChange={this.EmailChange}
              type="text"
              placeholder="Email"
            />
          </label>

          <label className="full-width-input">
            Password
            <input
              value={this.state.PasswordValue}
              onChange={this.PasswordChange}
              type="password"
              placeholder="Password"
            />
          </label>

          <button
            type="button"
            className="button-LoginSign"
            onClick={this.btnLogin}
          >
            Login
          </button>

          <div style={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="link-style">
              register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
