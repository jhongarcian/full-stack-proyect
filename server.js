
// dotenv
require(dotenv).config();

// Express as a server.
const express = require("express");

// Running on port 8080.
const PORT = process.env.PORT || 5050;

// Server with express.
const server = express();

// Every endpoint with a json response.
server.use(express.json());

// Health endpoint created.
server.get("/heartbeat", (req, res) => {
	res.json({"is":"working", "status":"good"});
});

// Server PORT listening.
server.listen(PORT, () => {
	console.log(`The server is running at PORT ${PORT}`)
})

