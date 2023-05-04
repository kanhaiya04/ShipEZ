const express = require("express");
const router = express.Router();

const business = require("./../models/business");
const warehouse=require("./../models/warehouse");
const items =require("./../models/items");

router.post("/", async (req, res) => {

  
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



    var user=cred._id.valueOf();;
    //console.log(user);
    // const warehouse_details=await warehouse.find({ owner: user });
    // var warehouse_id=[];
    // for(let i=0;i<warehouse_details.length;i++){

    //       warehouse_id=warehouse_id.concat(warehouse_details[i]._id);
    // }
    // var renderitems=[];
    // for(let i=0;i<warehouse_id.length;i++){
    //       var newitems=await items.find({warehouse:warehouse_id[i].valueOf()})
    //       renderitems=renderitems.concat(newitems);
    // }
    // user="/warehouse/page/"+user;
    // //res.send(cred._id);
    // res.render('production/items',{details:renderitems,warehouse_details:warehouse_details,user_id:user});
    
    res.redirect(`/warehouse/page/${user}`);
  } catch (error) {
    res.status(500).send({ error: "Some internal error occured" });
  }
});

router.get('/',(req,res)=>{
  res.render('production/login');
})

module.exports = router;
