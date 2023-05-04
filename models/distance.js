const mongoose = require("mongoose");
const {Schema}=mongoose;
const distanceSchema = new Schema({
        Place1:String,
        Place2:String,
        Distance:String,
});

module.exports = mongoose.model("distance", distanceSchema);
