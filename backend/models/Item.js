var { Schema, model } = require("mongoose");

var Item = new Schema({
	text: String,
	status: String,
	priority: String,
});

module.exports = model("Item", Item);
