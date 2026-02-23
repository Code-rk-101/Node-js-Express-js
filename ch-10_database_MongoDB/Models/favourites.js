const favouritesHome = [];

const { getDB } = require('../utils/databaseUtils');

module.exports = class Favourites
{
    constructor(HouseId)
    {
        this.HouseId=HouseId;
    }

    save ()
    {
        const db = getDB();

        return db.collection('favourites').findOne({HouseId: this.HouseId}).then((exist)=>
        {
            if(!exist)
            {
                return db.collection('favourites').insertOne(this);
            }
            return Promise.resolve;
        })
    }

    static getFavourites()
    {
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }
    static removeFromFavouriteList(homeId)
    {
        const db = getDB();
        return db.collection('favourites')
        .deleteOne({HouseId: homeId});
    }
    
};