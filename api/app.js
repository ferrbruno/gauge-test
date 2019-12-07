const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use("/data", express.static("data"));

app.listen(port, () => console.log(`Server listening on port ${port}.`));