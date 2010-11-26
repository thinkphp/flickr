//Creating objects using Literal Notation

var fjb = {

//properties to change

     pics: 5,
     nextLabel: 'next',
     prevLabel: 'prev',
     linkID: 'flickrlink',
     largePicID: 'flickrshot',
     navClass: 'nav',
     loadingMessage: 'Loading images...',
     fullImageLink: 'See full image on flickr',

//end properties


  ls: null,
  
  current: 1,


     init: function() {

             fjb.srcLink = document.getElementById(fjb.linkID);

                 if(!fjb.srcLink) {return;}

             fjb.srcLink.innerHTML = fjb.loadingMessage;


          var furl = fjb.srcLink.href.replace(/.*photos\//,'');   

          var url = 'http://flickr.com/services/feeds/photos_public.gne?id='+furl+'&format=json';

          var script = document.createElement('script');

              script.type = 'text/javascript';

              script.src = url; 

              document.getElementsByTagName('head')[0].appendChild(script);

     },


     compute: function(obj){


          fjb.stream = document.createElement('ul');

          fjb.stream.id = fjb.linkID;


        var output = '', temp = '';


           for(var i in obj.items) {

                 //temp = obj.items[i].description.match(/src=&quot;([^&]*)&quot;/)[1];

                 //temp = obj.items[i].description.match(/src=\"([^&]*)\"/)[1].replace(/width=\"[0-9]*\"/,'').replace(/height=\"[0-9]*\"/,'');

               var temp = obj.items[i].description.match(/src=\"(.*?)\"/)[1];
               
                 temp = temp.replace(/_m.jpg/g,'_s.jpg'); 

                 output +='<li><a href="'+obj.items[i].link+'" title="'+ obj.items[i].title + '" onclick="fjb.show(this);return false"><img src="'+ temp + '" alt="'+obj.items[i].title+'" /></a></li>';

           }  

        var rep = fjb.srcLink.parentNode.nodeName.toLowerCase() == 'p' ? fjb.srcLink.parentNode : fjb.srcLink;

            rep.parentNode.replaceChild(fjb.stream,rep);

        fjb.stream.innerHTML = output;    

        var prevLink = '<li class="'+ fjb.navClass +'"><a href="#" onclick="fjb.navigate(-1);return false;">'+ fjb.prevLabel +'</a></li>';

            fjb.stream.innerHTML = prevLink + fjb.stream.innerHTML;

        var nextLink = '<li class="'+ fjb.navClass +'"><a href="#" onclick="fjb.navigate(1);return false;">'+ fjb.nextLabel +'</a></li>';

            fjb.stream.innerHTML += nextLink;             

         fjb.all = obj.items.length;


                    for(var i=1;i<=fjb.all-1;i++) {

                        fjb.stream.getElementsByTagName('li')[i].style.display = 'none';
                    }

         fjb.navigate(0);    

     },

     navigate: function(offset) {

                    for(var i=1;i<=fjb.all;i++) {

                        fjb.stream.getElementsByTagName('li')[i].style.display = 'none';
                    }


             var change = fjb.pics * offset;

                 fjb.current += change;

                     for(var i=fjb.current;i<fjb.current+fjb.pics;i++) {

                                   fjb.stream.getElementsByTagName('li')[i].style.display = 'block';         
                     } 

             var f1 = fjb.stream.getElementsByTagName('a')[0];

                 f1.style.display = fjb.current == 1 ? 'none' : 'block';

             var l1 = fjb.stream.getElementsByTagName('a')[fjb.all+1];

                 l1.style.display = fjb.current > fjb.all-fjb.pics ? 'none' : 'block';


     },

     show: function(o) {

             if(fjb.ls == null) {


                   fjb.ls = document.createElement('div');

                   document.body.appendChild(fjb.ls);

                   fjb.ls.id = fjb.largePicID;

                   fjb.ls.style.position ='absolute';

             }

               var prev = '<p><a href="'+o.href+'">'+fjb.fullImageLink+'</a></p>';

                   fjb.ls.innerHTML = '<a href="#" onclick="this.parentNode.style.display=\'none\';this.parentNode.parent.focus();return false" class="fjbcloser">X</a><h4>'+o.title+'</h4><a href="#" onclick="this.parentNode.style.display=\'none\';this.parentNode.parent.focus();return false">'+o.innerHTML.replace(/_s.jpg/,'_m.jpg')+'</a>'+prev;

                   fjb.ls.style.display = 'block';


                   var y=0;


                   if(self.pageYOffset) {

                         y = self.pageYOffset;

                   } else if(document.documentElement && document.documentElement.scrollTop) {

                                    y=document.documentElement.scrollTop;

                          }  else if(document.body) {

                                    y=document.body.scrollTop;

                             }

                      fjb.ls.style.top = y + 'px';

                      fjb.ls.parent = o; 

                      fjb.ls.getElementsByTagName('a')[0].focus();

     }, 

     addEvent: function(elem,evnType,fn,useCapture) {

             if(elem.addEventListener) {

                  elem.addEventListener(evnType,fn,useCapture);

             } else if(elem.attachEvent) {

                   r = elem.attachEvent('on' + evnType,fn);

                       return r;

               } else {
                   
                       elem['on'+evnType] = fn;  

                      }                    
     } 
         
};



function jsonFlickrFeed(json) {

      fjb.compute(json);
}


fjb.addEvent(window,'load',fjb.init,false);

//window.onload = fjb.init;




