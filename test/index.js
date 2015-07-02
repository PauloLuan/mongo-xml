var module = require('../index'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    should = require('should');

describe('#getAllXmlFiles', function() {

    it('should return a non empty array', function(done) {
        var xmlPath = path.join(__dirname, 'input');

        return module.getAllXmlFiles(xmlPath)
            .then(function(files) {
                files.should.be.not.empty;
                files.should.have.length(1);

                //console.log(Object.keys(files[0]));
                done();
            });
    });
});

describe('#init', function() {
    this.timeout(5000);

    it('should execute the main function in order to execute the complete cycle of the app.', function(done) {
        var inputPath = path.join(__dirname, 'input');

        return module.init(inputPath, {})
            .then(function(result) {
                done();
            }).catch(function(error) {
                console.log(error);
                done();
            });
    });
});
