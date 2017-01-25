angular.module('mm.core.competence', ['mm.core.courses'])

.constant('mmCoreCoursePriority', 800)
.constant('mmCoreCourseAllSectionsId', -1)

.config(function($stateProvider, $mmCoursesDelegateProvider, mmCoreCoursePriority) {

  $stateProvider

  .state('site.mm_competence', {
        url: '/mm_competence',
        params: {
            courseid: null,
            coursefullname: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/competence/templates/competence.html',
                controller: 'mmCompetenceCtrl'
            }
        }
    });
})
.run(function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, $mmCourseDelegate, mmCoreEventRemoteAddonsLoaded) {
    $mmEvents.on(mmCoreEventLogin, $mmCourseDelegate.updateContentHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCourseDelegate.updateContentHandlers);
    $mmEvents.on(mmCoreEventRemoteAddonsLoaded, $mmCourseDelegate.updateContentHandlers);
});
