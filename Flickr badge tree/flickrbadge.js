var flickrbadge = function() {

       /* configurations to changes*/

            var config = {
                           badgeID: 'flickrbadge',

                           nextLabel: '<img src="images/ra.gif" />',

                           prevLabel: '<img src="images/la.gif" />',

                           largePicID: 'flickrshot',

                           fullImageLink: 'See full image on flickr',

                           pics: 4
                         };
            var all;

            var objid; 

            var current=0;

            var largePic = null;



       /* private methods */

       function solveUrl(url) {

            var url = url.replace(/\/$/,'');

            var chunks = url.split('/');

            var all = chunks.length;

            var apiurl = 'http://api.flickr.com/services/feeds/photos_public.gne?id=';

                if(url.indexOf('tags') !== -1) {

                       var feedUrl = apiurl + chunks[all-3] + '&tags=' + chunks[all-1] + '&format=json';

                } else {

                       var feedUrl = apiurl + chunks[all-1] + '&format=json';
                }   

            var id = chunks.join('/').replace(/\/|:|@|\.|#.*/g,'');

            return [feedUrl,id]; 
       };  

       function init() {

            var objid = document.getElementById(config.badgeID);

                if(!objid) {return;}

            var a = objid.getElementsByTagName('a')[0];

            var href = a.href;  

            var data = solveUrl(href.replace('%40','@'));

                a.id = data[1]; 

            var script = document.createElement('script');

                script.setAttribute('type','text/javascript');

                script.setAttribute('src',data[0]);

                document.getElementsByTagName('head')[0].appendChild(script);  
       }; 

       function compute(json) {

            var reg = /\/|:|@|\.|#.*/g;
 
            var chunks = json.link.split('/');

                chunks[4] = json.items[0].author_id;

            var id = chunks.join('/').replace(reg,'');

                objid = document.getElementById(id).parentNode;

            var ul = document.createElement('ul');

            var output = '';

              for(var i=0;json.items[i];i++) {

                  //var temp = json.items[i].description.match(/src=&quot;([^&]*)&quot;/)[1];

                  //var temp = json.items[i].description.match(/src=\"([^&]*)\"/)[1].replace(/width=\"[0-9]*\"/,'').replace(/height=\"[0-9]*\"/,'');

                    var temp = json.items[i].description.match(/src=\"(.*?)\"/)[1];

                      temp = temp.replace(/_m.jpg/g,'_s.jpg');
 
                      output += '<li><a href="'+json.items[i].link+'" title="'+json.items[i].title.replace(/"/gi,"&#34;")+'" onclick="flickrbadge.show(this);return false;"><img src="'+temp+'" alt="'+json.items[i].title+'"></a></li>';
 
               }

                ul.innerHTML = output;


            var prevLink = '<span class="controlls"><a href="#" onclick="flickrbadge.navigate(-1);return false;">'+config.prevLabel+'</a></span>';
                        
                        objid.innerHTML = prevLink;

             var nextLink = '<span class="controlls"><a href="#" onclick="flickrbadge.navigate(1);return false;">'+config.nextLabel+'</a></span>';   

                        objid.innerHTML += nextLink;

                        objid.appendChild(ul); 

           all = json.items.length;

               for(var i=0;i<all;i++) {

                    objid.getElementsByTagName('li')[i].style.display = 'none';
               }


           navigate(0);  
       };


       function navigate(offset) {

               for(var i=0;i<all;i++) {

                    objid.getElementsByTagName('li')[i].style.display = 'none';
               }

            var change = offset*config.pics;

                current += change;

               for(var i=current;i<current+config.pics;i++) {

                    objid.getElementsByTagName('li')[i].style.display = 'block';                
               }


            var prev = objid.getElementsByTagName('a')[0];

                prev.style.display = current == 0 ? 'none' : 'block'; 

            var next = objid.getElementsByTagName('a')[1];

                next.style.display = current == all-config.pics ? 'none' : 'block'; 


       };   



       function show(o) {

                if(largePic == null) {

                     largePic = document.createElement('div');

                     largePic.id = config.largePicID;  

                     document.body.appendChild(largePic);

                     largePic.style.position = 'absolute'; 
                 }

                 var stuff = '<p><a href="'+o.href+'">'+config.fullImageLink+'</a></p>';

                 largePic.innerHTML = '<a href="#" onclick="this.parentNode.style.display=\'none\';this.parentNode.parent.focus();return false" class="fjbcloser">X</a><h4>'+o.title+'</h4><a href="#" onclick="this.parentNode.style.display=\'none\';this.parentNode.parent.focus();return false">'+o.innerHTML.replace(/_s.jpg/,'_m.jpg')+'</a>'+stuff;

                   largePic.style.display = 'block';


                   var y=0;


                   if(self.pageYOffset) {

                         y = self.pageYOffset;

                   } else if(document.documentElement && document.documentElement.scrollTop) {

                                    y=document.documentElement.scrollTop;

                          }  else if(document.body) {

                                    y=document.body.scrollTop;

                             }

                      largePic.style.top = 200 + y + 'px';

                      largePic.parent = o; 

                      largePic.getElementsByTagName('a')[0].focus();
       };   


       /* public methods */

       return {
 
               init: init,

               compute: compute, 

               navigate: navigate,

               show: show

              };

}();


function jsonFlickrFeed(json) {

     flickrbadge.compute(json);

}

flickrbadge.init();
