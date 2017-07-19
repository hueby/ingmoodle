angular.module('mm.addons.checklists')

    .controller('mmaChecklistsChecklistBeginCtrl', function($scope, $stateParams) {
        var customer = $stateParams.customer;
        $scope.customer = customer;

        $scope.doIdentification = function() {
            
        }

        $scope.doProblemSolving = function() {
            
        }
    });