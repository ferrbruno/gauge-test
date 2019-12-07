const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(compression());

app.use(express.static("build"));
app.use("/data", express.static("data"));

app.listen(port, () => console.log(`Server listening on port ${port}.`));