//fake dataBase
const registeredHome = [];


const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const { error } = require('console');
const Favourites = require('./favourites');
const homePath = path.join(rootDir,'data','home.json');

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
            if(this.id)
            {
                registeredHome = registeredHome.map((home)=>home.id === this.id ? this: home);
            }
            else
            {
                this.id= Math.random().toString();
                registeredHome.push(this);
            }
        
            fs.writeFile(homePath, JSON.stringify(registeredHome), error =>
            {
                console.log("file writting conclude","error:",error);
            });
        });
    }

    static fetchData(callback)
    {
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

    static fetchDataById(homeId,callback)
    {
        this.fetchData((homes)=>
        {
            const homeData = homes.find((home)=>home.id === homeId);
            callback(homeData);
        });
    }

    static deleteById(homeId,callback)
    {
        this.fetchData((homes)=>
        {
            const registeredHomeAfterDelete = homes.filter((home)=> home.id !== homeId);
            fs.writeFile(homePath, JSON.stringify(registeredHomeAfterDelete), (err)=>
            {
                Favourites.removeFromFavouriteList(homeId,callback)
            })
        });
    }
}