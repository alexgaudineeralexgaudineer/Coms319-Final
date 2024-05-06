
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "meowwizdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/:collection", async (req, res) => {
    const collection = req.params.collection;
    await client.connect();

    const query = {};
    const results = await db
        .collection(collection)
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.get("/:collection/:infotype", async (req, res) => {
    const infotype = req.params.infotype;
    const collection = req.params.collection;
    await client.connect();

    const query = { "type": infotype };
    const results = await db
        .collection(collection)
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.get("/:collection/:infotype/:id", async (req, res) => {
    const id = Number(req.params.id);
    const infotype = req.params.infotype;
    const collection = req.params.collection;
    await client.connect();

    const query = {
        "id": id,
        "type": infotype
    };
    const results = await db
        .collection(collection)
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.post("/:collection/:infotype/:id/addReview", async (req, res) => {

    try {
        await client.connect();

        const newProduct = {
            "id": Number(req.body.id),
            "title": req.body.title,
            "price": Number(req.body.price),
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            "rating":
            {
                "rate": Number(req.body.rating.rate),
                "count": req.body.rating.count
            }
        };

        const results = await db
            .collection("fakestore_catalog")
            .insertOne(newProduct);

        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();

        const query = { id: id };

        const productDeleted = await db.collection("fakestore_catalog").findOne(query);
        const results = await db.collection("fakestore_catalog").deleteOne(query);

        res.status(200);
        res.send(productDeleted);
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put("/updateProduct/:id", async (req, res) => {
    try {

        const id = Number(req.params.id);
        const query = { id: id };

        await client.connect();

        const updateData = {
            $set: {
                "title": req.body.title,
                "price": req.body.price,
                "description": req.body.description,
                "category": req.body.category,
                "image": req.body.image,
                "rating":
                {
                    "rate": req.body.rating.rate,
                    "count": req.body.rating.count
                }
            }
        };

        const productUpdated = await db.collection("fakestore_catalog").findOne(query);
        const results = await db.collection("fakestore_catalog").updateOne(query, updateData, {});

        if (results.matchedCount === 0) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200);
        res.send(productUpdated);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});