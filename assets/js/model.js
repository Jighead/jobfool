$(function(){

    //Job search
    var $jobSearch = $('#job-search'),
        $perpage = 10;
        $sort = 'relevance';
        $radius = 45;
        $dateadded = 45;
  
    var getUrlParameter = function(param) {
        param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // are we on a subdomain? if so switch country accordingly.
    var subdomain = window.location.hostname.split('.')[0];
    var subs = ['de','fr','es','au','can','uk','us']; // check for valid subdomains
    if (!subs.includes(subdomain)) {subdomain = 'us'};
    if (subdomain === 'can') {subdomain = 'ca'};

    if ( $jobSearch.length ) {

        var $form = $jobSearch.find('form'),
            $keywords = $form.find('#x-what'),
            $location = $form.find('#x-where'),
            $result = $('#job-results'),
            $resultSet = $('#job-results-set'),
            $resultLinks = $('#job-results-pagination'),
            $resultTemplate = $('#job-result').template();
        
        var toRad = function(degree) {
            rad = degree* Math.PI/ 180;
            return rad;
        };
        var R = 6371; // Radius of the earth in km

        // lets get the users location and ip
        var userLat , userLon, userIP;
        $.ajax({
            async: false,
            url: '//freegeoip.net/json/',
            type: 'POST',
            dataType: 'jsonp',
        }).done(function(data){
            userLat = data.latitude,
            userLon = data.longitude,
            userIP = data.ip,
            userCity = data.city,
            userRegion = data.region_code,
            userCountry = data.country_code;
            console.log(data);
        }).fail( function(){
            var userLat = 29.035972,
            userLon = -81.301479,
            userIP = '209.95.50.127';
        });

        var distance = function (lat2, lon2) {
            var dLat = toRad(lat2-userLat);  // Javascript functions in radians
            var dLon = toRad(lon2-userLon);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(toRad(userLat)) * Math.cos(toRad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
                d = d * 0.621371;
                d = d.toFixed(0);
            return parseFloat(d);
        };
        
        var calcDistance = function(){
            $('.job-search-result .distance').each(function(){
                var $this = $(this),
                    $lat = $this.attr('data-lat'), // gets lat and lon from search result(job location)
                    $lon = $this.attr('data-lon'),
                    $d = distance($lat,$lon);
                $this.append($d + ' miles');
            });
        };
        
        //Draw result set
        var drawResultSet = function (data) {
            clearResultSet();
            $.tmpl($resultTemplate, data.results).appendTo('#job-results-set');
            $("#start").html(data.start);
            $("#end").html(data.end);
            $("#totalresults").html(data.totalResults);
            $(".keywords").html(data.query);
            $(".location").html(data.location);
            if(data.location) {
                $('#info').html('<strong>'+ data.query.toUpperCase() + ' jobs near ' + data.location.toUpperCase() + '</strong>')
            } else {
                $('#info').html('<strong>'+ data.query.toUpperCase() + ' jobs ')
            }
          
            calcDistance();
        };
        var clearResultSet = function () {
            $resultSet.empty();
        };

        //Draw pagination
        var drawPaginationLinks = function (result) { 
            
            if ($resultLinks.html().length > 0) {return}; // if we already have it in the dom don't append anymore.
            var totalResults = result.totalResults,
                numPages = Math.ceil(totalResults / $perpage),
                $links = $('<ul class="pagination"></ul>');
            for ( var i = 1; i <= numPages; i++ ) {
                if(i > 10 ) {break;}
                $links.append('<li><a class="pagebtn" href="#job-search">' + i + '</a></li>');
            }
            $links.children('li').eq(0).addClass('active');
            $resultLinks.append($links);

        };
        var clearPaginationLinks = function () {
            $resultLinks.empty();
        };
        
        //Perform search
        // normally done via backend code but were on a front end only hosting site.
        var doSearch = function (params, done, fail) {
            //console.log('Searching with params', params);
            $.ajax({
                cache: false,
                data: $.extend({
                    publisher:'4407976915591140',// '1271737033048898', //'4407976915591140' // '7778623931867371'
                    v: '2',
                    format: 'json',
                    q: $keywords.val(),
                    l: $location.val(),
                    radius: $radius,
                    start: 0,
                    sort: $sort.toLowerCase(),
                    limit: $perpage,
                    fromage: $dateadded,
                    highlight: 1,
                    filter: 1,
                    latlong: 1,
                    co: subdomain,
                    userip: userIP,
                    useragent: 'HiFi CMS'
                }, params),
                dataType: 'jsonp',
                type: 'GET',
                timeout: 5000,
                url: '//api.indeed.com/ads/apisearch'
            }).done(done).fail(fail);
        };

        //Bind submit
        $form.submit(function (e) {
            e.preventDefault();
            var keywords = $keywords.val();
            var location = $location.val();
            keywords.length ? document.title = keywords : document.title = "Job Search - The Job Fool.com";

           var newUrl = window.location.origin +window.location.pathname +'?kw='+ keywords +'&l='+ location;
           history.pushState({}, null, decodeURIComponent(newUrl));
            //if ( keywords.length ) {
                //Reset entire form
                clearResultSet();
                clearPaginationLinks();
                
                //Perform new search
                doSearch({ start: 0 }, function (data) {
                    if ( data.totalResults === 0 ) {
                        $resultSet.html('<p>No results were found.</p>');
                    } else {
                        drawPaginationLinks(data);
                        drawResultSet(data);
                    }
                }, function () {
                    $resultSet.html(data);
                    //$resultSet.html('<p>Could not fetch search results. Try again later.</p>');
                });
            //}
        });
        
        //Bind pagination links
        $resultLinks.on('click', 'li', function (e) {
            var $this = $(this),
                goToPage = (Number($this.text()) - 1) * $perpage;
            $resultLinks.find('li').removeClass('active');
            $this.addClass('active');
            doSearch({ start: goToPage }, function (data) {
                drawResultSet(data);
            }, function () {
                $resultSet.html('<p>Could not fetch search results. Try again later.</p>');
            });
        });
        
        //Run search on load
        // var keyword = window.location.href.split('?kw=')[1];
        // $keywords.val(keyword);
        // if(keyword) { $form.submit(); }


        $("#sortfilter li a").click(function(e){
            e.preventDefault();
                $("#sort-btn").text($(this).text());
                $("#sort-btn").val($(this).text())
                $sort = this.text;
                $form.submit();
        });
    
        $("#distfilter li a").click(function(e){
            e.preventDefault();
                $("#distance-btn").text($(this).text());
                $("#distance-btn").val($(this).text())
                $radius = $(this).data("val");
                $form.submit();
        });

        $("#datefilter li a").click(function(e){
            e.preventDefault();
                $("#date-btn").text($(this).text());
                $("#date-btn").val($(this).text())
                $dateadded = $(this).data("val");
                $form.submit();
        });


        var keyword = getUrlParameter('kw');
        var l = getUrlParameter('l');
        $keywords.val(keyword);
        $location.val(l);
        if(keyword.length < 2) { 
        keyword = "wfh";
         $("#x-what").val("Work from Home");
        }
        if(keyword) { $form.submit(); }
    }
});
