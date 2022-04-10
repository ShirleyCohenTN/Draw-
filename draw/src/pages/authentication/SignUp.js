import React, { useState } from "react";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { signUpBtn } from "./Functions";
import { Form, Formik } from "formik";
import { TextField } from './TextField';
import * as Yup from 'yup';



var url = "http://localhost:50434/api/users";

//אני עדיין מקבלת שגיאת 400 בעת הרשמה אבל זה כן נרשם לי

export default function SignUp() {

  const [UserID, setUserID] = useState(0);


  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })

  const navigate = useNavigate();


  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
            validationSchema={validate}
      onSubmit={values => {
        console.log(values)
        signUpBtn(navigate,values,UserID,setUserID)
        

      }}
      >
       {formik => (
      <div className="form-comp cfb">
        <h1>Create an Account!</h1>
        <Form className="sign-up-form cfb">
          <TextField  label="First Name" name="firstName" type="text" />
          <TextField  label="last Name" name="lastName" type="text" />
          <TextField  label="Email" name="email" type="email" />
          <TextField  label="password" name="password" type="password" />
          <TextField  label="Confirm Password" name="confirmPassword" type="password" />
          <button className="btn btn-dark mt-3" type="submit">Register</button>
          <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
        </Form>
      </div>
       )}
    </Formik>
  );
}
