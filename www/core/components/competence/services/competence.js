angular.module('mm.core.competence')

.factory('$mmCompetence', function($mmSitesManager, $mmSite) {

    var self = {};

    self.getTestFunction = function() {
        var params = {
            userid: $mmSite.getUserId()
        }; 
        return $mmSitesManager.getSite($mmSite.getId()).then(function(site) {
            return site.read('mod_competence_get_competence', params).then(function(data) {
                return data;
            }).catch(function(err) {
                console.log("ERROR " + err);
            });
        });
    }

    return self;
});