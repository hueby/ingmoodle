angular.module('mm.addons.checklists')

    .controller('mmaChecklistsCustomersCtrl', function($scope, $timeout, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents, mmaChecklistsCustomersRefreshed) {
      $scope.canSwipe = true;

      $scope.customers = [];

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        "scope": $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.createCustomer = function(newuser) {
        var newUser = {
          "firstname": newuser.firstName,
          "lastname": newuser.lastName,
          "email": newuser.email,
          "phonenumber": newuser.phone,
          "location": newuser.location,
          "username": 'test'
        };
        $mmSite.write('local_checklists_insert_customer', newUser).then(function(id) {
          $scope.modal.hide();
          newUser.id = id.id;
          console.log(JSON.stringify($scope.customers));
          $scope.customers.push(newUser);
          console.log(JSON.stringify($scope.customers));
          $scope.refreshCustomers();
        });
      };

      $scope.refreshCustomers = function() {
        $mmEvents.trigger(mmaChecklistsCustomersRefreshed);
      };

      $mmaChecklists.getCustomers().then(function(customers) {
        $scope.customers = customers;
      });
      $scope.bums = "1 * (3 + 3) * 7 = 42";
      $mmEvents.on(mmaChecklistsCustomersRefreshed, function() {
        $mmaChecklists.getCustomers().then(function(customers) {
          $scope.customers = customers;
          $scope.$broadcast('scroll.refreshComplete');
        });
      });
    });