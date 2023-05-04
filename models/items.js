const mongoose = require("mongoose");
const {Schema}=mongoose;
const itemSchema = new Schema({
        itemNo:Number,
        name:String,
        category:String,
        qty:Number,
        warehouse:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "warehouse",
        }

});

module.exports = mongoose.model("item", itemSchema);
