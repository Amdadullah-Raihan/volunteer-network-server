const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const port = process.env.port || 5000;
const app = express();
const cors = require('cors')


//middleware
app.use(cors());
app.use(express.json());

//GET API for Root
app.get('/', (req, res) => {
    res.send("Running Volunteer Network")

})

//Listen
app.listen(port, (req, res) => {
    console.log("Listening to port", port);
})

// connecting mongodb-atlas
const uri = `mongodb+srv://volunteer-network-db:V4QSUSf1m9lpaBGt@cluster0.xplq2xb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("volunteerNetwork");
        const eventsCollection = database.collection("events");
        console.log("Database connected")
        
        app.post('/addEvent', async(req, res)=>{
            console.log("hitting event api")
            const event = req.body;
            const result = await eventsCollection.insertOne(event);
            res.send(result)

        })
        //Events get api
        app.get('/events', async(req,res)=>{
           const events = await eventsCollection.find({}).toArray();
           console.log(events);
           res.json(events)
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);
