const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const port = process.env.port || 5000;
const app = express();
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;



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
        const eventsCollections = database.collection("events");
        const registeredVolunteersCollections = database.collection('registered_volunteers')
        console.log("Database connected")
        
        app.post('/addEvent', async(req, res)=>{
            console.log(req.body)
            const event = req.body;
            const result = await eventsCollections.insertOne(event);
            res.send(result)

        })
        //Events get api
        app.get('/events', async(req,res)=>{
           const events = await eventsCollections.find({}).toArray();
        //    console.log(events);
           res.json(events)
        })

        app.get('/events/:id', async(req,res)=>{
            const id = (req.params.id);
            const query = {_id: new ObjectId(id)}
            const event = await eventsCollections.findOne(query)
            // console.log(event);
            res.json(event)
        })
        //events post api for deleting 
        app.post('/events', async(req,res)=>{
            console.log(req.body.id);
            const id = req.body.id;
            const query = { _id: new ObjectId(id) }
            const result = await eventsCollections.deleteOne(query);
            res.send(result);
         })

         // post api for volunteer registration 
         app.post('/register-volunteer', async(req,res)=>{
            console.log(req.body);
            const volunteer = req.body;
            const result = await registeredVolunteersCollections.insertOne(volunteer)
            res.send(result)
         })

         //get api for my events 
         app.get('/my-events', async(req,res)=>{
            console.log('hiting ');
            const myEvents = await registeredVolunteersCollections.find({}).toArray();
            res.json(myEvents)
         })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);
