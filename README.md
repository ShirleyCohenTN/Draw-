# Draw!

## About the project:

A website that allows you to share and paint together on canvas.
 Whether to express yourself in painting and have fun with friends or to be used as a whiteboard shared in a class between the teacher and the students.


Draw together and have fun with friends!
Several friends can draw together and complete each other's drawings.
Express your creativity in a fun way.

As a teacher you can use this website for a better explanation and teaching.
Just like a teacher who uses a whiteboard in class to add examples, write points, and create sketches, using this website will allow the students to join the teacher in the lesson activity and add/ write/ draw their own ideas and suggestions.


Tasks:

•	The basis of the project:
- Create a project on VS Code
- Install relevant packages (React, Socket.io, Node.js)
- Create a Databasa on MongoDB

•	Server side:
- Create a port that returns the client an HTML page
- Identify users, enable registration and login
- Create a socket that receives drawings from the client
- Create a socket that transmits the drawings to the other connected clients

•	Client side:
- Design React page
- Think of how to invite specific users to your canvas
- Save (post) and Get canvases from the Database
- Copy an existing canvas


User stories:

•	As an end user I want to be able to connect to the shared drawing system (the canvas),
 so that my friends can recognize me. 
 - A user can connect to the page using a username and password.
 

A. Feature - Identification and registration using a username and password

     1. Insert user’s details in the login phase (user interface)
    
     2. Save and retrieve user’s information from the database
     
     3. Compare the inserted details to the existing details in the database
     
     4. Transfer the user to the interface after the authentication has succeeded  
     
     

•	As an end user I would like to sign up to the shared drawing system (canvas) to view again the canvases I have painted with my friends in the past.


B. Feature – Browse previous user’s canvases 

     1. Save canvas’s data in the database
     
     2. Link the data to the users
     
     3. Pull the canvases to the identified user so he can select and retrieve them
     
     

•	As an end user I want to paint on the canvas on the drawing page and that my friends will be able to watch it in live so we can enjoy the experience and collaborate together.


C. Feature - A drawing which is being created by one specific user on the canvas, will also display on the other user’s page who is linked to that canvas (live)

     1. Create a canvas object on each user’s page
     
     2. Receive mouse clicks in the canvas area so that it leaves a mark
     
     3. Set that the user’s page will send the drawings which were created by the mouse’s clicks on the canvas to the server
     
     4. Transmit to the other linked canvases the “marking” information (the drawing) that was received on the server
   
   

•	As an end user I want to be able to invite specific friends to draw with me on the canvas that I am drawing on


D. Feature - Send an invitation to other users for a specific canvas

     1. Give the canvas a unique identification code (key)
     
     2. Allow the user to receive the unique identification code of the canvas so he can pass it to his friend
     
     3. Give the user the option of inserting the unique identification code of the canvas in a dedicated rubric and by thus it will transfer the user to the linked canvas
     
     

•	As an end user I want to be able to duplicate canvases that I have created 


E. Feature – Canvas duplication

    1. Create a new canvas
    
    2. Copy the original canvas’s 
    
