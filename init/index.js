const mongoose = require("mongoose");
const Listings = require("../models/lists.js");
let sampleData = require("./initListing.js");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const MONGO_URL = "mongodb+srv://harshalkm010_db_user:qxdaDL2Fg2sfbZTi@cluster0.dwksrif.mongodb.net/?appName=Cluster0";
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
        owner: "6a93f48933a1f65ef4b84ab5"
    }
});

Listings.insertMany(sampleData)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });