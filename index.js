var Metadata = process.env.CSDL_COV ? require('./lib-cov/Metadata') : require('./lib/Metadata');
var Reference = process.env.CSDL_COV ? require('./lib-cov/Reference') : require('./lib/Reference');

//constants
module.exports.version = require('./package.json').version;

/// parse an XML string and return the CSDL object
module.exports.parseMetadata = Metadata.parseMetadata;

/// parse an XML file and return the CSDL object
module.exports.parseMetadataFile = Metadata.parseMetadataFile;

/// parse an XML URI and return the CSDL object
module.exports.parseMetadataUri = Metadata.parseMetadataUri;

/// Allow the caller access to the cache
module.exports.cache = Reference.cache;
