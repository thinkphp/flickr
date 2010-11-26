getFlickr = {

            html: [],

            tags: [],  

            triggerClass: 'getflickrphotos',

            loadingMessage: 'Loading...',

            viewerID: 'flickrgetviewer',

            closeMessage: 'close',

            closePhotoMessage: 'Click to close',

            init: function(tag, func) {

                   getFlickr.func = func;
 
                   getFlickr.tag = tag;

                   var s = document.createElement('script');

                       s.type = 'text/javascript';                   

                       s.src = 'http://flickr.com/services/feeds/photos_public.gne?tags='+tag+'&format=json';

                       document.getElementsByTagName('head')[0].appendChild(s);
            },

            getLinks: function() {

                    var links = document.getElementsByTagName('a');

                        for(var i=0;i<links.length;i++) {

                                if(links[i].className.indexOf(getFlickr.triggerClass) != -1) {

                                        getFlickr.addEvent(links[i],'click',getFlickr.getData,false);
                                }
                        }
            },

            getData: function(e) {

                     var x = getFlickr.getTarget(e);

                     if(x.nodeName.toLowerCase() != 'a') {x = x.parentNode;}

                     var tag = x.href.match(/([\w|\+]+)?\/?$/);

                     getFlickr.currentLink = x;

                     getFlickr.currentText = x.innerHTML;

                     x.innerHTML = getFlickr.loadingMessage;

                     getFlickr.init(tag,'getFlickr.feedLink');   

                   

                getFlickr.cancelClick(e); 
            }, 

            compute: function(json) {

                     var x = json.items;

                     var t;

                     getFlickr.html[getFlickr.tag] = '';

                     getFlickr.tags[getFlickr.tag] = '';

                     for(var i=0,j=x.length;i<j;i++) {

                           getFlickr.html[getFlickr.tag] += '<li><a href="'+x[i].link+'"><img src="'+x[i].media.m+'" alt="'+x[i].title+'" ></a></li>';

                           t +=x[i].tags + ' ';  
                     } 

                     t = t.replace(/\s$/,'');

                     var x = t.split(' ');

                     x = x.sort(); 

                     for(var i=0,j=x.length;i<j;i++) {

                         if(i>0 && x[i-1] != x[i]) {
                            
                              getFlickr.tags[getFlickr.tag] += x[i] + ' ';  
                         } 
                     }                     


                     if(getFlickr.func !== 'undefined') {

                           eval(getFlickr.func+'()');
                     }
            },


            feedLink: function() {

                    getFlickr.currentLink.innerHTML = getFlickr.currentText;

                    var viewer = document.getElementById(getFlickr.viewerID);

                        if(viewer === null) {

                               var viewer = document.createElement('div');

                                   viewer.id = getFlickr.viewerID;

                                   document.body.appendChild(viewer);  

                        } else {

                                   viewer.innerHTML = '';
                        }

                    var closer = document.createElement('a');

                        closer.href = '#';

                        closer.innerHTML = getFlickr.closeMessage;

                        closer.onclick = function(e) {

                               this.parentNode.parentNode.removeChild(this.parentNode);

                               return false; 
                        }

                        viewer.appendChild(closer);

                        var ul = document.createElement('ul');

                            ul.innerHTML = getFlickr.html[getFlickr.tag].replace(/_m/g,'_s');

                        viewer.appendChild(ul);  

                        var y = 0;

                            if(self.pageYOffset) {

                                  y = self.pageYOffset;  

                            } else if(document.documentElement && document.documentElement.scrollTop) {

                                  y = document.documentElement.scrollTop;

                            } else if(document.body) {

                                  y = document.body.scrollTop;
                            }

                       viewer.style.top = 170 + y + 'px';

                       getFlickr.addEvent(ul,'click',getFlickr.showPic,false); 

            },

            showPic: function(e) {

                 var ob = getFlickr.getTarget(e);                     

                     if(ob.nodeName.toLowerCase() === 'img') {

                           var p = document.getElementById('flickrgetviewer');

                           var s = ob.src.replace('_s','_m');

                           var x = ob.parentNode.cloneNode(false); 

                           var picView = document.createElement('div');

                               x.innerHTML = '<img src="'+s+'" title="'+getFlickr.closePhotoMessage+'"/>';

                               picView.appendChild(x);

                               if(p.getElementsByTagName('div').length > 0) {

                                   p.replaceChild(picView,p.getElementsByTagName('div')[0]);

                               }  else {

                                   p.appendChild(picView);
                               }

                               picView.onclick = function(e) {
 
                                      this.parentNode.removeChild(this);

                                      return false;
                               }


                     }//end if 


                 getFlickr.cancelClick(e);

            },

            addEvent: function(elem,evType,fn,useCapture) {

                      if(elem.addEventListener) {

                                elem.addEventListener(evType,fn,useCapture);

                      } else if(elem.attachEvent) {

                                var r = elem.attachEvent('on'+evType,fn);

                                return r;
                      } else {

                                elem['on'+evType] = fn;
                      }
            },

            cancelClick: function(e) {

                     if(window.event) {

                           window.event.cancelBubble = true;

                           window.event.returnValue = false; 
                     }

                     if(e && e.stopPropagation && e.preventDefault) {

                           e.stopPropagation();

                           e.preventDefault();
                     }
            },
      
            getTarget: function(e) {

                     var target = window.event ? window.event.srcElement : e ? e.target : null;

                     while(target.nodeType != 1 && target.nodeName.toLowerCase() !== 'body') {

                              target = target.parentNode; 
                     }

                     if(!target) {return false;}

                 return target;
            }                          
};

function jsonFlickrFeed(json) {

         getFlickr.compute(json); 
}

getFlickr.addEvent(window,'load',getFlickr.getLinks,false);