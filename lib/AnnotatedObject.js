const ParserCommon = require('./ParserCommon');

class AnnotatedObject extends ParserCommon {
  constructor() {
    super();
    this.Annotations = {};

    this.addElementHandler('Annotation', this.addElementToObj, {parent: this.Annotations, nameProp: 'Term'});
  }
}

module.exports = AnnotatedObject;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
