const ParserCommon = require('./ParserCommon');

class Reference extends ParserCommon {
  constructor(element) {
    super();
    this.Uri = null;
    this.Includes = {};
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'Include': {parent: this.Includes, helperFunc: this.processInclude.bind(this)},
      'edmx:Include': {parent: this.Includes, helperFunc: this.processInclude.bind(this)}
    };
    this.validAttributes = {
      'Uri': {}
    };

    this.init(element);
  }

  processInclude(element) {
    let namespace = element.attr['Namespace'];
    let aliasAttr = element.attr['Alias'];
    if(aliasAttr) {
      this.Includes[aliasAttr] = namespace;
    }
    else {
      this.Includes[namespace] = namespace;
    }
  }

  bind(cache) {
    let me = this;
    if(cache.hasMetadata(this.Uri)) {
      //Someone else is already doing this...
      return Promise.resolve(null);
    }
    let promise = cache.getMetadata(this.Uri);
    return new Promise((resolve, reject) => {
      promise.then((data) => {
        this.Metadata = data;
        resolve(null);
      }).catch(reject);
    });
  }
}

module.exports = Reference;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
