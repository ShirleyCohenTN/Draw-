import React, { Component } from "react";
import "./login.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import background from "./images/bfsyJ1.jpg";

export default class Login extends Component {
  render() {
    return (
      <div className="background-image">
        <form onSubmit={this.signIn} className="login-form">
          <h2>Log In &#128523; </h2>
          <p>Please login to start drawing! &#128513; </p>
          <label className="full-width-input">
            Email <FaUserAlt />
            <input type="text" placeholder="Email" />
          </label>
          <label className="full-width-input">
            Password
            <input type="password" placeholder="Password" />
          </label>
          <button className="button">Login</button>
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
