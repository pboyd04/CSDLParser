var csdl = require('../index');

/*Redfish uses CSDL very differently, let's make sure we can also parse Redfish style CSDL*/
module.exports.redfish = function(assert) {
  csdl.parseMetadataFile(__dirname + '/fixtures/Resource_v1.xml', {}, function(error, metadata) {
    assert.ifError(error);
    if(error) {
      console.log(error);
    }
    console.log(metadata);
    assert.done();
  });
}
