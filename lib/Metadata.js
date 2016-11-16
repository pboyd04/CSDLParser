const xmljs = require('libxmljs-mt');
const fs = require('fs');
const request = require('request');

function Metadata(options) {
  this._options = {useLocal: null, useNetwork: true};
  this.References = [];
  if(options !== undefined) {
    this.setOptions(options);
  }
  if(this._options.isReference) {
    this.isReference = true;
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
  this.done(null); 
}

Metadata.prototype.resolve = function(callback) {
  var prom = this.resolvePromise();
  prom.then(function(data) {
    callback(null, data);
  }).catch(function(error) {
    callback(error, null);
  });
}

Metadata.prototype.resolvePromise = function() {
  var self = this;
  if(this.References === undefined || this.References.length === 0) {
    delete this.References;
    delete this.context;
    delete this._options;
    return new Promise(function(resolve, reject) {
      resolve(self);
    });
  }
  else { 
    var refs = [];
    for(var i = 0; i <  this.References.length; i++) {
      refs.push(this.References[i].MetaPromise);
    }
    return new Promise(function(resolve, reject) {
      Promise.all(refs).then(function(values) {
        var childPromises = [];
        for(var i = 0; i < values.length; i++) {
          if(values[i] === undefined) {
            continue;
          }
          //console.log(values);
          childPromises.push(values[i].resolvePromise());
        }
        if(childPromises.length === 0) {
          resolve(self);
        }
        else {
          Promise.all(childPromises).then(function(childValues) {
            for(var i = 0; i < childValues.length; i++) {
              var value = childValues[i];
              if(value === undefined) {
                continue;
              }
              delete value.References;
              delete value.context;
              delete value._options;
              self = Object.assign(value, self);
              delete self.References;
              delete self.context;
              delete self._options;
              resolve(self);
            }
          });
        }
      });

    });
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

Metadata.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Reference':
      var Reference = require('./Reference');
      this.References.push(new Reference(element));
      break;
    case 'DataServices':
      this.parseDataServices(element);
      break; 
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
}

Metadata.prototype.parseDataServices = function(dataServices) {
  var children = dataServices.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseDataServiceElement(children[i]);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in DataService! Text = "'+text+'"');
      }
    }
    else if(elemType === 'comment') {
      //Ignore comments
    }
    else {
      throw new Error('Unknown element type '+elemType+' in DataService!');
    }
  }
}

Metadata.prototype.parseDataServiceElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Schema':
      var namespace = element.attr('Namespace').value();
      var Schema = require('./Schema');
      this[namespace] = new Schema(element);
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
  try {
    var meta = new Metadata(options);
    meta.parse(string, function(error, metadata) {
      if(error) {
        callback(error, metadata);
      }
      else {
        metadata.resolve(callback);
      }
    }); 
  }
  catch(e) {
    callback(e, null);
  }
}

module.exports.parseMetadataFile = function(filename, options, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err) {
      callback(err, null);
    }
    module.exports.parseMetadata(data, options, callback);
  });
}

module.exports.parseMetadataUri = function(uri, options, callback) {
  request.get(uri, function(error, request, body) {
    if(error) {
      callback(error, null);
    }
    module.exports.parseMetadata(body, options, callback);
  });
}

/* vim: set tabstop=2 shiftwidth=2 expandtab: */
