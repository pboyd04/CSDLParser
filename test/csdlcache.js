const CSDLCache = require('../lib/cache/csdlCache');
var assert = require('assert');

describe('CSDLCache', function() {
  describe('Construct', function() {
    it('Default', function() {
      let cc = new CSDLCache();
      assert.equal(cc.fileCache.localDirs, null);
      assert.equal(cc.fileCache.useNetwork, true);
    });
    it('Local Dir as string', function() {
      let fc = new CSDLCache('test');
      assert.equal(fc.fileCache.localDirs, 'test');
      assert.equal(fc.fileCache.useNetwork, true);
    });
    it('Local Dir as array', function() {
      let fc = new CSDLCache(['test', 'test2']);
      assert.deepEqual(fc.fileCache.localDirs, ['test', 'test2']);
      assert.equal(fc.fileCache.useNetwork, true);
    });
    it('Full params with useNetwork true', function() {
      let fc = new CSDLCache(['test', 'test2'], true);
      assert.deepEqual(fc.fileCache.localDirs, ['test', 'test2']);
      assert.equal(fc.fileCache.useNetwork, true);
    });
    it('Full params with useNetwork false', function() {
      let fc = new CSDLCache(['test', 'test2'], false);
      assert.deepEqual(fc.fileCache.localDirs, ['test', 'test2']);
      assert.equal(fc.fileCache.useNetwork, false);
    });
    it('No local cache', function() {
      let fc = new CSDLCache(null, false);
      assert.deepEqual(fc.fileCache.localDirs, null);
      assert.equal(fc.fileCache.useNetwork, false);
    });
  });
  describe('Has File', function() {
    let fc = new CSDLCache([__dirname + '/fixtures/'], false);
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
    it('Gets metadata', function() {
      let promise = fc.getMetadata('http://example.com/SimpleMetadata.xml');
      return promise.then(data => {
        assert.notEqual(data, undefined);
        assert.equal(fc.hasMetadata('http://example.com/SimpleMetadata.xml'), true);
      });
    });
    it('Gets same metadata', function() {
      let promise = fc.getMetadata('http://example.com/SimpleMetadata.xml');
      return promise.then(data => {
        assert.notEqual(data, undefined);
        assert.equal(fc.hasMetadata('http://example.com/SimpleMetadata.xml'), true);
      });
    });
    it('Clear', function() {
      assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), true);
      fc.clear();
      assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), false);
    });
    it('Not Existant Schema', function() {
      assert.equal(fc.getSchema('NonExistant'), undefined);
    });
    it('Non existant file', function(done) {
      let myFC = new CSDLCache([__dirname + '/fixtures/'], true);
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
      let myFC = new CSDLCache([__dirname + '/fixtures/'], true);
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
