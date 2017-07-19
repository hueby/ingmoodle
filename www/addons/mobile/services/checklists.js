
angular.module('mm.addons.checklists')

  .config(function($mmSitesFactoryProvider) {

  })

  .factory('$mmaChecklists', function($log, $mmSite) {
    $log = $log.getInstance('$mmaChecklists');
    var self = {}

    self.getCustomers = function() {
      $log.debug('Get customers');

      return $mmSite.read('local_checklists_get_customers', null,
        {getFromCache: 0, saveToCache:0});
    }

    return self;
  });
