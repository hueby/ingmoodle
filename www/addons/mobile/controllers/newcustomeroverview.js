angular.module('mm.addons.mobile').controller('mmaMobileNewCustomerOverview', function($scope, $ionicHistory, $log, $mmSite, $mmaMobile, $state) {
  $mmaMobile.getAvailableUsers().then(function(res) {
    $scope.customers = res;
  });

  $scope.newCustomerClicked = function(customerid) {
    $mmaMobile.createNewCustomer(customerid).then(function() {
      $ionicHistory.goBack();
    }).catch(function(error) {
      $log.error(error);
    });
  };

  $scope.createCustomer = function() {
    $state.go('site.mmaNewCustomerCreate');

  };
});
