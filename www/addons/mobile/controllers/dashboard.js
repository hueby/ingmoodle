angular.module('mm.addons.mobile')

    .controller('mmaMobileConsultantOverviewCtrl', function($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents, mmaChecklistsCustomersRefreshed, mmaChecklistsCustomersAdded) {
      $scope.canSwipe = true;

      $scope.customers = [];

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        "scope": $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.consultantDetail = function() {
        $state.go("site.mmaConsultant");
      };

      $scope.refreshCustomers = function() {
        $mmEvents.trigger(mmaChecklistsCustomersRefreshed);
      };

      $mmaChecklists.getCustomers().then(function(customers) {
        $scope.customers = customers;
      });

      $mmEvents.on(mmaChecklistsCustomersRefreshed, function() {
        $mmaChecklists.getCustomers().then(function(customers) {
          $scope.customers = customers;
          $scope.$broadcast('scroll.refreshComplete');
        });
      });
    });