const assert = require('assert');

const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function EntityType(metadata, xml) {
  this._metadata = metadata;
  var properties = xml.find('.//*[local-name()="Property"]');
  var navProperties = xml.find('.//*[local-name()="NavigationProperty"]');
  var keys = xml.find('.//*[local-name()="Key"]');
  assert(keys.length <= 1);
  for(var i = 0; i < properties.length; i++)
  {
    var name = properties[i].attr('Name').value();
    this[name] = new Property(this, properties[i]);
  }
  for(var i = 0; i < navProperties.length; i++)
  {
    var name = navProperties[i].attr('Name').value();
    this[name] = new NavigationProperty(this, navProperties[i]);
  }
  if(keys.length === 1)
  {
    var propNames = keys[0].find('.//*[local-name()="PropertyRef"]/@Name');
    for(var i = 0; i < propNames.length; i++)
    {
      var name = propNames[i].value();
      if(this[name] !== undefined) {
        this[name].IsKey = true;
      }
    }
  }
  return this;
}

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
