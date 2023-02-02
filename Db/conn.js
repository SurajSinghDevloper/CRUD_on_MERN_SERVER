const mongo = require('mongoose');

mongo.set('strictQuery',false)
mongo.connect("mongodb://localhost:27017/mydb",function(err){
    if (err) {
        console.log("FOUND ERROR WHILE CONNECTING",err);
    }else{
        console.log("SUCCESSFULLY CONNECTED TO D.B")
    }
})