const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name:{
        type:String,
        required: true,
    }, 
    title:{
        type:String,
        required:true,
    }, 
    bio:{
        type:String,
        required:true,
    }, 
    location:{
        type:String,
        required:true,
    },
    resume: {
        type: String,
    },
    image:{
        type : String,
    }, 
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;