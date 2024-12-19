const http = require("http");
const file = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    file.appendFile('log.txt',log, (err,data)=>{
        switch(req.url){
            case '/': res.end("HomePage");
            break
            case '/about':res.end("This is Abhijeet Kumar")
            break
            default : res.end("404 NOT FOUND")
        }
        
    })
    
    
});

myServer.listen(8000,()=>console.log("Server Started"));
