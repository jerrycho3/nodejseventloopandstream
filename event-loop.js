const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

//to change the threadpool size
//process.env.UV_THREADPOOL_SIZE = 1;

//these code re not running inside the event loop,not in an i/o circle
setTimeout(() => console.log("timer finished "), 0);
setImmediate(() => console.log("immediate 1 finished"));

fs.readFile("text-file.txt", () => {
  console.log("i/o finished");

  setTimeout(() => console.log("timer 2 finished "), 0);
  setTimeout(() => console.log("timer 3 finished "), 3000);
  setImmediate(() => console.log("immediate 2 finished"));

  process.nextTick(() => console.log("process.nextTick"));

  // an encryption function to encrypt  a password
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now - start, "password encrypted");
  });
});

//this code will run first,it a top level code not in a callback
console.log("hello from the top level code");
