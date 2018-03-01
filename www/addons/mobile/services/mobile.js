
angular.module('mm.addons.mobile').config(function () {}).factory('$mmaMobile', function ($log, $mmSite) {
    $log = $log.getInstance('$mmaMobile');
    var self = {};

    self.getEnergyConsultant = function (userid) {
        $log.debug('Get energy_consultants');
        return $mmSite.read('local_mobile_get_energy_consultant', { userid: userid }, { getFromCache: 0, saveToCache: 0 });
    };

    self.getCustomers = function(userid) {
        $log.debug('Get customers');
        return $mmSite.read('local_mobile_get_customers', {consultant_id: userid}, { getFromCache: 0, saveToCache: 0});
    };

    self.activeCustomer = function(consultant, customer) {
        $log.debug("Set customer active");
        $log.debug("Consultant: " + consultant + " Customer: " + customer);
        return $mmSite.write('local_mobile_active_customer', {consultant: consultant, customer: customer}, { getFromCache: 0, saveToCache: 0});
    };

    self.getAvailableUsers = function() {
        $log.debug("Call WS function to get all users from moodle, except customers and energy consultants");
        return $mmSite.read('local_mobile_available_users', {}, { getFromCache: 0, saveToCache: 0 });
    };

    self.createNewCustomer = function(customerid) {
        $log.debug("Creating new customer");
        return $mmSite.read('local_mobile_create_customer', {consultant: $mmSite.getUserId(), customer: customerid}, { getFromCache: 0, saveToCache: 0});
    }

    self.createNewMoodleUser = function(user) {
        return $mmSite.write(
            'local_mobile_create_moodle_customer', 
            {firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password},
            {getFromCache: 0, saveToCache: 0}
        );
    }

    self.updateCustomer = function(user) {
        return $mmSite.write(
            'local_mobile_update_moodle_customer', 
            {id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email},
            {getFromCache: 0, saveToCache: 0}
        );
    }

    self.deleteCustomer = function(user) {
        return $mmSite.write(
            'local_mobile_delete_customer', 
            {id: user.id},
            {getFromCache: 0, saveToCache: 0}
        );
    }

    self.closeAllWorkprocesses = function(consultant) {
        return $mmSite.write(
            'local_mobile_close_all_workprocesses',
            {consultant: consultant},
            {getFromCache: 0, saveToCache: 0}
        );
    }

    self.getAllWorkprocesses = function(consultant) {
        return $mmSite.read(
            'local_mobile_get_working_processes',
            {consultant: String(consultant)},
            {getFromCache: 0, saveToCache: 0}
        );
    }

    return self;
});
