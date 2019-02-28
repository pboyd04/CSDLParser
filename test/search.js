var csdl = require('../index');
var assert = require('chai').assert;

let fakeMeta1 = {'Test1': {'Type1': 'a'}};
let fakeMeta2 = {'Test1': {'Type2': 'b', 'Annotations': {'_Name': {'Name': '_Name'}}}};

describe('Search', function(){
  let metadata;
  let fakeCache;
  let fakeCache2;
  before(function(done) {
    csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml', {}, function(error, meta) {
      assert.equal(error, null);
      metadata = meta;
      fakeCache = {_options: meta._options};
      //Copy the cache
      fakeCache._options.cache.metadataCache = fakeCache._options.cache.metadataCache.slice();
      fakeCache._options.cache.metadataCache.push(fakeMeta1);
      fakeCache._options.cache.metadataCache.push(fakeMeta2);
      fakeCache2 = Object.assign({References: [{Includes: {'Test3': 'Test1'}}]}, fakeCache);
      done();
    });
  });
  it('Simple Type: Edm.String', function() {
    var type = csdl.findByType(metadata, 'Edm.String');
    assert.equal(type, 'Edm.String');
  });
  it('EntityType: Person', function() {
    var person = csdl.findByType(metadata, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
    assert.equal(person.Name, 'Person');
    assert.deepEqual(person.Annotations, {});
    assert.notDeepEqual(person.Properties, {});
  });
  it('Cache Search', function() {
    var person = csdl.findByType({_options: metadata._options}, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
    assert.equal(person.Name, 'Person');
    assert.deepEqual(person.Annotations, {});
    assert.notDeepEqual(person.Properties, {});
  });
  it('Invalid Type', function() {
    var type = csdl.findByType(metadata, 'Bob');
    assert.equal(type, null);
  });
  it('Non-Existant Schema', function() {
    var type = csdl.findByType(metadata, 'Bob.Type');
    assert.equal(type, null);
  });
  it('Have Schema, but not type', function() {
    var person = csdl.findByType(metadata, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person1');
    assert.equal(person, undefined);
  });
  it('Multiple Schemas with Same Name', function() {
    var type = csdl.findByType(fakeCache, 'Test1.Type1');
    assert.notEqual(type, undefined);
    assert.notEqual(type, null);
    type = csdl.findByType(fakeCache, 'Test1.Type2');
    assert.notEqual(type, undefined);
    assert.notEqual(type, null);
    type = csdl.findByType(fakeCache, 'Test1.Type3');
    assert.equal(type, undefined);
    type = csdl.findByType(fakeCache, 'Test2.Type2');
    assert.equal(type, null);
  });
  it('Reference Search', function() {
    var type = csdl.findByType(fakeCache2, 'Test3.Type1');
    assert.notEqual(type, undefined);
    assert.notEqual(type, null);
    type = csdl.findByType(fakeCache2, 'Test4.Type1');
    assert.equal(type, undefined);
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
    assert.isArray(annotations);
    assert.notEqual(annotations[0], undefined);
    assert.notEqual(annotations[0].Collection, undefined);
    annotations = csdl.search(fakeMeta2, 'Annotation');
    assert.isArray(annotations);
    for(let i = 0; i < annotations.length; i++) {
      assert.notEqual(annotations[i].Name, '_Name', 'Found Annotation with Bad Name!');
    }
  });
  it('Get first', function(){
    let type = csdl.search(metadata, undefined, undefined);
    assert.notEqual(type, undefined);
  });
});
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
