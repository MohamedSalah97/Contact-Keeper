const express = require("express");
const app = express();
const connectDB = require("./config/db");


// connect database 
connectDB() ;

// init middleware
app.use(express.json({ extended : false})) ;

// define routes 
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));


const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`app is running at port ${PORT}`)) ;