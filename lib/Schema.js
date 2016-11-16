
function Schema(xml) {
  var name = xml.attr('Namespace').value();
  var children = xml.childNodes();
  this.Annotations = {};
  for(var i = 0; i < children.length; i++) {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i], name);
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
      throw new Error('Unknown element type '+elemType+' in Property '+name+'!');
    }
  }
}

Schema.prototype.parseElement = function(element, namespace) {
  var elemName = element.name();
  switch(elemName) {
    case 'Action':
      var name = element.attr('Name').value();
      var Action = require('./Action');
      this[name] = new Action(element);
      break;
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    case 'ComplexType':
      var name = element.attr('Name').value();
      var ComplexType = require('./ComplexType');
      this[name] = new ComplexType(element);
      break;
    case 'EntityContainer':
      var name = element.attr('Name').value();
      var EntityContainer = require('./EntityContainer');
      this[name] = new EntityContainer(element);
      break; 
    case 'EntityType':
      var name = element.attr('Name').value();
      var EntityType = require('./EntityType');
      this[name] = new EntityType(element);
      break; 
    case 'EnumType':
      var name = element.attr('Name').value();
      var EnumType = require('./EnumType');
      this[name] = new EnumType(element);
      break;
    case 'Function':
      var name = element.attr('Name').value();
      var Function = require('./Function');
      this[name] = new Function(element);
      break;
    case 'Term':
      var name = element.attr('Name').value();
      var Term = require('./Term');
      this[name] = new Term(element);
      break;
    case 'TypeDefinition':
      var name = element.attr('Name').value();
      var TypeDefinition = require('./TypeDefinition');
      this[name] = new TypeDefinition(element);
      break;
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
}
/*
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
  var doc = xmljs.parseXml(string);
  var root = doc.root();
  var children = root.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i]);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        this.done(new Error('Unknown text element in metadata! Text = "'+text+'"'));
      }
    }
    else if(elemType === 'comment') {
      //Ignore comments
    }
    else {
      this.done(new Error('Unknown element type '+elemType+' in metadata!'));
    }
  }
  console.log('Finished');
  this.done(null);
}

Metadata.prototype.resolve = function(callback) {
  callback(null, this);
}

function parsedReference(error, metadata, self, uri) {
  if(error) {
    self.done(error);
  }
  console.log(self);
  self.References[uri] = metadata;
  if(self.isReference) {
    self.done(error);
  }
}

Metadata.prototype.parsedReference = function(error, metadata, self, uri) {
  console.log(uri);
  if(error) {
    self.done(error);
  }
  self.References[uri] = metadata;
  self.referencesLeft--;
  if(self.referencesLeft === 0) {
    delete self.referencesLeft; 
    self.done(error)
  }
}

Metadata.prototype.getReference = function(uri, callback) {
  var self = this;
  var filePromise = cache.getFileData(uri);
  filePromise.then(function(data) {callback(null, data, self, uri);}).catch(function(err) {callback(err, null, self, uri);});
}

Metadata.prototype.parseReference = function(reference) {
  var uri = reference.attr('Uri').value();
  return cache.getFileData(uri);
}

Metadata.prototype.handleReferences = function(references) {
  this.referencesLeft = references.length;
  var self = this;
  var promises = [];
  for(var i = 0; i < references.length; i++) {
    var uri = references[i].attr('Uri').value();
    var promise = cache.getFileData(uri);
    promise.then(function(data) {
      parsedReference(null, data, self, uri);
    }).catch(function(error) {
      console.log('Error = '+error);
    });
    promises.push(promise);
  }
  if(!this.isReference) {
    Promise.all(promises).then(function(values){ console.log(values);});
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
  console.log('Entered '+elemName);
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
*/
module.exports = Schema;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
