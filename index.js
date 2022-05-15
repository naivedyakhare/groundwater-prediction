var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/test2',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
 
app.post("/post_feedback",(req,res)=>{
    var email = req.body.email;
    var lat = req.body.lat;
    var lng = req.body.lng;

    var data = {
        "email" : email,
        "coordinates": {
            "latitude": lat,
            "longitude": lng
        }
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('map.html');
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return app.post('/post_feedback', (req, res) => res.status(204).send());
}).listen(5500);


console.log("Listening on PORT 5500");