var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml');

  actionsTest(metadata.Actions, assert);
  functionsTest(metadata.Functions, assert);
  enumsTest(metadata.EnumTypes, assert);

  assert.equal(Object.keys(metadata.Terms).length, 0);
  assert.equal(Object.keys(metadata.TypeDefinitions).length, 0);

  delete metadata.Actions;
  delete metadata.Functions;
  delete metadata.EnumTypes;
  delete metadata.Terms;
  delete metadata.TypeDefinitions;
  console.log(metadata);
  assert.done();
}

function actionsTest(actions, assert) {
  assert.equal(Object.keys(actions).length, 2);
  assert.ok(actions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.ResetDataSource'));
  var action = actions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.ResetDataSource'];
  assert.equal(Object.keys(action.Parameters).length, 0);
  assert.equal(action.ReturnType, null);
  assert.equal(action.IsBound, undefined);
  assert.ok(actions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.ShareTrip'));
  action = actions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.ShareTrip'];
  assert.equal(Object.keys(action.Parameters).length, 3);
  assert.ok(action.Parameters.hasOwnProperty('personInstance'));
  var param = action.Parameters['personInstance'];
  assert.equal(param.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
  assert.equal(param.Nullable, undefined);
  assert.equal(param.Unicode, undefined);
  param = action.Parameters['userName'];
  assert.equal(param.Type, 'Edm.String');
  assert.equal(param.Nullable, false);
  assert.equal(param.Unicode, false);
  param = action.Parameters['tripId'];
  assert.equal(param.Type, 'Edm.Int32');
  assert.equal(param.Nullable, false);
  assert.equal(param.Unicode, undefined);
  assert.equal(action.ReturnType, null);
  assert.equal(action.IsBound, true);
}

function functionsTest(functions, assert) {
  assert.equal(Object.keys(functions).length, 6);
  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetPersonWithMostFriends'));
  var func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetPersonWithMostFriends'];
  assert.equal(Object.keys(func.Parameters).length, 0);
  assert.equal(func.ReturnType.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'); 
  
  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetNearestAirport'));
  func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetNearestAirport'];
  assert.equal(Object.keys(func.Parameters).length, 2);
  assert.ok(func.Parameters.hasOwnProperty('lat'));
  var param = func.Parameters['lat'];
  assert.equal(param.Type, 'Edm.Double');
  assert.equal(param.Nullable, false);
  assert.ok(func.Parameters.hasOwnProperty('lon'));
  param = func.Parameters['lon'];
  assert.equal(param.Type, 'Edm.Double');
  assert.equal(param.Nullable, false);
  assert.equal(func.ReturnType.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport');

  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetFavoriteAirline'));
  func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetFavoriteAirline'];
  assert.equal(Object.keys(func.Parameters).length, 1);
  assert.ok(func.Parameters.hasOwnProperty('person'));
  param = func.Parameters['person'];
  assert.equal(param.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
  assert.equal(param.Nullable, undefined);
  assert.equal(func.ReturnType.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airline');
  assert.equal(func.IsBound, true);
  assert.equal(func.EntitySetPath, 'person');

  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetFriendsTrips'));
  func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetFriendsTrips'];
  assert.equal(Object.keys(func.Parameters).length, 2);
  assert.ok(func.Parameters.hasOwnProperty('person'));
  param = func.Parameters['person'];
  assert.equal(param.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
  assert.equal(param.Nullable, undefined);
  assert.ok(func.Parameters.hasOwnProperty('userName'));
  param = func.Parameters['userName'];
  assert.equal(param.Type, 'Edm.String');
  assert.equal(param.Nullable, false);
  assert.equal(param.Unicode, false);
  assert.equal(func.ReturnType.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip)');
  assert.equal(func.IsBound, true);

  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetInvolvedPeople'));
  func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetInvolvedPeople'];
  assert.equal(Object.keys(func.Parameters).length, 1);
  assert.ok(func.Parameters.hasOwnProperty('trip'));
  param = func.Parameters['trip'];
  assert.equal(param.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip');
  assert.equal(param.Nullable, undefined);
  assert.equal(func.ReturnType.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)');
  assert.equal(func.IsBound, true);

  assert.ok(functions.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.UpdatePersonLastName'));
  func = functions['Microsoft.OData.Service.Sample.TrippinInMemory.Models.UpdatePersonLastName'];
  assert.equal(Object.keys(func.Parameters).length, 2);
  assert.ok(func.Parameters.hasOwnProperty('person'));
  param = func.Parameters['person'];
  assert.equal(param.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
  assert.equal(param.Nullable, undefined);
  assert.ok(func.Parameters.hasOwnProperty('lastName'));
  param = func.Parameters['lastName'];
  assert.equal(param.Type, 'Edm.String');
  assert.equal(param.Nullable, false);
  assert.equal(param.Unicode, false);
  assert.equal(func.ReturnType.Type, 'Edm.Boolean');
  assert.equal(func.ReturnType.Nullable, false);
}

function enumsTest(enums, assert) {
  assert.equal(Object.keys(enums).length, 2);
  assert.ok(enums.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'));
  var enu = enums['Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender'];
  assert.equal(Object.keys(enu.Members).length, 3);
  assert.ok(enu.Members.hasOwnProperty('Male'));
  assert.ok(enu.Members.hasOwnProperty('Female'));
  assert.ok(enu.Members.hasOwnProperty('Unknow'));

  assert.ok(enums.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature'));
  enu = enums['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature'];
  assert.equal(Object.keys(enu.Members).length, 4);
  assert.ok(enu.Members.hasOwnProperty('Feature1'));
  assert.ok(enu.Members.hasOwnProperty('Feature2'));
  assert.ok(enu.Members.hasOwnProperty('Feature3'));
  assert.ok(enu.Members.hasOwnProperty('Feature4'));
}
