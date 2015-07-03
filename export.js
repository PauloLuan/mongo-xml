exports.export_to_json_file = function(json) {
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
        console.log('File successfully written! - Check your project directory for the output.json file');
    });
};

exports.exportToCSV = function() {
    var processItem = function(entity_doc, done) {
        appendTextToCsv(convertToCSV([entity_doc]), entity_doc, done);
    };

    var entities_collection = database.collection('entities');

    entities_collection.find({}, function(err, result_cursor) {
        mongoProcessing(result_cursor, processItem, 1, function(err) {
            if (err) {
                console.error('on noes, an error', err);
                process.exit(1);
            }
        });
    });
};

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        str += '\r\n';

        for (var index in array[i]) {
            if (line !== '') line += ',';

            line += array[i][index];
        }

        str += line;
    }

    return str;
}

function appendTextToCsv(text, entity_doc, done) {
    if (entity_doc.UF) {
        var csv_path = 'output/' + entity_doc.UF + '.csv';

        fs.exists(csv_path, function(exists) {
            if (!exists) {
                createColumnNames(csv_path, entity_doc, function() {
                    appendText(csv_path, text, done);
                });
            } else {
                appendText(csv_path, text, done);
            }
        });
    } else {
        done();
    }
}

var appendText = function(csv_path, text, done) {
    fs.appendFile(csv_path, text, function(err) {
        if (err) {
            console.log(err);
        }

        console.log(csv_path);

        done();
    });
};

function createColumnNames(csvPath, entity_doc, callback) {
    var entity_keys = Object.keys(entity_doc);
    var text = entity_keys;
    return appendText(csvPath, text, callback);
}
