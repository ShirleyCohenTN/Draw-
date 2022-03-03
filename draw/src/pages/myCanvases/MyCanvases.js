import React, { useEffect, useState } from "react";
import "./css/MyCanvases.css";
// import delete from '../../images/delete.png';
import { useLocation } from "react-router-dom";
import Menu from "../canvas/Menu";



var url = "http://localhost:50434/api/canvases";

function MyCanvases() {
  const [canvases, setCanvases] = useState([]);
   const [canvasesAfterDelete, setCanvasesAfterDelete] = useState([]);

   const location = useLocation();

  var img = new Image();

  useEffect(() => {
    console.log("im here");

    // getAllCanvasesByUser();

    getAllCanvasesByUser();
  }, []);

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

                <button className="button-style">
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
