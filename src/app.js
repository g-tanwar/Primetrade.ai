const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const apiRoutes = require("./routes/index.route");
const notFound = require("./middleware/not-found.middleware");
const errorHandler = require("./middleware/error.middleware");

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
