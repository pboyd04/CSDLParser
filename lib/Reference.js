const ParserCommon = require('./ParserCommon');

function Reference(xml, cache, errorCallback) {
  this.Uri = null;
  this.Includes = {};
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'},
    'Include': {parent: this.Includes, helperFunc: this.processInclude.bind(this)}
  };
  this.validAttributes = {
    'Uri': {}
  };
  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Reference');

  if(!cache.hasMetadata(this.Uri)) {
    this.MetaPromise = cache.getMetadata(this.Uri);
    var self = this;
    this.MetaPromise.then(function(data) {self.Metadata = data;}).catch(errorCallback); 
  }
}

Reference.prototype.processInclude = function(element) {
  var namespace = element.attr('Namespace').value();
  var aliasAttr = element.attr('Alias');
  if(aliasAttr === null) {
    this.Includes[namespace] = namespace;
  }
  else {
    this.Includes[aliasAttr.value()] = namespace;
  }
}

module.exports = Reference;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
