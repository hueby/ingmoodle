angular.module('mm.addons.mobile').controller('mmaMobileLoginCtrl', function ($scope, $log, $state, $timeout, $stateParams, $mmaMobile, $ionicModal, $mmSite, $mmEvents) {
  $scope.canSwipe = true;
  $scope.doorimg = 'img/hodor.jpg';

  $scope.login = function () {
    $mmaMobile.getEnergyConsultant($mmSite.getUserId()).then(function (consultant) {
      consultant = consultant[0];
      if (consultant.moodleid == $mmSite.getUserId()) {
        $state.go("site.consultant_dashboard", { consultant: consultant });
      } else {
      }
    }).catch(function(error) {
      $log.warn("Error: " + JSON.stringify(error));
    });

    //$state.go("site.mm_courses");
  };
});
//# sourceMappingURL=login.js.map
