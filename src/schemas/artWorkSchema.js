const { Schema} = require("mongoose");


const artWorkSchema = new Schema({
    name: String,
    place: Object,
    image: String,
    description: String,
    coordinates: Array,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
 })

 
module.exports =  artWorkSchema