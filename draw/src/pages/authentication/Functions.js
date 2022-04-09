var url = "http://localhost:50434/api/users";
export const signUpBtn = (navigate,values,UserID,setUserID)=>{
    btnSignUp(navigate,values,UserID,setUserID)
}

const btnSignUp = async (navigate,values,UserID,setUserID) => {
    let s = await AddUser(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
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
