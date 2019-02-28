const FileCache = require('../lib/cache/fileCache');
var assert = require('assert');

describe('FileCache', function() {
  describe('Construct', function() {
    it('Default', function() {
      let fc = new FileCache();
      assert.equal(fc.localDirs, null);
      assert.equal(fc.useNetwork, true);
    });
    it('Local Dir as string', function() {
      let fc = new FileCache('test');
      assert.equal(fc.localDirs, 'test');
      assert.equal(fc.useNetwork, true);
    });
    it('Local Dir as array', function() {
      let fc = new FileCache(['test', 'test2']);
      assert.deepEqual(fc.localDirs, ['test', 'test2']);
      assert.equal(fc.useNetwork, true);
    });
    it('Full params with useNetwork true', function() {
      let fc = new FileCache(['test', 'test2'], true);
      assert.deepEqual(fc.localDirs, ['test', 'test2']);
      assert.equal(fc.useNetwork, true);
    });
    it('Full params with useNetwork false', function() {
      let fc = new FileCache(['test', 'test2'], false);
      assert.deepEqual(fc.localDirs, ['test', 'test2']);
      assert.equal(fc.useNetwork, false);
    });
    it('No local cache', function() {
      let fc = new FileCache(null, false);
      assert.deepEqual(fc.localDirs, null);
      assert.equal(fc.useNetwork, false);
    });
  });
  describe('Has File', function() {
    let fc = new FileCache([__dirname + '/fixtures/'], false);
    it('Starts empty', function() {
      assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), false);
    });
    it('Gets file', function() {
      let promise = fc.getFile('http://example.com/SimpleMetadata.xml');
      return promise.then(data => {
        assert.notEqual(data, undefined);
        assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), true);
      });
    });
    it('Gets file Same File', function() {
      let promise = fc.getFile('http://example.com/SimpleMetadata.xml');
      return promise.then(data => {
        assert.notEqual(data, undefined);
        assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), true);
      });
    });
    it('Non existant file', function(done) {
      let myFC = new FileCache([__dirname + '/fixtures/'], true);
      let promise = myFC.getFile('http://example.com/NonExistant.xml');
      promise.then(() => {
        assert.fail('Should not have file!');
        done();
      }).catch(e => {
        assert.notEqual(e, null);
        done();
      });
    });
    it('Non existant file, no network', function(done) {
      let myFC = new FileCache([__dirname + '/fixtures/'], false);
      let promise = myFC.getFile('http://example.com/NonExistant.xml');
      promise.then(() => {
        assert.fail('Should not have file!');
        done();
      }).catch(e => {
        assert.notEqual(e, null);
        done();
      });
    });
    it('Bad URI', function(done) {
      let myFC = new FileCache([__dirname + '/fixtures/'], true);
      let promise = myFC.getFile('fake://_?*example.com/NonExistant.xml');
      promise.then(() => {
        assert.fail('Should not have file!');
        done();
      }).catch(e => {
        assert.notEqual(e, null);
        done();
      });
    });
  });
});
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
