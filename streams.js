const fs = require("fs");
const { isError } = require("util");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 1: isnt the best for production
  //   fs.readFile("text-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // solution 2: streams
  //this method will create a stream in this text file that we can then consume piece by piece
  //   const readable = fs.createReadStream("text-file.txt");
  //   readable.on("data", (chunk) => {
  //     //use  the data or chunk and write it to  writeable stream which is the response
  //     res.write(chunk); //this will stream content from the file to the  client
  //   });
  //   //we also hve to handle the event when all the stream is finihsed
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   //we cn also listen when thre is an errr
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("file not found");
  //   });

  // a problem with the 2nd solution is backpressure where the response isnt as fast as d req  coming
  //3rd solution
  ///readablesource.pipe(WritableStreamDestination)
  const readable = fs.createReadStream("text-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening.....");
});
