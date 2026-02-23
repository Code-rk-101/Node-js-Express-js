const {ObjectId } = require('mongodb');
const {getDB} = require('../utils/databaseUtils');

module.exports = class Home
{
    constructor(HouseName,price,location,rating,photoUrl,description,_id)
    {
        this.HouseName=HouseName;
        this.price=price;
        this.location=location;
        this.rating=rating;
        this.photoUrl=photoUrl;
        this.description = description;
        if(_id)
        {
            this._id = _id;
        }
        
    }

    save()
    {
        const db = getDB();
        const updatedObj =
        {
            HouseName:this.HouseName,
            price:this.price,
            location:this.location,
            rating:this.rating,
            photoUrl:this.photoUrl,
            description:this.description 
        }
        if(this._id)
        {
            return db.collection('homes')
            .updateOne({_id: new ObjectId(String(this._id))},{$set:updatedObj});
        }
        else
        {
            return db.collection('homes').insertOne(this);
        }
        
    }

    static fetchData()
    {
        const db = getDB();
        return db.collection('homes').find().toArray();
    }

    static fetchDataById(homeId)
    {
        const db = getDB();
        return db.collection('homes')
        .find({_id: new ObjectId(String(homeId))})
        .next();
    }

    static deleteById(homeId,callback)
    {
        const db = getDB();
        return db.collection('homes')
        .deleteOne({_id: new ObjectId(String(homeId))});
    }
}