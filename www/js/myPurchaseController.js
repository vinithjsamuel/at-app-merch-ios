app.controller('userAccountController',function($rootScope, $scope, $http, $location, $routeParams, apiFactory, $cookies, $cookieStore,$timeout){
	$rootScope.loading = true;

    $scope.accountinfoload = function(){
        $scope.emiratesOption = null;
        $scope.UpdateUsr = [];
        $scope.UpdateUsr['resMessage'] = [];
        $scope.billingAdrUpdate = [];
        $scope.billingAdrUpdate['resMessage'] = [];
        $scope.EmailPreUpdate = [];
        $scope.EmailPreUpdate['resMessage'] = [];
        $scope.UpdateUsrFrm = 0;
        $scope.UpdateAddFrm = 0;
        $scope.UpdatePwdFrm = 0;
        $scope.UpdateEmailPreFrm = 0;
        $scope.ChangePassword = {};
        $scope.changePwdResField = [];
        $scope.UpdateUsr = null;
        /*$rootScope.emirates = $cookieStore.get('emirates');
        $scope.emiratesOption = $rootScope.emirates;*/
        if (typeof $cookieStore.get('userdata') != undefined) {
            $scope.UpdateUsr = $rootScope.userdata;
            $scope.UpdateUsr.first_name = $rootScope.userdata.at_first_name;
            $scope.UpdateUsr.last_name = $rootScope.userdata.at_last_name;
            if ($rootScope.userdata != null) {
                $scope.billingAdrUpdate['aes_address_one'] = $rootScope.userdata._aes_address_one;
                $scope.billingAdrUpdate['aes_address_two'] = $rootScope.userdata._aes_address_two;
                $scope.billingAdrUpdate['aes_address_emirate'] = $rootScope.userdata._aes_address_emirate;
                $("#aes_address_emirate").val($rootScope.userdata._aes_address_emirate);
                $scope.billingAdrUpdate['aes_address_pin'] = $rootScope.userdata._aes_address_pin;
                $scope.EmailPreUpdate["at_user_subscribed_city"] = $rootScope.userdata.at_user_subscribed_city;
                $("#at_user_subscribed_city").val($rootScope.userdata.at_user_subscribed_city);
                if (typeof $rootScope.userdata.at_subscribe_news_letter != undefined) $scope.EmailPreUpdate["at_subscribe_news_letter"] = $rootScope.userdata.at_subscribe_news_letter;
                else $scope.EmailPreUpdate["at_subscribe_news_letter"] = 4
            }
        }
    }

    	
	if($rootScope.userdata && $rootScope.userdata!=undefined){
		if($cookieStore.get('userdata')==undefined){
			$http.get(site_url + '/ajax/aesthetic_wp_load_json.php?platform=mobile&getusermetainfobyid=yes&userid='+$rootScope.userdata.ID)
			.success(function(data, status, headers, config) {
				if(data && data!=""){
					var datakeys = Object.keys(data);
					var i = 0;
					for(i=0;i<datakeys.length;i++){
						$rootScope.userdata[datakeys[i]]=data[datakeys[i]][0];
					}
					$cookieStore.put('userdata', $rootScope.userdata);
					$rootScope.loading = false;
					$scope.accountinfoload();
				}
			}).error(function(data, status, headers, config) {
				$rootScope.loading = false;
				alert('Error Accessing Network!')
				$location.url('deals/all');
			});
		}else{
			$rootScope.loading = false;
			$rootScope.userdata = $cookieStore.get('userdata');
			$scope.accountinfoload();
		}
	}else{
		$rootScope.loading = false;
		$location.url('login');
	}

	$scope.changePasswordForm = function() {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var oldPassword = $scope.ChangePassword.passwordField;
        var newPassword = $scope.ChangePassword.newPasswordField;
        var confirmNewPassword = $scope.ChangePassword.confirmNewPasswordField;
        $scope.changePwdResField = [];
        if (newPassword !== confirmNewPassword) {
            $scope.changePwdResField[0] = {
                msgType: 'alert-error',
                msg: 'Passwords do not match'
            };
            return false
        } else {
            if($rootScope.userdata.user_login!=undefined || $rootScope.userdata.user_login!=null){
                var user_login = $rootScope.userdata.user_login;
            }
            $scope.UpdatePwdFrm = 1;
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
                    $scope.changePwdResField[0] = {
                        msgType: 'alert-error',
                        msg: data.error.message
                    }
                }
                if (data.success) {
                    $scope.changePwdResField[0] = {
                        msgType: 'alert-success',
                        msg: data.success.message
                    };
                    if(data.success.user_detail && data.success.user_detail.user_pass!=null){
                        $rootScope.userdata.user_pass = data.success.user_detail.user_pass;
                        $cookieStore.put('userdata', $rootScope.userdata);
                    }
                }
                $scope.ChangePassword = null;
                $scope.UpdatePwdFrm = 0
            })
        }
    };
    $scope.updateAddressForm = function() {
    	if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var address_1 = $scope.billingAdrUpdate.aes_address_one;
        var address_2 = $scope.billingAdrUpdate.aes_address_two;
        var city = $scope.billingAdrUpdate.aes_address_emirate;
        var po_box = $scope.billingAdrUpdate.po_box;
        $scope.UpdateAddFrm = 1;
        $scope.billingAdrUpdate['resMessage'] = [];
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
                $scope.billingAdrUpdate.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                $scope.UpdateAddFrm = 0;
                $rootScope.userdata._aes_address_one = address_1;
                $rootScope.userdata._aes_address_two = address_2;
                $rootScope.userdata._aes_address_emirate = city;
                $rootScope.userdata._aes_address_pin = po_box;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
        })
    };
    $scope.updateUserForm = function() {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var first_name = $scope.UpdateUsr.first_name;
        var nationality = $scope.UpdateUsr.nationality;
        var gender = $scope.UpdateUsr.gender;
        var last_name = $scope.UpdateUsr.last_name;
        var contact_mobile = $scope.UpdateUsr.contact_mobile;
        $scope.UpdateUsrFrm = 1;
        $scope.UpdateUsr['resMessage'] = [];
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
                $scope.UpdateUsr.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                $rootScope.userdata.nationality = nationality;
                $rootScope.userdata._aes_contact = contact_mobile;
                $rootScope.userdata.at_first_name = first_name;
                $rootScope.userdata.at_last_name = last_name;
                $rootScope.userdata.at_user_gender = gender;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
            $scope.UpdateUsrFrm = 0;
        })
    };
    $scope.updateEmailPreferences = function() {
        if($rootScope.userdata.ID!=null && $rootScope.userdata.ID!=undefined){
            var user_id = $rootScope.userdata.ID;
        }else{
            var user_id = 0;
        }
        var emailpreferences = $scope.EmailPreUpdate.emailpreferences;
        var subscribe_city = $scope.EmailPreUpdate.at_user_subscribed_city;
        $scope.UpdateEmailPreFrm = 1;
        $scope.EmailPreUpdate['resMessage'] = [];
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
                $scope.EmailPreUpdate.resMessage[0] = {
                    msgType: 'alert-success',
                    msg: data.success.message
                };
                $rootScope.userdata.at_user_subscribed_city = subscribe_city;
                $rootScope.userdata.at_subscribe_news_letter = emailpreferences;
                $cookieStore.put('userdata', $rootScope.userdata);
            }
            $scope.UpdateEmailPreFrm = 0;
        })
    }
})
app.controller('myPurchaseController',function($rootScope,$scope,$http,$location,$routeParams,apiFactory,$cookies,$cookieStore){
	$scope.userPurchase=null;
	if($scope.userPurchase==null){
		$rootScope.loading = true;
		apiFactory.getUserPurchase(function(data){
			if(data.success){
				$scope.userPurchase=data.success.userPurchase;
				/*$rootScope.userdata=data.success.user_details;
				$cookieStore.put('userdata',$rootScope.userdata);*/
				$rootScope.loading = false}
			})
	}
})