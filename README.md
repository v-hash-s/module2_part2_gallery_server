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
  * /public
    * /photos
    * interfaces.js
    * server.js
    * serverGallery.js
  * /src
    * interfaces.ts
    * server.ts
    * serverGallery.ts
* /frontend
  * public
    * gallery.html
    * gallery.js
    * login.js
  * src
    * gallery.ts
    * login.ts
* index.html

### Project structure description:

#### **/backend**

> Server side of the project

#### **/public**

> files which are used by browser

#### interfaces.js

> compiled interfaces.ts file

#### serve.js

> compiled server.ts file

#### serverGallery.js

> compiled serverGallery.ts file

#### **/photos**

> photos, viewed by user

#### **/src**

> TypeScript files further compiled to Javascript files

#### server.ts

> main server file. It figures out the method user is using on the web page and sends response accordingly

#### serverGallery.ts

> creates object with page number, total page number and array of photo links, which user gets

#### **/frontend**

> To see the description of the client side, naviage to the frontend project and read README.md 

#### index.html

> the starting point of the project, that navigates user to the login page


### How to start the project: 

1. Clone the repository to your machine
2. Open it in you code editor
3. In terminal run command "npm install" to install all essential npm modules
4. From the root of the project run command "npm run start" to run the server
5. Open index.html with LiveServer
6. Enjoy the photos of architecture
