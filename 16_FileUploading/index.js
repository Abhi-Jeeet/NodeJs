const express = require("express");
const app = express();
const path = require("path")
const multer = require("multer")


const PORT = 8000;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null,"./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage })


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

//middleware
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res)=>{
    return res.render("home")
})

app.post('/upload', upload.single("profileimg"), (req, res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
    
    
})








app.listen(PORT, console.log(`Server Started successfully at port ${PORT}`))