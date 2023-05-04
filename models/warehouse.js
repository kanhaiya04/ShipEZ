const mongoose = require("mongoose");
const { Schema } = mongoose;
const warehouseSchema = new Schema({
  wareHouseNo: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
  location:String,
  capacity:Number,
});

module.exports = mongoose.model("warehouse", warehouseSchema);
