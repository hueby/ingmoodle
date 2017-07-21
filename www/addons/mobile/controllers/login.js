angular.module('mm.addons.mobile')

    .controller('mmaMobileLoginCtrl', function($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaMobile, $ionicModal, $mmSite, $mmEvents) {
        $scope.canSwipe = true;
        $scope.doorimg = 'img/hodor.jpg';

        $scope.login = function() {
            $state.go("site.mm_courses");
        }
    });
