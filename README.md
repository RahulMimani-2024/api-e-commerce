# task-triveous

This is a fastify , prisma powered backend api for the e commerce 

to run this api , first download it as a zip
* unzip 
* run terminal in root of the project directory 
* run command `npm install`
* create account on planetscale db 
* copy connection string of the cluster 
* create one file in the project folder , named .env
* copy that in the env file the content in env file looks like DATABASE_URL='mysql://*********@aws.connect.psdb.cloud/task?sslaccept=strict'
* now in terminal run npm start 
* to view the documentation open browser and type http://localhost:3000/docs

// Functionalites -- user can register and login
// can CRUD cart
// can place Order
// can view Order
// can view products based on category
// can view category
