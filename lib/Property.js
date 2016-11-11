function Property(entity, xml) {
  this._entity = entity;
  this.Type = xml.attr('Type').value();
  this.parseBooleanAttribute(xml, 'Nullable');
  this.parseBooleanAttribute(xml, 'Abstract');
  this.parseBooleanAttribute(xml, 'OpenType');
  this.parseBooleanAttribute(xml, 'HasStream');
  this.parseBaseType(xml);
  return this;
}

Property.prototype.parseBooleanAttribute = function(xml, name) {
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

Property.prototype.parseBaseType = function(xml) {
  var attr = xml.attr('BaseType');
  if(attr === null) {
    return;
  }
  var value = attr.value();
  this.BaseType = this._entity._metadata.getTypeByName(value);
}

module.exports = Property;
