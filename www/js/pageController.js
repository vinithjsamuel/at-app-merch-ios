function pageController($rootScope, $scope, $sce, $http, $location) {
	$rootScope.loading = true;
    var internalContent = ['our-vission', 'contact'];
    $scope.pageDetail = {
        'our_vission': {
            'pageTitle': 'Our Vission',
            'pageContent': '<p>Our vision was to create an ultimate hub for beauty that is accessible with a touch of a button. This is why we developed aesthetictoday.com! </p><p>This is the first digital destination tailored to your specific needs. We work with partners, NOT merchants, to provide you with unbeatable deals on all your favorite aesthetic and beauty activities at top-of-the-line spas and clinics across the Middle East. </p><p>What makes aesthetictoday.com so exciting is that we only feature services and products that we ourselves would want to buy!</p><p>The Aesthetic Today Team and its ever-growing circle of partners aim to constantly provide you with exclusive opportunities by accessing the latest technologies and the pool of experts at SHOCKING prices.</p><p>And wait, there is more... in addition to these time-limited sales, our members can enjoy our generous tier, points, and loyalty programs and benefit from savings up to 85% on various service retail prices.</p>'
        },
        'contact': {
            'pageTitle': 'Contact Us',
            'pageContent': '<div class="clsContactDetails"><ul><li class="clsAddress"><i class="fa fa-home fa-2x"></i> Downtown Burj Khalifa, Dubai, UAE. P.O. Box 21409</li><li class="clsEmail"><i class="fa fa-pencil fa-2x"></i><a href="mailto:admin@aesthetictoday.com">admin@aesthetictoday.com</a></li><li class="clsContactNos"><i class="fa fa-phone fa-2x"></i><a href="tel:+971 4 4356756">+971 4 4356756</a><span class="contact_no"></span> </li></ul></div><div class="clsQuestions"><div class="subHeads">QUESTIONS?</div><div class="pageDesc"><p class="clsQuestion">Question about one of our deals?</p><p class="clsAnswer">Most of the information should be available in the deal’s description section. If you need any further clarifications, please do get in touch with us directly. We are here to help!</p></div><div class="pageDesc"><p class="clsQuestion">What do we offer?</p><p class="clsAnswer">We provide proactive services to our clients with a wide range of unbeatable and selective aesthetic and beauty deals.</p><p class="clsAnswer">We aim to build a professional relationship with our clients which is based on honesty, integrity and trust by delivering our client’s needs and making an impact on their lives.</p>'
        }
    };
    var location = $location.path();
    $rootScope.location = location;
    var internalLocCheck = location.replace("/", "");
    if (jQuery.inArray(internalLocCheck, internalContent) != "-1") {
        internalLocCheck = internalLocCheck.replace("-", "_");
        var data = $scope.pageDetail[internalLocCheck];
        $scope.pageContent = data.pageContent;
        $scope.pageTitle = data.pageTitle;
        $rootScope.$broadcast('$changeTitleData', $scope.pageTitle);
        $rootScope.loading = false
    } else {
        $http({
            method: 'POST',
            data: {
                mobile: 'yes'
            },
            url: site_url + location,
            processData: false
        }).success(function(data) {
            $scope.pageContent = $sce.trustAsHtml(data.page_content);
            if ($rootScope.location == "/partner-with-us") {
                var contact_frm_7_js = new Array();
                contact_frm_7_js[0] = site_url + "/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js";
                contact_frm_7_js[1] = site_url + "/wp-content/plugins/contact-form-7/includes/js/scripts.js";
                AesthticMobile.loadContactFrmJs(contact_frm_7_js, function() {
                    $rootScope.loading = false
                });
                $rootScope.loading = false
            } else {
                $rootScope.loading = false
            }
        })
    }
}
pageController.$inject = ['$rootScope', '$scope', '$sce', '$http', '$location'];