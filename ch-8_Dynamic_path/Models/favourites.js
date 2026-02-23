const favouritesHome = [];

const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const { error } = require('console');
const favouritesPath = path.join(rootDir,'data','favourites.json');

module.exports = class Favourites
{
    static addToFavourite(homeId,callback)
    {
        Favourites.getFavourites((favourites)=>
        {
            if(favourites.includes(homeId))
            {
                callback('Home is already in Favourites');
            }
            else
            {
                favourites.push(homeId);
                fs.writeFile(favouritesPath, JSON.stringify(favourites), error =>
                {
                    console.log("file writting conclude","error:",error);
                    callback()
                });
            }
        });
    };

    static getFavourites(callback)
    {
        fs.readFile(favouritesPath,(error,data)=>
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
    static removeFromFavouriteList(homeId,callback)
    {
        this.getFavourites((homesId)=>
        {
            const registeredHomeAfterDelete = homesId.filter((home)=> home !== homeId);
            fs.writeFile(favouritesPath, JSON.stringify(registeredHomeAfterDelete),callback);
        });
    }
    
};