const express = require("express");
const connectToMongo = require("./db");

const bodyParser=require("body-parser");
const ejs=require("ejs");
var app = express();

app.use(express.json());

connectToMongo();
app.get("/",async(req,res)=>{
    alert("working");
    res.render('track');
  })


  app.get("/status",async(req,res)=>{
    res.send("working");
  })
  