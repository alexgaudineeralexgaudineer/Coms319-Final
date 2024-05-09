
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

app.get("/listProducts/:animal/:infotype", async (req, res) => {
    console.log("Instead here")
    const infotype = req.params.infotype;
    const animal = req.params.animal;
    await client.connect();

    const query = {
        "animal": animal,
        "type": infotype
    };
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.get("/product/:id", async (req, res) => {
    const id = Number(req.params.id);
    await client.connect();

    const query = {
        "id": id
    };
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.get("/product/:id/getReviews", async (req, res) => {
    console.log("here")
    const id = Number(req.params.id);
    await client.connect();

    const query = {
        "productId": id
    };
    const results = await db
        .collection("reviews")
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.post("/product/:id/addReview", async (req, res) => {
    try {
        await client.connect();

        const newReview = {
            "productId": Number(req.body.id),
            "name": req.body.name,
            "text": req.body.text,
            "rating": Number(req.body.rating)
        };

        const results = await db
            .collection("reviews")
            .insertOne(newReview);

        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.delete("/product/:id/deleteReview/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const id = Number(req.params.id);
        await client.connect();

        const query = {
            "productid": id,
            "name": name
        };

        const reviewDeleted = await db.collection("reviews").findOne(query);
        const results = await db.collection("reviews").deleteOne(query);

        res.status(200);
        res.send(reviewDeleted);
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put("/product/:id/updateReview/:name", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const name = req.params.name;
        const query = {
            "id": id,
            "name": name
        };

        await client.connect();

        const updateData = {
            $set: {
                "productid": Number(req.body.id),
                "name": req.body.name,
                "text": req.body.text,
                "rating": Number(req.body.rating)
            }
        };

        const reviewUpdated = await db.collection("reviews").findOne(query);
        const results = await db.collection("reviews").updateOne(query, updateData, {});

        if (results.matchedCount === 0) {
            return res.status(404).send({ message: 'Review not found' });
        }

        res.status(200);
        res.send(reviewUpdated);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});