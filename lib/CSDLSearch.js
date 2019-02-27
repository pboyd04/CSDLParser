
function searchAnnotation(collection, elementName) {
  var ret = [];
  if(elementName === undefined) {
    for(var name in collection) {
      if(name[0] === '_') {
        continue;
      }
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

function pushIfNotUndefined(array, element) {
  if(element !== undefined) {
    array.push(element);
  }
}

function elementInvalid(element) {
  return (element === undefined || element === null || typeof element !== 'object');
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
    if(elementInvalid(element)) {
      continue;
    }
    if(elementType !== undefined) {
      if(elementType === element.constructor.name) {
        pushIfNotUndefined(ret, getElementIfNameEqual(element, elementName));
      }
      else {
        var tmp = searchCSDL(element, elementType, elementName);
        if(tmp.length > 0) {
          ret = ret.concat(tmp);
        }
      }
    }
    else {
      pushIfNotUndefined(ret, getElementIfNameEqual(element, elementName));
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
    let schemas = metadata._options.cache.getSchemas(namespace); 
    if(schemas.length === 0) {
      if(metadata.References === undefined) {
        return null;
      }
      namespace = remapNamespace(metadata.References, namespace);
      if(namespace !== undefined) {
        schema = metadata._options.cache.getSchema(namespace);
      }
      else {
        return null;
      }
    }
    else if(schemas.length === 1) {
      schema = schemas[0];
    }
    else {
      for(let i = 0; i < schemas.length; i++) {
        if(schemas[i][justType] !== undefined) {
          return schemas[i][justType];
        }
      }
      return null;
    }
  }
  return schema[justType];
}

module.exports.search = searchCSDL;
module.exports.findByType = findByType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
