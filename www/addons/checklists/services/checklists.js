
angular.module('mm.addons.checklists')

.config(function($mmSitesFactoryProvider) {

})

.factory('$mmaChecklists', function($log) {
    $log = $log.getInstance('$mmaChecklists');
    var self = {}
    return self;
});