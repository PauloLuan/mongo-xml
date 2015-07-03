'use strict';
/**
 * https://github.com/PauloLuan/
 *
 * Copyleft (c) 2015 Paulo Luan
 * Licensed under the MIT license.
 */

var parser = require('xml2json'),
    Mongo = require('./mongo'),
    assert = require('assert'),
    Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    colors = require('colors'),
    self;

function makeIterator(array) {
    var nextIndex = 0;

    return {
        next: function() {
            return nextIndex < array.length ? {
                value: array[nextIndex++],
                done: false
            } : {
                done: true
            };
        }
    }
};

module.exports = {

    init: function() {
        self = this;
        //var inputPath = "test/input";
        var inputPath = "/media/inova/DADOS/sources/xmltocsv/bronks/BRA/";
        var deferred = Q.defer();

        self.getAllXmlFiles(inputPath)
            .then(function(files) {
                self.proccessFiles(files);
            })
            .then(function() {
                deferred.resolve();
            })
            .catch(function(error) {
                console.log(error);
                deferred.reject(error);
            });

        return deferred.promise;
    },

    proccessFiles: function(files) {
        console.log(('Preparing ' + files.length + ' files to process.').yellow);

        var cursor = makeIterator(files);

        function process(cursor) {
            var value = cursor.next();

            var xmlPath = value.value;
            assert.equal(fs.existsSync(xmlPath), true, 'path should exist'.red);
            console.log(('Processing: ' + xmlPath).yellow);
            var xml = fs.readFileSync(xmlPath).toString('utf-8');
            var content = parser.toJson(xml); //returns a string containing the JSON structure by default
            content = content.replace(/\$/g, "");
            var json = JSON.parse(content);
            var arrayToSave = json.DeliveryPackage.POI;

            Mongo.save(arrayToSave)
                .then(function() {
                    console.log((xmlPath + ' has been finished!').green);

                    if (!value.done) {
                        process(cursor);
                    }
                })
                .catch(function(error) {
                    console.log("Erro :(", error);
                });
        };

        process(cursor);

        _.forEach(files, function(xmlPath, key) {

        });
    },


    /**
     *
     * Search recursivelly into a directory and returns all files that matches the searched file extension (.xml).
     *
     * @param destinationPath - the xml path
     * @return {Promisse.<string[]>} files - the xml files.
     * @rejects {ValidationError} if the input is too long
     */
    getAllXmlFiles: function(destinationPath) {
        var deferred = Q.defer();

        var destPath = path.join(destinationPath + '/**/*.xml');
        glob(destPath, function(err, files) {
            if (err) {
                console.log("Error: ", err);
                deferred.reject(err);
            } else {
                deferred.resolve(files);
            }
        });

        return deferred.promise;
    }
}

module.exports.init();
