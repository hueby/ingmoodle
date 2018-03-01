// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mobile').factory('$mmaMobileHandlers', function ($mmSite) {
    var self = {};

    self.sideNav = function () {
        var self = {};
        self.isEnabled = function () {
          return self.isEC();
        };

        self.isEC = function() {
          return $mmSite.read('local_mobile_get_energy_consultant', { userid: $mmSite.getUserId() }, { getFromCache: 0, saveToCache: 0 })
            .then(function(res) {
              if(res) return $mmSite.wsAvailable('local_mobile_get_energy_consultant');
              else return false;
            }).catch(function() {
              return false;
            });
        };

        self.getController = function () {
          return function ($scope) {
                $scope.icon = 'ion-briefcase';
                $scope.title = 'Energieberater';
                $scope.state = 'site.consultant_dashboard';
                $scope.class = 'mma-mobile-handler';
            };
        };
      return self;
    };
    return self;
});
//# sourceMappingURL=handlers.js.map
//
//
// 
//     .then(function(res) {

//       if(res.length != 0) {
//       }
//     });
