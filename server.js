const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chatRoutes = require('./routes/chatRoutes');
const { updateVectors } = require("./jobs/vectorSyncJob");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use('/',chatRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

if (process.env.SYNC_VECTORS === "true") {
  updateVectors();
}
