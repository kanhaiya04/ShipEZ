const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
        res.render('index');
})

router.get("/track",(req,res)=>{
        res.render('track');
})

router.get("/shipment",(req,res)=>{
        res.render('shipment2');
})

router.get("/item",(req,res)=>{
        res.render('item');
})


module.exports = router;