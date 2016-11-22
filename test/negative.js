const ParserCommon = require('../lib/ParserCommon');
const Annotation = require('../lib/Annotation');
const XML = require('libxmljs-mt');

const simpleWithText = '<root>Text</root>';
const invalidAnnotationElement = '<Annotation Term="Test"><BadElement></BadElement></Annotation>';
const invalidAnnotationAttribute = '<Annotation Term="Test" BadAttr="Test"></Annotation>';
const invalidAnnotationBadBool = '<Annotation Term="Test" Bool="Bad"></Annotation>';

module.exports.negative = function(assert) {
    assert.throws(() => {ParserCommon.initEntity(null, 'test');}, Error);

    assert.throws(() => {
      var doc = XML.parseXml(simpleWithText);
      var root = doc.root();
      ParserCommon.parseEntity(root, 'test', null, null);
    }, Error);

    assert.throws(() => {
      var doc = XML.parseXml(invalidAnnotationElement);
      var root = doc.root();
      var a = new Annotation(root);
    }, Error);

    assert.throws(() => {
      var doc = XML.parseXml(invalidAnnotationAttribute);
      var root = doc.root();
      var a = new Annotation(root);
    }, Error);

    assert.throws(() => {
      var doc = XML.parseXml(invalidAnnotationBadBool);
      var root = doc.root();
      var a = new Annotation(root);
    }, Error);

    assert.done();
}
