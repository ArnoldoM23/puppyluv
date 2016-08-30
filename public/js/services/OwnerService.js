angular.module('OwnerService', [])

.factory('Owner', ['$http', '$routeParams', function($http, $routeParams) {

  return {
    // call to get all owners
    get : function() {
      return $http.get('/api/owners');
    },

    // call to create the owner
    create : function(ownerData) {
      return $http.post('/api/owners', ownerData);
    },
    // call to update an owner
    updateOwner: function(id, ownerData){
      return $http.put('/api/owners/'+ id, ownerData);
    },
    // call to DELETE a owner
    delete : function(id) {
      return $http.delete('/api/owners/' + id);
    },
    getAllDogs: function(id){
      return $http.get('/api/owners/'+ id + '/dog').then(function(res){
        return res.data;
      })
    },
    addDog: function(id, dog){
      return $http.post('/api/owners/'+ id , dog)
    },
    getOwner: function(id){
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    }
  }       

}])
// auth factory
.factory('Auth', ['$http', '$window', '$location' , function($http, $window, $location){
  var auth = {};
  auth.saveToken = function (token){
    $window.localStorage['puppyluv-token'] = token;
  };
  auth.getToken = function (){
    return $window.localStorage['puppyluv-token'];
  }
  auth.isLoggedIn = function(){
    var token = auth.getToken();
    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.id;
    }
  };
  auth.register = function(user){
    console.log('in the factory', user)
    return $http.post('/api/signup', user).success(function(data){
      auth.saveToken(data.token);
    });
  };
  auth.logIn = function(user){
    return $http.post('/api/login', user).success(function(data){
      auth.saveToken(data.token);
      $location.path('/home')
    });
  };
  auth.logOut = function(){
    $window.localStorage.removeItem('puppyluv-token');
  };
  return auth;
}])