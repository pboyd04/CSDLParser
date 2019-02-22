var csdl = require('../index');
var assert = require('assert');
var ParserCommon = require('../lib/ParserCommon');
var XML = require('libxmljs');

describe('Corner Cases', function() {
  describe('Key Attribute', function() {
    it('Simple Case', function(done) {
      csdl.parseMetadata('<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><Schema Namespace="Test1" xmlns="http://docs.oasis-open.org/odata/ns/edm"><EntityType Name="Category"><Key><PropertyRef Name="ID" /></Key><Property Name="ID" Type="Edm.Int32" Nullable="false" /><Property Name="Name" Type="Edm.String" /></EntityType></Schema></edmx:DataServices></edmx:Edmx>', {}, (error, meta) => {
        assert.equal(error, null);
        assert.notEqual(meta, null);
        assert.notEqual(meta.Test1, undefined);
        let schema = meta.Test1;
        assert.notEqual(schema.Category, undefined);
        let entity = schema.Category;
        assert.notEqual(entity.Properties['ID'], undefined);
        let prop = entity.Properties['ID'];
        assert.equal(prop.IsKey, true);
        done();
      });
    });
    it('Key is inherited prop', function(done) {
      csdl.parseMetadata('<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><Schema Namespace="Test1" xmlns="http://docs.oasis-open.org/odata/ns/edm"><EntityType Name="Parent"><Property Name="ID" Type="Edm.Int32" Nullable="false" /></EntityType><EntityType Name="Category"><Key><PropertyRef Name="ID" /></Key><Property Name="Name" Type="Edm.String" /></EntityType></Schema></edmx:DataServices></edmx:Edmx>', {}, (error, meta) => {
        assert.equal(error, null);
        assert.notEqual(meta, null);
        assert.notEqual(meta.Test1, undefined);
        let schema = meta.Test1;
        assert.notEqual(schema.Category, undefined);
        done();
      });
    });
  });
  describe('ParserCommon', function() {
    it('No attribute or element case', function() {
      let myobj = {};
      let init = ParserCommon.initEntity.bind(myobj);
      init(null, 'Test');
      assert.ok('Passed');
    });
    it('No element callback case', function() {
      ParserCommon.parseEntity(null, 'Test', undefined, undefined);
      assert.ok('Passed');
    });
    it('Attribute parent case', function() {
      let test = {};
      let myobj = {validAttributes: {'x': {'parent': test}}};
      let doc = new XML.Document();
      let node = doc.node('Test');
      let attr = node.attr('x', 'value');
      let init = ParserCommon.initEntity.bind(myobj);
      init(node, 'Test');
      assert.equal(test.x, 'value');
      assert.equal(myobj.x, undefined);
    });
  });
});
