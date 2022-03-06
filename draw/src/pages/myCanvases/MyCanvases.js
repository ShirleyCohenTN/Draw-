import React, { useEffect, useState } from "react";
import "./css/MyCanvases.css";
// import delete from '../../images/delete.png';
import { useLocation } from "react-router-dom";
import Menu from "../canvas/Menu";



var url = "http://localhost:50434/api/canvases";
var urlToUpload = "http://localhost:50434/api/uploadCanvas";



function MyCanvases() {
  const [canvases, setCanvases] = useState([]);
   const [canvasesAfterDelete, setCanvasesAfterDelete] = useState([]);
   const [newCanvasID, setNewCanvasID] = useState(0);

   const location = useLocation();

  var img = new Image();

  useEffect(() => {
    console.log("im here");

    // getAllCanvasesByUser();

    getAllCanvasesByUser();
  }, [newCanvasID]);

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




 






  const btnDuplicate = async (User_ID, Canvas_Path, Canvas_Coordinates) => {
    console.log("we are in btnDuplicate")
    let s = await AddNewCanvas(User_ID, Canvas_Path, Canvas_Coordinates);
    console.log("returned value=" + s);

    setNewCanvasID(s.Canvas_ID);

    console.log("canvas_id is =" + s.Canvas_ID);

    if (s == null) {
      alert("הקאנבס לא שוכפל");
    } else {
      alert("הקאנבס שוכפל בהצלחה!");

      //navigate('/', {state: {userID : s.User_ID, fullName: s.First_Name + " " + s.Last_Name}})
    }
  };

  const AddNewCanvas = async (User_ID, Canvas_Path, Canvas_Coordinates) => {
    let returnedObj = null;

    let obj2Send = {
      User_ID: User_ID,
      Canvas_Path: Canvas_Path,
      Canvas_Coordinates: Canvas_Coordinates,
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







  return (
    <div style={{ backgroundColor: "gray" }}>
      <h2 style={{ textAlign: "center" }}>My Canvases</h2>

      <div>
        {canvases.map((item, index) => {
          return (
            <div key={index} className="div-style">
              <img className="canvas-img" src={item.Canvas_Path} />

              <div style={{ display: "block" }}>
                <button className="button-style">
                  Edit
                  {/* <img style={{width:"30%", display:"inline-block"}} src={require('../../images/delete.png')} /> */}
                </button>

                <button
                  className="button-style"
                  onClick={() => btnDelete(item.Canvas_ID)}
                >
                  Delete
                  {/* <img style={{width:"30%", display:"inline-block"}} src={require('../../images/delete.png')} /> */}
                </button>

                <button className="button-style"
                onClick={() => btnDuplicate(item.User_ID, item.Canvas_Path, item.Canvas_Coordinates)}>
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
