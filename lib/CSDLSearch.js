
function searchAnnotation(collection, elementName) {
  var ret = [];
  if(elementName === undefined) {
    return getAllValidElementsInCollection(collection);
  }
  else {
    if(collection[elementName] !== undefined) {
      ret.push(collection[elementName]);
    }
  }
  return ret;
}

function getAllValidElementsInCollection(collection) {
  let ret = [];
  for(var name in collection) {
    if(name[0] === '_') {
      continue;
    }
    ret.push(collection[name]);
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
    ret = ret.concat(searchElementPart(key, root[key], elementType, elementName, includeReferences));
  }
  return ret;
}

function searchElementPart(key, element, elementType, elementName, includeReferences) {
  let ret = [];
  switch(key) {
    case 'Annotations':
      return processAnnotationsKey(element, elementType, elementName);
    case 'References':
      if(includeReferences !== true) {
        return ret;
      }
      //Deliberate fallthrough...
    default:
      return processDefaultKey(element, elementType, elementName);
  }
}

function processAnnotationsKey(element, elementType, elementName) {
  if(elementType === 'Annotation') {
    return searchAnnotation(element, elementName);
  }
  return [];
}

function processDefaultKey(element, elementType, elementName) {
  let ret = [];
  if(elementInvalid(element)) {
    return ret;
  }
  if(elementType === undefined) {
    pushIfNotUndefined(ret, getElementIfNameEqual(element, elementName));
    return ret;
  }
  if(elementType === element.constructor.name) {
    pushIfNotUndefined(ret, getElementIfNameEqual(element, elementName));
    return ret;
  }
  return searchCSDL(element, elementType, elementName);
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
    schema = findSchema(metadata, namespace, justType);
    if(schema === undefined) {
      return null;
    }
  }
  return schema[justType];
}

function findSchema(metadata, namespace, justType) {
  let schemas = metadata._options.cache.getSchemas(namespace);
  if(schemas.length === 0) {
    return findSchemaWithReferences(metadata, namespace, justType);
  }
  for(let i = 0; i < schemas.length; i++) {
    if(schemas[i][justType] !== undefined) {
      return schemas[i];
    }
  }
  return undefined;
}

function findSchemaWithReferences(metadata, namespace, justType) {
  if(metadata.References !== undefined) {
    namespace = remapNamespace(metadata.References, namespace);
    if(namespace !== undefined) {
      return findSchema(metadata, namespace, justType);
    }
  }
  return undefined;
}

module.exports.search = searchCSDL;
module.exports.findByType = findByType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
