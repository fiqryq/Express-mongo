const express = require("express");
const router = require("./router/route");
const app = express();
const port = 3000;

// body parser builtin express > 4.16
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
