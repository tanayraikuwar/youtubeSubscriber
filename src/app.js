const express = require('express');
const Subscribers = require("./models/subscriber");
const router = express.Router(); //we create here router object to handle request and response

//router starts here

/**Router for Homepage */

router.route("/").get(async (req,res)=>{
    //this is shown on our root page
    res.send("<h1>You are on Capstone Project 'Get Youtube Subscribers' Homepage !!!!!</h1>");
})

/** Router to get subscribers */

router.route("/subscribers").get(async (req,res)=>{
    //here we don't need "__v" so we use (.select("-__v"))
    let subscriber = await Subscribers.find().select("-__v");
    res.json(subscriber);
})

/**Router to get Subscribers and name */

router.route("/subscribers/names").get(async (req,res)=>{
    let subscriber = await Subscribers.find().select("-_id -__v -subscribedDate");
    res.json(subscriber);//here we get only two object field ie. "name" and "subscribedChannel"
})

/**Router to get subscribers by id */

router.route("/subscribers/:id").get(async (req,res)=>{
    let id = req.params.id;
    try{//on successful operation we get subscriber object of specific "_id"
        let subscriber = await Subscribers.findById(id);
        res.json(subscriber)
    }
    catch(err){//if error occurs we get error message with status code 400
        res.status(400).json({ message: err.message });
    }
})





module.exports = router

