function NavigationProperty(entity, xml) {
  this._entity = entity;
  this.Type = xml.attr('Type').value();
  this.parseBooleanAttribute(xml, 'Nullable');
  this.parseStringAttribute(xml, 'Partner');
  this.parseBooleanAttribute(xml, 'ContainsTarget');
  return this;
}

NavigationProperty.prototype.parseBooleanAttribute = function(xml, name) {
  var attr = xml.attr(name);
  if(attr === null) {
    return;
  }
  var value = attr.value();
  if(value === 'true') {
    this[name] = true;
  }
  else if(value === 'false') {
    this[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

NavigationProperty.prototype.parseStringAttribute = function(xml, name) {
  var attr = xml.attr(name);
  if(attr === null) {
    return;
  }
  var value = attr.value();
  this[name] = value;
}

module.exports = NavigationProperty;
