/*app.controller('myAccountController', function($rootScope, $scope, $http, $location, $routeParams, apiFactory, $cookies, $cookieStore) {
    var rootScope = $rootScope;
    var thisVar = this
});*/
app.controller('myAccountController', function($rootScope, $scope, $http, $location, $routeParams, apiFactory, $cookies, $cookieStore) {
    var rootScope = $rootScope;
    var thisVar = this;
    this.emiratesOption = null;
    this.UpdateUsr = [];
    this.UpdateUsr['resMessage'] = [];
    this.billingAdrUpdate = [];
    this.billingAdrUpdate['resMessage'] = [];
    this.EmailPreUpdate = [];
    this.EmailPreUpdate['resMessage'] = [];
    this.UpdateUsrFrm = 0;
    this.UpdateAddFrm = 0;
    this.UpdatePwdFrm = 0;
    this.UpdateEmailPreFrm = 0;
    this.passwordField = '';
    this.newPasswordField = '';
    this.confirmNewPasswordField = '';
    this.changePwdResField = [];
    $rootScope.userdata = $cookieStore.get('userdata');
    this.UpdateUsr = null;
    $rootScope.emirates = $cookieStore.get('emirates');
    thisVar.emiratesOption = $rootScope.emirates;
    if (typeof $cookieStore.get('userdata') != undefined) {
        thisVar.UpdateUsr = $rootScope.userdata;
        thisVar.UpdateUsr.first_name = $rootScope.userdata.at_first_name;
        thisVar.UpdateUsr.last_name = $rootScope.userdata.at_last_name;
        if ($rootScope.userdata != null) {
            thisVar.billingAdrUpdate['aes_address_one'] = $rootScope.userdata._aes_address_one;
            thisVar.billingAdrUpdate['aes_address_two'] = $rootScope.userdata._aes_address_two;
            thisVar.billingAdrUpdate['aes_address_emirate'] = $rootScope.userdata._aes_address_emirate;
            $("#aes_address_emirate").val($rootScope.userdata._aes_address_emirate);
            thisVar.billingAdrUpdate['aes_address_pin'] = $rootScope.userdata._aes_address_pin;
            thisVar.EmailPreUpdate["at_user_subscribed_city"] = $rootScope.userdata.at_user_subscribed_city;
            $("#at_user_subscribed_city").val($rootScope.userdata.at_user_subscribed_city);
            if (typeof $rootScope.userdata.at_subscribe_news_letter != undefined) thisVar.EmailPreUpdate["at_subscribe_news_letter"] = $rootScope.userdata.at_subscribe_news_letter;
            else thisVar.EmailPreUpdate["at_subscribe_news_letter"] = 4
        }
    }
    this.changePasswordForm = function(fields) {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var oldPassword = fields.passwordField.$modelValue;
        var newPassword = fields.newPasswordField.$modelValue;
        var confirmNewPassword = fields.confirmNewPasswordField.$modelValue;
        thisVar.changePwdResField = [];
        if (newPassword !== confirmNewPassword) {
            thisVar.changePwdResField[0] = {
                msgType: 'alert-error',
                msg: 'Passwords do not match'
            };
            return false
        } else {
            if($rootScope.userdata.user_login!=undefined || $rootScope.userdata.user_login!=null){
                var user_login = $rootScope.userdata.user_login;
            }
            thisVar.UpdatePwdFrm = 1;
            $http({
                method: 'POST',
                data: {
                    mobile: 'yes',
                    oldPassword: oldPassword,
                    new_password: newPassword,
                    confirmNewPassword: confirmNewPassword,
                    user_id:user_id,
                    user_login:user_login,
                    update_user_password: 'yes',
                    action: 'my_front_end_action'
                },
                url: site_url + '/mobile_api.php'
            }).success(function(data) {
                if (data.error) {
                    thisVar.changePwdResField[0] = {
                        msgType: 'alert-error',
                        msg: data.error.message
                    }
                }
                if (data.success) {
                    thisVar.changePwdResField[0] = {
                        msgType: 'alert-success',
                        msg: data.success.message
                    };
                    if(data.success.user_detail && data.success.user_detail.user_pass!=null){
                        $rootScope.userdata = $cookieStore.get('userdata');
                        $rootScope.userdata.user_pass = data.success.user_detail.user_pass;
                        $cookieStore.put('userdata', $rootScope.userdata);
                    }
                }
                $scope.ChangePassword = null;
                thisVar.UpdatePwdFrm = 0
            })
        }
    };
    this.updateAddressForm = function(billingAdrUpdate) {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var address_1 = billingAdrUpdate.aes_address_one.$modelValue;
        var address_2 = billingAdrUpdate.aes_address_two.$modelValue;
        var city = billingAdrUpdate.aes_address_emirate.$modelValue;
        var po_box = billingAdrUpdate.po_box.$modelValue;
        thisVar.UpdateAddFrm = 1;
        this.billingAdrUpdate['resMessage'] = [];
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                address_1: address_1,
                address_2: address_2,
                city: city,
                po_box: po_box,
                update_address: 'yes',
                user_id:user_id,
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.success) {
                thisVar.billingAdrUpdate.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                
                $rootScope.userdata = $cookieStore.get('userdata');
                $rootScope.userdata._aes_address_one = address_1;
                $rootScope.userdata._aes_address_two = address_2;
                $rootScope.userdata._aes_address_emirate = city;
                $rootScope.userdata._aes_address_pin = po_box;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
            thisVar.UpdateAddFrm = 0
        })
    };
    this.updateUserForm = function(UpdateUsr) {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var first_name = UpdateUsr.first_name.$modelValue;
        var nationality = UpdateUsr.nationality.$modelValue;
        var gender = UpdateUsr.gender.$modelValue;
        var last_name = UpdateUsr.last_name.$modelValue;
        var contact_mobile = UpdateUsr.contact_mobile.$modelValue;
        this.UpdateUsrFrm = 1;
        this.UpdateUsr['resMessage'] = [];
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                user_id:user_id,
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                nationality: nationality,
                contact_mobile: contact_mobile,
                update_registration: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.success) {
                thisVar.UpdateUsr.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                $rootScope.userdata = $cookieStore.get('userdata');
                $rootScope.userdata.nationality = nationality;
                $rootScope.userdata._aes_contact = contact_mobile;
                $rootScope.userdata.at_first_name = first_name;
                $rootScope.userdata.at_last_name = last_name;
                $rootScope.userdata.at_user_gender = gender;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
            thisVar.UpdateUsrFrm = 0
        })
    };
    this.updateEmailPreferences = function(email_preferences) {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var emailpreferences = email_preferences.emailpreferences.$modelValue;
        var subscribe_city = email_preferences.at_user_subscribed_city.$modelValue;
        this.UpdateEmailPreFrm = 1;
        this.EmailPreUpdate['resMessage'] = [];
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                user_id:user_id,
                emailpreferences: emailpreferences,
                subscribe_city: subscribe_city,
                email_preferences: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.success) {
                thisVar.EmailPreUpdate.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                $rootScope.userdata = $cookieStore.get('userdata');
                $rootScope.userdata.at_user_subscribed_city = subscribe_city;
                $rootScope.userdata.at_subscribe_news_letter = emailpreferences;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
            thisVar.UpdateEmailPreFrm = 0
        })
    }
});