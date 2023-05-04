const express = require("express");
const router = express.Router();

const business = require("./../models/business");

//to reg business to portal
router.post("/reg", async (req,res) => {
      const num=await business.find();
        try {  
  data = await business.create({
        regNo:num.length+1,
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password,
  });
  await data.save();
  res.send(data);
}
  catch (error) {
        res.status(500).send({ error: "Internal Server Error" });                
  }
});


//to fetch all the details of the business
router.get("/:id",async (req,res) => {
      try {
            const data = await business.find({ _id: req.params.id });
            res.send(data);
          } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
          }
})


module.exports = router;