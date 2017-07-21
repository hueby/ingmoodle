
angular.module('mm.addons.mobile')

  .config(function($mmSitesFactoryProvider) {

  })

  .factory('$mmaMobile', function($log, $mmSite) {
    $log = $log.getInstance('$mmaMobile');
    var self = {}

    self.getCustomers = function() {
      $log.debug('Get energy_consultants');

      return $mmSite.read('local_mobile_get_energy_consultant', null,
        {getFromCache: 0, saveToCache:0});
    }

    return self;
  });
