const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connect_db = require("./config/connect_db");
const main_routes = require("./routes/main_routes");

const app = express();
const port = process.env.PORT || 5000;

// Environment Variables
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", main_routes);
connect_db();

app.listen(port, () => console.log(`Server is started on port ${port}`));
