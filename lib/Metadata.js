const xmldoc = require('xmldoc');
const fs = require('fs');
const request = require('request');

const Reference = require('./Reference');
const Schema = require('./Schema');
const CSDLCache = require('./cache/csdlCache');

class Metadata {
  constructor(options) {
    this._options = {useLocal: null, useNetwork: true};
    this.References = [];
    this.setOptions(options);
  }

  setOptions(options) {
    if(options) {
      this._options = Object.assign(this._options, options);
    }
    if(this._options.cache === undefined) {
      this._options.cache = new CSDLCache(this._options.useLocal, this._options.useNetwork);
    }
    else {
      this._options.cache.useLocal = this._options.useLocal;
      this._options.cache.useNetwork = this._options.useNetwork;
    }
  }

  parse(string, callback) {
    let doc;
    try {
      doc = new xmldoc.XmlDocument(string);
    }
    catch(e) {
      callback(e, null);
      return;
    }
    let me = this;
    let arr = this.getChildElementPromises(doc);
    Promise.all(arr).then(() => {
      me._options.cache.addMetadata(me);
      callback(null, me);
    }).catch((e) => {
      callback(e, null);
    });
  }

  getChildElementPromises(doc) {
    let arr = [];
    let me = this;
    doc.eachChild(function(child) {
      let elemName = child.name;
      switch(elemName) {
        case 'Reference':
        case 'edmx:Reference':
          arr.push(me.getReferencePromise(child));
          break;
        case 'DataServices':
        case 'edmx:DataServices':
          arr.push(me.parseDataServices(child));
          break;
        default:
          arr.push(Promise.reject(new Error('Unknown element name '+elemName)));
          break;
      }
    });
    return arr;
  }

  getReferencePromise(child) {
    let ref = new Reference();
    ref.init(child);
    this.References.push(ref);
    return ref.bind(this._options.cache);
  }

  parseDataServices(element) {
    let me = this;
    let ret = Promise.resolve(null);
    element.eachChild(function(child) {
      let elemName = child.name;
      let namespace;
      switch(elemName) {
        case 'Schema':
          namespace = child.attr['Namespace'];
          me[namespace] = new Schema();
          me[namespace].init(child);
          break;
        default:
          ret = Promise.reject(new Error('Unknown element name '+elemName));
      }
    });
    return ret;
  }

  resolve() {
    if(this.References === undefined || this.References.length === 0) {
      return Promise.resolve(null);
    }
    return this._options.cache.waitForCoherent();
  }
}

module.exports.construct = Metadata;

module.exports.parseMetadata = function(string, options, callback) {
  var meta = new Metadata(options);
  meta.parse(string, (err, data) => {
    if(err) {
      callback(err, data);
      return;
    }
    let promise = data.resolve();
    promise.then(() => {
      callback(null, data);
    }).catch((e) => {
      callback(e, data);
    });
  }); 
}

module.exports.parseMetadataFile = function(filename, options, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err) {
      callback(err, null);
      return;
    }
    module.exports.parseMetadata(data, options, callback);
  });
}

module.exports.parseMetadataUri = function(uri, options, callback) {
  request.get(uri, function(error, request, body) {
    if(error) {
      callback(error, null);
      return;
    }
    module.exports.parseMetadata(body, options, callback);
  });
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
