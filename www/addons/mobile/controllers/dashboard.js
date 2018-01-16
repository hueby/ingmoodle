angular.module('mm.addons.mobile').controller('mmaMobileConsultantOverviewCtrl', function ($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaMobile, $log, $ionicModal, $mmSite, $mmEvents, mmaChecklistsCustomersRefreshed, mmaChecklistsCustomersAdded) {
  $log = $log.getInstance('$mmaMobile');

  $mmaMobile.getCustomers($mmSite.getUserId()).then(function (customers) {
    $log.debug("ASKDJALSD" + JSON.stringify(customers));
    $scope.customers = customers;
  }).catch(function(error) {
    $log.warn("Error: " + error);
  });

  $scope.$on( "$ionicView.beforeEnter", function() {
    $mmaMobile.clearCustomers($stateParams.consultant.id).then(function () {
      $log.debug("All customers set to 0");
      $mmaMobile.getCustomers($mmSite.getUserId()).then(function(cus) {
        $scope.customers = cus;
      });
    }).catch(function (error) {
      $log.debug("zeroing failed " + JSON.stringify(error));
    });
  });

  $scope.consultantAdd = function() {
    // method to add an in moodle existing user
    // or create a new moodle user and add him to the customer state
    $state.go("site.mmaNewCustomerOverview");
  };

  $scope.consultantDetail = function () {
    $state.go("site.mmaConsultant", { consultant: $stateParams.consultant });
  };

  $scope.refreshCustomers = function () {
    $mmEvents.trigger(mmaChecklistsCustomersRefreshed);
  };

  $scope.customerSelected = function(customerId) {

    // tell the moodle server that
    // this energy consultant is working with customerId

    $mmaMobile.activeCustomer($stateParams.consultant.id, customerId).then(function() {
      // on this point, load an extended version of mm_courses 
      $state.go("site.mm_courses_staysmart");
    }).catch(function(error){
      $log.debug("FÄHL " + error);
    });
  };

    $scope.longpress = function(user) {
        $state.go("site.mmaNewCustomerCreate", {user: user});
    }

  // $mmEvents.on(mmaChecklistsCustomersRefreshed, function () {
  //   $mmaChecklists.getCustomers().then(function (customers) {
  //     $scope.customers = customers;
  //     $scope.$broadcast('scroll.refreshComplete');
  //   });
  // });
});
