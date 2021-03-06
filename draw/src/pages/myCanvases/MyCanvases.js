import React, { useEffect, useState } from "react";
import "./css/MyCanvases.css";
// import delete from '../../images/delete.png';
import { useLocation } from "react-router-dom";
import Menu from "../canvas/Menu";
import {useNavigate} from "react-router-dom";



var url = "http://localhost:50434/api/canvases";
var urlToUpload = "http://localhost:50434/api/uploadCanvas";



function MyCanvases() {
  const [canvases, setCanvases] = useState([]);
   const [canvasesAfterDelete, setCanvasesAfterDelete] = useState([]);
   const [newCanvasID, setNewCanvasID] = useState(0);
   const navigate = useNavigate();


   const location = useLocation();

  var img = new Image();

  useEffect(() => {
    console.log("im here");

    // getAllCanvasesByUser();

    getAllCanvasesByUser();
  }, [newCanvasID]);

  //get the list of all the canvases by user id
  const getAllCanvasesByUser = () => {
    fetch(url+ `?user_id=${location.state.UserID}`, {
      method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else return "could not get all the Canvases!";
      }) // Transform the data into json
      .then((data) => {
        if (!data.toString().includes("could not get all the canvases!")) {
          setCanvases(data);
          console.log(data);
        } else {
          console.log("couldnt get");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  };


  //delete canvas
  const btnDelete = (Canvas_ID) => {
    console.log("we're in the delete button");
    console.log("the canvas id is = ", Canvas_ID);

     fetch(url + `?canvas_id=${Canvas_ID}`,
     {
         method: 'DELETE', // 'GET', 'POST', 'PUT', 'DELETE', etc.
         headers: new Headers({
             // 'Content-Type': 'application/json',
             'Accept': 'application/json'
         }),
     }) // Call the fetch function passing the url of the API as a parameter
     .then((resp) => {
         // console.log(resp);
         if (resp.status === 200) {
             console.log(200);
             let newCanvases = canvases.filter(c => c.Canvas_ID !== Canvas_ID);
             setCanvases(newCanvases);

         }
         else if (resp.status === 400) {
             console.log("BadRequest");
         }
         else {
             console.log("NotFound");
         }
     }
     ) // Transform the data into json
     .catch(function (err) {
         alert(err);
     });
  };




 





//duplicate canvas
  const btnDuplicate = async (User_ID, Canvas_Path) => {
    console.log("we are in btnDuplicate")
    let s = await AddNewCanvas(User_ID, Canvas_Path);
    console.log("returned value=" + s);

    setNewCanvasID(s.Canvas_ID);

    console.log("canvas_id is =" + s.Canvas_ID);

    if (s == null) {
      alert("???????????? ???? ??????????");
    } else {
      alert("???????????? ?????????? ????????????!");

      //navigate('/', {state: {userID : s.User_ID, fullName: s.First_Name + " " + s.Last_Name}})
    }
  };

  const AddNewCanvas = async (User_ID, Canvas_Path) => {
    let returnedObj = null;

    let obj2Send = {
      User_ID: User_ID,
      Canvas_Path: Canvas_Path
    };

    await fetch(urlToUpload, {
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
          // console.log(data.email);
          // console.log(data.pass);
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



const btnEdit = (Canvas_ID, User_ID, Canvas_Path) => {
    console.log("we are in btnEdit, canvas id = ", Canvas_ID, " name =", location.state.fullName);
     navigate('/editcanvases', {state: {
        Canvas_ID, userID: User_ID, Canvas_Path: Canvas_Path, fullName: location.state.fullName }})

}



  return (
    <div >
      <h2 className="h2-header-myCanvases">My Canvases</h2>

      <div>
        {canvases.map((item, index) => {
          return (
            <div key={index} className="div-style">
              <img className="canvas-img" src={item.Canvas_Path} />

              <div style={{ display: "block" }}>
                <button className="button-71 editing"
                onClick={() => btnEdit(item.Canvas_ID ,item.User_ID, item.Canvas_Path)}>
                  Edit
                  {/* <img style={{width:"30%", display:"inline-block"}} src={require('../../images/delete.png')} /> */}
                </button>

                <button
                  className="button-71 deleting"
                  onClick={() => btnDelete(item.Canvas_ID)}
                >
                  Delete
                  {/* <img style={{width:"30%", display:"inline-block"}} src={require('../../images/delete.png')} /> */}
                </button>

                <button className="button-71 duplicating"
                onClick={() => btnDuplicate(item.User_ID, item.Canvas_Path)}>
                  Duplicate
                  {/* <img style={{width:"30%", display:"inline-block"}} src={require('../../images/delete.png')} /> */}
                </button>
              </div>

              {/* <img src = "https://facebook.github.io/react-native/docs/assets/favicon.png" /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyCanvases;
