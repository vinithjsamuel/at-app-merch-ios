app.controller('buyDealController', function($rootScope, $scope, $http, $location, $routeParams, apiFactory, $cookies, $cookieStore,$timeout) {
    var deal_name = '',
        cat_name = '',
        option = 0;
    $scope.optionVal = 0;
    $scope.discount_code = 0;
    $scope.deal_detail = null;
    $scope.resMessages = [];
    $rootScope.signUpPointsUsed = true;
	
	$scope.buyAsGift=0;
	
	$scope.atdeliverydetail = {};
	$scope.parseint=parseInt;
	
	$("#make50paymentAlert").hide();
	$("#atRedeemAlert").hide();
    if (typeof $routeParams.deal_name === "undefined") return false;
    else deal_name = $routeParams.deal_name; 
	
	if (typeof $routeParams.option !== "undefined") 
		$scope.optionVal = $routeParams.option;
	
	if (typeof $routeParams.buyAsGift !== "undefined") 
		$scope.buyAsGift=1;
			
    $rootScope.loading = true;
    
	var rootScope = $rootScope;
	
	var coupon_num = 0;
	
	if($("#coupon_num").length && $("#coupon_num").val()!="")
		coupon_num = $("#coupon_num").val();
	else
		coupon_num = 0;
			
    $rootScope.updateCouponDiscount = function() {
        var deal_id = $("#deal_detail_id").val();
        var deal_option_val = $("#deal_option_val").val();
        var qty = $("#item_qty").val();
        var coupon_num =0;
		
        var deal_offer_price = $("#deal_offer_price").val();
        var deal_price = $("#deal_price").val();
        
		if($scope.optionVal!=0){
			var totalPrice = $scope.deal_detail.deals_options[$scope.optionVal-1].aes_product_opt_discounted_price_int * $scope.dealQty.item_qty;
		}else{
			var totalPrice = deal_price * qty;
		}
		//vin_code /* qty >= 2 */
		if(totalPrice>=500){
			/*jQuery("#makefullpayment").attr("checked", false);*/
			jQuery("#make50payment").removeAttr("disabled");
			jQuery("#make50paymentAlert").hide();	
		}
		else{
			jQuery("#make50payment").attr("disabled",true);
			jQuery("#make50payment").attr("checked", false);
			jQuery("#makefullpayment").attr("checked",true);
		}
		
        var offerTotalPrice = deal_offer_price * deal_price;
        if (deal_offer_price != 0) {
            var offerTotalPrice = deal_offer_price * $rootScope.off20($rootScope.deal_price);
            jQuery(".fullAfterDiscount").html("Full Payment ( " + totalPrice + "- 20% = " + offerTotalPrice + ")")
        }
        if (coupon_num != "") {
            $scope.resMessages = []
        }
    };
    apiFactory.buydealDetails(function(data) {
        if (data.error) {
            $rootScope.loading = false;
            var lastRedirectURL = $location.path();
            if (typeof $routeParams.option !== "undefined") lastRedirectURL += "?option=" + $routeParams.option
        } else {
			$scope.deal_detail = data.deal_details;
			if ($scope.optionVal == 0) $rootScope.PageTitle = 'Buy - ' + $scope.deal_detail.post_title;
            else $rootScope.PageTitle = 'Buy - ' + $scope.deal_detail.post_title + " Option " + $scope.optionVal;
            if(data.user_details!=null){
            	$rootScope.userdata = data.user_details;
            	$cookieStore.put('userdata', $rootScope.userdata);
            }else{
            	if($rootScope.userdata!=null && $rootScope.userdata.ID!=null){
            		$rootScope.userdata = $cookieStore.get('userdata');
	            	$http.get(site_url + '/ajax/aesthetic_wp_load_json.php?platform=mobile&getusermetainfobyid=yes&userid='+$rootScope.userdata.ID).
		              success(function(data, status, headers, config) {
		              	if(data._aes_address_pin[0]){
		              		$rootScope.userdata._aes_address_pin=data._aes_address_pin[0];
		              	}
		              	if(data._aes_address_emirate[0]){
		              		$rootScope.userdata._aes_address_emirate=data._aes_address_emirate[0];
		              	}
		              	if(data._aes_address_one[0]){
		              		$rootScope.userdata._aes_address_one=data._aes_address_one[0];
		              	}
		              	if(data._aes_address_two[0]){
		              		$rootScope.userdata._aes_address_two=data._aes_address_two[0];
		              	}
		              	if(data._aes_contact[0]){
		              		$rootScope.userdata._aes_contact=data._aes_contact[0];
		              	}
		              	if(data.at_first_name[0]){
		              		$rootScope.userdata.at_first_name=data.at_first_name[0];
		              	}
		              	if(data.at_last_name[0]){
		              		$rootScope.userdata.at_last_name=data.at_last_name[0];
		              	}
		              	$cookieStore.put('userdata', $rootScope.userdata);

		              	if($scope.deal_detail.meta_datas._is_solid_product=='yes'){
			          		$scope.atdeliverydetail.userid = $rootScope.userdata.ID;
				          	$scope.atdeliverydetail.name = $rootScope.userdata.at_first_name;
				          	$scope.atdeliverydetail.email = $rootScope.userdata.user_email;
				          	$scope.atdeliverydetail.contact = $rootScope.userdata._aes_contact;
				          	$scope.atdeliverydetail.address_1 = $rootScope.userdata._aes_address_one;
				          	$scope.atdeliverydetail.address_2 = $rootScope.userdata._aes_address_two;
				          	$scope.atdeliverydetail.pobox = $rootScope.userdata._aes_address_pin;
				          	$scope.atdeliverydetail.gender = $rootScope.userdata.at_user_gender;
				          	if($rootScope.userdata._aes_address_emirate==2){$scope.atdeliverydetail.city = 'Dubai';}
				          	if($rootScope.userdata._aes_address_emirate==3){$scope.atdeliverydetail.city = 'Sharjah';}
				          	if($rootScope.userdata._aes_address_emirate==4){$scope.atdeliverydetail.city = 'Abu Dhabi';}
				          	if($rootScope.userdata._aes_address_emirate==5){$scope.atdeliverydetail.city = 'Ajman';}
				          	if($rootScope.userdata._aes_address_emirate==6){$scope.atdeliverydetail.city = 'Umm Al Quwain';}
				          	if($rootScope.userdata._aes_address_emirate==7){$scope.atdeliverydetail.city = 'Fujairah';}
				          	if($rootScope.userdata._aes_address_emirate==8){$scope.atdeliverydetail.city = 'Ras Al Kaimah';}
				          	if($rootScope.userdata._aes_address_emirate==9){$scope.atdeliverydetail.city = 'Al Ain';}
				          	if($rootScope.userdata._aes_address_emirate==11){$scope.atdeliverydetail.city = 'Northen Emirates';}
				        }

		              }).error(function(data, status, headers, config) {});
		          }
            }
            $rootScope.loading = false;
            $timeout(function () {
              $rootScope.updateCouponDiscount();
          	}, 2000);

          	if($scope.deal_detail.meta_datas._is_solid_product=='yes'){
          		if($rootScope.userdata==null || $rootScope.userdata.ID==null){
          			$location.url('login');
          		}
	          	else{
	          		if($rootScope.userdata.ID!=null) $scope.atdeliverydetail.userid = $rootScope.userdata.ID;
		          	$scope.atdeliverydetail.name = $rootScope.userdata.first_name;
		          	$scope.atdeliverydetail.email = $rootScope.userdata.user_email;
		          	$scope.atdeliverydetail.contact = $rootScope.userdata._aes_contact;
		          	$scope.atdeliverydetail.address_1 = $rootScope.userdata._aes_address_one;
		          	$scope.atdeliverydetail.address_2 = $rootScope.userdata._aes_address_two;
		          	$scope.atdeliverydetail.pobox = $rootScope.userdata._aes_address_pin;
		          	$scope.atdeliverydetail.gender = $rootScope.userdata.at_user_gender;
		          	if($rootScope.userdata._aes_address_emirate==2){$scope.atdeliverydetail.city = 'Dubai';}
		          	if($rootScope.userdata._aes_address_emirate==3){$scope.atdeliverydetail.city = 'Sharjah';}
		          	if($rootScope.userdata._aes_address_emirate==4){$scope.atdeliverydetail.city = 'Abu Dhabi';}
		          	if($rootScope.userdata._aes_address_emirate==5){$scope.atdeliverydetail.city = 'Ajman';}
		          	if($rootScope.userdata._aes_address_emirate==6){$scope.atdeliverydetail.city = 'Umm Al Quwain';}
		          	if($rootScope.userdata._aes_address_emirate==7){$scope.atdeliverydetail.city = 'Fujairah';}
		          	if($rootScope.userdata._aes_address_emirate==8){$scope.atdeliverydetail.city = 'Ras Al Kaimah';}
		          	if($rootScope.userdata._aes_address_emirate==9){$scope.atdeliverydetail.city = 'Al Ain';}
		          	if($rootScope.userdata._aes_address_emirate==11){$scope.atdeliverydetail.city = 'Northen Emirates';}
		        }
	        }
        }
    }, deal_name);
	
	$scope.redeemPointChange=function(){
		console.log('calling');
	};
	
    $rootScope.dealcheck_outcheckout = function(dealcheck_out) {
    	if($scope.deal_detail.meta_datas._is_solid_product=='yes'){
			if($scope.atdeliverydetail.name==undefined || $scope.atdeliverydetail.email==undefined || $scope.atdeliverydetail.contact==undefined || $scope.atdeliverydetail.address_1==undefined || $scope.atdeliverydetail.pobox==undefined || $scope.atdeliverydetail.city==undefined){
				alert('Missing Field!');
				return false;
			}
			if($scope.atdeliverydetail.name==''||$scope.atdeliverydetail.email==''||$scope.atdeliverydetail.contact==''||$scope.atdeliverydetail.address_1==''||$scope.atdeliverydetail.pobox==''||$scope.atdeliverydetail.city==''){
				alert('Missing Field!');
				return false;
			}
			$http.post(site_url + '/ajax/aesthetic_wp_load_json.php', {atdeliverydetailupdate:'yes',atdeliverydetailinfo:$scope.atdeliverydetail}).
              success(function(data, status, headers, config) {})
              .error(function(data, status, headers, config) {
               alert('Something went wrong!');
               return false;
        	});
		}
		var deal_id = $("#deal_permalink_url").val();
        var deal_option = $("#deal_option_val").val();
        var deal_item_qty = $("#deal_item_qty").val();
        //console.log(deal_id, deal_option, deal_item_qty);
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
		
		var receiver_name='',receiver_email='',receiver_message='',deliver_opt='';
		
		if($("#buy_as_a_gift").val()==1 && formSubmit==0)
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
			
		$("#buySubmit").attr('disabled', true);
        $("#buySubmit").val("Please wait...");
        $scope.resMessages = [];
        var coupon_num = 0;
		if($("#coupon_num").length && $("#coupon_num").val()!="")
		{
			 coupon_num = jQuery("#coupon_num").val();
             $rootScope.updateCouponDiscount()
		}
		else
			coupon_num = 0;
        
        var makefullpayment = 0;
        
		if ($("#make50payment:checked").val() == 0) {
            makefullpayment = 0
        } else makefullpayment = 1;
		
		var walletPointsUsed = 0;
		
		if(jQuery("#walletPointsUsed:checked").val())
			walletPointsUsed=1;
		else
			walletPointsUsed=0;
		
		if($("#makecashOnDelivery:checked").val()!=undefined){
			$scope.cashondeliveryOrder = true;
			walletPointsUsed=0;
		}else{
			$scope.cashondeliveryOrder = false;
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
                walletPointsUsed: walletPointsUsed,
				buy_as_a_gift:buy_as_a_gift,
				receiver_name:receiver_name,
				receiver_email:receiver_email,
				receiver_message:receiver_message,
				gift_delivery_method:deliver_opt
            },
			/*data:seraliseData+"&item_qty="+deal_item_qty+"&mobile=yes&action=my_front_end_action&check_out=yes&deal_option="+deal_option+"&coupon_num="+coupon_num+"&accept_terms=1&makefullpayment="+makefullpayment+"&walletPointsUsed="+walletPointsUsed,*/
            url: site_url + '/mobile_api.php'
        }).success(function(data) {
            if (data.success) {
            	if($rootScope.userid){
            		$("#buySubmit").val("Redirecting..");
            		if(data.success.zerodeal){
	                	$location.url('cashondelivery/'+data.success.invoice_no+'?zerodeal=yes');
	                }
	                else if($scope.cashondeliveryOrder){
	                	$location.url('cashondelivery/'+data.success.invoice_no);
	                }else{
	                	$location.url('processPayment?ref_id='+data.success.invoice_no+'&userid='+$rootScope.userid);
	                }
            	}else{
            		$location.url('failed');
            	}
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
});
//vin_code
$(document).ready(function(e) {
    $(document).on('change',"#item_qty",function(){
		
	})
	$(document).on('click',".half-payment-main-Cls",function(){
		if($("#make50payment").is(':enabled')) {
			$("#make50paymentAlert").hide();
		}
		else{
			$("#make50paymentAlert").show();
		}
	})
	$(document).on('click','.atclsZeroRedeem', function(){
		$('#atRedeemAlert').show();
	})
});
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 