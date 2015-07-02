var parser = require('xml2json');
var fs = require('fs');

fs.readFile('./NVTPOI_BRA_9500_001.xml', 'utf8', function(err, xml) {
    if (err) {
        return console.log(err);
    }

    var json = parser.toJson(xml); //returns a string containing the JSON structure by default
    console.log(json);
});
