//declare your new module
angular.module('AddOwnerController', ['OwnerService'])
//add and label the controller
.controller('AddOwner',['$scope', '$http', 'Owner', 'Auth','user', function($scope, $http, Owner, Auth, user) {

  // empty object will contain user data
  $scope.owner = {};
  $scope.dog = {};
  $scope.owner.ID = Auth.currentUser();
  $scope.allDogs = user;
  $scope.addADoggie = false;

  console.log( $scope.allDogs);

  $scope.showDogForm = function(){
    $scope.addADoggie = true;
  }


// Edit user profile 
  $scope.editUser = function(){    
    Owner.updateOwner($scope.owner.ID, $scope.owner)
      .success(function(data){
        console.log('Your profile has been updated.', data)
      })
    // clear all inputs below
  };

// Add a new dog
  $scope.addDog = function(){
    if($scope.dog.name === '') { return; }

    Owner.addDog($scope.owner.ID, $scope.dog)
      .success(function(data){
        console.log(data)
      })
   // Clear inputs below 
    $scope.addADoggie = false;
  };


}]);