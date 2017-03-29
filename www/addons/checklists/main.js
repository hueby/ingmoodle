angular.module('mm.addons.checklists', [])

.config(function($stateProvider) {
  $stateProvider
  .state('site.checklists-customers', {
      url: '/checklists-customers',
      views: {
          site: {
              templateUrl: 'addons/checklists/templates/customers.html',
              controller: 'mmaChecklistsCustomersCtrl'
          }
      }
  });
})

.run(function($mmUserDelegate, $mmaNotesHandlers, $mmSideMenuDelegate, $mmaChecklists) {
    $mmSideMenuDelegate.registerPlugin('mmaChecklists', function() {
        if($mmaChecklists.isPluginViewChecklistsEnabled()) {
            return {
                icon: 'ion-ios-list',
                state: 'site.checklists-customers',
                title: 'Tester'
            }
        }
    });
});