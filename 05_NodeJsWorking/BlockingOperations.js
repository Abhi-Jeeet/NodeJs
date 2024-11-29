const file = require("fs");

console.log("1");

//synchronous -> blocking operations
const result = file.readFileSync("./text.txt","utf-8");
console.log(result);

console.log("2");

