var packageFile = require('../package');
var csdl = require('../index');

var assert = require('assert');
describe('Constants', function() {
  describe('version', function() {
    it('should be a string', function() {
      assert.equal(typeof csdl.version, 'string');
    });
    it('should be equal to package version', function() {
      assert.equal(csdl.version, packageFile.version);
    });
  });
});

describe('Function', function() {
  describe('parseMetadata', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.parseMetadata, 'function');
    });
  });
  describe('parseMetadataFile', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.parseMetadataFile, 'function');
    });
  });
  describe('parseMetadataUri', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.parseMetadataUri, 'function');
    });
  });
  describe('cache', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.cache, 'function');
    });
  });
  describe('search', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.search, 'function');
    });
  });
  describe('findByType', function() {
    it('should be a function', function() {
      assert.equal(typeof csdl.findByType, 'function');
    });
  });
});
