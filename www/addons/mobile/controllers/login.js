angular.module('mm.addons.mobile')

  .controller('mmaMobileLoginCtrl', function($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaMobile, $ionicModal, $mmSite, $mmEvents) {
    $scope.canSwipe = true;
    $scope.doorimg = 'img/hodor.jpg';

    $scope.login = function() {

      $mmaMobile.getEnergyConsultant($mmSite.getUserId()).then(function(consultant) {
        console.log("Consultant" + JSON.stringify(consultant));
        console.log("MOODLE ID " + consultant[0].moodleid);

        if(consultant[0].moodleid === "3") {
          $state.go("site.consultant_dashboard");
        }
      });

      //$state.go("site.mm_courses");
    }
  });
