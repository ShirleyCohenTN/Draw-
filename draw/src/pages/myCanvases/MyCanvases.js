import React , { useEffect, useState } from "react";
import "./css/MyCanvases.css";


var url = "http://localhost:50434/api/canvases";




function MyCanvases() {
    const [canvases, setCanvases] = useState([]);
 


    useEffect(() => {
      console.log("im here");

      // getAllCanvasesByUser();
      
      getAllCanvases();


    }, [])
    


    const getAllCanvases = () => {
        fetch(url,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                else
                    return "could not get all the Canvases!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the canvases!")) {
                    setCanvases(data);
                    console.log(data);
                }
                else {
                    console.log('couldnt get');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }

  
  
  
  
  
  
  
  
  
    return (
    <div>
      <h2 style={{ textAlign: "center" }}>Canvases Gallery List</h2>
  
<div>
    {canvases.map((item, index) => {
        return(
            <div className="pics" key={index}>

                {/*  BASE64 אני לא יודעת איך להמיר את זה לתמונה ולא*/}
                <img src = {`data:image/png;base64,${item.Canvas_Path}`}/>

             </div>
        )
    })}
</div>

    </div>
  );
}

export default MyCanvases;
