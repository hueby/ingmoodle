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

angular.module('mm.addons.checklists', [])

  .constant('mmaChecklistsPriority', 600)
  .constant('mmaChecklistsCustomersRefreshed', 'user refreshed')
  .constant('mmaChecklistsCustomersAdded', 'user added')

  .config(function($stateProvider, $mmSideMenuDelegateProvider, mmaChecklistsPriority) {
    $stateProvider
      .state('site.checklists', {
        url: '/checklists',
        views: {
          site: {
            templateUrl: 'addons/checklists/templates/customers.html',
            controller: 'mmaChecklistsCustomersCtrl'
          }
        }
      })
      .state('site.checklist_begin', {
        url: '/checklist_begin',
        params: {
          customer: null
        },
        views: {
          site: {
            templateUrl: 'addons/checklists/templates/checklist_begin.html',
            controller: 'mmaChecklistsChecklistBeginCtrl'
          }
        }
      });

    $mmSideMenuDelegateProvider.registerNavHandler('mmaChecklists', '$mmaChecklistsHandlers.sideNav', mmaChecklistsPriority);

  });