const express = require("express");
const dotenv = require("dotenv")
const morgan = require('morgan')
//load env

dotenv.config({ path: "./config.env" })

const app = express();

//Main Route
app.use('/', require('./routes/main'))
app.use('/', require('./routes/country'))
app.use('/', require('./routes/countryCodes'))
//PORT
const port = process.env.PORT || 8000;



//Handle Production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(__dirname + "/public/"));
    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}


app.listen(port, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${port}`)
})
