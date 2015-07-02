var mongoProcessing = require('mongo-cursor-processing');
var fs = require('fs');

// db.entities.ensureIndex( { "POI_Entity_ID": 1 }, { unique: true , dropDups: true} )

// Retrieve
var database;

exports.initialize_db = function(callback) {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://localhost:27017/xmltest", function(err, db) {
        if (err) {
            return console.dir(err);
        }

        database = db;

        callback();
    });
};

function save_to_db(json, collection_name) {
    if (json) {
        // Connect to the db
        var collection = database.collection(collection_name);

        collection.insert(json, function(err, inserted) {
            if (err) {
                console.log(err);
            } else {
                console.log("salvo com sucesso!");
                json = null;
            }

            collection = null;
        });
    }
}


exports.save_entity = function(entity) {
    var collection_name = 'entities';

    if (Object.prototype.toString.call(entity) === '[object Array]') {
        for (var i = entity.length - 1; i >= 0; i--) {
            save_to_db(entity[i], collection_name);
        };
    } else {
        save_to_db(entity, collection_name);
    }
};

exports.delete_from_db = function(json, collection_name) {
    var collection = database.collection(collection_name);

    collection.delete(json, function(error, inserted) {
        if (error) {
            console.log(error);
        }
    });
};

exports.queryByObject = function(json, collection_name, callback) {
    var collection = database.collection(collection_name);
    collection.findOne(json, function(err, result_json) {
        callback(result_json);

        result_json = null;
        collection = null;
    });
};
