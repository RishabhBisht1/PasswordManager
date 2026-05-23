const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');


// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'PasswordManager';
const app = express()
app.use(cors());
const port = 3000
app.use(bodyParser.json());

async function startServer() {
  await client.connect();
  console.log('Connected successfully to db');
}
startServer()


//get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

//save a new password
app.post('/', async (req, res) => {
  const password=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
})

//delete a password
app.delete('/', async (req, res) => {
  const password=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
