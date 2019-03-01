var csdl = require('../index');
var assert = require('assert');
var ParserCommon = require('../lib/ParserCommon');
var xmldoc = require('xmldoc');

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
  describe('EnumType', function() {
    it('Member Child Element other than Annotation', function(done) {
      csdl.parseMetadata('<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><Schema Namespace="Test1" xmlns="http://docs.oasis-open.org/odata/ns/edm"><EnumType Name="Test2"><Member Name="Test3"><Child Name="Test4"></Child></Member></EnumType></Schema></edmx:DataServices></edmx:Edmx>', {}, (error, meta) => {
        assert.equal(error, null);
        assert.notEqual(meta, null);
        assert.notEqual(meta.Test1, undefined);
        let schema = meta.Test1;
        assert.notEqual(schema.Test2, undefined);
        done();
      });
    });
  });
  describe('ParserCommon', function() {
    it('No attribute or element case', function() {
      let myobj = new ParserCommon();
      myobj.init(null);
      assert.ok('Passed');
    });
    it('Attribute parent case', function() {
      let test = {};
      let myobj = new ParserCommon();
      myobj.addAttributeHandler('x', myobj.addAttributeToObj, {'parent': test});
      let doc = new xmldoc.XmlDocument('<Test x="value"></Test>');
      myobj.init(doc, 'Test');
      assert.equal(test.x, 'value');
      assert.equal(myobj.x, undefined);
    });
  });
});
