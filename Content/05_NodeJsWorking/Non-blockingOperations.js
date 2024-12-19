const file = require("fs");

console.log("1");

// Asynchronous non-blocking operations
file.readFile("./text.txt", "utf-8",(err,result)=>{
    console.log(result);
    
})
console.log("2");

//output
//1
//2
//Hello, this is abhijeet kumar
