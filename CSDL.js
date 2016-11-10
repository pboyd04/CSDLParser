const xmljs = require('libxmljs-mt');
const assert = require('assert');

function parseMetadata(text, options)
{
  var metadata = {};
  var doc = xmljs.parseXml(text);
  var root = doc.root();
  assert(root !== undefined);
  assert(root.name() === 'Edmx');
  assert(root.childNodes().length >= 1);

  //TODO handle Reference nodes
  var schemas = root.find('//*[local-name()="Schema"]');
  assert(schemas.length >= 1);
  for(var i = 0; i < schemas.length; i++)
  {
    parseSchema(metadata, schemas[i], options);
  }
  console.log(metadata);
}

function parseSchema(metadata, schema, options)
{
  var namespace = schema.attr('Namespace').value();
  var entityTypes = schema.find('//*[local-name()="EntityType"]');
  for(var i = 0; i < entityTypes.length; i++)
  {
    var entityType = entityTypes[i];
    var name = entityType.attr('Name').value();
    metadata[namespace+"."+name] = parseEntityType(entityType);
  }
}

function parseEntityType(entityType)
{
  var entityObj = {};
  var properties = entityType.find('//*[local-name()="Property"]');
  var navProperties = entityType.find('//*[local-name()="NavigationProperty"]');
  for(var i = 0; i < properties.length; i++)
  {
    var obj = {};
    var name = properties[i].attr('Name').value();
    obj.Type = properties[i].attr('Type').value();
    if(properties[i].attr('Nullable') === null)
    {
      var value = properties[i].attr('Nullable').value();
      if(value === 'true')
      {
        obj.Nullable = true;
      }
      else
      {
        obj.Nullable = false;
      }
    }
    entityObj[name] = obj;
  }
  return true;
}

module.exports.parseMetadata = parseMetadata;
