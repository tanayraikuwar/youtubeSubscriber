const express = require('express');
const Subscribers = require("./models/subscriber");
const router = express.Router();

//router starts here

/**Router for Homepage */

router.route("/").get(async (req,res)=>{
    res.send("<h1>you are on capstone project 'get youtuber subscribers'</h1>");
})

/**Router for get subscribers */

router.get("/subscribers",async (req,res)=>{
    let subscriber = await Subscribers.find();
    res.json(subscriber);
})

/**Router for get Subscribers and name */

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

/**Router for get subscribers by id */

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



module.exports = router

