'use strict'
function parseEntity(element, entityName, elementCallback, attributeCallback) {
  if(elementCallback !== undefined) {
    var children = element.childNodes();
    for(var i = 0; i < children.length; i++) {
      switch(children[i].type()) {
        case 'element':
          elementCallback(children[i]);
          break;
        case 'text':
          var text = children[i].toString().trim();
          if(text.length !== 0) {
            throw new Error('Unknown text element in '+entityName+'! Text = "'+text+'"');
          }
          break;
        case 'comment':
          //Ignore comments
          break;
        default:
          throw new Error('Unknown element type '+elemType+' in '+entityName+'!');
          break;
      }
    }
  }
  if(attributeCallback !== undefined) {
    var attributes = element.attrs();
    for(var i = 0; i < attributes.length; i++)
    {
      attributeCallback(attributes[i]);
    } 
  }
}

function parseBooleanAttribute(entity, attr, name) {
  var value = attr.value();
  if(value === 'true') {
    entity[name] = true;
  }
  else if(value === 'false') {
    entity[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports.parseEntity = parseEntity;
module.exports.parseBooleanAttribute = parseBooleanAttribute;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
