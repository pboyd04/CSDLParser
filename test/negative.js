const ParserCommon = require('../lib/ParserCommon');
const Annotation = require('../lib/Annotation');
const XML = require('libxmljs');
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
  it('Unbound Function', function() {
    assert.throws(function(){ParserCommon.initEntity(null, 'test');}, Error, 'Function not bound before call!');
  });
  it('Unknown Text', function(){
    let doc = XML.parseXml(simpleWithText);
    let root = doc.root();
    assert.throws(function(){ParserCommon.parseEntity(root, 'test', null, null);}, Error, 'Unknown text element in test! Text = "Text"');
  });
  it('Unknown Element', function(){
    let doc = XML.parseXml(invalidAnnotationElement);
    let root = doc.root();
    assert.throws(function(){new Annotation(root);}, Error, 'Unknown element name BadElement');
  });
  it('Unknown Attribute', function(){
    let doc = XML.parseXml(invalidAnnotationAttribute);
    let root = doc.root();
    assert.throws(function(){new Annotation(root);}, Error, 'Unknown attribute name BadAttr');
  });
  it('Unknown Attribute Value', function(){
    let doc = XML.parseXml(invalidAnnotationBadBool);
    let root = doc.root();
    assert.throws(function(){new Annotation(root);}, Error, 'Unknown value Bad for attribute named Bool');
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
