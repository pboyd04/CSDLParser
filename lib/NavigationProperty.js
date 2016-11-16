const Annotation = require('./Annotation');

function NavigationProperty(xml) {
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
        throw new Error('Unknown text element in NavigationProperty! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in NavigationProperty '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

NavigationProperty.prototype.parseElement = function(element, entityName) {
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

NavigationProperty.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in NavigationProperty '+entityName);
      break;
  }
}

NavigationProperty.prototype.parseBooleanAttribute = function(xml, name) {
  var value = xml.value();
  if(value === 'true') {
    this[name] = true;
  }
  else if(value === 'false') {
    this[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports = NavigationProperty;
