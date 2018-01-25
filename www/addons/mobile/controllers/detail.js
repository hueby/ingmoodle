angular.module('mm.addons.mobile').controller('mmaMobileConsultantDetailCtrl', function ($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents, $mmaMobile, $log) {

    $scope.consultant = $stateParams.consultant;

    $mmaMobile.getAllWorkprocesses($scope.consultant.id).then(function(wps) {
        $scope.wps = wps;
    }).catch(function(error) {
        $log.error(error); 
    });

    $scope.customerSelected = function() {
        $state.go("site.mod_quiz-review", { courseid: 10, quizid: 5, attemptid: 4});
    }

});
//# sourceMappingURL=detail.js.map
