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
            self.metadataCache.push(metadata);
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

CSDLCache.prototype.waitForCoherent = function(callback) {
  var promises = [];
  for(var key in this.csdlCache) {
    promises.push(this.csdlCache[key]);
  }
  Promise.all(promises).then(function() {callback(null);}).catch(function(err) {callback(err);});
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

module.exports = CSDLCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
