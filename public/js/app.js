var app = angular.module('puppyLove', [
  'ngRoute',
  'OwnerService',
  'MainController',
  'LeftController',
  'AddOwnerController',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ngMdIcons',
  'MainController',
  'MessagesController',
  'login',
  'signup'
  ])

app.config(['$routeProvider', '$locationProvider' ,function($routeProvider, $locationProvider) {
  $routeProvider

    // home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/add', {
      templateUrl: 'views/addOwner.html',
      controller: 'AddOwner',
      resolve: {
        user: ['Auth', 'Owner', function(Auth, Owner) {
          return Owner.getAllDogs(Auth.currentUser());
        }]
      }
    })
    .when('/owners', {
      templateUrl: 'views/owners.html',
      controller: 'OwnerController'
    })
    .when('/dogs', {
       templateUrl: 'views/dogs.html',
        controller: 'DogController'
    })
     .when('/about', {
       templateUrl: 'views/about.html'
    })
     .when('/chat', {
       templateUrl: 'views/chat.html'
           })
     .when('/login', {
       templateUrl: 'views/signin.html',
       controller: 'LoginCtrl'
    })
     .when('/signup', {
       templateUrl: 'views/signup.html',
       controller: 'SignupCtrl'
    })
     .when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'MsgCtrl'
     })
    .otherwise({
     redirectTo: '/'
    })

}])
.run(function($rootScope, $location, Auth){
  $rootScope.logOut = function(){
    Auth.logOut();
  }
});