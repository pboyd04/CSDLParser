const ParserCommon = require('./ParserCommon');

class EntityType extends ParserCommon {
  constructor(element) {
    super();

    this._key = null;
    this.Annotations = {};
    this.Properties = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'Property': {parent: this.Properties, nameProp: 'Name'},
      'NavigationProperty': {parent: this.Properties, nameProp: 'Name'},
      'Key': {parent: this, name: '_key', passthru: true}
    };
    this.validAttributes = {
      'Abstract': {bool: true},
      'BaseType': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');

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
