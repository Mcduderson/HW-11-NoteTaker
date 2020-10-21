const express = require('express');
const apiroutes = require("./routes/apiroutes.js");
const htmlroutes = require("./routes/htmlroutes.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use('/api', apiroutes);
app.use("/", htmlroutes);

app.listen(PORT, () => console.log(`Listenning on PORT ${PORT}`));
