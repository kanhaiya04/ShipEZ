const express = require("express");
const connectToMongo = require("./db");

const bodyParser=require("body-parser");
const ejs=require("ejs");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const business = require("./models/business");
const warehouse = require("./models/warehouse");
const items = require("./models/items");
const distance = require("./models/distance");

var user_id;


const PORT = 5000;
app.use(express.json());

connectToMongo();

// app.use("/business/", require("./routes/business"));
// app.use("/warehouse/", require("./routes/warehouse"));
// app.use("/item/", require("./routes/items"));
// app.use("/login",require("./routes/login"));
// app.use("/",require("./routes/index"));
app.get("/",async(req,res)=>{
  res.render('index');
})

app.get("/login",async(req,res)=>{
  res.render('production/login');
})

app.get("/warehouse",async (req, res) => {
  var user=user_id;
  var data=await warehouse.find({ owner: user });
  res.render('warehouse3',{details:data});
});

app.get("/items",async (req, res) => {
  var user=user_id;
  const warehouse_details=await warehouse.find({ owner: user });
  var warehouse_id=[];
  for(let i=0;i<warehouse_details.length;i++){

        warehouse_id=warehouse_id.concat(warehouse_details[i]._id);
  }
  var renderitems=[];
  for(let i=0;i<warehouse_id.length;i++){
        var newitems=await items.find({warehouse:warehouse_id[i].valueOf()})
        renderitems=renderitems.concat(newitems);
  }
  res.render('items3',{details:renderitems,warehouse_details:warehouse_details});
});



app.post("/login",async(req,res)=>{
  
  const { email, password } = req.body;
  try {
    let cred = await business.findOne({ email });
    if (!cred) {
      return res
        .status(400)
        .json({ errors: "Invalid creds, please try again" });
    }
    let passCompare = false;
    if (cred.password == password) {
      passCompare = true;
    }

    if (!passCompare) {
      return res
        .status(400)
        .json({ errors: "Invalid creds, please try again" });
    }



    user_id=cred._id.valueOf();
  res.redirect(`/warehouse`)
  } catch (error) {
    res.status(500).send({ error: "Some internal error occured" });
  }
})



app.post("/warehouse/add",async(req,res)=>{
  try {
    data = await warehouse.create({
      wareHouseNo: 1,
      owner: user_id,
      location: req.body.location,
      capacity: req.body.capacity,
    });
    await data.save();
    res.redirect('/warehouse');
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/item/add",async(req,res)=>{

  try {  
    data = await items.create({
          itemNo:req.body.itemNo,
          name:req.body.name,
          qty:req.body.qty,
          warehouse:req.body.warehouse,
          category:req.body.category,
    });
    await data.save();
    res.redirect("/items");
  }
    catch (error) {
          res.status(500).send({ error: "Internal Server Error" });                
    }
});


app.get("/shipment",async(req,res)=>{
  res.render('shipments');
});

app.get("/logout",async(req,res)=>{
    user_id=0;
    res.render("index");
});

app.get("/payment",async(req,res)=>{
  res.render("payment");
})

app.post("/distance",async(req,res)=>{
//   const dest1=req.body.dest1;
//   const dest2=req.body.dest2;
//   const data=await distance.find({Place1:dest1,Place2:dest2});
//   const distance=data[0].Distance;

  dest1=document.querySelector('input[name="b2"]:checked').value;
  dest2=document.querySelector('input[name="b2"]:checked').value;
  const data=await distance.find({Place1:dest1,Place2:dest2});
  const distance=data[0].Distance;
const quantity=document.getElementById("quant").value;
const volume=document.getElementById("vol").value;






    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000",
        data: JSON.stringify({ "Quantity": quantity,"Volume": volume,"Distance":distance}),
        contentType: "application/json",
        success: function (result) {
        res.send(result[0].prediction);
        },
        error: function (result, status) {
          alert(result);
        }
    


    });





  
});

app.listen(PORT || process.env.PORT, () => {
  console.log(`listening on port ${PORT}`);
});
