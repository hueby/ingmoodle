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

angular.module('mm.addons.checklists')

/**
 * Messages handlers factory.
 *
 * This factory holds the different handlers used for delegates.
 *
 * @module mm.addons.messages
 * @ngdoc service
 * @name $mmaMessagesHandlers
 */
.factory('$mmaChecklistsHandlers', function($log, $mmaMessages) {

    var self = {};


    /**
     * Block contact handler.
     *
     * @module mm.addons.messages
     * @ngdoc method
     * @name $mmaMessagesHandlers#blockContact
     */

        self.getController = function(user, courseid) {

            /**
             * Block contact handler controller.
             *
             * @module mm.addons.messages
             * @ngdoc controller
             * @name $mmaMessagesHandlers#blockContact:controller
             */
            return function($scope, $rootScope) {
                var disabled = false;

                function updateTitle() {
                    return $mmaMessages.isBlocked(user.id).then(function(isBlocked) {
                        $scope.title = 'mma.messages.blockcontact';
                        $scope.class = 'mma-messages-blockcontact-handler';
                        $scope.icon = 'ion-close-circled';
                    }).catch(function() {
                        // This fails for some reason, let's just hide the button.
                        $scope.hidden = true;
                    });
                }

                $scope.title = '';
                $scope.spinner = false;
            };

            return self;
        };


    /**
     * Side menu nav handler.
     *
     * @module mm.addons.messages
     * @ngdoc method
     * @name $mmaMessagesHandlers#sideMenuNav
     */
    self.sideMenuNav = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
        self.isEnabled = function() {
            return true;
        };

        /**
         * Get the controller.
         *
         * @return {Object} Controller.
         */
        self.getController = function() {

            /**
             * Side menu nav handler controller.
             *
             * @module mm.addons.messages
             * @ngdoc controller
             * @name $mmaMessagesHandlers#sideMenuNav:controller
             */
            return function($scope) {
                $scope.icon = 'ion-chatbox';
                $scope.title = 'mma.messages.messages';
                $scope.state = 'site.messages';
                $scope.class = 'mma-messages-handler';
            };
        };

        return self;
    };

    /**
     * Content links handler.
     *
     * @module mm.addons.messages
     * @ngdoc method
     * @name $mmaMessagesHandlers#linksHandler
     */
    self.linksHandler = function() {

        var self = {};

        /**
         * Whether or not the handler is enabled for a certain site.
         *
         * @param  {String} siteId Site ID.
         * @return {Promise}       Promise resolved with true if enabled.
         */
        function isEnabledForSite(siteId) {
            return $mmaMessages.isPluginEnabled(siteId);
        }

        /**
         * Get actions to perform with the link.
         *
         * @param {String[]} siteIds Site IDs the URL belongs to.
         * @param {String} url       URL to treat.
         * @return {Object[]}        Promise resolved with the list of actions.
         *                           See {@link $mmContentLinksDelegate#registerLinkHandler}.
         */
        self.getActions = function(siteIds, url) {
            // Check it's a messages URL.
            if (typeof self.handles(url) != 'undefined') {
                // Pass false because all sites should have the same siteurl.
                return $mmContentLinksHelper.filterSupportedSites(siteIds, isEnabledForSite, false).then(function(ids) {
                    if (!ids.length) {
                        return [];
                    } else {
                        // Return actions.
                        var params = $mmUtil.extractUrlParams(url);
                        return [{
                            message: 'mm.core.view',
                            icon: 'ion-eye',
                            sites: ids,
                            action: function(siteId) {
                                var stateName,
                                    stateParams;

                                if (typeof params.user1 != 'undefined' && typeof params.user2 != 'undefined') {
                                    // Check if the current user is in the conversation.
                                    if ($mmSite.getUserId() == params.user1) {
                                        stateName = 'site.messages-discussion';
                                        stateParams = {userId: parseInt(params.user2, 10)};
                                    } else if ($mmSite.getUserId() == params.user2) {
                                        stateName = 'site.messages-discussion';
                                        stateParams = {userId: parseInt(params.user1, 10)};
                                    } else {
                                        // He isn't, open in browser.
                                        var modal = $mmUtil.showModalLoading();
                                        $mmSitesManager.getSite(siteId).then(function(site) {
                                            return site.openInBrowserWithAutoLogin(url);
                                        }).finally(function() {
                                            modal.dismiss();
                                        });
                                        return;
                                    }
                                } else if (typeof params.id != 'undefined') {
                                    stateName = 'site.messages-discussion';
                                    stateParams = {userId: parseInt(params.id, 10)};
                                }

                                if (!stateName) {
                                    // Go to messaging index page. We use redirect state to view the side menu.
                                    $state.go('redirect', {
                                        siteid: siteId,
                                        state: 'site.messages',
                                        params: {}
                                    });
                                } else {
                                    $mmContentLinksHelper.goInSite(stateName, stateParams, siteId);
                                }
                            }
                        }];
                    }
                });
            }
            return [];
        };

        /**
         * Check if the URL is handled by this handler. If so, returns the URL of the site.
         *
         * @param  {String} url URL to check.
         * @return {String}     Site URL. Undefined if the URL doesn't belong to this handler.
         */
        self.handles = function(url) {
            var position = url.indexOf('/message/index.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };

        return self;
    };

    /**
     * Synchronization handler.
     *
     * @module mm.addons.messages
     * @ngdoc method
     * @name $mmaMessagesHandlers#syncHandler
     */
    self.syncHandler = function() {
        //
        // var self = {};
        //
        // #<{(|*
        //  * Execute the process.
        //  * Receives the ID of the site affected, undefined for all sites.
        //  *
        //  * @param  {String} [siteId] ID of the site affected, undefined for all sites.
        //  * @return {Promise}         Promise resolved when done, rejected if failure.
        //  |)}>#
        // self.execute = function(siteId) {
        //     return $mmaMessagesSync.syncAllDiscussions(siteId);
        // };
        //
        // #<{(|*
        //  * Get the time between consecutive executions.
        //  *
        //  * @return {Number} Time between consecutive executions (in ms).
        //  |)}>#
        // self.getInterval = function() {
        //     return 300000; // 5 minutes.
        // };
        //
        // #<{(|*
        //  * Whether it's a synchronization process or not.
        //  *
        //  * @return {Boolean} True if is a sync process, false otherwise.
        //  |)}>#
        // self.isSync = function() {
        //     return true;
        // };
        //
        // #<{(|*
        //  * Whether the process uses network or not.
        //  *
        //  * @return {Boolean} True if uses network, false otherwise.
        //  |)}>#
        // self.usesNetwork = function() {
        //     return true;
        // };
        //
        // return self;
    };

    /**
     * Message preferences handler.
     *
     * @module mm.addons.messages
     * @ngdoc method
     * @name $mmaMessagesHandlers#preferences
     */
    self.preferences = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
        self.isEnabled = function() {
            return $mmaMessages.isMessagePreferencesEnabled();
        };

        /**
         * Get the controller.
         *
         * @return {Object} Controller.
         */
        self.getController = function() {
            return function($scope) {
                $scope.title = 'mma.messages.messagepreferences';
                $scope.class = 'mma-messages-messagepreferences-handler';
                $scope.state = 'site.messages-preferences';
            };
        };

        return self;
    };

    return self;
});
