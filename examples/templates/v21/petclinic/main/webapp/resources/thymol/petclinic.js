var thProtocol = "";
var thRelativeRootPath = "../..";
var thPath = "WEB-INF/thymeleaf";
var thMessagePath = "../resources/messages";
var thMessagesBaseName = "messages";
var thIndexFile = thPath + "/welcome.html";
var thDebug = true;
var thExtendedMapping = true;

thymol.ready(function () {
  thymol.configurePreExecution( function() {
    ThUtils.loadScript(thymol.location + "fields-object.js");
    ThUtils.loadScript(thymol.location + "field-attribute.js");
    ThUtils.loadScript(thymol.location + "errors-attribute.js");
    thymol.addDialect({
      prefix : 'th',
      attributeProcessors : [
      {  name : 'field',
        processor : fieldAttrProcessor,
        precedence : 1200 }, 
      {  name : 'errors',
        processor : errorsAttrProcessor,
        precedence : 1250 } 
      ],
      objects : [
        fieldsObject
      ]
    });
    thymol.conversionService = function(arg) {
      if( arg instanceof PCDate ) {
        return thymol.objects.thDatesObject.format(arg.toDate(),'dd/MMM/yyyy');
      }
      return arg;
    };
  });
});         

function PCDate(dv) {
  this.dateValue = new Date(dv);
  this.toDate = function() {
    return this.dateValue;
  }
  this.toString = function() {
    return this.dateValue.toString();
  }
}
PCDate.prototype.constructor = PCDate;


var thMappings = [

      ["/webjars/jquery/1.11.1/jquery.js",                                   "http://code.jquery.com/jquery-1.11.1.min.js"],
      ["/webjars/bootstrap/2.3.0/css/bootstrap.min.css",                     "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap.min.css"],
      ["/webjars/jquery-ui/1.9.2/js/jquery-ui-1.9.2.custom.js",              "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"],
      ["/webjars/jquery-ui/1.9.2/css/smoothness/jquery-ui-1.9.2.custom.css", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/smoothness/jquery-ui.css"],

      ["/owners/find.html",                                 "/" + thPath + "/owners/findOwners.html"],
      ["/vets.html",                                        "/" + thPath + "/vets/vetList.html"],
      ["/oups.html",                                        "/" + thPath + "/exception.html"],
      ["/owners.html",                                      "/" + thPath + "/owners/ownersList.html"],      
      ["/owners/new",                                       "/" + thPath + "/owners/createOrUpdateOwnerForm.html?owner=%"],      

      ["23smith1/edit.html",                                "/" + thPath + "/owners/createOrUpdateOwnerForm.html?owner=%23smith1"],      
      ["23smith1/pets/new.html",                            "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet1a"],           
      ["/owners/23smith1/pets/23pet1/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet1"],      
      ["/owners/23smith1/pets/23pet2/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet2"],      
      ["/owners/23smith1/pets/23pet1/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit1a"],      
      ["/owners/23smith1/pets/23pet2/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit2a"],      
 
      ["23adams1/edit.html",                                "/" + thPath + "/owners/createOrUpdateOwnerForm.html?owner=%23adams1"],      
      ["23adams1/pets/new.html",                            "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet3a"],      
      ["/owners/23adams1/pets/23pet3/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet3"],      
      ["/owners/23adams1/pets/23pet4/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet4"],      
      ["/owners/23adams1/pets/23pet3/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit3a"],      
      ["/owners/23adams1/pets/23pet4/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit4a"],      

      ["23munst1/edit.html",                                "/" + thPath + "/owners/createOrUpdateOwnerForm.html?owner=%23munst1"],            
      ["23munst1/pets/new.html",                            "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet5a"],      
      ["/owners/23munst1/pets/23pet5/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet5"],      
      ["/owners/23munst1/pets/23pet6/edit",                 "/" + thPath + "/pets/createOrUpdatePetForm.html?pet=%23pet6"],      
      ["/owners/23munst1/pets/23pet5/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit5a"],      
      ["/owners/23munst1/pets/23pet6/visits/new",           "/" + thPath + "/pets/createOrUpdateVisitForm.html?visit=%23visit6a"],      
      
      ["/owners/",                                          "/" + thPath + "/owners/ownerDetails.html?owner=%"]
  
];

var  thVars = [

      ["exception.message",            "What on earth is going on? Some kind of error?"],

      ["smith1",                       "#{ 'pets': #smith1Pets, 'new': 'No', 'id': '23smith1', 'firstName': 'Mary', 'lastName': 'Smith-Thymol', 'address': '45, Oxford Street West', 'city': 'Cambridge', 'telephone': '555-555-559' }"],
      ["bd1", new PCDate('2008-04-23')],
      ["pet1",                         "#{ 'id': '23pet1', 'name': 'Tiddles', 'type': { 'name': 'Cat' }, 'owner': #smith1, 'birthDate': #bd1 }"],      
      ["pet1a",                        "#{ 'new': 'Yes', 'owner': #smith1 }"],      
      ["visit1a",                      "#{ 'new': 'Yes', 'pet': #pet1 }" ],
      ["bd2", new PCDate('2006-11-18')],
      ["pet2",                         "#{ 'id': '23pet2', 'name': 'Fido', 'type': { 'name': 'Dog' }, 'owner': #smith1, 'birthDate': #bd2 }"],      
      ["vd1", new PCDate('2011/07/03')],
      ["visit1",                       "#{ 'pet': #pet1, 'date': #vd1, 'description': 'Annual check-up' }" ],
      ["visit2a",                      "#{ 'new': 'Yes', 'pet': #pet2 }" ],
      ["smith1Pets",                   "#[ #pet1, #pet2 ]"],             

      ["adams1",                       "#{ 'pets': #adams1Pets, 'new': 'No', 'id': '23adams1', 'firstName': 'Thomas', 'lastName': 'Adams', 'address': '23 Clark St', 'city': 'Anston', 'telephone': '245-954-222' }"],
      ["bd3", new PCDate('2010-10-02')],
      ["pet3",                         "#{ 'id': '23pet3', 'name': 'Squawk', 'type': { 'name': 'Bird' }, 'owner': #adams1, 'birthDate': #bd3, 'visits': #adams1Pet3Visits }"],      
      ["pet3a",                        "#{ 'new': 'Yes', 'owner': #adams1 }"],      
      ["bd4", new PCDate('1998-07-22')],
      ["pet4",                         "#{ 'id': '23pet4', 'name': 'Squeek', 'type': { 'name': 'Bird' }, 'owner': #adams1, 'birthDate': #bd4, 'visits': #adams1Pet4Visits }"],      
      ["vd2", new PCDate('2011/07/04')],
      ["visit2",                       "#{ 'pet': #pet3, 'date': #vd2, 'description': 'Annual check-up' }" ],
      ["vd3", new PCDate('2012/07/05')],
      ["visit3",                       "#{ 'pet': #pet3, 'date': #vd3, 'description': 'Annual check-up' }" ],
      ["visit3a",                      "#{ 'new': 'Yes', 'pet': #pet3 }" ],
      ["vd4", new PCDate('2011/02/04')],
      ["visit4",                       "#{ 'pet': #pet4, 'date': #vd4, 'description': 'Annual check-up' }" ],
      ["vd5", new PCDate('2012/03/07')],
      ["visit5",                       "#{ 'pet': #pet4, 'date': #vd5, 'description': 'Annual check-up' }" ],
      ["vd6", new PCDate('2013/03/12')],
      ["visit6",                       "#{ 'pet': #pet4, 'date': #vd6, 'description': 'Annual check-up' }" ],
      ["visit4a",                      "#{ 'new': 'Yes', 'pet': #pet4 }" ],
      ["adams1Pets",                   "#[ #pet3, #pet4 ]"],             
      ["adams1Pet3Visits  ",           "#[ #visit2, #visit3 ]"],             
      ["adams1Pet4Visits",             "#[ #visit4, #visit5, #visit6 ]"],             

      ["munst1",                       "#{ 'pets': #munst1Pets, 'new': 'No', 'id': '23munst1', 'firstName': 'Albert', 'lastName': 'Munster', 'address': 'Hammer House', 'city': 'Horsfield', 'telephone': '911-911-911' }"],
      ["bd5", new PCDate('2009-03-02')],
      ["pet5",                         "#{ 'id': '23pet5', 'name': 'Squeezy', 'type': { 'name': 'Python' }, 'owner': #munst1, 'birthDate': #bd5, 'visits': #munst1Pet5Visits }"],      
      ["pet5a",                        "#{ 'new': 'Yes', 'owner': #munst1 }"],      
      ["bd6", new PCDate('2011-01-02')],
      ["pet6",                         "#{ 'id': '23pet6', 'name': 'Reddit', 'type': { 'name': 'Frog' }, 'owner': #munst1, 'birthDate': #bd6, 'visits': #munst1Pet6Visits }"],      
      ["vd7", new PCDate('2011/07/06')],
      ["visit7",                       "#{ 'pet': #pet5, 'date': #vd7, 'description': 'Annual check-up' }" ],
      ["visit5a",                      "#{ 'new': 'Yes', 'pet': #pet5 }" ],
      ["visit6a",                      "#{ 'new': 'Yes', 'pet': #pet6 }" ],
      ["munst1Pets",                   "#[ #pet5, #pet6 ]"],             
      ["munst1Pet5Visits",             "#[ #visit7 ]"],             
      ["munst1Pet6Visits",             "#[ ]"],             

      ["selections",                   "#[ #smith1, #adams1, #munst1 ]"],             
      ["types",                        "#[ 'Cat', 'Dog', 'Bird', 'Reptile', 'Amphibian' ]"],             
      
      ["specialty1",                   "#{ 'name': 'Cats' }"],
      ["specialty2",                   "#{ 'name': 'Dogs' }"],
      ["specialty3",                   "#{ 'name': 'Birds' }"],
      ["specialty4",                   "#{ 'name': 'Amphibians' }"],
      ["specialty5",                   "#{ 'name': 'Reptiles' }"],
      ["sList1",                       "#[ #specialty1, #specialty2, #specialty3 ]"],             
      ["sList2",                       "#[ #specialty4, #specialty5 ]"],             
      ["sList3",                       "#[ #specialty1, #specialty5, #specialty3, #specialty2 ]"],             
      
      ["vet1",                         "#{ 'firstName': 'John', 'lastName': 'Jones', 'specialties': #sList1 }"],
      ["vet2",                         "#{ 'firstName': 'James', 'lastName': 'Herriot', 'nrOfSpecialties': 0 }"],
      ["vet3",                         "#{ 'firstName': 'Alan', 'lastName': 'Turner', 'specialties': #sList2 }"],
      ["vet4",                         "#{ 'firstName': 'Sylvester', 'lastName': 'Frogget', 'specialties': #sList3 }"],
      ["vList",                        "#[ #vet1, #vet2, #vet3, #vet4 ]"],             
      ["vets",                         "#{ 'vetList': #vList }"]

];
