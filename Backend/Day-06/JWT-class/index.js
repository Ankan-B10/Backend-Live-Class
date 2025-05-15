const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 8080;
const JWT_Pass = "12345" ;

const jwtCreate = (username, password)=>{
    const response = jwt.sign({username, password }, JWT_Pass);
    return response;
}

app.get("/", (req, res)=>{
    res.send("This is Home Route");
    
})

const token = jwtCreate("ajay@gmail.com", "Ajay@123");
console.log("token : "+ token);
console.log(jwt.decode( token));
console.log(jwt.verify(token, JWT_Pass));


app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})