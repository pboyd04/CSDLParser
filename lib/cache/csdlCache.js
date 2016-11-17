const fileCache = require('./fileCache');

const Metadata = require('../Metadata');

function CSDLCache(localDirs, useNetwork) {
  this.fileCache = new fileCache(localDirs, useNetwork);
  this.csdlCache = {};
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
        Metadata.parseMetadata(text, {cache: self}, function(error, metadata) {
          if(error) {
            reject(error);
          }
          else {
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
}

module.exports = CSDLCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
