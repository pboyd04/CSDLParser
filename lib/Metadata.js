const xmljs = require('libxmljs-mt');
const fs = require('fs');
const request = require('request');

const ParserCommon = require('./ParserCommon');
const CSDLCache = require('./cache/csdlCache');

function Metadata(options) {
  this._options = {useLocal: null, useNetwork: true};
  this.References = [];
  if(options !== undefined) {
    this.setOptions(options);
  }
  return this;
}

Metadata.prototype.setOptions = function(options) {
  if(options !== undefined && options !== null) {
    this._options = Object.assign(this._options, options);
    if(this._options.cache === undefined) {
      this._options.cache = new CSDLCache(this._options.useLocal, this._options.useNetwork);
    }
    else {
      this._options.cache.useLocal = this._options.useLocal;
      this._options.cache.useNetwork = this._options.useNetwork;
    }
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
    if(this._options.cache) {
      this._options.cache.addMetadata(this);
    }
    callback(error, this);
  }
}

Metadata.prototype.parse = function(string, callback, context) {
  this.reallyDone = callback;
  this.context = context;
  try {
    var doc = xmljs.parseXml(string);
  } catch(e) {
    this.done(e);
  }
  var root = doc.root();
  var parseElement = this.parseElement.bind(this);
  try {
    ParserCommon.parseEntity(root, 'Metadata', parseElement);
  }
  catch(e) {
    this.done(e);
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
    delete this.context;
    return new Promise(function(resolve, reject) {
      resolve(self);
    });
  }
  else {
    return new Promise(function(resolve, reject) {
      self._options.cache.waitForCoherent(function(error) {
        if(error) {
          reject(error);
        }
        else {
          resolve(self);
        }
      });
    });
  }
}

Metadata.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Reference':
      var Reference = require('./Reference');
      var errorCallback = this.done.bind(this);
      this.References.push(new Reference(element, this._options.cache, errorCallback));
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
  var parseElement = this.parseDataServiceElement.bind(this);
  try {
    ParserCommon.parseEntity(dataServices, 'DataService', parseElement);
  }
  catch(e) {
    this.done(e);
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

module.exports.construct = Metadata;

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
