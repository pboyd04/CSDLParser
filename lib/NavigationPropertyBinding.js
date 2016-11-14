const assert = require('assert');

function NavigationPropertyBinding(xml) {
  var name = xml.attr('Path').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i], name);
    }
    else
    {
      throw new Error('Unknown element type in NavigationPropertyBinding '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

NavigationPropertyBinding.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

NavigationPropertyBinding.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Path':
      //Already used... drop on floor
      break;
    case 'Target':
      this.Target = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in NavigationPropertyBinding '+entityName);
      break;
  }
}

module.exports = NavigationPropertyBinding;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
