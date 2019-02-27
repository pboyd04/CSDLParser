const fileCache = require('./fileCache');

const Metadata = require('../Metadata');

function CSDLCache(localDirs, useNetwork) {
  this.fileCache = new fileCache(localDirs, useNetwork);
  this.csdlCache = {};
  this.metadataCache = [];
  Object.defineProperty(this, 'useLocal', {set: this.useLocalFunction});
  Object.defineProperty(this, 'useNetwork', {set: this.useNetworkFunction});
}

CSDLCache.prototype.useLocalFunction = function(value) {
  this.fileCache.localDirs = value;
}

CSDLCache.prototype.useNetworkFunction = function(value) {
  this.fileCache.useNetwork = value;
}

CSDLCache.prototype.getMetadata = function(uri) {
  var self = this;
  if(this.csdlCache[uri] === undefined) {
    this.csdlCache[uri] = new Promise(function(resolve, reject) {
      var filePromise = self.getFile(uri);
      filePromise.then(function(text){
        var meta = new Metadata.construct({useLocal: self.fileCache.localDirs, useNetwork: self.fileCache.useNetwork, cache: self});
        meta.parse(text, function(error, metadata) {
          if(error) {
            error.message = uri+': '+error.message;
            reject(error);
          }
          else {
            //self.metadataCache.push(metadata);
            resolve(metadata);
          }
        });
      }).catch(function(error){
        reject(error);
      });
    });
  }
  return this.csdlCache[uri];
}

CSDLCache.prototype.hasMetadata = function(uri) {
  return (this.csdlCache[uri] !== undefined);
}

CSDLCache.prototype.getFile = function(uri) {
  return this.fileCache.getFile(uri);
}

CSDLCache.prototype.hasFile = function(uri) {
  return this.fileCache.hasFile(uri);
}

CSDLCache.prototype.clear = function() {
  this.fileCache.cache = {};
  this.csdlCache = {};
  this.metadataCache = [];
}

CSDLCache.prototype.waitForCoherent = function() {
  var promises = [];
  for(var key in this.csdlCache) {
    promises.push(this.csdlCache[key]);
  }
  return Promise.all(promises);
}

CSDLCache.prototype.getSchema = function(namespace) { 
  for(var i = 0; i < this.metadataCache.length; i++) {
    var metadata = this.metadataCache[i];
    if(metadata[namespace] !== undefined) {
      return metadata[namespace];
    }
  }
  return undefined;
}

//There can be multiple in some cases this returns all...
CSDLCache.prototype.getSchemas = function(namespace) {
  let arr = [];
  for(var i = 0; i < this.metadataCache.length; i++) {
    var metadata = this.metadataCache[i];
    if(metadata[namespace] !== undefined) {
      arr.push(metadata[namespace]);
    }
  }
  return arr;
}

CSDLCache.prototype.getSchemasThatStartWith = function(namespace) {
  let arr = [];
  for(var i = 0; i < this.metadataCache.length; i++) {
    var metadata = this.metadataCache[i];
    for(var name in metadata) {
      if(name.startsWith(namespace)) {
        arr.push(metadata[name]);
      }
    }
  }
  return arr;
}

CSDLCache.prototype.addMetadata = function(metadata) {
  this.metadataCache.push(metadata);
}

module.exports = CSDLCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
