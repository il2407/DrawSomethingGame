# DrawSomethingGame
 # Game URL : https://drawsomethingclient.onrender.com/
 
 *I used onerender.com free submission to deploy, Therefore the initial app access may have a one-minute delay, After the initial one-minute delay, the app should work   fine.

# Game Flow (Please see attached chart)
The game begins in the welcome view where you can choose between creating a new game or joining an existing game.
 To begin, one device needs to create the game, and the other device needs to join.
If you create a new game, you will be set as the main player and redirected to the word-choosing view. Then you start drawing while the player who joined the game is set as secondary and is in the word-guessing view.
When the main player sends the drawing, he will enter the waiting view,
if the secondary player guesses the word correctly, he will be redirected to the word-choosing view, and start drawing. Once the secondary player starts drawing, it triggers the main player's redirecting from the waiting view. Then the main player will become a secondary player which will redirect him to the word-guessing view while  the main player becomes the secondary player and so on…
 
•	Throughout the game, you can view the current score and how many points are left as a team in order to pass the best score. If you pass the best score -> after clicking the "End Game" button, the player will receive a notification, and the best score, including the session time, will be updated on the welcome screen.

•	At any stage of the game, you can return to the welcome page and start a new game.

•	The game is adapted to three different screen sizes, from computer to mobile.

# The technologies used are:
 
•	NODEJS + Express - Server side
•	REACT JS - Client side
•	MONGODB with MONGOOSE DataBase storage and integration
•	SESSION STORAGE - Managing the turns
•	SOCKET.IO - Live streaming between the players to transfer the drawings' data
•	CSS FLEXBOX - Adjusting the screen to three different sizes, from a computer screen to a mobile
•	HEROKU - Deployment of the server and the client
•	AXIOS - Client/Server communication

 
# Difficulties encountered:
•	The word library I found did not allow choosing words from a certain range of lengths/min length but only by max length
o	After a research that I’ve done, it seems that there is no good package that can fulfill these requirements. So I read the documentation for the package you provided, downloaded the code, and made the necessary adjustments in order to be able to extract words of a certain range of (Word Generator file)
•	After the deployment, I discovered a problem in the implementation of the data transfer between the players (incorrect use of LOCAL STORAGE). It happened because the test was done locally before the deployment. I’ve done substantial changes in the logic of the code to resolve this issue.

# Possible improvement in next version:
•	Login and signup forms in order for the player to choose who he wants to play with and have SOCKET.IO room management in order to have a few sessions simultaneously

# Known issues:
•	The word-guessing is accepted only in lowercase letters.
•	The waiting view flickers on iPhone devices.
