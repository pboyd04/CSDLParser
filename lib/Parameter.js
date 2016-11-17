const ParserCommon = require('./ParserCommon');

function Parameter(xml) {
  var name = xml.attr('Name').value();
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
      throw new Error('Unknown element type in Parameter '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  } 
  return this;
}

Parameter.prototype.parseElement = function(element, actionName) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Parameter.prototype.parseAttribute = function(attribute, actionName) {
  var attrName = attribute.name();
  switch(attrName) {
     case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
    case 'Unicode':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Parameter '+actionName);
      break;
  }
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
