const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
