function jsonFlickrFeed(json) 
{ 

    flickrbadge.compute(json); 

}


var flickrbadge = function() {

      var config = {

                     badgeID: 'photos'

                   };



     /* public methods */
                   
          return {


                   addEvent: function(elem,evnType,fn,useCapture) {

                             if(elem.addEventListener) {

                                      elem.addEventListener(evnType,fn,useCapture);    

                             } else if(elem.attachEvent) {

                                       r = elem.attachEvent('on' + evnType, fn); 

                                          return r;

                                      } else {

                                         elem['on' + evnType] = fn;
                                      }           
                    },

                   
                  init: function() { 

                         var script = document.createElement('script');

                         var ul = document.getElementById(config.badgeID);

                         var a = ul.getElementsByTagName('a')[0];

                             userID = a.href.replace(/.*\//g,'');

                             srcurl = 'http://api.flickr.com/services/feeds/photos_public.gne?id='+ userID +'&format=json';

                             script.setAttribute('type','text/javascript');

                             script.setAttribute('src', srcurl);

                             document.getElementsByTagName('head')[0].appendChild(script);

                     },

                  compute: function(jsonFromFlickr) {

                          if(!jsonFromFlickr) {
 
                               alert('Unable to load photos.') ;

                               return;
                          } 

                            var ul = document.getElementById('photos');

                          while(ul.hasChildNodes()) {

                               ul.removeChild(ul.firstChild);
                          } 

                         for(var i = 0,j = 0, photo; photo = jsonFromFlickr.items[i],j <= 8 ; i++, j++) {

                           ul.appendChild(makePhotos(photo));  
                        }

                    }



            };


         /* private method */     


          function makePhotos(photo) {

                  var li = document.createElement('li');

                  var a = document.createElement('a');

                      a.href = photo.link;

                      a.title = photo.title;

                  var img = document.createElement('img');

                      img.alt = photo.title;

                      img.src = photo.media.m.replace('_m','_s');

                      img.title = photo.title;

                      a.appendChild(img);       

                     li.appendChild(a); 

              return li;
          };

}();//end class


flickrbadge.addEvent(window,'load',flickrbadge.init,false);
//flickrbadge.init();

//window.onload = flickrbadge.init;

