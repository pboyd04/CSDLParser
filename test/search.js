var csdl = require('../index');
var assert = require('assert');

describe('Search', function(){
  let metadata;
  before(function(done) {
    csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml', {}, function(error, meta) {
      assert.equal(error, null);
      metadata = meta;
      done();
    });
  });
  it('EntityType: Person', function() {
    var person = csdl.findByType(metadata, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
    assert.equal(person.Name, 'Person');
    assert.deepEqual(person.Annotations, {});
    assert.notDeepEqual(person.Properties, {});
  });
  it('Function: GetFavoriteAirline', function() {
    var favoriteAirline = csdl.search(metadata, 'Function', 'GetFavoriteAirline');
    assert.notEqual(favoriteAirline[0], undefined);
    assert.equal(favoriteAirline[0].Name, 'GetFavoriteAirline');
    assert.equal(favoriteAirline[0].IsBound, true);
  });
  it('Annotation: Org.OData.Core.V1.OptimisticConcurrency', function() {
    var annotations = csdl.search(metadata, 'Annotation', 'Org.OData.Core.V1.OptimisticConcurrency');
    assert.notEqual(annotations[0], undefined);
    assert.notEqual(annotations[0].Collection, undefined);
  });
  it('All Annotations', function(){
    var annotations = csdl.search(metadata, 'Annotation');
    assert.notEqual(annotations[0], undefined);
    assert.notEqual(annotations[0].Collection, undefined);
  });
});
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
