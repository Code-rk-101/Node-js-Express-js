const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
{
    firstname:
    {
        type:String,
        required:[true,'first name is required'],
    },
    lastname:
    {
        type:String,
    },
    email:
    {
        type:String,
        required:[true,'Email is required'],
        unique:true,
    },
    password:
    {
        type:String,
        required:[true,'Password is required'],
    },
    role:
    {
        type:String,
        enum:['guest','host'],
        default: 'guest',
    },
    favourites:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    }]
});

module.exports = mongoose.model('User',userSchema);