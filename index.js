const express = require('express');
const port = process.env.port || 5000;
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//GET API for Root
app.get('/',(req, res)=>{
    res.send("Running Volunteer Network")

})

//Listen
app.listen(port, (req,res)=>{
    console.log("Listening to port", port);
})
