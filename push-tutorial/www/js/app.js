// Ionic Starter App
// Google Project ID: push-tutorial-994

// Google Project Number: 210937346885

// Google API key AIzaSyACagpXQTtmR6xbF2Xjw-9eXHBd-3eUjvs

// Secret Key 127e1c8ddaefe6a67131ad6abe1709d3f333727fe95b13a4

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



angular.module('starter',
    [
        'ionic',
        'ngCordova',
        'ionic.service.core',
        'ionic.service.push',
        'starter.controllers',
        'starter.services'
    ])

    .config(['$ionicAppProvider', function($ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: '42d625e8',
            // The public API key all services will use for this app
            api_key: 'e2c7e7a493a73d807504e273344b41f18ac27dc73dd11fb0',
            // Set the app to use development pushes

            // The GCM project number
            gcm_id: '210937346885',

            dev_push: true
        });
    }])

    .controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {


        // Handles incoming device tokens
        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            alert("Successfully registered token " + data.token);
            console.log('Ionic Push: Got token ', data.token, data.platform);
            $scope.token = data.token;
        });


        // Identifies a user with the Ionic User service
        $scope.identifyUser = function() {
            console.log('Ionic User: Identifying with Ionic User service');

            var user = $ionicUser.get();
            if(!user.user_id) {
                // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID();
            };

            // Add some metadata to your user object.
            angular.extend(user, {
                name: 'Ionitron',
                bio: 'I come from planet Ion'
            });

            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function(){
                $scope.identified = true;
                alert('Identified user ' + user.name + '\n ID ' + user.user_id);
            });
        };

// Registers a device for push notifications and stores its token
        $scope.pushRegister = function() {
            console.log('Ionic Push: Registering user');

            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function(notification) {
                    // Handle new push notifications here
                    // console.log(notification);
                    return true;
                }
            });
        };
    })





.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});


