const fileCache = require('./fileCache');

const Metadata = require('../Metadata');

function CSDLCache(localDirs, useNetwork) {
  this.fileCache = new fileCache(localDirs, useNetwork);
  this.csdlCache = {};
}

CSDLCache.prototype.getMetadata = function(uri) {
  var self = this;
  if(this.csdlCache[uri] === undefined) {
    this.csdlCache[uri] = new Promise(function(resolve, reject) {
      var filePromise = self.getFile(uri);
      filePromise.then(function(text){
        Metadata.parseMetadata(text, {}, function(error, metadata) {
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

module.exports = CSDLCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
