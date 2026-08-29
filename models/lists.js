const mongoose = require("mongoose");
const { type } = require("node:os");
const { Schema } = mongoose;
const Reviews = require("./reviews");
const Users = require("./user");

const listSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        fileName: String
    },
    price: {
        type: Number,
        default: 0,
        set: (n) => {
            return n == null ? 0 : n;
        }
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Reviews"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Reviews.deleteMany({ _id: { $in: listing.reviews } });
    }
})
let Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;