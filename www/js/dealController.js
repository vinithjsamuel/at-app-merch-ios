app.controller('dealController',function($rootScope, $scope, $http,$location,$routeParams,apiFactory,$cookies,$cookieStore)
{
	var filter='', cat_id=0;
	$scope.currentPage = 1,$scope.numPerPage = 5,$rootScope.loading = true; 
	$scope.deals=[];
	$scope.buyAsGift=0;
    $scope.deal_count=null;
	$rootScope.backBtnShow=false;
    $rootScope.noMoreDeals=1;
	
	$scope.cat_slug=null;
	
	if (typeof $routeParams.filter === "undefined") 
		filter='all';
	else	
		filter=$routeParams.filter;
		
	if (typeof $routeParams.category === "undefined") 
	{
		if(filter=='all'){
			$rootScope.PageTitle="All Deals";
		}
		if(filter=='today')	{
			$rootScope.PageTitle="Today Deals";
		}
		if(filter=='featured')	{
			$rootScope.PageTitle="Featured Deals";	
		}
		if(filter=='SOON')	{
			$rootScope.PageTitle="Ending Soon Deals";	
		}
			
		$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);	
	}
	else
	{
		$scope.cat_slug=$routeParams.category;
		
		if($rootScope.selectedCatName!=null)
		{
			$rootScope.backBtnShow=true;
			
			cat_id=filter=$rootScope.selectedCatId;
		
			$rootScope.PageTitle=$rootScope.selectedCatName.toUpperCase()+" - Deals ";
		}
		else
		{
			$rootScope.PageTitle="All Deals ";
			
			$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);	
			
			filter='all';
		}
	}
	
	$scope.sliceDeals=function(cat_slug){
		
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    		
		var end = begin + $scope.numPerPage;
		
		var deals=null;
		
		if(cat_slug==null)
			deals=$rootScope.deals.slice(begin, end);
		else
		{
			var dealCats=[];
			var filteredDeals=[];
			$.each($rootScope.deals,function(index,deal){
				dealCats=deal.cat_slug;
				if(dealCats.indexOf(cat_slug)!="-1")
				{
					filteredDeals.push(deal);
				}
			})
			deals=filteredDeals.slice(begin, end);
		}
		$.each(deals,function(index,deal){
			$scope.deals.push(deal);
		});
		
		if(deals.length==5)
		{
			$scope.currentPage++;
			$rootScope.noMoreDeals=0;
		}
		else
		{
			$rootScope.noMoreDeals=1;
		}
		/*setTimeout(function(){
			$rootScope.applyCountdownTimer();
		},2000);*/
	}
	if($rootScope.deals!=null)
	{
		$scope.deal_count=$rootScope.deals.length;
		
		if($scope.deal_count!=0)
		{
			$scope.sliceDeals($scope.cat_slug);
		}
		else
		{
			$rootScope.noMoreDeals=1;
			$scope.deal_count=0;
		}
		$rootScope.loading = false;
	}
	else
	{	
		$rootScope.loadDealsTrigger=1;
		$rootScope.loading = true;
	}
	$scope.loadMore=function(){
		$scope.sliceDeals($scope.cat_slug);
	}
	
	$rootScope.$on("$getDeals",function(data,deals){
		$scope.deal_count=$rootScope.deals.length;	
		if($scope.deal_count!=0)
		{
			$scope.sliceDeals($scope.cat_slug);
		}
		else
		{
			$rootScope.noMoreDeals=1;
			$scope.deal_count=0;
		}
		$rootScope.loading = false;		
	})
	
});

app.controller('dealDetailController',function($rootScope, $scope, $http,$location,$routeParams)
{
	$scope.deals=[];
	
	$rootScope.dealEndTime=0;
	
	$rootScope.backBtnShow=true;
	
	$rootScope.loading = true;
	
	if($rootScope.deals!=null)
	{
		var result = $.grep($rootScope.deals, function(e){ return e.post_name == $routeParams.deal_name; });
		
		if(result.length!=0)
		{
			$scope.deals=result[0];
			
			$rootScope.PageTitle=$scope.deals.post_title;
			
			$scope.dealEndTime=parseInt($scope.deals.deals_millisecond);
			
			$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);	
			
		}
		
		$rootScope.loading = false;
		
	}
	else
	{
		$rootScope.dealDetailTrigger=1;
	}
	
	$rootScope.$on("$getDealdetails",function(data,deal){
		$scope.deals=deal;
		
		$rootScope.PageTitle=$scope.deals.post_title;
		
		$rootScope.dealEndTime=parseInt($scope.deals.deals_millisecond);
		
		/*setTimeout(function(){
			document.getElementById('countDownTime').start();
		},100)*/
		 
		/*console.log($rootScope.dealEndTime);*/
			
		$rootScope.$broadcast('$changeTitleData',$rootScope.PageTitle);
			
		$rootScope.loading = false;
	})
	
	$scope.goToBuyPage=function(deal_name,option)
	{
		var location="#/buy/"+deal_name+"?option="+option;
		if($scope.buyAsGift==1)
			location=location+"&buyAsGift=1";
		else
			location=location;
		$rootScope.toggle('dealOptionOverlay', 'off');
		window.location=location;
	}

});

