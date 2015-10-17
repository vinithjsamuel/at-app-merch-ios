var app = angular.module('AtMobileApp', ["ngRoute","mobile-angular-ui","ngSanitize","ngCookies",'timer']);
app.filter('floor', function() {
  return function(input) {
	if(input == 'undefined')
		return 0;
	else
    	return Math.floor(input);
  };
});

app.directive('autoFillSync', function($timeout) {
   return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
          var origVal = elem.val();
          $timeout(function () {
              var newVal = elem.val();
			  if(ngModel.$pristine && origVal !== newVal) {
				  ngModel.$setViewValue('');
              }
          }, 500);
      },
   }
});
/*issue with iphone on touch ng-click*/
app.directive("ngMobileClick",function () {
    return function (scope, elem, attrs) {
        elem.bind("touchstart click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.$apply(attrs["ngMobileClick"]);
        });
    }
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {templateUrl: "deals.html",controller: 'dealController'}); 
  $routeProvider.when('/home',          {templateUrl: "home.html"});
  $routeProvider.when('/login',  	{templateUrl: "login.html"}); 
  $routeProvider.when('/facebook',  {templateUrl: "facebook.html"});
  $routeProvider.when('/twitter',   {templateUrl: "twitter.html"});
  $routeProvider.when('/instagram', {templateUrl: "insta.html"});
  $routeProvider.when('/find-us',   {templateUrl: "map.html"});
  $routeProvider.when('/sign-up',  	{templateUrl: "register.html"}); 
  $routeProvider.when('/refer-a-friend',{templateUrl: "refer_a_friend.html"}); 
  $routeProvider.when('/about-us',  {templateUrl: "about-us.html"}); 
  $routeProvider.when('/partner-with-us',  {templateUrl: "page.html",controller: pageController}); 
  $routeProvider.when('/our-vission',  {templateUrl: "page.html",controller: pageController}); 
  $routeProvider.when('/contact',   {templateUrl: "page.html",controller: pageController}); 
  $routeProvider.when('/web',   {templateUrl: "web.html"});
  $routeProvider.when('/terms-and-conditions',   {templateUrl: "page.html",controller: pageController}); 
  $routeProvider.when('/faqs',   {templateUrl: "page.html",controller: pageController}); 
  
  $routeProvider.when('/categories',   {templateUrl: "category.html"});
  $routeProvider.when('/subcategories/:category_slug', {templateUrl: "subcategory.html",controller: 'subCategoryController'});
   
  
  $routeProvider.when('/deals/:filter', {templateUrl: "deals.html",controller: 'dealController'});
  $routeProvider.when('/deals/:filter/:category', {templateUrl: "deals.html",controller: 'dealController'});
  $routeProvider.when('/deal/:cat_name/:deal_name', {templateUrl: "deals_details.html",controller: 'dealDetailController'});  
  $routeProvider.when('/buy/:deal_name', {templateUrl: "buydeal.html",controller: 'buyDealController'});
  $routeProvider.when('/buy/:deal_name/:option', {templateUrl: "buydeal.html",controller: 'buyDealController'});
  $routeProvider.when('/myaccount', {templateUrl: "my_account.html",controller: 'userAccountController'});
  $routeProvider.when('/mypoints', {templateUrl: "user_points.html"});
  $routeProvider.when('/mypurchase', {templateUrl: "mypurchase.html",controller: 'myPurchaseController'});
  $routeProvider.when('/thank-you',{templateUrl: "pay_success.html",controller: 'atPaySuccessController'});
  $routeProvider.when('/failed',{templateUrl: "pay_failed.html",controller: 'atPayFailedController'});
  $routeProvider.when('/bookappointment',{templateUrl: "bookappointment.html",controller: 'bookappointmentController'});
  $routeProvider.when('/processPayment', {templateUrl: "oninapp.html",controller: 'onInAppBrowseController'}); 
  $routeProvider.when('/cashondelivery',{templateUrl: "cashondelivery.html",controller: 'cashondeliveryController'});
  $routeProvider.when('/cashondelivery/:ref_id',{templateUrl: "cashondelivery.html",controller: 'cashondeliveryController'});
});

app.service('analytics', [
  '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
    var send = function(evt, data) {
      ga('send', evt, data);
    }
  }
]);


app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if($location.$$path=='/')
		{
			 $rootScope.PageTitle='AESTHETIC TODAY';
			 $rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/mypoints')
		{
			$rootScope.PageTitle='My Level';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/mypurchase')
		{
			$rootScope.PageTitle='My Purchases';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/myaccount')
		{
			$rootScope.PageTitle='My Personal Info';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
			
		}
		else if($location.$$path=='/partner-with-us')
		{	
			$rootScope.PageTitle='PARTNER WITH US';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/terms-and-conditions')
		{	
			$rootScope.PageTitle='TERMS AND CONDITIONS';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/faqs')
		{	
			$rootScope.PageTitle='FAQS';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/about-us')
		{
			$rootScope.PageTitle='About Us';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/categories')
		{
			$rootScope.PageTitle='categories';
			$rootScope.$broadcast('$changeTitleData', $rootScope.PageTitle);
		}
		else if($location.$$path=='/contact')
		{
			  $rootScope.PageTitle='contact us';
			  $rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);
		}
		else if($location.$$path=='/mypoints')
		{
			$rootScope.PageTitle='My Account';
			$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);
		}
		else if($location.$$path=='/thank-you')
		{
			$rootScope.PageTitle='Thank you';
			$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);
		}
		else
		{
			var tle=$location.$$path;
			tle=tle.replace('/','');
			tle=tle.replace('-',' ');
			$rootScope.PageTitle=tle;
			$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);
		}
    });
}]);
app.controller('MainController', function($rootScope, $scope, $http,$location,$routeParams,apiFactory,analytics,$q,$cookies,$cookieStore){
	
  $rootScope.backBtnShow=false;
  $rootScope.site_url=site_url;
  $rootScope.mainTle='';
  $rootScope.PageTitle=' AESTHETIC TODAY ';
  $rootScope.userid=0;
  $rootScope.userdata=null;
  $rootScope.emirates=null;
  $rootScope.categories=null;
  $rootScope.deals=null;
  $rootScope.selectedCatId=null;
  $rootScope.selectedCatName=null;
  $rootScope.earned_points=0;
  $rootScope.loadDealsTrigger=0;
  $rootScope.dealDetailTrigger=0;
  
  if($location.$$search.earned_points!='undefined')
  	 $rootScope.earned_points=$location.$$search.earned_points;
 
  if(typeof $cookieStore.get('emirates') == 'undefined' )
  {
	  apiFactory.getEmirates(function(data){
	  	$rootScope.emirates=data;
		$cookieStore.put('emirates',$rootScope.emirates);
	  })
  }
  else
  {
	  $rootScope.emirates = $cookieStore.get('emirates');
  }
  if(typeof $cookieStore.get('userdata') == 'undefined')
  {
	  apiFactory.UserService(function(data){
		if(data.error)
		{   
			$rootScope.loading = false;
			$rootScope.userid=0;
			$rootScope.userdata=null;
			$cookieStore.put('userid',$rootScope.userid);
			$cookieStore.put('userdata',$rootScope.userdata);
		}
		if(data.success)
		{
			$rootScope.userid=data.success.user_id;
			$rootScope.userdata=data.success.user_data;
			$rootScope.loading = false;
		}
		$cookieStore.put('userid',$rootScope.userid);
		$cookieStore.put('userdata',$rootScope.userdata);
	  })
	 
  }
  else
  {
	  $rootScope.userid=$cookieStore.get('userid');
	  
	  $rootScope.userdata=$cookieStore.get('userdata');
  }
  $rootScope.$on("$routeChangeStart", function(data){
    $rootScope.loading = true;
  });
  
  $rootScope.$on("$routeChangeSuccess", function(){
    $rootScope.loading = false;
  });
  
  $rootScope.goBackPage=function(){
  	 window.history.go(-1);
  };
  $rootScope.$on("$userdetailVars",function(data,userdetail){
	  var data=userdetail;
  		if(data.error)
		{   $rootScope.loading = false;
			$rootScope.userid=0;
			$rootScope.userdata=null;
		}
		if(data.success)
		{
			$rootScope.userid=data.success.user_id;
			$rootScope.userdata=data.success.user_data;
			$rootScope.loading = false;
		}
  })
  $rootScope.$on("$changeTitleData",function(data,pageTitle){
	$rootScope.mainTle=' - '+pageTitle.toUpperCase();
	$rootScope.PageTitle=pageTitle.toUpperCase();
  });
  
  $rootScope.openSignup=function(form){
 	 $rootScope.toggle(form, 'off');
	 window.location='#sign-up';
  };
  $rootScope.openLogin=function(form){
  	$rootScope.toggle(form, 'off');
	 window.location='#login';
  };
  $rootScope.closeOvelay=function(form){
	  if(form=='login')
	  	$rootScope.toggle('loginOverlay', 'off');
	  else if(form=='signup')
	  	$rootScope.toggle('registerOverlay', 'off');
	  else
		$rootScope.toggle(form, 'off');
	  window.location='#/deals/all';
  };
  $rootScope.goHome=function(){
	  $rootScope.PageTitle=" HOME ";
	  $rootScope.backBtnShow=false;
  };
  $rootScope.SetCategory=function(cat_id,cat_name){
  	$rootScope.selectedCatId=cat_id;
  	$rootScope.selectedCatName=cat_name;
  };
  $rootScope.shareUrl=function(type){
	if($rootScope.userid==0)
		return "";
  	var share_url=site_url+'/#signup/?refered_by='+$rootScope.userid+'&landing=1'
	
	var $tweetnew = encodeURI(share_url);
	
	$tweetnew = $tweetnew.replace(/&/g, '%26');
	$tweetnew = $tweetnew.replace(/#/g, '%23');
	
	if(type==1)
		return $tweetnew;
	else return share_url;	
  };
  $rootScope.logout=function(){
  		$rootScope.loading = true;
	  apiFactory.siteLogout(function(data){
		  $cookieStore.remove("userid");
		  $cookieStore.remove("userdata");
		  $rootScope.userid=0;
		  $rootScope.userdata=null;
		  $location.url('deals/all');
	  });
  };
  $rootScope.applyCountdownTimer=function(){
  	
  };
  $rootScope.changePageTitle=function(title){
  
  };
  
  $rootScope.catDealCount=function(cat_slug)
  {
	  var deal_count=0;
	  
	  if(typeof slugNeeded === 'undefined'){
	  	/*show only the main categories*/
	  	var slugNeeded = new Array("gents-salons", "ladies-salons", "spa-treatments", "fitness-dance", "health-medical", "dental-deals","body-arts");
	  }

	  if($rootScope.deals!=null && slugNeeded && slugNeeded.indexOf(cat_slug) != -1)
	  {
		 	 var result = $.grep($rootScope.deals, function(e){ 
			  	return e.cat_slug.indexOf(cat_slug) !='-1';
			 });
			 if(result.length!=0)
			 {
				 deal_count=result.length;
			 }
			 else
			 {
				 deal_count=0;
			 }
	  }
	  else
	  	deal_count=0;
		
	  return deal_count;
  };
  
  $rootScope.goToDealsPage=function(){
	window.location="#/deals/all";
  }
  $rootScope.off20=function(price){
	  	var a = 20/100;
		var b = a*price;
		return Math.round(price-b);
	};
  $scope.userAgent =  navigator.userAgent;
  $rootScope.totalPoints=function()	
  {
	  var at_user_balance=0;
	  
	  at_user_balance= typeof $rootScope.userdata.at_user_balance != 'undefined'  ? $rootScope.userdata.at_user_balance :0;
	  
	  user_wallet_points= typeof $rootScope.userdata.user_wallet_points != 'undefined'  ? $rootScope.userdata.user_wallet_points :0;
	  	
	  return parseInt(at_user_balance)+parseInt(user_wallet_points);
  }
});
app.controller('atPayFailedController', function($rootScope, $scope, $http,$location,$timeout){
	if($location.$$search.uid != 'undefined'){
		$scope.user_id = $location.$$search.uid;
		$scope.redirect = 'failed';
		$http({method: 'POST',data: {deletems: $scope.user_id,redirect: $scope.redirect},url: site_url+'/ajax/aesthetic_deals_json.php'})
		.success(function(data) {
			$rootScope.atIsSessionEnded = true;
		});
	}
	$timeout(function () {
		location.replace('#deals/all');
	},5000);
});
app.controller('atPaySuccessController', function($rootScope, $scope, $http,$location,$timeout,$cookieStore){
	if($location.$$search.uid != 'undefined'){
		$scope.user_id = $location.$$search.uid;
		$scope.redirect = 'success';
		$http({method: 'POST',data: {deletems: $scope.user_id,redirect: $scope.redirect},url: site_url+'/ajax/aesthetic_deals_json.php'})
		.success(function(data) {
			$rootScope.atIsSessionEnded = true;
		});
	}
	$timeout(function () {
		if($rootScope.userdata!=null && $rootScope.userdata.ID!=null){
			$http.get(site_url + '/ajax/aesthetic_wp_load_json.php?platform=mobile&getusermetainfobyid=yes&userid='+$rootScope.userdata.ID)
			.success(function(data, status, headers, config) {
				$rootScope.userdata = $cookieStore.get('userdata');
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
			}).error(function(data, status, headers, config) {});
		}
		location.replace('#deals/all');
	},5000);
});

app.controller('webController', function($rootScope, $scope, $http,$location){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		sessionStorage.at_device_preferred = 'web';
		window.location = site_url;
	}else{
		alert('Device Not Found!');
	}
});

/*in app browser for mobile*/
app.controller('onInAppBrowseController', function($rootScope, $scope, $http,$location, $timeout, $cookieStore){
		$scope.userid = $location.$$search.userid;
		$scope.ref_id = $location.$$search.ref_id;
		$rootScope.onInAppCreateSession = function(){
			$timeout(function () {
		    	$http({method: 'POST',data: {createms: $scope.userid},url: site_url+'/ajax/aesthetic_deals_json.php'})
		    	.success(function(data) {
		    		if(data.status && data.status=='success'){
						$rootScope.atIsSessionCreated = true;
					}
					if($rootScope.atIsSessionCreated){
						$rootScope.atStartCheckingSession = true;
						$rootScope.onInAppCheckSession();
				  	}
				});
			},100);
		}
		$rootScope.onInAppCheckSession = function(){
			$timeout(function () {
		    	$http({method: 'POST',data: {checkms: $scope.userid},url: site_url+'/ajax/aesthetic_deals_json.php'})
		    	.success(function(data) {
		    		if(data.status && data.status=='success'){
						$rootScope.atIsSessionExist = true;
					}
					if($rootScope.atIsSessionExist){
						$rootScope.atIsSessionExist = false;
						$rootScope.atStartCheckingSession = false;
						$rootScope.onInApp.close();
						if(data.redirectTo && data.redirectTo == 'success'){
							$rootScope.atIsSessionExistCloseAction = 'success';
							$location.url('thank-you');
						}
						if(data.redirectTo && data.redirectTo == 'failed'){
							$rootScope.atIsSessionExistCloseAction = 'failed';
							$location.url('failed');
						}
						
					}
				});
				if($rootScope.atStartCheckingSession){
					$rootScope.onInAppCheckSession();
				}
			},400);
		}
	if($scope.userid !='undefined' && $scope.ref_id !='undefined'){
		$rootScope.onInApp = window.open(site_url+'/at-innovate-payment-check-out?ref_id='+$scope.ref_id+'&mobile=yes', '_blank', 'location=no,hidden=yes,closebuttoncaption=Done,toolbar=no');
	  	//$rootScope.onInApp = window.open(site_url, '_blank','location=no,hidden=yes,closebuttoncaption=Done,toolbar=no');
	  	$timeout(function () {
	  		$rootScope.onInApp.show();
	  	},6000);
	  	$rootScope.onInAppCreateSession();
	  	$rootScope.onInApp.addEventListener('exit', function(event) {
	  		$timeout(function () {
	  			if($rootScope.atIsSessionExistCloseAction == 'success'){
	  				$http({method: 'POST',data: {deletems: $scope.userid,redirect: 'success'},url: site_url+'/ajax/aesthetic_deals_json.php'})
			    	.success(function(data) {
			    		location.replace('#failed');
			    		/*$location.url('failed');*/
					});
					$location.url('thank-you');
	  			}else if($rootScope.atIsSessionExistCloseAction == 'failed'){
	  				$http({method: 'POST',data: {deletems: $scope.userid,redirect: 'failed'},url: site_url+'/ajax/aesthetic_deals_json.php'})
			    	.success(function(data) {
			    		location.replace('#failed');
					});
					$location.url('failed');
	  			}else{
	  				$http({method: 'POST',data: {deletems: $scope.userid,redirect: 'failed'},url: site_url+'/ajax/aesthetic_deals_json.php'})
			    	.success(function(data) {
			    		location.replace('#failed');
					});
	  				location.replace('#failed');
	  			}
	  		},100);
	  	});
	}

});

app.controller('subCategoryController', function($rootScope, $scope, $http,$routeParams){
	
	$scope.checkSpecificCategory=function(cat_slug)
	  {
		  var deal_count=0;
		  
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='ladies-salons'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("eye-lashes", "hair", "ladies-waxing", "nails", "facial-treatments", "ladies-moroccan-bath","beauty-package");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='gents-salons'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("gents-hair", "spa-deals", "gents-moroccan-bath");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='spa-treatments'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("body-massage", "body-scrub", "body-treatment");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='fitness-dance'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("dance-classes", "gym", "yoga", "kids");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='health-medical'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("hair-removal", "skin-rejuvenation", "slimming-weight-loss", "filler-botox", "skin-tightening", "stretch-marks","cellulite-reduction");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='dental-deals'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("orthodontics", "teeth", "dental-check-up");
		  }
		  if(typeof slugNeeded === 'undefined' && $routeParams.category_slug=='body-arts'){
		  	/*show only the main categories*/
		  	var slugNeeded = new Array("body-arts");
		  	window.location="#/deals/all/body-arts";
		  }

		  if($rootScope.deals!=null && slugNeeded && slugNeeded.indexOf(cat_slug) != -1)
		  {
			 	 var result = $.grep($rootScope.deals, function(e){ 
				  	return e.cat_slug.indexOf(cat_slug) !='-1';
				 });
				 if(result.length!=0)
				 {
					 deal_count=result.length;
					 $scope.categorydealsexist = true;
				 }
				 else
				 {
					 deal_count=0;
				 }
		  }
		  else
		  	deal_count=0;
			
		  return deal_count;
	  };


});