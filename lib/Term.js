const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function Term(xml) {
  var name = xml.attr('Name').value();
  this.Annotations = {};
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i], name);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in Term! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element '+elemType+' type in Term '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

Term.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Term.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
    case 'DefaultValue':
      this[attrName] = attribute.value();
      break;
    case 'AppliesTo':
      this.AppliesTo = attribute.value().split(' ');
      break;
    case 'Nullable':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Term '+entityName);
      break;
  }
}

module.exports = Term;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
