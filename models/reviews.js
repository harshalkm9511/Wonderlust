const mongoose = require("mongoose");
const { min } = require("../validators/schema");
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now()
    },
    aurthor:{
        type:Schema.Types.ObjectId,
        ref:"Users"
    }
});

module.exports = mongoose.model("Reviews", reviewSchema);