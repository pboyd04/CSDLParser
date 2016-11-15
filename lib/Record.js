const assert = require('assert');

function Record(xml) {
  var children = xml.childNodes();
  this.PropertyValues = {};
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i]);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in record! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in Record!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i]);
  }
  return this;
}

Record.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'PropertyValue':
      var name = element.attr('Property').value();
      this.PropertyValues[name] = element.attr('String').value();
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Record.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    default:
      throw new Error('Unknown attribute name '+attrName+' in Record');
      break;
  }
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
