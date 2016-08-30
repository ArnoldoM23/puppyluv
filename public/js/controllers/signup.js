angular.module('signup',['OwnerService'])
.controller('SignupCtrl',['$scope', '$http', '$location', '$window', 'Auth', function($scope, $http, $location, $window, Auth){
    
  $scope.signup = function(username, password){
    $scope.user = {
      username: username,
      password: password
    };
    console.log('testing for user in signup', $scope.user)
    Auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $location.path('/add');
    });

    $scope.username = '';
    $scope.password = '';
  };
}])