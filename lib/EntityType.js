const assert = require('assert');

const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function EntityType(metadata, xml) {
  this._metadata = metadata;
  var properties = xml.find('//*[local-name()="Property"]');
  var navProperties = xml.find('//*[local-name()="NavigationProperty"]');
  var keys = xml.find('//*[local-name()="Key"]');
  console.log(keys);
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
  return this;
}

module.exports = EntityType;
