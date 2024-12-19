const express = require("express")
const fs  = require("fs");

const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//MiddleWare
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `${Date.now()}: ${req.method}: ${req.path}\n`,(err, data)=>{
        next();
    })
})

app.use((req, res, next)=>{
    req.myUserName = "Ahijeet";
    console.log("Hello from middleware 1");
    next();
    
})
app.use((req, res, next)=>{
    console.log("Hello from middleware 2",req.myUserName);
    next();
})

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

// app.get('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id===id);
//     return res.json(user);
// })

app
    .route("/api/users/:id")
    .get((req, res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id===id);
        return res.json(user);
    })
    .patch((req,res)=>{
        //Edit user with id
        return res.json({status: "pending"});
    })
    .delete((req,res)=>{
        //Delete user with id
        return res.json({status:"pending"})
    });


app.post("/api/users", (req,res)=>{
    const body = req.body;    
    users.push({...body, id:users.length+1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status:"success", id: users.length});
    })
    
    
});

app.listen(PORT, ()=>console.log(`Server Started at port ${PORT}`)
);