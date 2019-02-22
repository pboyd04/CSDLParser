var csdl = require('../index');
var assert = require('assert');

/*Redfish uses CSDL very differently, let's make sure we can also parse Redfish style CSDL*/
describe('Redfish', function() {
  describe('Local File with Network', function() {
    let metadata;
    before(function(done) {
      csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', {}, function(error, meta) {
        assert.equal(error, null);
        metadata = meta;
        done();
      });
    });
    it('Has metadata', function() {
      assert.notEqual(metadata, undefined);
    });
    it('Has unversioned namespace', function() {
      assert.notEqual(metadata.Resource, undefined);
    });
    it('Has versioned namespace', function() {
      let keys = Object.keys(metadata);
      for(let i = 0; i < keys.length; i++) {
        if(keys[i] === '_options' || keys[i] === 'References' || keys[i] === 'context' || keys[i] === 'Resource')
        {
          continue;
        }
        regex = keys[i].match('Resource.v[0-9]_[0-9]_[0-9]*');
        assert.notEqual(regex, null);
      }
    });
    it('Has References', function() {
      assert.notEqual(metadata.References, undefined);
    });
  });
  describe('Local File without Network', function() {
    let metadata;
    before(function(done) {
      var options = {
        useLocal: __dirname + '/fixtures/Redfish/',
        useNetwork: false};
      csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', options, function(error, meta) {
        assert.equal(error, null);
        metadata = meta;
        done();
      });
    });
    it('Has metadata', function() {
      assert.notEqual(metadata, undefined);
    });
    it('Has unversioned namespace', function() {
      assert.notEqual(metadata.Resource, undefined);
    });
    it('Has versioned namespace', function() {
      let keys = Object.keys(metadata);
      for(let i = 0; i < keys.length; i++) {
        if(keys[i] === '_options' || keys[i] === 'References' || keys[i] === 'context' || keys[i] === 'Resource')
        {
          continue;
        }
        regex = keys[i].match('Resource.v[0-9]_[0-9]_[0-9]*');
        assert.notEqual(regex, null);
      }
    });
    it('Has References', function() {
      assert.notEqual(metadata.References, undefined);
    });
  });
  describe('Remote File: Resource', function() {
    let metadata;
    before(function(done) {
      csdl.parseMetadataUri('https://redfish.dmtf.org/schemas/Resource_v1.xml', {}, function(error, meta) {
        assert.equal(error, null);
        metadata = meta;
        done();
      });
    });
    it('Has metadata', function() {
      assert.notEqual(metadata, undefined);
    });
    it('Has unversioned namespace', function() {
      assert.notEqual(metadata.Resource, undefined);
    });
    it('Has versioned namespace', function() {
      let keys = Object.keys(metadata);
      for(let i = 0; i < keys.length; i++) {
        if(keys[i] === '_options' || keys[i] === 'References' || keys[i] === 'context' || keys[i] === 'Resource')
        {
          continue;
        }
        regex = keys[i].match('Resource.v[0-9]_[0-9]_[0-9]*');
        assert.notEqual(regex, null);
      }
    });
    it('Has References', function() {
      assert.notEqual(metadata.References, undefined);
    });
  });
  describe('Remote File: ServiceRoot', function() {
    let metadata;
    before(function(done) {
      csdl.parseMetadataUri('https://redfish.dmtf.org/schemas/ServiceRoot_v1.xml', {}, function(error, meta) {
        assert.equal(error, null);
        metadata = meta;
        done();
      });
    });
    it('Has metadata', function() {
      assert.notEqual(metadata, undefined);
    });
    it('Search', function() {
      let chassis = csdl.findByType(metadata, 'ChassisCollection.ChassisCollection');
      assert.notEqual(chassis, null);
    });
  });
});

