# module2_part2_gallery_server

## Vlasta Stelmakh

### About this project:

#### This project was developed for educational purpose. 
It consists of client and server sides. Server side, whic is the main focus of the project, was written with Node.js and Typescript.
User attempts to log in, if his data is correct, the server sends him object, containing object with:

* total number of pages
* current page number
* array with photos links

### Project structure:

* /backend
  * /static
    * /pages
      * gallery.html
      * index.html
      * login.js
      * gallery.js
      * not_found.html 
    * /photos
  * /public
    * login.js
    * interfaces.js
    * server.js
    * gallery.js
    * headers.js
  * /src
    * login.ts
    * interfaces.ts
    * server.ts
    * gallery.ts
    * headers.ts
* /frontend
  * /public
  * /src
   


### Project structure description:

#### **/backend**

> Server side of the project

#### **/public**

> files which are used by browser

#### interfaces.js

> compiled interfaces.ts file

#### server.js

> compiled server.ts file

#### headers.js

> compiled headers.ts file

#### login.js

> compiled login.ts file

#### gallery.js

> compiled gallery.ts file

#### **/static**

> static files

#### **/src**

> TypeScript files further compiled to Javascript files

#### server.ts

> main server file. It figures out the url, the method user is using on the web page and sends response accordingly

#### gallery.ts

> creates object with page number, total page number and array of photo links, which user gets

#### login.ts

> checks user's data and if correct send token back to user

#### headers.ts

> sets headers for response

#### interfaces.ts

> interfaces for other files

#### **/frontend**

> To see the description of the client side, naviage to the frontend project and read README.md 


### How to start the project: 

1. Clone the repository to your machine
2. Open it in you code editor
3. In terminal run command "npm install" to install all essential npm modules
4. From the root of the project run command "npm run start" to run the server
5. Open your browser and enter in the search bar "localhost:8080"
6. Enjoy the photos of architecture
