const request = require('request');
const fs = require('fs');

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
  if(typeof this.localDirs === 'string') {
    this.localDirs = [this.localDirs];
  }
  for(var i = 0; i < this.localDirs.length; i++) {
    try{
      var file = fs.readFileSync(this.localDirs[i]+filename, 'utf8');
      resolve(file);
      return;
    }
    catch(e) {
      //Ignore the exceptions...
    }
  }
  reject(new Error('Unable to find file '+filename));
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
