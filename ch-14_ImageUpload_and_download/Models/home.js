const mongoose = require('mongoose');
const favourites = require('./favourites');


const homeSchema = mongoose.Schema(
{
    HouseName:
    {
        type:String,
        required:true,
    },
    price:
    {
        type:Number,
        required:true,
    },
    location:
    {
        type:String,
        required:true,
    },
    rating:
    {
        type:Number,
        required:true,
    },
    image:String,
    rules:String,
    description:String,
});

// homeSchema.pre('findOneAndDelete',
// async function()
// {
//     const homeId = this.getQuery()._id;
//     await favourites.deleteMany({HouseId : homeId});
// });

module.exports = mongoose.model('Home',homeSchema);