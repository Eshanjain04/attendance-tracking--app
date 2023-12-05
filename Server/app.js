const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl,()=>console.log("DB is Connected"));
const app = express();
const port = process.env.PORT || 8080;
const middleware = require("./middleware");
const cors = require("cors");
const authRoutes = require('./routers/authRoutes');
const subjectRoutes = require('./routers/subjectRoutes');

app.use(cors());
app.use("/user",authRoutes);
app.use("/subject",middleware.requireLogin,subjectRoutes);


app.listen(port,() => console.log("Server is running on port "+[port]));
module.exports = app;