# CSE-4820-Senior-Project
CSE 4820 Senior Project, Spring 2023

# Setup
make sure to have Node 18.12.1+ installed alongside npm

to run a development environment go into each respective frontend and backend folder and run
<li>npm install</li>

from the backend run 
<li>npm run dev</li>

from the frontend run
<li>npm run start</li>

this should start the development environment for each 

to create a build of the project with docker, from the root directory run
<li>docker-compose -f docker-compose.prod.yml build</li>
and 
<li> docker-compose -f docker-compose.prod.yml up </li>
this should allow connection from localhost
<br></br>
as a side note, make sure to replace the .env file with actual environment variables to the database, etc...
