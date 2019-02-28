const ParserCommon = require('../lib/ParserCommon');
const Annotation = require('../lib/Annotation');
const xmldoc = require('xmldoc');
const assert = require('chai').assert;
const csdl = require('../index');

const badXML = '<root>Text</bob>';
const simpleWithText = '<root>Text</root>';
const invalidAnnotationElement = '<Annotation Term="Test"><BadElement></BadElement></Annotation>';
const invalidAnnotationAttribute = '<Annotation Term="Test" BadAttr="Test"></Annotation>';
const invalidAnnotationBadBool = '<Annotation Term="Test" Bool="Bad"></Annotation>';
const noDataService = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:BadDataServices></edmx:BadDataServices></edmx:Edmx>';
const noSchema = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><BadSchema Namespace="Test1" xmlns="http://docs.oasis-open.org/odata/ns/edm"></BadSchema></edmx:DataServices></edmx:Edmx>';

describe('Negative', function(){
  it('Unknown Text', function(){
    let doc = new xmldoc.XmlDocument(simpleWithText);
    let parser = new ParserCommon();
    assert.throws(function(){parser.parseEntity(doc, 'test');}, Error, 'Unknown text element in test! Text = "Text"');
  });
  it('Unknown Element', function(){
    let doc = new xmldoc.XmlDocument(invalidAnnotationElement);
    assert.throws(function(){let ann = new Annotation(); ann.init(doc);}, Error, 'Unknown element name BadElement');
  });
  it('Unknown Attribute', function(){
    let doc = new xmldoc.XmlDocument(invalidAnnotationAttribute);
    assert.throws(function(){let ann = new Annotation(); ann.init(doc);}, Error, 'Unknown attribute name BadAttr');
  });
  it('Unknown Attribute Value', function(){
    let doc = new xmldoc.XmlDocument(invalidAnnotationBadBool);
    assert.throws(function(){let ann = new Annotation(); ann.init(doc);}, Error, 'Unknown value Bad for attribute named Bool');
  });
  it('Non CSDL', function(done) {
    csdl.parseMetadata(simpleWithText, {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
  it('Bad XML', function(done) {
    csdl.parseMetadata(badXML, {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
  it('Non existant file', function(done) {
    csdl.parseMetadataFile('Invalid_File.xml', {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
  it('Non existant URL', function(done) {
    csdl.parseMetadataUri('fake://invalid.com/Invalid_File.xml', {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
  it('Bad DataService Tag', function(done) {
    csdl.parseMetadata(noDataService, {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
  it('Bad Schema Tag', function(done) {
    csdl.parseMetadata(noSchema, {}, function(error, data){
      assert.notEqual(error, null);
      done();
    });
  });
});
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
