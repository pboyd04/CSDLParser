const ParserCommon = require('./ParserCommon');
const Annotation = require('./Annotation');

class EnumType extends ParserCommon {
  constructor(element) {
    super();
    this._index = 0;
    this.Members = {};
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'Member': {parent: this.Parameters, helperFunc: this.memberHelper.bind(this)}
    };
    this.validAttributes = {
      'IsFlags': {bool: true},
      'Name': {alreadyHandeled: true},
      'UnderlyingType': {}
    };

    this.init(element, 'Name');
    delete this._index;
  }

  memberHelper(element) {
    let name = element.attr['Name'];
    let value = element.attr['Value'];
    this.Members[name] = {};
    if(value) {
      this.Members[name].value = value*1;
      this._index = value*1;
    }
    else {
      this.Members[name].value = this._index++;
    }
    let me = this;
    element.eachChild(function(child, index, array) {
      if(child.name === 'Annotation') {
        let annotation = new Annotation(child);
        if(me.Members[name].Annotations === undefined) {
          me.Members[name].Annotations = {};
        }
        me.Members[name].Annotations[annotation.Name] = annotation;
      }
    });
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
