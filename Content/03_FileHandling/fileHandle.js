const file = require("fs");

// synchronous
file.writeFileSync("./text.txt","Hello world");

//Asynchronous
file.writeFile("./text1.txt", "Hii, this is abhijeet", (err)=>{});
file.writeFile("./text1.txt", "Hii, this is world 2.O", (err)=>{});

//synchronous
let result = file.readFileSync("./contact.txt","utf-8");
console.log(result);

//Asynchronous
file.readFile("./contact1.txt", "utf-8", (err, result)=>{
    if(err){
        console.log("error",err);
        
    }
    else{
        console.log(result);
        
    }
})


//Difference between a Synchronous and asynchronous
//1. Synchronous will return something while asynchronous not;
//2. Asynchronous always expect a callback while synchronous not;

file.appendFileSync("./text.txt", "hello duniya\n") //appending
file.cpSync("./text.txt", "./copy.txt")//copying file
file.unlinkSync("./copy.txt")  //deleting file


