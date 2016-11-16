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

csdl.parseMetadataFile(__dirname + '/fixtures/Resource_v1.xml', {}, function(error, metadata) {
    if(error) {
      console.log(error);
    }
    console.log(metadata);
  });

/*
csdl.parseMetadataUri('http://docs.oasis-open.org/odata/odata/v4.0/errata03/csd01/complete/vocabularies/Org.OData.Core.V1.xml', {}, function(error, metadata) {
  if(error) {
    console.log(error);
  }
  console.log(metadata);
});*/
