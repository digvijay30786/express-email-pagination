const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
}, {
    versionKey: false,
    timestamps:false
});

const admin = mongoose.model("admin", adminSchema);

module.exports =  admin;