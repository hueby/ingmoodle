angular.module('mm.addons.mobile').controller('mmaMobileNewCustomerCreate', function($scope, $log/*, $mmSite, $mmaMobile*/) {
  $scope.$on("$ionicView.enter", function() {
    $log.debug("drinne in CREATE");
  });

  $scope.createCustomer = function(user) {
    $log.warn(JSON.stringify(user));
  };
});
