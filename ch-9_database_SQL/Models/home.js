const db = require('../utils/databaseUtils');

module.exports = class Home
{
    constructor(HouseName,price,location,rating,photoUrl,description,id)
    {
        this.HouseName=HouseName;
        this.price=price;
        this.location=location;
        this.rating=rating;
        this.photoUrl=photoUrl;
        this.description = description;
        this.id =id;
    }

    save()
    {
        if(this.id)
        {
            return db.execute("UPDATE homes SET HouseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?", [this.HouseName,this.price,this.location,this.rating,this.photoUrl,this.description,this.id]);
        }
        else
        {
            return db.execute("INSERT INTO homes (HouseName,price,location,rating,photoUrl,description) VALUES (?,?,?,?,?,?)", [this.HouseName,this.price,this.location,this.rating,this.photoUrl,this.description]);
        }
    }

    static fetchData(callback)
    {
        return db.execute('SELECT * FROM homes');
    }

    static fetchDataById(homeId)
    {
        return db.execute('SELECT * FROM homes WHERE id=?',[homeId]);
    }

    static deleteById(homeId,callback)
    {
        return db.execute('DELETE FROM homes WHERE id=?',[homeId]);
    }
}