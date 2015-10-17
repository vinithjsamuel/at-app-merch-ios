app.controller('homeController',function($rootScope, $scope, $http,$location,$routeParams,apiFactory,$cookies,$cookieStore,$timeout)
{
	$rootScope.loading = true;
	if($rootScope.deals==null)
	{
		apiFactory.fetchDeals(function(data){
			 $rootScope.deals=data.deals;
			 var data={};
			 data['deals']=$rootScope.deals;
			 if($rootScope.loadDealsTrigger==1)
			 {
				 $rootScope.$broadcast('$getDeals',data);
			 }
			 if($rootScope.dealDetailTrigger==1)
			 {
				 var result = $.grep($rootScope.deals, function(e){ return e.post_name == $routeParams.deal_name; });
				 if(result.length!=0)
				 {
					 var deal=result[0];
					 $rootScope.$broadcast('$getDealdetails',deal);
				 }
			 }
		})
	}
	
	if($rootScope.categories==null)
	{
		$timeout(function(){
		  apiFactory.getCats(function(data){
			 $rootScope.loading = false;
			 $rootScope.categories=data.product_category;
		  });
		},5000);
	}
})