const express = require('express')
require('dotenv').config()
const app = express()
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(express.json())
app.use(cors())

const port=process.env.PORT || 5000;
// criminals
// .c67vi5nFW-*Nmc



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.7auoehb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();

    const crimeCollection=client.db('Criminals').collection('member')
    const getcrimialCollection=client.db('Criminals').collection('criminal')

    app.get('/member',async(req,res)=>{
  
        const result=await crimeCollection.find().toArray()
        res.send(result)
      })
    app.get('/criminal',async(req,res)=>{
  
        const result=await getcrimialCollection.find().toArray()
        res.send(result)
      })


      app.post('/criminal',async(req,res)=>{
        const items=req.body;
        const result=await getcrimialCollection.insertOne(items)
        res.send(result)
      })

      app.delete('/criminal/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
      
        const result=await getcrimialCollection.deleteOne(query)
        res.send(result)
      })
      
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})