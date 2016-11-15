const xmljs = require('libxmljs-mt');
const fs = require('fs');
const request = require('request');
const assert = require('assert');

const Annotation = require('./Annotation');
const EntityContainer = require('./EntityContainer');
const EntityType = require('./EntityType');
const ComplexType = require('./ComplexType');
const EnumType = require('./EnumType');
const TypeDefinition = require('./TypeDefinition');
const Function = require('./Function');
const Action = require('./Action');
const Term = require('./Term');

function Metadata(options) {
  this._options = {useLocal: null, useNetwork: true, cache: {}};
  this.Actions = {};
  this.Annotations = {};
  this.ComplexTypes = {};
  this.EntityContainers = {};
  this.EntityTypes = {};
  this.EnumTypes = {};
  this.Functions = {};
  this.Terms = {};
  this.TypeDefinitions = {};
  this.References = {};
  if(options !== undefined) {
    this.setOptions(options);
  }
  return this;
}

Metadata.prototype.setOptions = function(options) {
  if(options !== undefined && options !== null) {
    this._options = Object.assign(options, this._options);
  }
};

Metadata.prototype.done = function(error) {
  if(this.reallyDone !== undefined) {
    var callback = this.reallyDone;
    delete this.reallyDone;
    if(this.context !== undefined) {
      callback = callback.bind(this.context);
      delete this.context;
    }
    callback(error, this);
  }
}

Metadata.prototype.parse = function(string, callback, context) {
  this.reallyDone = callback;
  this.context = context;
  try {
    this._doc = xmljs.parseXml(string);
    var root = this._doc.root();
    assert(root !== undefined);
    assert(root.name() === 'Edmx');
    assert(root.childNodes().length >= 1);

    var schemas = root.find('//*[local-name()="Schema"]');
    assert(schemas.length >= 1);
    for(var i = 0; i < schemas.length; i++) {
      this.parseSchema(schemas[i]);
    }

    var references = root.find('//*[local-name()="Reference"]');
    if(references.length !== 0) {
      this.handleReferences(references, callback); 
    }
    else {
      this.done(null);
    }
  } catch(e) {
    this.done(e);
  }
}

Metadata.prototype.parsedReference = function(error, metadata) {
  if(error) {
    this.done(error);
  }
  this.References[metadata.Uri] = metadata;
  console.log('Adding '+metadata.Uri+' to cache...');
  this._options.cache[metadata.Uri] = metadata; 
  this.referencesLeft--;
  if(this.referencesLeft === 0) {
    delete this.referencesLeft;
    this.done(error)
  }
}

Metadata.prototype.haveReference = function(error, string, self, uri) {
  if(!error) {
    var reference = new Metadata(self._options);
    reference.Uri = uri;
    reference.parse(string, self.parsedReference, self);
  }
  else {
    this.reallyDone(error, null);
  }
}

Metadata.prototype.getReference = function(uri, callback) {
  var self = this;
  if(this._options.cache.hasOwnProperty(uri)) {
    console.log('Found '+uri+' in cache...');
    callback(null, this._options.cache[uri], self);
    return;
  }
  if(this._options.useLocal !== null) {
    var index = uri.lastIndexOf('/');
    var filename = uri.substring(index+1);
    //console.log(filename);
    //TODO attempt to get the reference locally...
    throw new Error('useLocal option not currently implemented!');
  }
  if(this._options.useNetwork === true) {
    request.get(uri, function(error, request, body) {
      console.log('Downloading '+uri+'...');
      callback(error, body, self, uri);
    });
    return;
  }
  throw new Error('Unable to locate reference '+uri);
}

Metadata.prototype.parseReference = function(reference) {
  var uri = reference.attr('Uri').value();
  this.getReference(uri, this.haveReference);
}

Metadata.prototype.handleReferences = function(references, reallyDone) {
  this.reallyDone = reallyDone;
  this.referencesLeft = references.length;
  for(var i = 0; i < references.length; i++) {
    this.parseReference(references[i]);
  }
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
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
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
    case 'Term':
      var name = element.attr('Name').value();
      this.Terms[namespace+'.'+name] = new Term(element);
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

module.exports.parseMetadata = function(string, options, callback) {
  var meta = new Metadata(options);
  meta.parse(string, callback); 
}

module.exports.parseMetadataFile = function(filename, options, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err) {
      callback(err, null);
    }
    module.exports.parseMetadata(data, options, callback);
  });
}

/* vim: set tabstop=2 shiftwidth=2 expandtab: */
