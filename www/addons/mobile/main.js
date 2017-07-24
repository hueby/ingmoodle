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

angular.module('mm.addons.mobile', [])

  .constant('mmaMobilePriority', 600)
  .constant('mmaMobileCustomersRefreshed', 'user refreshed')
  .constant('mmaMobileCustomersAdded', 'user added')

  .config(function($stateProvider, $mmSideMenuDelegateProvider, mmaMobilePriority) {
    $stateProvider
      .state('site.mobile', {
        url: '/mobile',
        views: {
          site: {
            templateUrl: 'addons/mobile/templates/login.html',
            controller: 'mmaMobileLoginCtrl'
          }
        }
      })
      .state('site.consultant_dashboard', {
        url: '/consultant_dashboard',
        params: {
          consultant: null
        },
        views: {
          site: {
            templateUrl: 'addons/mobile/templates/dashboard.html',
            controller: 'mmaMobileConsultantOverviewCtrl'
          }
        }
      })
      .state('site.mmaConsultant', {
        url: '/consultant_detail',
        params: {
          consultant: null
        },
        views: {
          site: {
            templateUrl: 'addons/mobile/templates/detail.html',
            controller: 'mmaMobileConsultantDetailCtrl'
          }
        }
      });

    $mmSideMenuDelegateProvider.registerNavHandler('mmaMobile', '$mmaMobileHandlers.sideNav', mmaMobilePriority);

  });
