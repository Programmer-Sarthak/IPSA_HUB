# IPSA_HUB

Instructions:

1) Firstly make schema name "ipsa_hub".
2) Import any one folder named "With Data" or "Without Data" in MySQL.
3) api Start: In VsCode or in any compiler in the terminal navigae to api folder use -> "cd" or "cd ../" and type "npm start".
4) client Start: In VsCode or in any compiler in the terminal navigae to client folder use -> "cd" or "cd ../" and type "npm start".


NOTE: 

* "With Data" has users some posts and there relationsshipd whereas "without Data" is empty.
* when client starts if first page you see is "http://localhost:3000/" and not "http://localhost:3000/login" then follow these steps - client>src>App.js
line.89 commentout <RedirectIfLoggedIn> and go to "http://localhost:3000/login" login to any account and then remove the comment. it is a problem i am still trying to solve.
* every user passwords are hashed (bycrypt) but every user has password in frorm (user first name + 123) say for amit_sharma - amit123.
* if there is any problem with react webApp try to install react or it's dependecies.
 