const ParserCommon = require('./ParserCommon');

function EntityType(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'EntityType', 'Name');

  if(this._key !== null)
  {
    var propNames = this._key.find('.//*[local-name()="PropertyRef"]/@Name');
    for(var i = 0; i < propNames.length; i++)
    {
      var name = propNames[i].value();
      if(this[name] !== undefined) {
        this[name].IsKey = true;
      }
    }
  }
  delete this._key;
  return this;
}

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
