const xmljs = require('libxmljs-mt');
const fs = require('fs');
const assert = require('assert');
const EntityContainer = require('./EntityContainer');
const EntityType = require('./EntityType');
const ComplexType = require('./ComplexType');
const EnumType = require('./EnumType');
const TypeDefinition = require('./TypeDefinition');
const Function = require('./Function');
const Action = require('./Action');

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

Metadata.prototype.parseReference = function(reference) {
  //console.log(reference.toString());
}

Metadata.prototype.parseSchema = function(schema) {
  var namespace = schema.attr('Namespace').value();
  var children = schema.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(namespace, children[i]);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in schema! Text = "'+text+'"');
      }
    }
    else if(elemType === 'comment') {
      //Ignore comments
    }
    else {
      throw new Error('Unknown element type '+elemType+' in schema!');
    }
  }
}

Metadata.prototype.parseElement = function(namespace, element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Action':
      var name = element.attr('Name').value();
      this.Actions[namespace+"."+name] = new Action(this, element);
      break;
    case 'ComplexType':
      var name = element.attr('Name').value();
      this.ComplexTypes[namespace+"."+name] = new ComplexType(this, element);
      break;
    case 'EntityContainer':
      var name = element.attr('Name').value();
      this.EntityContainers[namespace+"."+name] = new EntityContainer(this, element);
      break; 
    case 'EntityType':
      var name = element.attr('Name').value();
      this.EntityTypes[namespace+"."+name] = new EntityType(this, element);
      break; 
    case 'EnumType':
      var name = element.attr('Name').value();
      this.EnumTypes[namespace+"."+name] = new EnumType(this, element);
      break;
    case 'Function':
      var name = element.attr('Name').value();
      this.Functions[namespace+"."+name] = new Function(this, element);
      break;
    case 'TypeDefinition':
      var name = element.attr('Name').value();
      this.TypeDefinitions[namespace+"."+name] = new TypeDefinition(this, element);
      break;
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
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
