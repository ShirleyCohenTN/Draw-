import React, {useState} from 'react';

// styling
import '../../App.css'
import Login from './Login';
import SignUp from './SignUp';


// components


export const Container = () => {
  const [welcome, setWelcome] = useState(false)

  const setBannerClass = () => {
    const classArr = ["banner-side cfb"]
    if (welcome) classArr.push('send-right')
    return classArr.join(' ')
  }

  const setFormClass = () => {
    const classArr = ["form-side cfb"] 
    if (welcome) classArr.push('send-left')
    return classArr.join(' ')
  }

  return (
    <div className="Container cfb">

    <div className={setBannerClass()}> 

      {welcome ? 
        <h2>Hello, New Friend!</h2>
          : <h2>Welcome Back</h2>}

      <button className="buttonAuth" onClick={()=> setWelcome(!welcome)}>
        {welcome ?
          "Sign In"
            : "Create Account"}
      </button>
    </div>

    <div className={setFormClass()}> 
        {welcome ? 
          <Login /> 
            : <SignUp/>
        }
        
    </div>
  </div>
   
  );
}

