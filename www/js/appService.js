app.factory('apiFactory', function($http) {
    return {
        UserService: function(callback) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    user_check: 'yes',
                    action: 'my_front_end_action'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                callback(data)
            })
        },
        getUserPurchase: function(callback) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    userPurchase: 'yes'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                callback(data)
            })
        },
        getCats: function(callback) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    getCategory: 'yes'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                callback(data.success)
            })
        },
        getEmirates: function(callback) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    getEmirates: 'yes'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                callback(data.emirates)
            })
        },
        fetchDeals: function(callback, filter, page, category) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    action: 'get_deals'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                if (data.success) callback(data.success)
            })
        },
        buydealDetails: function(callback, deal_name) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    deal: deal_name,
                    getDealDetails: 'yes'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                if (data.success) callback(data.success);
                else callback(data)
            })
        },
        siteLogout: function(callback) {
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    logout: 'yes'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                if (data.success) callback(data.success)
            })
        }
    }
});