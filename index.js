const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

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

app.listen(port, () => {
  console.log("port listen");
});

async function run() {
  try {
    await client.connect();
    //        const dbCollection = client.db("glueganserver").collection("user");
  } finally {
    //        await client.close()
  }
}
run().catch(console.dir);
