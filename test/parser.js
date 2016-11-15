var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml');

  actionsTest(metadata.Actions, assert);
  functionsTest(metadata.Functions, assert);
  enumsTest(metadata.EnumTypes, assert);
  entityTypesTest(metadata.EntityTypes, assert);
  entityContainersTest(metadata.EntityContainers, assert);
  complexTypesTest(metadata.ComplexTypes, assert);

  assert.equal(Object.keys(metadata._options).length, 2);
  assert.equal(metadata._options.useLocal, null);
  assert.equal(metadata._options.useNetwork, true);
  assert.equal(Object.keys(metadata.Annotations).length, 0);
  assert.equal(Object.keys(metadata.Terms).length, 0);
  assert.equal(Object.keys(metadata.TypeDefinitions).length, 0);

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

function entityTypesTest(entities, assert) {
  assert.equal(Object.keys(entities).length, 10);
  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'));
  var entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'];
  assert.equal(Object.keys(entity.Properties).length, 14);
  assert.ok(entity.Properties.hasOwnProperty('UserName'));
  var prop = entity.Properties['UserName'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('FirstName'));
  prop = entity.Properties['FirstName'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('LastName'));
  prop = entity.Properties['LastName'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('MiddleName'));
  prop = entity.Properties['MiddleName'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Gender'));
  prop = entity.Properties['Gender'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Age'));
  prop = entity.Properties['Age'];
  assert.equal(prop.Type, 'Edm.Int64');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Emails'));
  prop = entity.Properties['Emails'];
  assert.equal(prop.Type, 'Collection(Edm.String)');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('AddressInfo'));
  prop = entity.Properties['AddressInfo'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location)');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('HomeAddress'));
  prop = entity.Properties['HomeAddress'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('FavoriteFeature'));
  prop = entity.Properties['FavoriteFeature'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Features'));
  prop = entity.Properties['Features'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature)');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Friends'));
  prop = entity.Properties['Friends'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('BestFriend'));
  prop = entity.Properties['BestFriend'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Trips'));
  prop = entity.Properties['Trips'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip)');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, undefined);

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airline'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airline'];
  assert.equal(Object.keys(entity.Properties).length, 2);
  assert.ok(entity.Properties.hasOwnProperty('AirlineCode'));
  prop = entity.Properties['AirlineCode'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Name'));
  prop = entity.Properties['Name'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, undefined);

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport'];
  assert.equal(Object.keys(entity.Properties).length, 4);
  assert.ok(entity.Properties.hasOwnProperty('Name'));
  prop = entity.Properties['Name'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('IcaoCode'));
  prop = entity.Properties['IcaoCode'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('IataCode'));
  prop = entity.Properties['IataCode'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Location'));
  prop = entity.Properties['Location'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.AirportLocation');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, undefined);

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip'];
  assert.equal(Object.keys(entity.Properties).length, 9);
  assert.ok(entity.Properties.hasOwnProperty('TripId'));
  prop = entity.Properties['TripId'];
  assert.equal(prop.Type, 'Edm.Int32');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('ShareId'));
  prop = entity.Properties['ShareId'];
  assert.equal(prop.Type, 'Edm.Guid');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Name'));
  prop = entity.Properties['Name'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Budget'));
  prop = entity.Properties['Budget'];
  assert.equal(prop.Type, 'Edm.Single');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Description'));
  prop = entity.Properties['Description'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Tags'));
  prop = entity.Properties['Tags'];
  assert.equal(prop.Type, 'Collection(Edm.String)');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('StartsAt'));
  prop = entity.Properties['StartsAt'];
  assert.equal(prop.Type, 'Edm.DateTimeOffset');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('EndsAt'));
  prop = entity.Properties['EndsAt'];
  assert.equal(prop.Type, 'Edm.DateTimeOffset');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('PlanItems'));
  prop = entity.Properties['PlanItems'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.PlanItem)');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, undefined);

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.PlanItem'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.PlanItem'];
  assert.equal(Object.keys(entity.Properties).length, 5);
  assert.ok(entity.Properties.hasOwnProperty('PlanItemId'));
  prop = entity.Properties['PlanItemId'];
  assert.equal(prop.Type, 'Edm.Int32');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('ConfirmationCode'));
  prop = entity.Properties['ConfirmationCode'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('StartsAt'));
  prop = entity.Properties['StartsAt'];
  assert.equal(prop.Type, 'Edm.DateTimeOffset');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('EndsAt'));
  prop = entity.Properties['EndsAt'];
  assert.equal(prop.Type, 'Edm.DateTimeOffset');
  assert.equal(prop.Nullable, false);
  assert.equal(entity.BaseType, undefined);

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Event'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Event'];
  assert.equal(Object.keys(entity.Properties).length, 2);
  assert.ok(entity.Properties.hasOwnProperty('OccursAt'));
  prop = entity.Properties['OccursAt'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.EventLocation');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Description'));
  prop = entity.Properties['Description'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PlanItem');

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.PublicTransportation'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.PublicTransportation'];
  assert.equal(Object.keys(entity.Properties).length, 1);
  assert.ok(entity.Properties.hasOwnProperty('SeatNumber'));
  prop = entity.Properties['SeatNumber'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PlanItem');

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Flight'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Flight'];
  assert.equal(Object.keys(entity.Properties).length, 4);
  assert.ok(entity.Properties.hasOwnProperty('FlightNumber'));
  prop = entity.Properties['FlightNumber'];
  assert.equal(prop.Type, 'Edm.String');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('Airline'));
  prop = entity.Properties['Airline'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airline');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('From'));
  prop = entity.Properties['From'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('To'));
  prop = entity.Properties['To'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PublicTransportation');

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Employee'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Employee'];
  assert.equal(Object.keys(entity.Properties).length, 2);
  assert.ok(entity.Properties.hasOwnProperty('Cost'));
  prop = entity.Properties['Cost'];
  assert.equal(prop.Type, 'Edm.Int64');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('Peers'));
  prop = entity.Properties['Peers'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');

  assert.ok(entities.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Manager'));
  entity = entities['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Manager'];
  assert.equal(Object.keys(entity.Properties).length, 3);
  assert.ok(entity.Properties.hasOwnProperty('Budget'));
  prop = entity.Properties['Budget'];
  assert.equal(prop.Type, 'Edm.Int64');
  assert.equal(prop.Nullable, false);
  assert.ok(entity.Properties.hasOwnProperty('BossOffice'));
  prop = entity.Properties['BossOffice'];
  assert.equal(prop.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');
  assert.equal(prop.Nullable, undefined);
  assert.ok(entity.Properties.hasOwnProperty('DirectReports'));
  prop = entity.Properties['DirectReports'];
  assert.equal(prop.Type, 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)');
  assert.equal(prop.Nullable, undefined);
  assert.equal(entity.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');
}

function entityContainersTest(containers, assert) {
  assert.equal(Object.keys(containers).length, 1);
  assert.ok(containers.hasOwnProperty('Microsoft.OData.Service.Sample.TrippinInMemory.Models.Container'));
  var container = containers['Microsoft.OData.Service.Sample.TrippinInMemory.Models.Container'];
  var entitySets = container.EntitySets;
  assert.equal(Object.keys(entitySets).length, 4);

  assert.ok(entitySets.hasOwnProperty('People'));
  var entitySet = entitySets['People'];
  assert.equal(Object.keys(entitySet.Annotations).length, 0);
  assert.equal(Object.keys(entitySet.NaviagtionPropertyBindings).length, 4);assert.equal(Object.keys(container.ActionImports).length, 1);

  assert.ok(entitySets.hasOwnProperty('Airlines'));
  entitySet = entitySets['Airlines'];
  assert.equal(Object.keys(entitySet.Annotations).length, 1);
  assert.ok(entitySet.Annotations.hasOwnProperty('Org.OData.Core.V1.OptimisticConcurrency'));
  assert.equal(Object.keys(entitySet.NaviagtionPropertyBindings).length, 0);
  assert.equal(entitySet.EntityType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airline');

  assert.ok(entitySets.hasOwnProperty('Airports'));
  entitySet = entitySets['Airports'];
  assert.equal(Object.keys(entitySet.Annotations).length, 0);
  assert.equal(Object.keys(entitySet.NaviagtionPropertyBindings).length, 0);
  assert.equal(entitySet.EntityType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport');

  assert.ok(entitySets.hasOwnProperty('NewComePeople'));
  entitySet = entitySets['NewComePeople'];
  assert.equal(Object.keys(entitySet.Annotations).length, 0);
  assert.equal(Object.keys(entitySet.NaviagtionPropertyBindings).length, 0);
  assert.equal(entitySet.EntityType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');

  var singletons = container.Singletons;
  assert.equal(Object.keys(singletons).length, 1);
  assert.ok(singletons.hasOwnProperty('Me'));
  var singleton = singletons['Me'];
  assert.equal(Object.keys(singleton.Annotations).length, 0);
  assert.equal(singleton.Type, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person');

  assert.equal(Object.keys(container.ActionImports).length, 1);
  assert.equal(Object.keys(container.FunctionImports).length, 2);
}

function complexTypesTest(types, assert) {
  assert.equal(Object.keys(types).length, 4);
}
