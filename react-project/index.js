const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:bhulai@cluster0.s64dogk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

var database;

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    database = client.db("campaignDB");

    app.listen(5050, () => {
      console.log("Server is running on port 5050");
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

run().catch(console.dir);


 app.get("/api/CampaignDB/getAll", async (req, res) => {
    try {
      const collection = database.collection("campaigns");  
      const documents = await collection.find({}).toArray();
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/CampaignDB/user", async (req, res) => {
    try {
      const { email, password } = req.body;
      const collection = database.collection("users");
      const user = await collection.findOne({ email: email, password: password });
      if (!user) {
        return res.status(404).json({ message: "User not found or password is incorrect." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/CampaignDB/userPost", async (req, res) => {
    try{
      const collection = database.collection("users");
      const { email, password } = req.body;
      const newUser = {
        email: email,
        password: password 
      };
      const documents = await collection.insertOne(newUser);
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  app.post("/api/CampaignDB/post", async (req, res) => {
    try{
      const collection = database.collection("campaigns");
      const newId = await collection.countDocuments()+1;
      const newCampaign = { ...req.body, id: parseInt(newId) };
      const documents = await collection.insertOne(newCampaign);
      if (documents.acknowledged) {
        const insertedDocument = await collection.findOne({ id: newId });
        res.status(200).json(insertedDocument);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

app.put("/api/CampaignDB/edit/:id", async (req, res)=>{
  try{
      const collection = database.collection("campaigns");
      const { id } = req.params;
      const { brandName, budget, promotionType, date } = req.body; 
      const result = await collection.updateOne({ id: parseInt(id) }, { $set: { brandName, budget, promotionType, date } });
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "No matching document found." });
      }
      if (result.modifiedCount === 0) {
        return res.status(200).json({ message: "No changes made to the document." });
      }
  
      res.status(200).json({ message: "Document updated successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

app.delete("/api/CampaignDB/delete/:id", async (req, res) => {
  try {
    const collection = database.collection("campaigns");
    const { id } = req.params;
    const result = await collection.deleteOne({ id: parseInt(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No document found with that ID." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



