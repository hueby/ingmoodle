angular.module('mm.addons.mobile')

  .controller('mmaMobileLoginCtrl', function($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaMobile, $ionicModal, $mmSite, $mmEvents) {
    $scope.canSwipe = true;
    $scope.doorimg = 'img/hodor.jpg';

    $scope.login = function() {

      $mmaMobile.getEnergyConsultant($mmSite.getUserId()).then(function(consultant) {
          consultant = consultant[0];
        if(consultant.moodleid == $mmSite.getUserId()) {
          $state.go("site.consultant_dashboard", {consultant: consultant});
        }
      });

      //$state.go("site.mm_courses");
    };
  });
