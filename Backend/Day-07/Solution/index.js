const express = require("express");
const zod = require('zod');
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 8080;
const JWT_Pass = "xyz159";

const ALL_USER = [
    {
        username: "aja@gmail.com",
        password: "123456",
        name: "Aja Mondal"
    },
    {
        username: "ajay@gmail.com",
        password: "Ajay123",
        name: "Ajay Mondal"
    },
    {
        username: "raja@gmail.com",
        password: "Raja123",
        name: "Raja"
    }
];

const emailSchema = zod.string().email();
const passSchema = zod.string().min(6);

function singJWT (username, password){
    const usernameRes = emailSchema.safeParse(username);
    const passwordRes = passSchema.safeParse(password);
    if(!usernameRes.success || !passwordRes.success) return null;
    const token = jwt.sign({username}, JWT_Pass);
    return token;
}

function userEsits(username){
    for(let i=0; i<ALL_USER.length; i++){
        if(ALL_USER[i].username === username) return true;
    }
    return false;
}

function loginUserExsits(username, password){
    for(let i=0; i<ALL_USER.length; i++){
        if(ALL_USER[i].username === username && ALL_USER[i].password === password) return true;
    }
    return false;
}

app.use(express.json());

// app.use("/", (req, res)=>{
//     res.send("Wellcome...!");
// })

app.post("/signup", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);
    const token = singJWT(username, password);
    ALL_USER.push({username, password});
    res.status(200).json({msg : "Account Created!"});
})

app.post("/signin", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(!loginUserExsits(username, password)){
        res.status(403).json({msg: "User does not exit in the Memory !"});
    }
    const token = singJWT(username, password);
    res.status(200).json({token});
})


app.get("/users", (req, res) =>{
    const token = req.headers.authorization;
        const DecodeRes = jwt.decode(token);
        const username = DecodeRes.username;
        if(!userEsits(username)){
            res.status(403).json({msg: "Invalid Token !"});
        }
        res.status(200).json(ALL_USER);
})


app.listen(PORT,(req, res)=>{
    console.log(`server is running on ${PORT}`)
})