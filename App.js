const exp = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('./Db/conn')
require('dotenv').config();
const emp = require("./models/EmpSchema");
const router = require('./routes/router')
const PORT = 8000
const app = exp()

app.use(cors())
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(router)



app.listen(PORT, function(err){
    if (err) {
        console.log("ERROR IN SERVER =>> ",err);
    }else{
        console.log(`SERVER STARTED ON PORT =>> ${PORT}`)
    }
})