const mongoose = require('mongoose');
const favourites = require('./favourites');


const homeSchema = mongoose.Schema(
{
    HouseName:
    {
        type:String,
        require:true,
    },
    price:
    {
        type:Number,
        require:true,
    },
    location:
    {
        type:String,
        require:true,
    },
    rating:
    {
        type:Number,
        require:true,
    },
    photoUrl:String,
    description:String,
});

homeSchema.pre('findOneAndDelete',
async function()
{
    const homeId = this.getQuery()._id;
    await favourites.deleteMany({HouseId : homeId});
});

module.exports = mongoose.model('Home',homeSchema);