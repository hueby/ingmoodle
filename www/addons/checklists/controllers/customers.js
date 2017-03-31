angular.module('mm.addons.checklists')

.controller('mmaChecklistsCustomersCtrl', function($scope, $stateParams, $mmaChecklists) {
    $scope.canSwipe = true;

    $mmaChecklists.getCustomers().then(function(customers) {
        $scope.customers = customers
    });
    $scope.bums = "1 * (3 + 3) * 7 = 42"
});