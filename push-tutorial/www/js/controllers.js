angular.module('starter.controllers', [])



.controller('DashCtrl', function($http, $scope, $rootScope, $ionicUser, $ionicPush, $ionicApp) {

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





        // Put your private API key here to be able to send push notifications from within the app.
        // TODO: Add your private API key here if you want to push from your device.
        $scope.privateKey = '127e1c8ddaefe6a67131ad6abe1709d3f333727fe95b13a4';



        /**
         * Registers the currently identified Ionic User for push notifications on the current device. This should either pass
         * a user object to identify or be called after $ionicUser.identify()
         * (read the docs at http://docs.ionic.io/push/installation/).
         **/
        $scope.pushRegister = function() {
            console.log('Ionic Push: Registering user');

            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Should new pushes show an alert on your screen?
                canSetBadge: true, //Should new pushes be allowed to update app icon badges?
                canPlaySound: true, //Should notifications be allowed to play a sound?
                canRunActionsOnWake: true, // Whether to run auto actions outside the app,
                onNotification: function(notification) {
                    // Handle new push notifications here
                    // console.log(notification);
                    return true;
                }
            }).then(function(deviceToken) {
                //Save the device token, if necessary

                $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                    console.log('Got token', data.token, data.platform);
                    // Do something with the token
                });

            });
        };

        /**
         * If you've added your Private API Key, you can send a push notification directly fro the current device.  Since the
         * app iwll be open when this happens, you probably will not see the notification handled by the OS, but it should
         * still be handled by whatever function you define.
         **/
        $scope.sendPush = function() {
            if ($scope.privateKey) {
                alert('A notification will be sent to you 5 seconds after you close this alert.  They can take a few minutes to arrive.');
                var appId = $ionicApp.getApp().app_id;
                var auth = btoa($scope.privateKey + ':'); // Base64 encode your key
                var req = {
                    method: 'POST',
                    url: $ionicApp.getValue('push_api_server') + '/api/v1/push',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Ionic-Application-Id': appId,
                        'Authorization': 'basic ' + auth
                    },
                    data: {
                        "tokens": [$scope.token],
                        "notification": {
                            "alert":"Hello World!"
                        }
                    }
                };

                setTimeout(function(){
                    $http(req).success(function(resp){
                        console.log("Ionic Push: Push success!");
                    }).error(function(error){
                        console.log("Ionic Push: Push error...");
                    });
                }, 5000);
            } else {
                alert('Uh-oh!  To use this function, add your Private API Key to line 36 of controllers.js');
            }
        };
    })



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
