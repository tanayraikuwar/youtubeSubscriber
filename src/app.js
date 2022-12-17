const express = require('express');
const Subscribers = require("./models/subscribers");
const router = express.Router();
let app = express();
app.use(express.json());

//router starts here

router.route("/").get(async (req,res)=>{
    res.send("<h1>you are on capstone project 'get youtuber subscribers'</h1>");
})

router.get("/subscribers",async (req,res)=>{
    let subscriber = await Subscribers.find();
    res.json(subscriber);
})

router.get("/subscribers/names",async (req,res)=>{
    let subscriber = await Subscribers.find();
    let op = [];

    subscriber.map((val)=>{
        let obj = {};
        obj.name=val.name;
        obj.subscribedChannel=val.subscribedChannel
        op.push(obj);
    })
    res.json(op);
})


router.get("/subscribers/:id",async (req,res)=>{
    let id = req.params.id;
    try{
        let subscriber = await Subscribers.findById(id);
        res.json(subscriber)
    }
    catch(err){
        res.status(400).json({ error: "database invalid" });
    }
})

router.route('subscribers/post').post(async (req, res) => {
	const data = new Subscribers(req.body);
	await data.save()
	res.send(data)
})


module.exports = router

