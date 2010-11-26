<?php

      $error = 'Error retrieving data! Please try again!';

      //set endpoint
      $root = 'http://query.yahooapis.com/v1/public/yql?q=';

      //set statement YQL
      $yql = 'select * from html where url="http://www.flickr.com/photos/statescua/tags/" and xpath="//p[@id=\'TagCloud\']"';

      //set URL
      $url = $root . urlencode($yql) .'&diagnostics=false&format=xml';

      //get content in format XML
      $xml = get($url);

         //using regexp for clean results
         $xml = preg_replace("/.*<results>|<\/results>.*/",'',$xml);

         $xml = preg_replace("/<\?xml version=\"1\.0\" encoding=\"UTF-8\"\?>/",'',$xml);

         $xml = preg_replace("/<!--.*-->/",'',$xml);

         $xml = preg_replace("/Â/",'',$xml);

         $xml = preg_replace("/' '/",'',$xml);

         $xml = preg_replace("/href=\"\/photos\/statescua\/tags/",'href="http://flickr.com/photos/statescua/tags',$xml);
          
      //using cURL
      function get($url) {

                 $ch = curl_init();

                 curl_setopt($ch,CURLOPT_URL,$url);   

                 curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);

                 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 
                 $data = curl_exec($ch);

                 curl_close($ch);

                 if(empty($data)) {return $error;}

                            else {return $data;}
 
       }//end function get

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>Flickr Tagcloud PHP Solution</title>
   <style type="text/css">
   html,body {font:14px 'trebuchet ms', tahoma, sans-serif;background:#000;color:#fff;}
   h1{font:200% georgia,times,serif;}
   a { color:#6bff63;padding: 4px;}
   a:hover { background:#0D8000;color:#fff;}
   #container{padding-left: 50px;}
   #ft{margin-top:2em;color:#777;font-size:90%;}
   #ft a{color:#ccc;}
   </style>
   <script type="text/javascript">
   </script>
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1>/ Flickr / thinkphp / tags / </h1></div>
   <div id="bd" role="main">

	<div class="yui-g">

          <div id="container">

             <?php echo$xml; ?>

          </div>	

	</div>

	</div>
   <div id="ft" role="contentinfo"><p>Created By Adrian Statescu</p></div>
</div>
</body>
</html>
