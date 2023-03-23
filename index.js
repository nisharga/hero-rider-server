const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const AdduserRoute = require("./Routes/AdduserRoute.js");

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//mondodb_Clint start
const uri = `mongodb+srv://Nisharga:aDj8QSwONIMYsWtK@cluster0.qemdz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//mondodb_Clint end

app.get("/", (req, res) => {
  res.send("I Love Express");
});

app.use("/user/add", AdduserRoute);

app.listen(port, () => {
  console.log("port listen");
});

async function run() {
  try {
    await client.connect();
    const dbCollection = client.db("Herorider").collection("Rider");
    // const learnerCollection = client.db("Herorider").collection("Learner");
    console.log("Conneceted");
    // insertOne signup-user to database
    app.put("/adduser", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      console.log(result, "user create on db");
    });
    // insertOne signup-user to database end

    // find user details by email-address
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user details by email-address end

    // show all user to ui
    app.get("/alluser", async (req, res) => {
      const query = {};
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show all user to ui

    // find user search by phoneNumber
    app.get("/phone/:id", async (req, res) => {
      const id = req.params.id;
      const query = { phone: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user search by phoneNumber

    // find user search by fullname
    app.get("/fullname/:id", async (req, res) => {
      const id = req.params.id;
      const query = { fullName: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user search by fullname

    // find user age by range
    app.get("/age/:id/:idsecond", async (req, res) => {
      const id = req.params.id;
      const idsecond = req.params.idsecond;
      const query = { age: { $gte: id, $lte: idsecond } };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user age by range
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
