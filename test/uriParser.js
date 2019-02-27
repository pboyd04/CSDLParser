var csdl = require('../index');
var assert = require('assert');

describe('Uri Parsing', function() {
  it('Bad URI', function(done) {
    csdl.parseMetadataUri('http://example.com/404', {}, function(error, metadata) {
      assert.notEqual(error, null);
      assert.equal(metadata, null);
      done();
    });
  });
  it('OData Core Parsing', function(done) {
    this.timeout(10000);
    csdl.parseMetadataUri('http://docs.oasis-open.org/odata/odata/v4.0/errata03/csd01/complete/vocabularies/Org.OData.Core.V1.xml', {}, function(error, metadata) {
      assert.equal(error, null);
      assert.equal(Object.keys(metadata).length, 3);
      var schema = metadata['Org.OData.Core.V1'];
      assert.notEqual(schema, undefined);
      assert.equal(Object.keys(schema).length, 23);
      done();
    });
  });
});
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
