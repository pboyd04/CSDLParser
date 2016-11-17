
function searchAnnotation(collection, elementName) {
  var ret = [];
  if(elementName === undefined) {
    for(var name in collection) {
      ret.push(collection[name]);
    }
  }
  else {
    if(collection[elementName] !== undefined) {
      ret.push(collection[elementName]);
    }
  }
  return ret;
}

function getElementIfNameEqual(element, elementName) {
  if(elementName === undefined) {
    return element;
  }
  if(elementName === element.Name) {
    return element;
  }
  return undefined;
}

function searchCSDL(root, elementType, elementName, includeReferences) {
  var ret = [];
  for(var key in root) {
    if(key[0] === '_') {
      continue;
    }
    else if(key === 'Annotations') {
      if(elementType === 'Annotation') {
        ret = ret.concat(searchAnnotation(root.Annotations, elementName));
      }
      continue;
    }
    else if(key === 'References' && includeReferences !== true) {
      continue;
    }
    var element = root[key];
    if(element === undefined || element === null) {
      continue;
    }
    if(typeof element !== 'object') {
      continue;
    }
    if(elementType !== undefined) {
      if(elementType === element.constructor.name) {
        var tmp = getElementIfNameEqual(element, elementName);
        if(tmp !== undefined) {
          ret.push(tmp);
        }
      }
      else {
        var tmp = searchCSDL(element, elementType, elementName);
        if(tmp.length > 0) {
          ret = ret.concat(tmp);
        }
      }
    }
    else {
      var tmp = getElementIfNameEqual(element, elementName);
      if(tmp !== undefined) {
        ret.push(tmp);
      }
    }
  }
  return ret;
}

function remapNamespace(references, namespace) {
  for(var i = 0; i < references.length; i++) {
    if(references[i].Includes[namespace] !== undefined) {
      return references[i].Includes[namespace];
    }
  }
  return undefined;
}

function findByType(metadata, typeName) {
  if(typeName.startsWith('Edm')) {
    return typeName;
  }
  var index = typeName.lastIndexOf('.');
  if(index === -1) {
    return null;
  }
  var namespace = typeName.substring(0, index);
  var justType = typeName.substring(index+1);
  var schema = metadata[namespace];
  if(schema === undefined) { 
    schema = metadata._options.cache.getSchema(namespace);
    if(schema === undefined) {
      namespace = remapNamespace(metadata.References, namespace);
      if(namespace !== undefined) {
        schema = metadata._options.cache.getSchema(namespace);
      }
      else {
        return null;
      }
    }
  }
  return schema[justType];
}

module.exports.search = searchCSDL;
module.exports.findByType = findByType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
