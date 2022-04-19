const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Item = require("./models/Item");

const clientOptions = {
	useNewUrlParser: true,
	dbName: "apinode",
};

initClientDbConnection = async () => {
	try {
		await mongoose.connect(process.env.URL_MONGO, clientOptions);
		console.log("Connected");
	} catch (error) {
		console.log(error);
		throw error;
	}
};

initClientDbConnection();

const app = express();
app.use(express.json());
app.use(
	cors({
		exposedHeaders: ["Authorization"],
		origin: "*",
	})
);

const port = 3500;

app.get("/todos", async (_req, res) => {
	try {
		const todos = await Item.find();
		res.json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.post("/todos", async (req, res) => {
	try {
		const todo = new Item(req.body);
		await todo.save();
		const todos = await Item.find();
		res.json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.delete("/todos/:id", async (req, res) => {
	try {
		await Item.findByIdAndDelete(req.params.id);
		const todos = await Item.find();
		res.json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.put("/todos/:id", async (req, res) => {
	try {
		await Item.findByIdAndUpdate(req.params.id, req.body);
		const todos = await Item.find();
		res.json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
