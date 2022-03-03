import React, { useState } from "react";
import CanvasID from "../../share/CanvasID";
import JoinCanvas from "../../share/JoinCanvas";
import "./css/DrawPage.css";
import {useNavigate} from "react-router-dom";


var url = "http://localhost:50434/api/uploadCanvas";

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  ID,
  generatePublicCanvasID,
  turnCanvasPrivate,
  joinFriendsCanvas,
  //cvs,
  canvasAsString,
  UserID,
  sendClearCanvas,
}) => {
  const [newCanvasID, setNewCanvasID] = useState(0);
  const test = "tktkt";
  const navigate = useNavigate();


  // const clearCanvas = () => {
  //   //we fill the canvas in white to clear it
  //   var context = cvs.getContext("2d");
  //   context.fillStyle = "white";
  //   context.fillRect(0, 0, cvs.width, cvs.height);
  // };

  //work

  const downloadCanvas = () => {
    var canvas = document.getElementById("canvas");
    canvas.fillStyle = "purple";

    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "MyCanvasDrawing.png";
    link.href = url;
    link.click();
  };

  const btnSaveCanvas = async () => {
<<<<<<< HEAD
    let s = await AddNewCanvas(UserID, canvasAsString, test);
=======

    let s = await AddNewCanvas(
      UserID,
      canvasAsString,
      test
    );
    
>>>>>>> 7a0c9d681e6310d97ffcb322e50d192d5d529110
    console.log("returned value=" + s);

    setNewCanvasID(s.Canvas_ID);

    console.log("canvas_id is =" + s.Canvas_ID);

    if (s == null) {
      alert("הקאנבס לא נשמר");
    } else {
      alert("הקאנבס נשמר בהצלחה!");

      //navigate('/', {state: {userID : s.User_ID, fullName: s.First_Name + " " + s.Last_Name}})
    }
  };

  const AddNewCanvas = async (UserID, canvasAsString, test) => {
    let returnedObj = null;

    let obj2Send = {
      User_ID: UserID,
      Canvas_Path: canvasAsString,
      Canvas_Coordinates: test,
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

  const saveMyCanvas = () => {
    console.log("the string is: ", canvasAsString);
  };

<<<<<<< HEAD
=======
  }


  const btnGoToMyCanvases = (UserID) => {
    console.log("my id is: ", UserID );
    navigate('/mycanvases', {
      state: {
        UserID: UserID
      }
  })
  }

  
>>>>>>> 7a0c9d681e6310d97ffcb322e50d192d5d529110
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <button onClick={sendClearCanvas}>Clear Canvas</button>
      <button onClick={downloadCanvas}>Save Image</button>
      <button onClick={btnSaveCanvas}>Save My Canvas</button>
      <button onClick={()=>btnGoToMyCanvases(UserID)}>Go To My Canvases</button>

      <CanvasID
        generatePublicCanvasID={generatePublicCanvasID}
        turnCanvasPrivate={turnCanvasPrivate}
        ID={ID}
      />
      <JoinCanvas joinFriendsCanvas={joinFriendsCanvas} />
    </div>
  );
};

export default Menu;
