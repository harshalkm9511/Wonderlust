const mongoose = require("mongoose");
const Listings = require("../models/lists.js");
let sampleData = require("./initListing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust"
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })



sampleData = sampleData.map((obj) => {
    return {
        ...obj,
        owner: "6a88b065dd0d851b27651d53"
    }
});

Listings.insertMany(sampleData)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });