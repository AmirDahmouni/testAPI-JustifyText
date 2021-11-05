const express = require('express')
const app = express();
const router=require("./router")
require('dotenv').config()


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

app.use("/",(req,res)=>res.send(" you are welcome! first entry Point POST: https://textjustifytest.herokuapp.com/api/token"))
app.use("/api",router)


// server listening
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
