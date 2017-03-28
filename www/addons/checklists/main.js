// (C) Copyright 2017 Dennis Huebner
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

    .constant('mmaChecklistsPreferencesPriority', 600)

.config(function($stateProvider,
    $mmUserDelegateProvider,
    $mmSideMenuDelegateProvider,
    $mmSettingsDelegateProvider, mmaChecklistsPreferencesPriority) {

    $stateProvider

    .state('site.checklists', {
        url: '/checklists',
        views: {
            'site': {
                templateUrl: 'addons/checklists/templates/index.html'
            }
        }
    })

    .state('site.checklists-users', {
        url: '/checklists-users',
        views: {
            'site': {
                templateUrl: 'addons/checklists/templates/users.html',
                controller: 'mmaChecklistsUsersCtrl'
            }
        }
     })

     .state('site.checklists-preferences', {
        url: '/checklists-preferences',
        views: {
            'site': {
                controller: 'mmaChecklistsPreferencesCtrl',
                templateUrl: 'addons/checklists/templates/preferences.html'
            }
        }
     });

    // Register side menu addon.
    // $mmSideMenuDelegateProvider.registerNavHandler('mmaChecklists', '$mmaChecklistsHandlers.sideMenuNav', 600);

    // Register user profile addons.
    // Do I need this?
    // $mmUserDelegateProvider.registerProfileHandler('mmaMessages:sendMessage', '$mmaMessagesHandlers.sendMessage', mmaMessagesSendMessagePriority);
    // $mmUserDelegateProvider.registerProfileHandler('mmaMessages:addContact', '$mmaMessagesHandlers.addContact', mmaMessagesAddContactPriority);
    // $mmUserDelegateProvider.registerProfileHandler('mmaMessages:blockContact', '$mmaMessagesHandlers.blockContact', mmaMessagesBlockContactPriority);

    // Register content links handler.
    // $mmContentLinksDelegateProvider.registerLinkHandler('mmaMessages', '$mmaMessagesHandlers.linksHandler');

    // Register settings handler.
    $mmSettingsDelegateProvider.registerHandler('mmaChecklists:preferences',
            '$mmaChecklistsHandlers.preferences', mmaChecklistsPreferencesPriority);
})

.run(function($mmaChecklists, $mmEvents, $state, $mmAddonManager, $mmUtil, mmCoreEventLogin, $mmCronDelegate) {
    //
    // // Invalidate messaging enabled WS calls.
    // $mmEvents.on(mmCoreEventLogin, function() {
    //     $mmaMessages.invalidateEnabledCache();
    // });
    //
    // // Register push notification clicks.
    // var $mmPushNotificationsDelegate = $mmAddonManager.get('$mmPushNotificationsDelegate');
    // if ($mmPushNotificationsDelegate) {
    //     $mmPushNotificationsDelegate.registerHandler('mmaMessages', function(notification) {
    //         if ($mmUtil.isFalseOrZero(notification.notif)) {
    //             $mmaMessages.isMessagingEnabledForSite(notification.site).then(function() {
    //                 $mmaMessages.invalidateDiscussionsCache().finally(function() {
    //                     $state.go('redirect', {siteid: notification.site, state: 'site.messages'});
    //                 });
    //             });
    //             return true;
    //         }
    //     });
    // }
    //
    // // Register sync process.
    // $mmCronDelegate.register('mmaMessages', '$mmaMessagesHandlers.syncHandler');
    //
    // // Sync some discussions when device goes online.
    // $mmEvents.on(mmCoreEventOnlineStatusChanged, function(online) {
    //     if (online) {
    //         $mmaMessagesSync.syncAllDiscussions(undefined, true);
    //     }
    // });
});
