

<?php
/* see this site for full working angular app including all javascript
https://www.w3tweaks.com/demo/indeed_api_jobs/indeed_api_job_search.zip
https://www.w3tweaks.com/indeed/tutorial-about-how-create-jobs-portal-using-indeed-api.html 
*/

	$q = $_GET['q'];
	$l = $_GET['l'];
	$limit = $_GET['limit'];
	$end = $_GET['end'];
	$start = $_GET['start'];
	$sort = $_GET['sort'];
	$jt = $_GET['jt'];
	$fromage = $_GET['fromage'];
	$radius = $_GET['radius'];
 
	$data = array(
		'publisher' => '7778623931867371',
	    'v' => 2,
	    'format' => 'json',
	    'q' => $_GET['q'],
	    'l' => $_GET['l'],
	    'jt' => $jt,
	    'fromage' => $fromage,
	    'limit' => $limit,
	    'start' => $start,
	    'end' => $end,
		'radius' => $radius,
	    'sort' => $sort,
	    'highlight' => 1,
	    'filter' => 1,
	    'latlong' => 1,
	    'co' => 'United States'
	);
 
    $param = http_build_query( $data ) . "\n";
 
 
	$url = 'http://api.indeed.com/ads/apisearch?'.$param;
	//print($url);
 
	header('Content-type: application/json');
	$obj = file_get_contents($url,true);
	echo $obj;
?>