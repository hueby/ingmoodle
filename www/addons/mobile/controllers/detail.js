angular.module('mm.addons.mobile').controller('mmaMobileConsultantDetailCtrl', function ($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents, $mmaMobile, $log) {

    $scope.consultant = $stateParams.consultant;

    $mmaMobile.getAllWorkprocesses($scope.consultant.id).then(function(wps) {
        $scope.wps = wps;
    }).catch(function(error) {
        $log.error(error); 
    });

    $scope.customerSelected = function(course, moduleName, module, review) {
        switch(moduleName) {
            case "quiz": {
                var asd = { courseid: course, quizid: module, attemptid: review};
                $log.debug("ASD " + JSON.stringify(asd));
                $state.go("site.mod_quiz-review", asd);
            }
                break;
            default: {
                $log.debug("Modul nicht unterstützt"); 
            }
                break;

        }
    }

});
//# sourceMappingURL=detail.js.map
