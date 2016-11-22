var csdl = require('../index');

module.exports.search = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml', {}, function(error, metadata) {
    if(error) {
      assert.ok(false, 'Failed to parse!');
      console.log(error);
      return;
    }
    var person = csdl.findByType(metadata, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
    assert.equal(person.Name, 'Person');

    var favoriteAirline = csdl.search(metadata, 'Function', 'GetFavoriteAirline');
    assert.notEqual(favoriteAirline[0], undefined);
    assert.equal(favoriteAirline[0].Name, 'GetFavoriteAirline');
    assert.equal(favoriteAirline[0].IsBound, true);

    var annotations = csdl.search(metadata, 'Annotation', 'Org.OData.Core.V1.OptimisticConcurrency');
    assert.notEqual(annotations[0], undefined);
    assert.notEqual(annotations[0].Collection, undefined);

    annotations = csdl.search(metadata, 'Annotation');
    assert.notEqual(annotations[0], undefined);
    assert.notEqual(annotations[0].Collection, undefined);

    assert.done();
  });
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
