var module = require('../mongo'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    should = require('should');

describe('#save_entity', function() {

    it('should save, find and delete an entity', function(done) {

        var json = {
            "Action": "Add",
            "SupplierID": 3,
            "Identity.POI_Entity_ID": "897725357_1",
            "Identity.Names.POI_Name.Language_Code": "POR",
            "Identity.Names.POI_Name.Type": "Official",
            "Identity.Names.POI_Name.Text": "Pantaneira Correspondente Financeiro Ltda",
            "Identity.Category_ID.Type": "NT",
            "Identity.Category_ID.t": 9500,
            "Identity.Product_Type": 2,
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.Address_Number.House_Number": 50,
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetName.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetName.t": "Campos Sales",
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Attached": false,
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Before": true,
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedStreetAddress.ParsedStreetName.StreetType.t": "Rua",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel2.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel2.t": "Centro-Oeste",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel3.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel3.t": "Mato Grosso",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel4.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel4.t": "São José dos Quatro Marcos",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel5.Language_Code": "POR",
            "Locations.Location.Address.ParsedAddress.ParsedPlace.PlaceLevel5.t": "São José dos Quatro Marcos &amp;&amp;#35;40;Rural&amp;&amp;#35;41;",
            "Locations.Location.Address.ParsedAddress.PostalCode.NT_Postal": "78285-000",
            "Locations.Location.Address.ParsedAddress.CountryCode": "BRA",
            "Locations.Location.GeoPosition.Latitude": -15.61988,
            "Locations.Location.GeoPosition.Longitude": -58.17245,
            "Locations.Location.MapLinkID.LinkID": 892515396,
            "Locations.Location.MapLinkID.Side_of_Street": "L",
            "Locations.Location.MapLinkID.Percent_from_RefNode": 52,
            "Locations.Location.Confidence.Match_Level": "houseNumber"
        };

        module.save([json])

        .then(function(result) {
            return result;
        })

        .then(function(result) {
            var searchJson = {
                _id: result._id
            };

            module.findOne(searchJson)
                .then(function(findResult) {
                    var toDelete = {
                        _id: findResult._id
                    };

                    module.delete(toDelete)
                        .then(function() {
                            done();
                        })
                        .catch(function(error) {
                            done(error);
                        });
                });
        })

        .catch(function(error) {
            done(error);
        });
    });

});
