angular.module('mm.addons.checklists')

.controller('mmaChecklistsCustomersCtrl', function($scope, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents, mmaChecklistsCustomersRefreshed, $ionicHistory) {
    $scope.canSwipe = true;

    $scope.customers = [];

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.createCustomer = function(newuser) {
        var newUser = {
            firstname: newuser.firstName,
            lastname: newuser.lastName,
            email: newuser.email,
            phonenumber: newuser.phone,
            location: newuser.location,
            username: 'test'
        }
        $mmSite.write('local_checklists_insert_customer', newUser).then(function(id) {
            $scope.modal.hide();
            newUser.id = id.id;
            console.log(JSON.stringify($scope.customers));
            $scope.customers.push(newUser);
            console.log(JSON.stringify($scope.customers));
        });
    };

    $scope.refreshCustomers = function() {
        $scope.$broadcast('scroll.refreshComplete');
        $mmaChecklists.getCustomers().then(function(customers) {
            console.log(JSON.stringify($scope.customers));
            $scope.customers = customers;
            console.log(JSON.stringify($scope.customers));
        });
    };

    $mmaChecklists.getCustomers().then(function(customers) {
        $scope.customers = customers
    });
    $scope.bums = "1 * (3 + 3) * 7 = 42"
});