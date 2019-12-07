const express = require("express");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());

app.use(express.static("build"));
app.use("/data", express.static("data"));

app.listen(port, () => console.log(`Server listening on port ${port}.`));