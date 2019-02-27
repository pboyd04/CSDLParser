const xmldoc = require('xmldoc');
const fs = require('fs');
const request = require('request');

const ParserCommon = require('./ParserCommon');
const Reference = require('./Reference');
const Schema = require('./Schema');
const CSDLCache = require('./cache/csdlCache');

class Metadata {
  constructor(options) {
    this._options = {useLocal: null, useNetwork: true};
    this.References = [];
    if(options) {
      this.setOptions(options);
    }
  }

  setOptions(options) {
    this._options = Object.assign(this._options, options);
    if(this._options.cache === undefined) {
      this._options.cache = new CSDLCache(this._options.useLocal, this._options.useNetwork);
    }
    else {
      this._options.cache.useLocal = this._options.useLocal;
      this._options.cache.useNetwork = this._options.useNetwork;
    }
  }

  parse(string, callback, context) {
    let arr = [];
    let doc = new xmldoc.XmlDocument(string);
    let me = this;
    doc.eachChild(function(child, index, array) {
      let elemName = child.name;
      switch(elemName) {
        case 'Reference':
        case 'edmx:Reference':
          let ref = new Reference(child);
          arr.push(ref.bind(me._options.cache));
          me.References.push(ref);
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
    Promise.all(arr).then((values) => {
      callback(null, me);
      if(me._options.cache) {
        me._options.cache.addMetadata(me);
      }
    }).catch((e) => {
      callback(e, null);
    });
  }

  parseDataServices(element) {
    let me = this;
    element.eachChild(function(child, index, array) {
      let elemName = child.name;
      switch(elemName) {
        case 'Schema':
          let namespace = child.attr['Namespace'];
          me[namespace] = new Schema(child);
          break;
        default:
          arr.push(Promise.reject(new Error('Unknown element name '+elemName)));
          break;
      }
    });
    //Just resolve this with null as we have no new references to add
    return Promise.resolve(null);
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
  try {
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
  catch(e) {
    callback(e, null);
  }
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
