const CSDLCache = require('./cache/csdlCache');
const Metadata = require('./Metadata');

function Reference(xml, cache) {
  this.Uri = null;
  this.Includes = {};
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++) {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i]);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in schema! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in Reference!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++) {
    this.parseAttribute(attributes[i]);
  }
  if(!cache.hasMetadata(this.Uri)) {
    this.MetaPromise = cache.getMetadata(this.Uri);
    var self = this;
    this.MetaPromise.then(function(data) {self.Metadata = data;}); 
  }
}

Reference.prototype.parseElement = function(element, namespace) {
  var elemName = element.name();
  switch(elemName) {
    case 'Include':
      var namespace = element.attr('Namespace').value();
      var aliasAttr = element.attr('Alias');
      if(aliasAttr === null) {
        this.Includes[namespace] = namespace;
      }
      else {
        this.Includes[aliasAttr.value()] = namespace;
      }
      break;
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
}

Reference.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Uri':
      this[attrName] = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Reference');
      break;
  }
}

module.exports = Reference;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
