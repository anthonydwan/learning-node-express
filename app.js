// ######################### global object on node ##################################
// note that the document object is not in node
// node has a global object that can be accessed

// ######################### Files (fs) #############################################
// use __dirname to get the directory name and __filename to get dir + filename
// to access stuff from another file, use export
// fs.writeFile would create a new file if it does not exist
// for delete file, you should make a conditional searching for the file first
// streams to prevent memory overflow -> splitting the data in chunks like watching video online
const fs = require("fs");
const readStream = fs.createReadStream("./FROMDIR/FILE", { encoding: "utf8" });
const writeStream = fs.createWriteStream("./TODIR/FILE");
// callback on the stream
readStream.on("data", (chunk) => {
  console.log("-------NEW CHUNK-------");
  console.log(chunk.toString());
  writeStream(chunk);
});

// we can use a pipe so that we can readStream and writeStream more concisely
readStream.pipe(writeStream);

// #########################  Server (http) ############################################

const http = require("http");

// The server is set to listen on the specified port, 3000.
// Localhost is like a domain name on the web
// port numbers are like doors or channels into a computer
// as long as it is not a number that is used by other softwares, you can use it for yourself in the comp
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // successful response 200
  console.log(req);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});

// When the server is ready, the listen callback function is called.
server.listen(port, () => {
  console.log(`Server running at port ${port}.`);
});

// #########################  the basic routing  ############################################
// good to have a 404.html page
// when you learn express, this will be done undder the hood 
const server = http.createServer((req, res) => {
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    // redirect from about-me to about
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about')   
    default:
      path += "404.html";
      // set up the status code
      res.statusCode = 404;
      break;
  }
});

// ################################ npm ############################################
// npm init to auto create pacakge.json file, then npm install or npm update will create a node_modules folder


// ########################## express #####################################
// express is a framework to make backend work a lot more convenient 
const express = require('express');

const app = express();

//listen for requests
app.listen(3000)

app.get("/", (req, res) => {
  // // infers the type
  // res.send('<p>text here</p>');

  // send the html file (the default is a absolute path)
  res.sendFile('./views/index.html', {root: __dirname})
});
app.get("/about", (req, res) => {
  // infers the type
  res.send('<p>more text here</p>');
});

// redirect
app.get('/about-us', (req, res) => {
  res.redirect('/about');
})

// 404 page (if it does not match a get, it would get to the bottom and fire this function regardless of the url)
// thus the position of 404 page is important 
app.use((req, res) => {
  res.sendFile('./views/404.html', {root: __dirname})
})




// ########################## express view engine #####################################
// allow people to send about dynamic data and html

// register view engine
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
  //   // send the html file (the default is a absolute path)
  // res.sendFile('./views/index.html', {root: __dirname})

  // instead of sending the whole html
  res.render('index')
  //then you create a ejs file - this becomes useful when content is dynamic 
});
