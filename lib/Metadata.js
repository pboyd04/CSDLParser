const xmljs = require('libxmljs-mt');
const fs = require('fs');
const assert = require('assert');
const EntityType = require('./EntityType');
const ComplexType = require('./ComplexType');
const EnumType = require('./EnumType');

function Metadata() {
  this._options = {useLocal: null, useNetwork: true};
  this.Actions = {};
  this.Annotations = {};
  this.ComplexTypes = {};
  this.EntityContainers = {};
  this.EntityTypes = {};
  this.EnumTypes = {};
  this.Functions = {};
  this.Terms = {};
  this.TypeDefinitions = {};
  return this;
}

Metadata.prototype.setOptions = function(options) {
  if(options !== undefined && options !== null) {
    this._options = Object.assign(options, this._options);
  }
};

Metadata.prototype.parseFile = function(filename) {
  var string = fs.readFileSync(filename);
  this.parseString(string);
}

Metadata.prototype.parseString = function(string) {
  this._doc = xmljs.parseXml(string);
  var root = this._doc.root();
  assert(root !== undefined);
  assert(root.name() === 'Edmx');
  assert(root.childNodes().length >= 1);

  var references = root.find('//*[local-name()="Reference"]');
  for(var i = 0; i < references.length; i++)
  {
    this.parseReference(references[i]);
  }

  var schemas = root.find('//*[local-name()="Schema"]');
  assert(schemas.length >= 1);
  for(var i = 0; i < schemas.length; i++)
  {
    this.parseSchema(schemas[i]);
  }
}

Metadata.prototype.parseSchema = function(schema) {
  var namespace = schema.attr('Namespace').value();
  var complexTypes = schema.find('.//*[local-name()="ComplexType"]');
  for(var i = 0; i < complexTypes.length; i++)
  {
    var complexType = complexTypes[i];
    var name = complexType.attr('Name').value();
    this.ComplexTypes[namespace+"."+name] = new ComplexType(this, complexType);
  }
  var enumTypes = schema.find('.//*[local-name()="EnumType"]');
  for(var i = 0; i < enumTypes.length; i++)
  {
    var enumType = enumTypes[i];
    var name = enumType.attr('Name').value();
    this.EnumTypes[namespace+"."+name] = new EnumType(this, enumType);
  }
  var entityTypes = schema.find('.//*[local-name()="EntityType"]');
  for(var i = 0; i < entityTypes.length; i++)
  {
    var entityType = entityTypes[i];
    var name = entityType.attr('Name').value();
    this.EntityTypes[namespace+"."+name] = this.parseEntityType(entityType);
  }
}

Metadata.prototype.parseEntityType = function(entityType) {
  return new EntityType(this, entityType); 
}

Metadata.prototype.getTypeByName = function(typeName) {
  if(this.ComplexTypes[typeName] !== undefined) {
    return this.ComplexTypes[typeName];
  }
  if(this.EnumTypes[typeName] !== undefined) {
    return this.EnumTypes[typeName];
  }
  if(this.TypeDefinitions[typeName] !== undefined) {
    return this.TypeDefinitions[typeName];
  }
  if(this.EntityTypes[typeName] !== undefined) {
    return this.EntityTypes[typeName];
  }
  return undefined;
}

module.exports.parseMetadata = function(string, options) {
  var ret = new Metadata();
  ret.setOptions(options);
  ret.parseString(string);
  return ret;
}

module.exports.parseMetadataFile = function(filename, options) {
  var ret = new Metadata();
  ret.setOptions(options);
  ret.parseFile(filename);
  return ret;
}

/* vim: set tabstop=2 shiftwidth=2 expandtab: */
