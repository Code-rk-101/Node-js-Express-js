//fake dataBase
const registeredHome = [];

const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const { error } = require('console');

module.exports = class Home
{
    constructor(HouseName,price,location,rating,photoUrl)
    {
        this.HouseName=HouseName;
        this.price=price;
        this.location=location;
        this.rating=rating;
        this.photoUrl=photoUrl;
    }
    save()
    {
        Home.fetchData((registeredHome)=>
        {
            registeredHome.push(this);
            const homePath = path.join(rootDir,'data','home.json');
        
            fs.writeFile(homePath, JSON.stringify(registeredHome), error =>
            {
                console.log("file writting conclude","error:",error);
            });
        });
        
    }

    static fetchData(callback)
    {
        const homePath = path.join(rootDir,'data','home.json');
        fs.readFile(homePath,(error,data)=>
        {
            if(error)
            {
                return callback([]);
            }
            else
            {
                console.log("file read error :",error);
                 
                return callback(JSON.parse(data));
            }
            
        });
        
    }
}