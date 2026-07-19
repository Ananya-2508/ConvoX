import mongoose from "mongoose";
const userSchema = new mongoose. Schema ({

clerkId:{
    type: String,
    required: true,
    unique: true,

},
email: {
type: String,
required: true,
unique: true,
},

fullName : {
type: String,
required: true,
},

profilePic: {
type: String,
default: "",
},
},
{timestamps:true}
); 
//this is a member since 200x or something like that and also, it tells created and updated at what time


const User=mongoose.model("User",userSchema)

export default User;