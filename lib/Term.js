const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function Term(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'Name': {alreadyHandeled: true},
    'Type': {},
    'BaseTerm': {},
    'DefaultValue': {},
    'AppliesTo': {helperFunc: this.splitAppliesTo},
    'Nullable': {bool: true},
    'MaxLength': {integer: true},
    'Precision': {integer: true},
    'Scale': {},
    'SRID': {}
  };
  return this;
}

Term.prototype.splitAppliesTo = function(value) {
  return value.split(' ');
}

module.exports = Term;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
