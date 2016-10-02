sailsDevDemo

a Sails application

First time dev setup:

Sails stuff 
1.Install Node.js via http://sailsjs.org/get-started#?install-on-linux 
2.Install sails using npm -g install sails 
3.Create new sails project using sails new ProjectName 4.In the project directory use npm install to add all npm stuff

MySQL 
1.Install mySQL using apt install mysql-server and go through steps 
2.Login to mySQL using the root account setup in the mySQL install 
3.Create database for the sails project 'testdb' in my case 
4.Create user for the sails project to connect with 'dev1' in my case 5.Grant relevant privileges to 'dev1' (select, update, delete, create, execute)

Sails-MySQL 
1.In your project directory install mysql adapter using npm install sails-mysql
	I am not sure if npm install in the beginning also installs the adapter but 		I did it just in case * 
2.Open your connections file in /config/connections.js 
3.Add the mysql adapter following the example that is commented in connections.js I specified user password and database ('dev1', 'dev1localhost', 'testdb') 
4.Open your models file in /config/models.js and tell it to use connection defined in /config/connections.js 
5.Set migrate to see if sails will automatically rebuild tables/collections in your db schema. 
	I set it to migrate:alter although production should be migrate:safe In 	this way (migrate:alter) I believe new associations and tables are 		automatically generated without having to shut down and restart sails app

Sails Lift to start sails
