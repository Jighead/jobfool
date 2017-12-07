$(function(){
    //Job search
    var $jobSearch = $('#job-search'),
        $perpage = 10;

    var getUrlParameter = function(param) {
        param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };


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
        var doSearch = function (params, done, fail) {
            //console.log('Searching with params', params);
            $.ajax({
                cache: false,
                data: $.extend({
                    publisher: '1271737033048898',
                    v: '2',
                    format: 'json',
                    q: $keywords.val(),
                    l: $location.val(),
                    radius: 30,
                    start: 0,
                    sort: 'relevance',
                    limit: $perpage,
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
                    $resultSet.html('<p>Could not fetch search results. Try again later.</p>');
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


        var keyword = getUrlParameter('kw');
        var l = getUrlParameter('l');
        $keywords.val(keyword);
        $location.val(l);
        if(keyword.length < 2) { 
        keyword = "wtf";
         $("#x-what").val("Work from Home");
        }
        if(keyword) { $form.submit(); }
    }
});
