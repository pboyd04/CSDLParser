const AnnotatedObject = require('./AnnotatedObject');

class Reference extends AnnotatedObject {
  constructor() {
    super();
    this.Uri = null;
    this.Includes = {};

    this.addElementHandler('Include', this.processInclude, {});
    this.addElementHandler('edmx:Include', this.processInclude, {});
    this.addAttributeHandler('Uri', this.addAttributeToObj, {});
  }

  processInclude(element, data) {
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
