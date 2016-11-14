var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml');
  console.log(metadata);
  assert.notEqual(Object.keys(metadata.Functions).length, 0);
  console.log(metadata.Functions);
  assert.done();
}
