const { MONGO_URI } =  require('../config/envs');
const mongoose = require('mongoose');

const conn = mongoose.createConnection(MONGO_URI);

module.exports = {
   ArtWork: conn.model("ArtWork", require("./artWorkSchema")),
   Comment: conn.model("Comment", require("./commentSchema")),
}


