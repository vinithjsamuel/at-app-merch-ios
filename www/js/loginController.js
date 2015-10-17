app.controller('loginController', function($rootScope, $scope, $http, $location, $routeParams, $route, apiFactory, $cookies, $cookieStore) {
    var rootScope = $rootScope;
    var thisVar = this;
    $scope.resMessages = [];
    $rootScope.buyLoginSubmitForm = function(BuyLoginForm){
        var user_name = BuyLoginForm.email;
        var pwd = BuyLoginForm.pwdField;
        $scope.resMessages = [];
        var formSubmit=0;
        
        if($(".error").length)
            $(".error").remove();
        
        var buy_as_a_gift=0;
            
        if($("#buy_as_a_gift").val()==1){
            //if()
            if($("#receiver_name").val()==""){
                $("#receiver_name").parent().append("<p class='error'>Please enter receiver name</p>");
                formSubmit++;
            }
            if($("#receiver_email").val()==""){
                $("#receiver_email").parent().append("<p class='error'>Please enter receiver's Email</p>");
                formSubmit++;
            }
            else
            {
                email=$("#receiver_email").val();
                if(!validateEmail(email))
                {
                    $("#receiver_email").parent().append("<p class='error'>Please enter valid receiver's Email</p>");
                    formSubmit++;
                }
            }
        }
        if(formSubmit!=0)
            return false;
        $rootScope.loading = true;
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                email: user_name,
                password: pwd,
                login_user: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.error) {
                 rootScope.loading = false;
                $scope.resMessages[0] = {
                    msgType: 'alert-error',
                    msg: data.error.email
                };
                $("#submitFrmLogin").attr('disabled', false);
                $("#submitFrmLogin").html('Submit')
            }
            if (data.success) {
                $rootScope.userid = data.success.user_id;
                $rootScope.userdata = data.success.user_data;
                $cookieStore.put('userid', $rootScope.userid);
                $cookieStore.put('userdata', $rootScope.userdata);
                $rootScope.dealcheck_outcheckout();
            }
        })
    };
    $scope.isShowLoginSignupValue = true;
    $rootScope.isShowLoginSignupForm = function(){
        if($scope.isShowLoginSignupValue)
            $scope.isShowLoginSignupValue=false;
        else
            $scope.isShowLoginSignupValue=true;
    }

    $rootScope.buyRegisterSubmitForm = function(buyRegisterFrm){
        var name = buyRegisterFrm.name;
        var user_name = buyRegisterFrm.email;
        var pwd = buyRegisterFrm.pwdField;
        var confirmPwd = buyRegisterFrm.confirmPwdField;
        $scope.resMessages = [];
         if (pwd.length < 6) {
            $scope.resMessages[0] = {
                msgType: 'alert-error',
                msg: 'Password should be at least 6 characters'
            };
            return false
        }
        if(confirmPwd!=pwd)
        {
             $scope.resMessages[0] = {
                msgType: 'alert-error',
                msg: 'Password and confirm password should be same value'
            };
            return false;
        }
        var formSubmit=0;
        
        if($(".error").length)
            $(".error").remove();
        
        var buy_as_a_gift=0;
            
        if($("#buy_as_a_gift").val()==1){
            //if()
            if($("#receiver_name").val()==""){
                $("#receiver_name").parent().append("<p class='error'>Please enter receiver name</p>");
                formSubmit++;
            }
            if($("#receiver_email").val()==""){
                $("#receiver_email").parent().append("<p class='error'>Please enter receiver's Email</p>");
                formSubmit++;
            }
            else
            {
                email=$("#receiver_email").val();
                if(!validateEmail(email))
                {
                    $("#receiver_email").parent().append("<p class='error'>Please enter valid receiver's Email</p>");
                    formSubmit++;
                }
            }
        }
        if(formSubmit!=0)
            return false;
            
        $rootScope.loading = true;
        $("#submitFrmReg").attr('disabled', true);
        $("#submitFrmReg").html('Please Wait ...');
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                email: user_name,
                password: pwd,
                name: name,
                user_subscription: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.error) {
                $rootScope.loading = false;
                $scope.resMessages[0] = {
                    msgType: 'alert-error',
                    msg: data.error.email
                };
                $("#submitFrmReg").attr('disabled', false);
                $("#submitFrmReg").html('Submit')
            }
            if (data.success) {
                /*console.log(data.success);
                return false;*/
                $rootScope.userid = data.success.user_id;
                $rootScope.userdata = data.success.user_data;
                $cookieStore.put('userid', $rootScope.userid);
                $cookieStore.put('userdata', $rootScope.userdata);
                $rootScope.dealcheck_outcheckout();
            }
        })
    };
    $scope.gotoCheckOut=function(){
        var deal_id = $("#deal_permalink_url").val();
        var deal_option = $("#deal_option_val").val();
        var deal_item_qty = $("#deal_item_qty").val();
        $scope.resMessages = [];
        var coupon_num = 0;
        if (jQuery("#coupon_num").val() != "") {
            coupon_num = jQuery("#coupon_num").val();
            $rootScope.updateCouponDiscount()
        }
        var makefullpayment = 0;
        if ($("#make50payment:checked").val() == 0) {
            makefullpayment = 0
        } else makefullpayment = 1;
        
        var receiver_name='',receiver_email='',receiver_message='',deliver_opt='',buy_as_a_gift=0;
        
        if($("#buy_as_a_gift").val()==1)
        {
            buy_as_a_gift=1;
            receiver_name=$("#receiver_name").val();
            receiver_email=$("#receiver_email").val();
            receiver_message=$("#receiver_message").val();
            deliver_opt='email_it';
        }
        else
        {
            buy_as_a_gift=0;
            receiver_name='';
            receiver_email='';
            receiver_message='';
            deliver_opt='';
        }
        
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                accept_terms: 1,
                check_out: 'yes',
                deal_id: deal_id,
                deal_option: deal_option,
                item_qty: deal_item_qty,
                makefullpayment: makefullpayment,
                action: 'my_front_end_action',
                coupon_num: coupon_num,
                buy_as_a_gift:buy_as_a_gift,
                receiver_name:receiver_name,
                receiver_email:receiver_email,
                receiver_message:receiver_message,
                gift_delivery_method:deliver_opt
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.success) {
                $("#buySubmit").val("Redirecting..");
                window.location = site_url + "/at-innovate-payment-check-out?ref_id=" + data.success.invoice_no + "&mobile=yes"
            } else {
                $("#buySubmit").attr('disabled', false);
                $("#buySubmit").val("Buy");
                $scope.resMessages[0] = {
                    msgType: 'alert-error',
                    msg: 'Access Denied'
                }
            }
        })
    }
    this.registerSubmitForm = function(registerFrm) {
        var name = registerFrm.name;
        var user_name = registerFrm.email;
        var contactNo = registerFrm.contactNo;
        var pwd = registerFrm.pwdField;
        this.resMessage = [];
        if (pwd.length < 6) {
            thisVar.resMessage[0] = {
                msgType: 'alert-error',
                msg: 'Password should be at least 6 characters'
            };
            return false
        }
        $("#submitFrmReg").attr('disabled', true);
        $("#submitFrmReg").html('Please Wait ...');
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                contactNo: contactNo,
                email: user_name,
                password: pwd,
                name: name,
                user_subscription: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.error) {
                thisVar.resMessage[0] = {
                    msgType: 'alert-error',
                    msg: data.error.email
                };
                $("#submitFrmReg").attr('disabled', false);
                $("#submitFrmReg").html('Submit')
            }
            if (data.success) {
                $rootScope.userid = data.success.user_id;
                $rootScope.userdata = data.success.user_data;
                $cookieStore.put('userid', $rootScope.userid);
                $cookieStore.put('userdata', $rootScope.userdata);
                $rootScope.toggle('registerOverlay', 'off');
                if (typeof $cookieStore.get('lastRedirectURL') != 'undefined' && $cookieStore.get('lastRedirectURL') != "") {
                    var lastRedirectURL = "#" + $cookieStore.get('lastRedirectURL');
                    $cookieStore.put('lastRedirectURL', '');
                    window.location = lastRedirectURL;
                    return false
                } else {
                    window.location = '#/deals/all'
                }
            }
        })
    };
    this.loginSubmitForm = function(LoginForm) {
        var user_name = LoginForm.email;
        var pwd = LoginForm.pwdField;
        rootScope.loading = true;
        $("#submitFrmLogin").attr('disabled', true);
        $("#submitFrmLogin").html('Please Wait ...');
        this.resMessage = [];
        $http({
            method: 'POST',
            data: {
                mobile: 'yes',
                email: user_name,
                password: pwd,
                login_user: 'yes',
                action: 'my_front_end_action'
            },
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            rootScope.loading = false;
            if (data.error) {
                thisVar.resMessage[0] = {
                    msgType: 'alert-error',
                    msg: data.error.email
                };
                $("#submitFrmLogin").attr('disabled', false);
                $("#submitFrmLogin").html('Submit')
            }
            if (data.success) {
                $rootScope.userid = data.success.user_id;
                $rootScope.userdata = data.success.user_data;
                $cookieStore.put('userid', $rootScope.userid);
                $cookieStore.put('userdata', $rootScope.userdata);
                $rootScope.toggle('loginOverlay', 'off');
                if (typeof $cookieStore.get('lastRedirectURL') != 'undefined' && $cookieStore.get('lastRedirectURL') != "") {
                    var lastRedirectURL = "#" + $cookieStore.get('lastRedirectURL');
                    $cookieStore.put('lastRedirectURL', '');
                    window.location = lastRedirectURL;
                    return false
                } else {
                    console.log('calling');
                    window.location = '#/deals/all'
                }
            }
        })
    }
});
app.controller('bookappointmentController', function($rootScope, $scope, $http, $location,$timeout) {
    /*if(!$rootScope.userid){$location.path('login');}*/
    $rootScope.PageTitle = 'BOOK AN APPOINTMENT';
    $scope.bookappoint = {};
    $scope.isDisabled = false;
    $scope.messageValidation = '';
    $scope.isAppointCode = true;
    /*$scope.validateappointcode = function(appointcode){
        $scope.messageValidation = 'Checking Code...';
        if(appointcode != ''){
            $http.get(site_url + '/ajax/aesthetic_wp_load_json.php?validateappointmentcode='+appointcode).
              success(function(data, status, headers, config) {
                if(data == '"failed"'){
                    $scope.messageValidation = 'Invalid Appointment Code!';
                    $scope.isDisabled = true;
                }else{
                    $scope.messageValidation = 'Valid!';
                    $scope.isDisabled = false;
                }
              }).
              error(function(data, status, headers, config) {
                
            });
        }
    }*/
    $scope.setAppointCode = function(overlayoption){
        if(overlayoption=='no'){
            if($rootScope.categories==null){
                $rootScope.loading = true;
                $timeout(function () {
                      $scope.setAppointCode('no');
                }, 1500);
            }else{
                $rootScope.loading = false;
            }
            $scope.isAppointCode = false;
        }
        else
            $scope.isAppointCode = true;
    }

    $scope.isDealOption = function(dealslug){
        var log = [];
        var resultslug = '';
        angular.forEach($rootScope.deals, function(value, key) {
            if(value.post_name==dealslug){
                value.deals_option_count = parseInt(value.deals_option_count);
                if(value.deals_option_count>0){
                    resultslug = value.post_name;
                    $scope.appointDealOptions = value.deals_opt;
                }
            }
        }, log);
        if(resultslug && resultslug==dealslug)
            return true;
        else
            return false;
    }

    $scope.submitAppointment = function(appointDetails){
        if(!$scope.isAppointCode){
            if(appointDetails.category!='' && appointDetails.category!=undefined && appointDetails.deal!='' && appointDetails.deal!=undefined){
                var allowSubmit = true;
            }else{
                var allowSubmit = false;
            }
            if(appointDetails.option!=undefined && appointDetails.option!=''){
                var redirectUrl = 'buy/'+appointDetails.deal;
                var redirectUrlOption = appointDetails.option;
            }else{
                var redirectUrl = 'buy/'+appointDetails.deal;
                var redirectUrlOption = null;
            }
        }else{
            var allowSubmit = true;
            var redirectUrl = 'deals/all';
        }
        if(allowSubmit && appointDetails.preference2_date !=undefined && appointDetails.preference2_time_to !=undefined && appointDetails.preference2_time_from !=undefined && appointDetails.preference1_time_to !=undefined && appointDetails.preference1_time_from !=undefined && appointDetails.name !=undefined && appointDetails.contact !=undefined && appointDetails.email !=undefined && appointDetails.preference1_date !=undefined && appointDetails.name !='' && appointDetails.contact !='' && appointDetails.email !='' && appointDetails.preference1_date !='' && appointDetails.preference2_date !='' && appointDetails.preference2_time_to !='' && appointDetails.preference2_time_from !='' && appointDetails.preference1_time_to !='' && appointDetails.preference1_time_from !=''){
            $scope.isDisabled = true;
            $rootScope.loading = true;
            if(appointDetails.category)
                appointDetails.category = jQuery("#appointmentCategoryId option:selected").html();
            if(appointDetails.deal)
                appointDetails.deal = jQuery("#appointmentDealId option:selected").html();
            if(appointDetails.option)
                appointDetails.option = jQuery("#appointmentOptionId option:selected").html();
        
            $http.post(site_url + '/ajax/aesthetic_wp_load_json.php', {book_appoint:'yes',appointment_info:appointDetails}).
              success(function(data, status, headers, config) {
                $rootScope.loading = false;
                if(redirectUrlOption){alert('Kindly proceed with the payment to confirm your booking!'); $location.path(redirectUrl).search({option: redirectUrlOption});}
                else if(redirectUrl) {alert('Kindly proceed with the payment to confirm your booking!'); $location.path(redirectUrl);}
                else{alert('Appointment Request Submitted! Thank You!'); $location.path('deals/all');}
            }).
              error(function(data, status, headers, config) {
               alert('failed');
               $rootScope.loading = false;
               $scope.isDisabled = false;
            });

        }else{
            alert('Missing Field!');
            $rootScope.loading = false;
            $scope.isDisabled = false;
        }
    }
});

app.controller('cashondeliveryController', function($rootScope, $scope, $http, $location,$routeParams, $timeout) {
    $rootScope.loading = true;
    if($rootScope.userdata==null || $rootScope.userdata.ID==null){
        $location.url('login');
    }
    if($routeParams.ref_id==undefined){
        $location.url('deals/all');
    }
    $scope.ref_id = $routeParams.ref_id;
    if($routeParams.zerodeal && $routeParams.zerodeal!=undefined){
        $scope.iszerodeal = true;
    }else{
        $scope.iszerodeal = false;
    }
    $scope.placeorder = {};
    $scope.placeorder.city = {
        _aes_address_emirate: null,
        availableOptions: [{id: '2', name: 'Dubai'},{id: '3', name: 'Sharjah'},{id: '4', name: 'Abu Dhabi'},{id: '5', name: 'Ajman'},{id: '6', name: 'Umm Al Quwain'},{id: '7', name: 'Fujairah'},{id: '8', name: 'Ras Al Kaimah'},{id: '9', name: 'Al Ain'},{id: '11', name: 'Northen Emirates'}]
    };
    $rootScope.PageTitle = 'CONFIRM ORDER';
    $http.get(site_url + '/ajax/aesthetic_wp_load_json.php?getcod_data=yes&ref_id='+$routeParams.ref_id+'&userid='+$rootScope.userdata.ID)
        .success(function(data, status, headers, config) {
            if(data.response=='success'){
                $scope.placeorder.deal_details = data.deal_details;
                $scope.placeorder.user_details = $rootScope.userdata;
                $scope.placeorder.city._aes_address_emirate = $scope.placeorder.user_details._aes_address_emirate;
                $scope.placeorder.product_price = data.product_price;
                $scope.placeorder.product_qty = data.product_qty;
                $scope.placeorder.product_amount_to_pay = data.product_amount_to_pay;
            }else{
                alert('Something went wrong! Please try again!');
                $location.url('deals/all');
            }
            $rootScope.loading = false;
        })
        .error(function(data, status, headers, config) {
            alert('Check Your Connection!');
            $rootScope.loading = false;
            $location.url('deals/all');
        });

        $scope.placeOrderSubmit = function(placeorder){
            $rootScope.loading = true;
            if($scope.placeorder.user_details.at_first_name==undefined || 
                $scope.placeorder.user_details.at_last_name==undefined || 
                $scope.placeorder.user_details._aes_contact==undefined || 
                $scope.placeorder.user_details.user_email==undefined || 
                $scope.placeorder.user_details._aes_address_one==undefined ||
                $scope.placeorder.user_details._aes_address_two==undefined ||
                $scope.placeorder.user_details._aes_address_pin==undefined || 
                $scope.placeorder.city._aes_address_emirate==undefined){
                alert('Missing Field!');
                $rootScope.loading = false;
                return false;
            }
            $scope.codconfirmdata = {
                user_details:{
                    ID:placeorder.user_details.ID,
                    _aes_address_emirate:placeorder.city._aes_address_emirate,
                    _aes_address_one:placeorder.user_details._aes_address_one,
                    _aes_address_pin:placeorder.user_details._aes_address_pin,
                    _aes_address_two:placeorder.user_details._aes_address_two,
                    _aes_contact:placeorder.user_details._aes_contact,
                    at_first_name:placeorder.user_details.at_first_name,
                    at_last_name:placeorder.user_details.at_last_name,
                    user_email:placeorder.user_details.user_email
                },
                deal_id:placeorder.deal_details.ID,
                amt_to_pay:placeorder.product_amount_to_pay,
                quantity:placeorder.product_qty,
                invoice_id:$scope.ref_id,
                iszerodeal:$scope.iszerodeal
            };
            if($scope.placeorder.user_details.at_first_name!='' && 
                $scope.placeorder.user_details.at_last_name!='' && 
                $scope.placeorder.user_details._aes_contact!='' && 
                $scope.placeorder.user_details.user_email!='' && 
                $scope.placeorder.user_details._aes_address_one!='' &&
                $scope.placeorder.user_details._aes_address_two!='' &&
                $scope.placeorder.user_details._aes_address_pin!='' && 
                $scope.placeorder.city._aes_address_emirate!=''){
                    $http.post(site_url + '/ajax/aesthetic_wp_load_json.php', {platform:'mobile',placecodorder:'yes',codorder_data:$scope.codconfirmdata}).
                      success(function(data, status, headers, config) {
                        if(data.response=='success'){
                            $rootScope.loading = false;
                            $location.url('thank-you');
                        }else if(data.response=='failed'){
                            $rootScope.loading = false;
                            $location.url('failed');
                        }
                    }).error(function(data, status, headers, config) {});

                    /*if takes time to load then*/
                    $timeout(function () {
                        $rootScope.loading = false;
                        $location.url('thank-you');
                    }, 3500);
            }else{
                alert('Missing Field!');
                $rootScope.loading = false;
                return false;
            }
        }
    
});