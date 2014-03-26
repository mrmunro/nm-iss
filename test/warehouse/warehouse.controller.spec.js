

describe("Warehouse Controllers", function() {
   
   var scope;
   var route;
   
   var buildIndex = function(source, property) {
     var tempArray = [];
	 
	 for(var i=0, len=source.length; i<len; i++) {
	   tempArray[source[i][property]] = source[i];
	 }
	 return tempArray;
   };
   
   beforeEach(angular.mock.module('warehouse'));
   
   
   
   
   
   describe('Warehouse Controller: wHouseCtrl', function(){
     
	 beforeEach(angular.mock.inject(function($rootScope, $controller) {
	   scope = $rootScope.$new();
	   $controller('wHouseCtrl',{$scope:scope});
     }));
   
	 it('should have 5 materials in inventory',function() {
       expect(scope.inventory.length).toBe(5);
   });	
   
     it('should have material A with a quantity of 20', function() {
       var materials = buildIndex(scope.inventory,'materialNumber');
	 
	   expect(materials['A'].quantity).toBe(20);
	 
     });
   });
   
   
	
	
});


