var mongoProcessing = require('mongo-cursor-processing'),
    mongo = require('./mongo'),
    fs = require('fs'),
    _ = require('lodash');

var self = {
    export_to_json_file: function(json) {
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        });
    },

    exportToCSV: function() {
        var processItem = function(entity_doc, done) {
            delete entity_doc._id;
            var inlineJson = JSON.flatten(entity_doc);
            var textJson = convertToCSV([inlineJson]);
            appendTextToCsv(textJson, inlineJson, done);
        };

        var count = 0;

        mongo.findOne()
            .then(function(result_cursor) {
                processItem(result_cursor._doc);
            })
            .catch(function(error) {
                console.log('Error during data export ', error);
            });
    }
};

module.exports = self;

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        str += '\r\n';

        for (var index in array[i]) {
            if (line !== '') line += ',';
            var temp = array[i][index];
            if (_.isEmpty(temp)) temp = "";
            line += temp;
        }

        str += line;
    }

    return str;
}

var appendTextToCsv = function(text, entity_doc, done) {
    var csv_path = 'output/output_all.csv';

    fs.exists(csv_path, function(exists) {
        if (!exists) {
            createColumnNames(csv_path, entity_doc, function() {
                appendText(csv_path, text, done);
            });
        } else {
            appendText(csv_path, text, done);
        }
    });
};

var appendText = function(csv_path, text, done) {
    fs.appendFile(csv_path, text, function(err) {
        if (err) {
            console.log(err);
        }

        console.log(csv_path);
    });
};

var createColumnNames = function(csvPath, entity_doc, callback) {
    var entity_keys = Object.keys(entity_doc);
    return appendText(csvPath, entity_keys, callback);
}

self.exportToCSV();
