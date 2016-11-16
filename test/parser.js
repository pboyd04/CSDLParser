var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml', {}, function(error, metadata) {
    if(error) {
      console.log(error);
      return;
    }
    assert.equal(Object.keys(metadata).length, 1);
    var schema = metadata['Microsoft.OData.Service.Sample.TrippinInMemory.Models'];
    assert.notEqual(schema, undefined);
    schemaTest(schema, assert);
    /*
  actionsTest(metadata.Actions, assert);
  functionsTest(metadata.Functions, assert);
  enumsTest(metadata.EnumTypes, assert);
  entityTypesTest(metadata.EntityTypes, assert);
  entityContainersTest(metadata.EntityContainers, assert);
  complexTypesTest(metadata.ComplexTypes, assert);

  assert.equal(Object.keys(metadata.Annotations).length, 0);
  assert.equal(Object.keys(metadata.Terms).length, 0);
  assert.equal(Object.keys(metadata.TypeDefinitions).length, 0);
  */
    assert.done();
  });
}

function schemaTest(schema, assert) {
  assert.equal(Object.keys(schema).length, 25);
  assert.notEqual(schema.Person, undefined);
  assert.equal(schema.Person.constructor.name, 'EntityType');
  assert.deepEqual(schema.Person.Annotations, {});
  assert.deepEqual(schema.Person.Properties.UserName, {Annotations: {}, Type: 'Edm.String', Nullable: false});
  assert.deepEqual(schema.Person.Properties.FirstName, {Annotations: {}, Type: 'Edm.String', Nullable: false});
  assert.deepEqual(schema.Person.Properties.LastName, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Person.Properties.MiddleName, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Person.Properties.Gender, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Age, {Annotations: {}, Type: 'Edm.Int64'});
  assert.deepEqual(schema.Person.Properties.Emails, {Annotations: {}, Type: 'Collection(Edm.String)'});
  assert.deepEqual(schema.Person.Properties.AddressInfo, {Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location)'});
  assert.deepEqual(schema.Person.Properties.HomeAddress, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location'});
  assert.deepEqual(schema.Person.Properties.FavoriteFeature, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Features, {Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature)', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Friends, {Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)'});
  assert.deepEqual(schema.Person.Properties.BestFriend, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'});
  assert.deepEqual(schema.Person.Properties.Trips, {Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip)'}); 

  assert.notEqual(schema.Airline, undefined);
  assert.equal(schema.Airline.constructor.name, 'EntityType');
  assert.deepEqual(schema.Airline.Annotations, {});
  assert.deepEqual(schema.Airline.Properties.AirlineCode, {Annotations: {}, Type: 'Edm.String', Nullable: false});
  assert.deepEqual(schema.Airline.Properties.Name, {Annotations: {}, Type: 'Edm.String'});

  assert.notEqual(schema.Airport, undefined);
  assert.equal(schema.Airport.constructor.name, 'EntityType');
  assert.deepEqual(schema.Airport.Annotations, {});
  assert.deepEqual(schema.Airport.Properties.Name, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Airport.Properties.IcaoCode, {Annotations: {}, Type: 'Edm.String', Nullable: false});
  assert.deepEqual(schema.Airport.Properties.IataCode, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Airport.Properties.Location, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.AirportLocation'});

  assert.notEqual(schema.Location, undefined);
  assert.equal(schema.Location.constructor.name, 'ComplexType');
  assert.deepEqual(schema.Location.Annotations, {});
  assert.deepEqual(schema.Location.Properties.Address, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Location.Properties.City, {Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.City'});

  assert.notEqual(schema.City, undefined);
  assert.equal(schema.City.constructor.name, 'ComplexType');
  assert.deepEqual(schema.City.Annotations, {});
  assert.deepEqual(schema.City.Properties.Name, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.City.Properties.CountryRegion, {Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.City.Properties.Region, {Annotations: {}, Type: 'Edm.String'});

  assert.notEqual(schema.AirportLocation, undefined);
  assert.equal(schema.AirportLocation.constructor.name, 'ComplexType');
  assert.deepEqual(schema.AirportLocation.Annotations, {});
  assert.deepEqual(schema.AirportLocation.Properties.Loc, {Annotations: {}, Type: 'Edm.GeographyPoint'});
  assert.equal(schema.AirportLocation.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');

  assert.notEqual(schema.EventLocation, undefined);
  assert.equal(schema.EventLocation.constructor.name, 'ComplexType');
  assert.deepEqual(schema.EventLocation.Properties.BuildingInfo, {Annotations: {}, Type: 'Edm.String'});
  assert.equal(schema.EventLocation.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');

  assert.notEqual(schema.ResetDataSource, undefined);
  assert.equal(schema.ResetDataSource.constructor.name, 'Action');
  assert.deepEqual(schema.ResetDataSource.ReturnType, null);
  assert.deepEqual(schema.ResetDataSource.Parameters, {});

  assert.notEqual(schema.UpdatePersonLastName, undefined);
  assert.equal(schema.UpdatePersonLastName.constructor.name, 'Function');
  assert.deepEqual(schema.UpdatePersonLastName.ReturnType, {Type: 'Edm.Boolean', Nullable: false});
  assert.deepEqual(schema.UpdatePersonLastName.Parameters, {person: {Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'}, lastName: {Type: 'Edm.String', Nullable: false, Unicode: false}});
  assert.equal(schema.UpdatePersonLastName.IsBound, true);

  assert.notEqual(schema.ShareTrip, undefined);
  assert.equal(schema.ShareTrip.constructor.name, 'Action');
  assert.equal(schema.ShareTrip.ReturnType, null);
  assert.equal(schema.ShareTrip.IsBound, true);
  assert.deepEqual(schema.ShareTrip.Parameters, {
    personInstance: {Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'},
    userName: {Type: 'Edm.String', Nullable: false, Unicode: false},
    tripId: {Type: 'Edm.Int32', Nullable: false}
  });

  assert.notEqual(schema.Container, undefined);
  assert.equal(schema.Container.constructor.name, 'EntityContainer');
  assert.equal(schema.Container.People.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Airlines.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Airports.constructor.name, 'EntitySet');
  assert.equal(schema.Container.NewComePeople.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Me.constructor.name, 'Singleton');
  assert.equal(schema.Container.GetPersonWithMostFriends.constructor.name, 'FunctionImport');
  assert.equal(schema.Container.GetNearestAirport.constructor.name, 'FunctionImport');
  assert.equal(schema.Container.ResetDataSource.constructor.name, 'ActionImport');
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
