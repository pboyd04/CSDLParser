const AnnotatedObject = require('./AnnotatedObject');

class EntityType extends AnnotatedObject {
  constructor() {
    super();

    this._key = null;
    this.Properties = {};

    this.addElementHandler('Property', this.addElementToObj, {parent: this.Properties, nameProp: 'Name'});
    this.addElementHandler('NavigationProperty', this.addElementToObj, {parent: this.Properties, nameProp: 'Name'});
    this.addElementHandler('Key', this.addXMLToObj, {name: '_key'});

    this.addAttributeHandler('Abstract', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('BaseType', this.addAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});
    this.nameAttr = 'Name';
  }

  postInitCleanup() {
    if(this._key !== null) {
      let propRefs = this._key.childrenNamed('PropertyRef');
      for(let i = 0; i < propRefs.length; i++) {
        let name = propRefs[i].attr['Name'];
        if(this.Properties[name] !== undefined) {
          this.Properties[name].IsKey = true;
        }
      } 
    }
    delete this._key;
  }
}

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
