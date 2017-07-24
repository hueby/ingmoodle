angular.module('mm.addons.mobile')

  .controller('mmaMobileConsultantDetailCtrl', function($scope, $ionicHistory, $state, $timeout, $stateParams, $mmaChecklists, $ionicModal, $mmSite, $mmEvents) {

    $scope.consultant = $stateParams.consultant;
    console.log(JSON.stringify($scope.consultant));
      console.log(JSON.stringify($stateParams.consultant));
  });