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

angular.module('mm.core.courses')

/**
 * Controller to handle the courses list.
 *
 * @module mm.core.courses
 * @ngdoc controller
 * @name mmCoursesListCtrl
 */
.controller('mmCoursesListStaySmartCtrl', function ($scope, $mmCourses, $stateParams, $mmCoursesDelegate, $mmUtil, $mmEvents, $mmSite, $q, mmCoursesEventMyCoursesUpdated, mmCoreEventSiteUpdated, $log) {

    var updateSiteObserver, myCoursesObserver;

    $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
    $scope.filter = {};

    // Convenience function to fetch courses.
    function fetchCourses(refresh) {
        return $mmCourses.getUserCourses().then(function (courses) {
            $scope.filter.filterText = ''; // Filter value MUST be set after courses are shown.

            var coursess = courses.filter(function(course) {
                // filter out visible = 0
                if(course.visible === 0 && course.format === "singleactivity") {
                    return course;
                } 
            });

            var courseIds = coursess.map(function (course) {
                return course.id;
            });

            return $mmCourses.getCoursesOptions(courseIds).then(function (options) {
                angular.forEach(coursess, function (course) {
                    course.progress = isNaN(parseInt(course.progress, 10)) ? false : parseInt(course.progress, 10);
                    course.navOptions = options.navOptions[course.id];
                    course.admOptions = options.admOptions[course.id];
                });
                $scope.courses = coursess;
                $mmCourses.getModuleId(courseIds.join()).then(function(result) {
                    var courss = [];
                    angular.forEach(result, function(co) {
                        angular.forEach($scope.courses, function(cou) {
                            if(cou.id === co.id) {
                                cou.cmid = co.cmid;
                                cou.consultant = $mmSite.getUserId();
                                cou.customer = $stateParams.customer;
                                courss.push(cou);
                            }
                        });
                    });
                    $scope.courses = courss;
                });
            });

        }, function (error) {
            $mmUtil.showErrorModalDefault(error, 'mm.courses.errorloadcourses', true);
        });
    }

    fetchCourses().finally(function () {
        $scope.coursesLoaded = true;
    });

    $scope.refreshCourses = function () {
        var promises = [];

        promises.push($mmCourses.invalidateUserCourses());
        promises.push($mmCoursesDelegate.clearAndInvalidateCoursesOptions());

        $q.all(promises).finally(function () {

            fetchCourses(true).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };

    myCoursesObserver = $mmEvents.on(mmCoursesEventMyCoursesUpdated, function (siteid) {
        if (siteid == $mmSite.getId()) {
            fetchCourses();
        }
    });

    updateSiteObserver = $mmEvents.on(mmCoreEventSiteUpdated, function (siteId) {
        if ($mmSite.getId() === siteId) {
            $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
        }
    });

    $scope.$on('$destroy', function () {
        myCoursesObserver && myCoursesObserver.off && myCoursesObserver.off();
        updateSiteObserver && updateSiteObserver.off && updateSiteObserver.off();
    });
});
//# sourceMappingURL=list.js.map
