var package = require('../package');
var csdl = require('../index');

module.exports.constants = function(assert) {
    assert.ok(typeof csdl.version == 'string');
    assert.done();
}
