angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        $scope.signUpData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/signup.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalSignUp = modal;
        });


        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };
        $scope.signUp = function () {
            $scope.modalSignUp.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            BaasBox.login($scope.loginData.username, $scope.loginData.password)
                .done(function (user) {
                    console.log("Logged in", user);
                    $scope.username=user.username;
                    alert(" ***  Welcome  " + $scope.loginData.username + " *** ");
                })
                .fail(function (err) {
                    console.log("error ", err);
                });


            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.doSignUp = function () {
            console.log('Doing SignUp', $scope.signUpData);

            BaasBox.signup($scope.signUpData.username, $scope.signUpData.password, {"visibleByTheUser": {"email": $scope.signUpData.email}})
                .done(function (res) {
                    console.log("signup ", res);
                })
                .fail(function (error) {
                    $scope.signUpData
                    console.log("error ", error);
                });

            $timeout(function () {
                $scope.closeModal();
            }, 1000);
        };

        $scope.logout = function () {
            if (confirm("Sicuro di voler uscire " + $scope.loginData.username + " ?")) {
                $scope.doLogout();
                alert(" *** See You Later ..  *** "  );
            }
        };

        $scope.doLogout = function () {
            console.log('Doing logout', $scope.loginData);
            BaasBox.logout()
                .done(function (res) {
                    console.log(res);

                })
                .fail(function (error) {
                    console.log("error ", error);
                    $scope.username = null;
                })
        };


    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
