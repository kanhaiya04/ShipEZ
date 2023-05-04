const express = require("express");
const router = express.Router();

const items =require("./../models/items");
const warehouse=require("./../models/warehouse");


//add the item to the database
router.post("/add", async (req,res) => {
        try {  
  data = await items.create({
        itemNo:req.body.itemNo,
        name:req.body.name,
        qty:req.body.qty,
        warehouse:req.body.warehouse
  });
  await data.save();
  res.send(data);
}
  catch (error) {
        res.status(500).send({ error: "Internal Server Error" });                
  }
});

router.get("/page/:id",async(req,res)=>{
      var user=req.params.id;
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
      // user="/warehouse/page/"+user;
      
     // console.log(warehouse_details);
      res.render('item',{details:renderitems,warehouse_details:warehouse_details,user_id:user});
});
//get all the items in the database
router.get("/:warehouse",async(req,res)=>{
      try {
            const data = await items.find({ warehouse:req.params.warehouse });
            res.send(data);
          } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
          }
});



module.exports = router;