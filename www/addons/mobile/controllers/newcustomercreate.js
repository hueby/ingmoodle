angular.module('mm.addons.mobile').controller('mmaMobileNewCustomerCreate', function($scope, $log, $mmSite, $mmaMobile, $ionicHistory, $stateParams) {

    var user = $stateParams.user;

    if(user) {
        // user exists, so just update
        console.log(JSON.stringify(user));
        $scope.user = user;
        $scope.showCreate = true;
        $scope.showUpdate = false;
    } else {
        $scope.showCreate = false;
        $scope.showUpdate = true;
    }

    $scope.createCustomer = function(user) {
        $mmaMobile.createNewMoodleUser(user).then(function(result) {
            if(result.id && result.id > 0) {
                console.log("User created: " + JSON.stringify(result));
                $ionicHistory.goBack();
            } else {
                console.error(JSON.stringify(result));
            }
        });
    };

    $scope.updateCustomer = function(user) {
        $mmaMobile.updateCustomer(user).then(function(result) {
            if(result.id && result.id > 0) {
                console.log("User updated: " + JSON.stringify(result));
                $ionicHistory.goBack();
            } else {
                console.error(JSON.stringify(result));
            }
        });
    }

    $scope.deleteCustomer = function(user) {
        $mmaMobile.deleteCustomer(user).then(function(result) {
            $ionicHistory.goBack();
        }).catch(function(error) {
            $log.error(JSON.stringify(error)); 
        });
        
    }
});
