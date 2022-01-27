
// ######################### global object on node ##################################
// note that the document object is not in node
// node has a global object that can be accessed

// ######################### Files (fs) ##################################
// use __dirname to get the directory name and __filename to get dir + filename
// to access stuff from another file, use export 
// fs.writeFile would create a new file if it does not exist
// for delete file, you should make a conditional searching for the file first
// streams to prevent memory overflow -> splitting the data in chunks like watching video online
const fs = require("fs");
const readStream = fs.createReadStream('./FROMDIR/FILE', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./TODIR/FILE', )
// callback on the stream 
readStream.on('data', (chunk) => {
  console.log("-------NEW CHUNK-------");
  console.log(chunk.toString());
  writeStream(chunk)
})

// we can use a pipe so that we can readStream and writeStream more concisely 
readStream.pipe(writeStream)

// #########################  Server (http) ##################################
const http = require("http");

// The server is set to listen on the specified port, 3000.
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // successful response 200
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});

// When the server is ready, the listen callback function is called.
server.listen(port, () => {
  console.log(`Server running at port ${port}.`);
});