const AnnotatedObject = require('./AnnotatedObject');
const Annotation = require('./Annotation');

class EnumType extends AnnotatedObject {
  constructor() {
    super();
    this._index = 0;
    this.Members = {};

    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('IsFlags', this.addBoolAttributeToObj, {});

    this.addElementHandler('Member', this.addMember, {});

    this.nameAttr = 'Name';

    delete this._index;
  }

  addMember(element, data) {
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
        let annotation = new Annotation();
        annotation.init(child);
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
