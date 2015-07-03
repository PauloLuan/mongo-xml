// db.entities.ensureIndex( { "Identity.POI_Entity_ID": 1 }, { unique: true , dropDups: true} )

var mongoose = require('mongoose'),
    Q = require('q'),
    fs = require('fs'),
    colors = require('colors');


mongoose.connect('mongodb://localhost/xmltest');

var Entity = mongoose.model('Entity', {
    "Action": String,
    "SupplierID": Number,
    "Identity.POI_Entity_ID": String,
    "Identity.Names.POI_Name.Language_Code": String,
    "Identity.Names.POI_Name.Type": String,
    "Identity.Names.POI_Name.Text": String,
    "Identity.Category_ID.Type": String,
    "Identity.Category_ID.t": Number,
    "Identity.Product_Type": Number,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.Address_Number.House_Number": Number,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetName.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetName.t": String,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Attached": Boolean,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Before": Boolean,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.t": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel2.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel2.t": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel3.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel3.t": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel4.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel4.t": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel5.Language_Code": String,
    "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel5.t": String,
    "Locations.Location.Address.ParsedAddress.PostalCode.NT_Postal": String,
    "Locations.Location.Address.ParsedAddress.CountryCode": String,
    "Locations.Location.GeoPosition.Latitude": Number,
    "Locations.Location.GeoPosition.Longitude": Number,
    "Locations.Location.MapLinkID.LinkID": Number,
    "Locations.Location.MapLinkID.Side_of_Street": String,
    "Locations.Location.MapLinkID.Percent_from_RefNode": Number,
    "Locations.Location.Confidence.Match_Level": String
});

JSON.flatten = function(data) {
    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop) {
                var split_prop = prop.split('.').pop();
                //result[split_prop] = {};
                result[prop] = {};
            }
        }
    }
    recurse(data, "");
    return result;
}

module.exports = {
    save: function(entities) {
        var deferred = Q.defer();
        var isSaved = false;

        if (Object.prototype.toString.call(entities) === '[object Array]') {

            for (var i = entities.length - 1; i >= 0; i--) {
                var ent = JSON.flatten(entities[i]);
                var entityObj = new Entity(ent);

                entityObj.save(function(error, result) {
                    if (error) {
                        deferred.reject(error);
                    }

                    deferred.resolve(result);
                });
            };

        } else {

            var entityObj = new Entity(JSON.flatten(entities));

            entityObj.save(function(error, result) {
                if (error) {
                    deferred.reject(error);
                }

                deferred.resolve(result);
            });
        }

        return deferred.promise;
    },

    delete: function(json) {
        var deferred = Q.defer();

        Entity.remove(json, function(error) {
            if (error) {
                deferred.reject(error);
            }
            deferred.resolve(true);
        });

        return deferred.promise;
    },

    findOne: function(json) {
        var deferred = Q.defer();

        Entity.findOne(json, function(error, result) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(result);
        });

        return deferred.promise;
    }
}
