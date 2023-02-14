const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const port = process.env.port || 5000;
const app = express();
const cors = require('cors')


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

// connecting mongodb-atlas
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xplq2xb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
 try{
    const database = client.db("volunteerNetwork");
    const eventsCollection = database.collection("events");
    console.log("Database connected")
 }
 finally{
    await client.close();
 }
}
run().catch(console.dir);
