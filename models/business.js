const mongoose = require("mongoose");
const {Schema}=mongoose;
const businessSchema = new Schema({
        regNo:Number,
        name:String,
        email:String,
        contact:Number,
        password:String,
});

module.exports = mongoose.model("business", businessSchema);
