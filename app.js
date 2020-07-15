require("dotenv").config();

const express = require("express");
const app = express();
const trail = require("./controllers/trailcontroller");
const time = require("./controllers/timecontroller");
const shop = require("./controllers/shopcontroller");
const user = require("./controllers/usercontroller");

const sequelize = require("./db");
sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.listen(process.env.PORT, () =>
  console.log(`We're running on port ${process.env.PORT}`)
);

app.use("/user", user);
app.use(require("./middleware/validate_session"));
app.use("/trail", trail);
app.use("/time", time);
app.use("/shop", shop);

//develop