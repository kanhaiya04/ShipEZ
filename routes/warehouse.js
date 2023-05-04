const express = require("express");
const router = express.Router();

const warehouse = require("./../models/warehouse");

// add the warehouse
router.post("/add/:id", async (req, res) => {
  try {
    data = await warehouse.create({
      wareHouseNo: req.body.warehouseNo,
      owner: req.params.id,
      location: req.body.location,
      capacity: req.body.capacity,
    });
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/page/:id",async (req, res) => {
  var user=req.params.id;
  var data=await warehouse.find({ owner: user });
  var userM="/item/page/"+user;
  user="/warehouse/add/"+user;
  res.render('warehouse2',{details:data,user_id:userM,user_iid:user});
});
  //get all the warehouse under this business
  router.get("/:id", async (req, res) => {
    try {
      const data = await warehouse.find({ owner: req.params.id });
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });



module.exports = router;
