# Training Tomo
This is an app I wrote during my time as a student at Code Chrysalis.  It is a simple app that can be used for people who want to workout with others but cannot due to various reasons (proximity from gym, social distancing, etc.).  It's current implementation has users rece to complete workouts.  You can see a live version by clicking the link below.

[Training Tomo on Heroku](https://training-tomo.herokuapp.com/)

## Technologies Used
### Node.js
Node.js was used to write the server backend using express to facilitate communication between users via Socket.io

### Socket.io
Socket.io is used for communication between the client and server as well as client to client communication.  This communication is used to show users in realtime what workouts are available as well as showing other users' progress in the current workout room.

### React
React is used for the front end for this app

### Bootstrap
Bootstrap is used for styling the look of the front end

### Firebase
Firebase is used for login and authentication of users

### Heroku
Heroku is used to host the app on the web as well as for CI/CD.

### [Robohash](https://robohash.org/)
Robohash is used to generate robot heads to represent users in the navigation bar as well as in the workout rooms.

## Future Features
### Different Types of Workout Rooms
Currently the only type of workout is a race type.  I would like to implement other types of workout rooms for different purposes (working out with a partner, coaching as or being coached by a personal trainer, etc.)

### Adding User Customizable Workouts
As of right now the workouts are hardcoded into the program as a proof of concept.  In the future users should be able to upload their own workouts for others to join in

### Workout Search
Once workouts can be added by users, they need to be able to search through them to find the workout that best suits what they are looking for.