const request = require('request');

function FileCache(localDirs, useNetwork) {
  this.cache = {};
  if(localDirs === undefined) {
    localDirs = null;
  }
  if(useNetwork === undefined) {
    useNetwork = true;
  }
  this.localDirs = localDirs;
  this.useNetwork = useNetwork;
}

FileCache.prototype.getLocalFile = function(uri, resolve, reject, self) {
  var index = uri.lastIndexOf('/');
  var filename = uri.substring(index+1);
  console.log(this.localDirs);
  reject(new Error('getLocalFile not implemented'));
}

FileCache.prototype.getRemoteFile = function(uri, resolve, reject, self) {
  request.get(uri, function(error, request, body) {
    if(error) {
      reject(error);
    }
    else {
      resolve(body);
    }
  });
}

FileCache.prototype.getFile = function(uri) {
  var self = this; 
  if(this.cache[uri] === undefined) {
    this.cache[uri] = new Promise(function(resolve, reject) {
      if(self.localDirs !== null) {
        self.getLocalFile(uri, resolve, reject, self);
      }
      if(self.useNetwork) {
        self.getRemoteFile(uri, resolve, reject, self);
      }
    });
  }
  return self.cache[uri];
}

FileCache.prototype.hasFile = function(uri) {
  return (this.cache[uri] !== undefined);
}

module.exports = FileCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
