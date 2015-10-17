//var site_url="http://localhost/karthi_code/at_live";
var site_url="http://dev.aesthetictoday.com";
var _wpcf7 = {"loaderUrl":site_url+"/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","sending":"Sending ..."};
if (window.location.protocol == "https:")
{
	site_url="https://aesthetictoday.com";
}
/*loadCSS("dist/css/mobile-angular-ui-base.min.css");
loadCSS("dist/css/mobile-angular-ui-desktop.min.css");
loadCSS("demo.css");
loadCSS("dist/css/custom.css");
loadCSS("css/style.css");*/

var windowWidth=0,windowHeight=0;
/*var heavyImage1 = new Image(); 
heavyImage1.src = "images/home_slider_1.jpg";
var heavyImage2 = new Image(); 
heavyImage2.src = "images/home_slider_2.jpg";
var heavyImage3 = new Image(); 
heavyImage3.src = "images/home_slider_3.jpg";

var heavyImageMobile1 = new Image(); 
heavyImageMobile1.src = "images/home_slider_1_mobile.jpg";

var heavyImageMobile2 = new Image(); 
heavyImageMobile2.src = "images/home_slider_2_mobile.jpg";

var heavyImageMobile3 = new Image(); 
heavyImageMobile3.src = "images/home_slider_2_mobile.jpg";*/
var AesthticMobile={
	windowResize:function()
	{
		if(windowWidth<=600)
		{
			$(".clsMobileDeals .clsDealTimeLeft").addClass('clearfix');
			$(".genPopupNoBorder").addClass("scrollable");
			$(".clsDealOptionCon").addClass("scrollable-content");
			
		}
		else
		{
			$(".clsMobileDeals .clsDealTimeLeft").removeClass('clearfix');
			$(".genPopupNoBorder").removeClass("scrollable");
			$(".clsDealOptionCon").removeClass("scrollable-content");
		}
	},
	loadContactFrmJs:function($scripts,callback){
		var ajaxes = [],
		loaded_scripts =[];		
		if($scripts.length)
		{
			 for (i=0;i<$scripts.length;i++)	
			 {
				var index=i;
				
				var src = $scripts[i];
				
				if (src) {
					ajaxes.push(jQuery.get(src, null, function (data) {
						loaded_scripts[index] = data;
					}, "html"));
				}
			 }			 
			jQuery.when.apply(null, ajaxes)
			.always(function () {
					for (var i in loaded_scripts) {
						try {
							jQuery.globalEval(loaded_scripts[i]);
						} catch (e) {}
					}
					callback();
			});
		}
	},
	closeOverlay:function(){
		window.location='#';
	}
}
$(document).ready(function(e) {
	windowWidth=$(window).width();
	windowHeight=$(window).height();
	AesthticMobile.windowResize();
	window.onresize = function(event) {
		windowWidth=$(window).width();
		windowHeight=$(window).height();
		AesthticMobile.windowResize();
	}
	var prevCon="#buyRegisterFrmCon";
	/*to open and close sidebar submenu*/
	$(document).on('click','#myAccountDropdown a.dropdown-toggle',function(){
		if($('body.has-sidebar-left').hasClass('sidebar-left-in')){
			//
		}
		else{
			$('body.has-sidebar-left').addClass('sidebar-left-in');
		}
	});
	$(document).on('click','#myAccountDropdown ul li',function(){
		if($('body.has-sidebar-left').hasClass('sidebar-left-in')){
			$('body.has-sidebar-left').removeClass('sidebar-left-in');
		}
	});
	$(document).on('click','.list-group > a.list-group-item',function(){
		if($('body.has-sidebar-left').hasClass('sidebar-left-in')){
			$('body.has-sidebar-left').removeClass('sidebar-left-in');
		}
	});

	$(document).on('click','.clsHaveAccount a',function(e){
		e.preventDefault();
		//console.log();
		var currentCon=$(this).attr("data-href");
		$(prevCon).fadeOut(1000,function(){
			prevCon	=currentCon;
			$(currentCon).fadeIn();
		});
		return false;
	})
	
});