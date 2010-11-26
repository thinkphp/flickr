function jsonFlickrFeed(json) 
{

    flickrbadge.compute(json); 

}


flickrbadge = function() {


        var config = {

                      badgeID: 'photos',

                      largePicID: 'flickrshot',

                      fullImageLink: 'See full image on flickr'  

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

                             if(!ul) {return;}

                         var a = ul.getElementsByTagName('a')[0];    

                             userID = a.href.replace(/.*\//g,'');

                             srcurl = 'http://api.flickr.com/services/feeds/photos_public.gne?id='+ userID +'&format=json';

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

                       /*

                         for(var i = 0,j = 0, photo; photo = jsonFromFlickr.items[i],j <= 8 ; i++, j++) {

                           ul.appendChild(makePhotos(photo));  
                        }

                         
                        
                          for(var i in jsonFromFlickr.items) {

                                 //temp = jsonFromFlickr.items[i].description.match(/src=&quot;([^&]*)&quot;/)[1];

                                 temp = jsonFromFlickr.items[i].description.match(/src="(.*?)"/)[1];
               
                                 temp = temp.replace(/_m.jpg/g,'_s.jpg'); 

                                 output +='<li><a href="'+jsonFromFlickr.items[i].link+'" title="'+ jsonFromFlickr.items[i].title + '" onclick="flickrbadge.displayPhoto(this);return false"><img src="'+ temp + '" alt="'+jsonFromFlickr.items[i].title+'" /></a></li>';
                          }  

                         */    

                          var output = '', temp = '';

                          for(var i=0, j=0, json; json = jsonFromFlickr.items[i],j<=8; i++,j++) {

                                 //temp = json.description.match(/src=&quot;([^&]*)&quot;/)[1];

                                 temp = jsonFromFlickr.items[i].description.match(/src="(.*?)"/)[1];
               
                                 temp = temp.replace(/_m.jpg/g,'_s.jpg'); 

                                 output +='<li><a href="'+json.link+'" title="'+ json.title + '" onclick="flickrbadge.displayPhoto(this);return false"><img src="'+ temp + '" alt="'+json.title+'" /></a></li>';
                          }  


                           ul.innerHTML = output;
                       

                    },

                   displayPhoto: displayPhoto


            };


         /* private method */     


          function makePhotos(photo) {

                  var li = document.createElement('li');

                  var a = document.createElement('a');

                      a.href = photo.link;

                      a.title = photo.title;
                      
                      a.onclick = function(e){displayPhoto(this);return false;}
 
                  var img = document.createElement('img');

                      img.alt = photo.title;

                      img.src = photo.media.m.replace('_m','_s');

                      img.title = photo.title;

                      a.appendChild(img);       

                     li.appendChild(a); 

              return li;
          }



        function displayPhoto(o) { 

              if(flickrbadge.ls == null) {

                 flickrbadge.ls = document.createElement('div');

                 document.body.appendChild(flickrbadge.ls);

                 flickrbadge.ls.id = config.largePicID;

                 flickrbadge.ls.style.position = 'absolute';
    
              }

                var prev = '<p><a href="' + o.href + '">' + config.fullImageLink + '</a></p>';

                    flickrbadge.ls.innerHTML = '<a href="#" onclick="this.parentNode.style.display=\'none\';return false" class="imgLargecloser">X</a><h4>' + o.title + '</h4><a href="#" onclick="this.parentNode.style.display=\'none\';return false;">'+o.innerHTML.replace(/_s.jpg/,'_m.jpg')+'</a>'+prev;

                    flickrbadge.ls.style.display = 'block';
          
                var y = 0;

                    if(self.pageYOffset) {

                            y = self.pageYOffset;

                    } else if(document.documentElement && document.documentElement.scrollTop) {

                            y = document.documentElement.scrollTop;   

                      } else if(document.body) {

                            y = document.body.scrollTop;

                        }     
                

                    flickrbadge.ls.style.top = parseInt(y+150) + 'px';
 
                    flickrbadge.ls.parent = o;

                    flickrbadge.ls.getElementsByTagName('a')[0].focus();         

        } 

}();//end class


flickrbadge.addEvent(window,'load',flickrbadge.init,false);


//window.onload = flickrbadge.init;

