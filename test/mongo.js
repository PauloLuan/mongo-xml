var module = require('../mongo'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    should = require('should');

describe('#save_entity', function() {

    it('should save an entity', function(done) {
        var json = {
            id: "HUEHUEbrbr123",
            teste: 1233
        };

        module.save(json, function(success) {
            done();
        });
    });

});
