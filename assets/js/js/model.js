$(function(){
    //Job search
    var $jobSearch = $('#job-search');
    if ( $jobSearch.length ) {
        var $form = $jobSearch.find('form'),
            $keywords = $form.find('#keywords'),
            $result = $jobSearch.find('#job-results'),
            $resultSet = $result.find('#job-results-set'),
            $resultLinks = $result.find('#job-results-pagination'),
            $resultTemplate = $('#job-result').template();
        
        var toRad = function(degree) {
            rad = degree* Math.PI/ 180;
            return rad;
        };
        var R = 6371; // Radius of the earth in km
        var distance = function (lat2, lon2) {
            var lat1 = 28.999745,
                lon1 = -81.287088;
            var dLat = toRad(lat2-lat1);  // Javascript functions in radians
            var dLon = toRad(lon2-lon1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
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
                    $lat = $this.attr('data-lat'),
                    $lon = $this.attr('data-lon'),
                    $d = distance($lat,$lon);
                $this.append($d + ' miles');
            });
        };
        
        //Draw result set
        var drawResultSet = function (data) {
            clearResultSet();
            //console.log(data.results);
            $.tmpl($resultTemplate, data.results).appendTo($resultSet);
            calcDistance();
        };
        var clearResultSet = function () {
            $resultSet.empty();
        };

        //Draw pagination
        var drawPaginationLinks = function (result) {
            var totalResults = result.totalResults,
                perPage = 10,
                numPages = Math.ceil(totalResults / perPage),
                $links = $('<ul></ul>');
            for ( var i = 1; i <= numPages; i++ ) {
                $links.append('<li><a href="#job-search">' + i + '</a></li>');
            }
            $links.children('li').eq(0).children('a').addClass('active');
            $resultLinks.append($links);
        };
        var clearPaginationLinks = function () {
            $resultLinks.empty();
        };
        
        //Perform search
        var doSearch = function (params, done, fail) {
            //console.log('Searching with params', params);
            $.ajax({
                cache: false,
                data: $.extend({
                    publisher: '1271737033048898',
                    v: '2',
                    format: 'json',
                    q: $keywords.val(),
                    l: 'Lake Mary, FL',
                    radius: 20,
                    start: 0,
                    sort: 'date',
                    limit: 10,
                    fromAge: 30,
                    highlight: 1,
                    filter: 1,
                    latlong: 1,
                    co: 'us',
                    userip: '74.52.81.178',
                    useragent: 'HiFi CMS'
                }, params),
                dataType: 'jsonp',
                type: 'GET',
                timeout: 5000,
                url: 'http://api.indeed.com/ads/apisearch'
            }).done(done).fail(fail);
        };

        //Bind submit
        $form.submit(function (e) {
            e.preventDefault();
            var theKeywords = $keywords.val();
            //if ( theKeywords.length ) {
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
                    $resultSet.html('<p>Could not fetch search results. Try again later.</p>');
                });
            //}
        });
        
        //Bind pagination links
        $resultLinks.on('click', 'a', function (e) {
            var $this = $(this),
                goToPage = (Number($this.text()) - 1) * 10;
            $resultLinks.find('a').removeClass('active');
            $this.addClass('active');
            doSearch({ start: goToPage }, function (data) {
                drawResultSet(data);
            }, function () {
                $resultSet.html('<p>Could not fetch search results. Try again later.</p>');
            });
        });
        
        //Run search on load
        var keyword = window.location.href.split('?keyword=')[1];
        $keywords.val(keyword);
        if(keyword) { $form.submit(); }
    }
});
