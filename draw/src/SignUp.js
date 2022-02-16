import React, { Component } from "react";
import "./login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import background from "./images/bfsyJ1.jpg";

export default class SignUp extends Component {
  render() {
    return (
      <div className="background-image">
        <form onSubmit={this.signIn} className="login-form">
          <h2>Sign Up &#128523; </h2>
          <div className="signup-style">
            <label className="signup-style">
              First name
              <input type="text" placeholder="First name" />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Last name
              <input type="text" placeholder="Last name" />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Email address
              <input type="text" placeholder="Email address" />
            </label>
          </div>

          <div className="signup-style">
            <label className="signup-style">
              Password
              <input type="password" placeholder="Password" />
            </label>
          </div>

          <button className="button">Sign Up </button>
          <div style={{ marginTop: "20px" }}>
            Already have an account? <Link to="/login" className="link-style">Login here</Link>
          </div>
        </form>
      </div>
    );
  }
}
