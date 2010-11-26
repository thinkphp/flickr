flickrdigg = {

     init: function(e) {

        flickrdigg.tagsList = document.createElement('ul');
        flickrdigg.tagsList.id = 'flickrdiggTags';
        flickrdigg.photosList = document.createElement('ul');
        flickrdigg.largePhoto = document.createElement('p');
        flickrdigg.largePhoto.id = 'flickrdiggPhoto';
        flickrdigg.photosList.id = 'flickrdiggPhotos';
        flickrdigg.photosList.style.display = 'none';
        flickrdigg.tagsList.style.display = 'none';

        var f = document.getElementsByTagName('form')[0];
        var b = document.createElement('div');
            b.id = 'box';
            b.appendChild(flickrdigg.tagsList);
            b.appendChild(flickrdigg.photosList);
            b.appendChild(flickrdigg.largePhoto);
            f.appendChild(b);
            b.style.display = 'none';

            YAHOO.util.Event.on(f,'submit',flickrdigg.doit);
            YAHOO.util.Event.on(flickrdigg.tagsList,'click',flickrdigg.getBooty);
            YAHOO.util.Event.on(flickrdigg.largePhoto,'click',function(e){flickrdigg.disappear(e);YAHOO.util.Event.preventDefault(e);}); 
     },

     doit: function(e) {

             flickrdigg.tag = document.getElementById('tag').value;

         var t = document.getElementById('info');

             t.style.display = 'none';

             document.getElementById('box').style.display = 'block';

             flickrdigg.getBooty(e);  

             YAHOO.util.Event.preventDefault(e);             
     },  

     getBooty: function(e) {

        var t = YAHOO.util.Event.getTarget(e);


              if(t.nodeName.toLowerCase() == 'a') {

                 flickrdigg.tag = t.firstChild.nodeValue;

                 document.getElementById('tag').value = flickrdigg.tag; 
              }

              if(t.nodeName.toLowerCase() == 'a' || t.nodeName.toLowerCase() == 'form') {

                   var url = 'http://flickr.com/services/feeds/photos_public.gne?tags='+flickrdigg.tag+'&format=json';
 
                   var script = document.createElement('script');

                       script.setAttribute('type','text/javascript');  

                       script.setAttribute('src',url);

                       document.getElementsByTagName('head')[0].appendChild(script);
              }

            YAHOO.util.Event.preventDefault(e);
     },

     showImg: function(e) {

          var o = this;

          YAHOO.util.Dom.setStyle(o,'opacity',0);
 
          o.style.display = 'block';

          var anim = new YAHOO.util.Anim(o, { opacity: {to: 1} }, 1, YAHOO.util.Easing.easyOut);

          anim.animate();
  
     },

     showPhoto: function(e) {

         YAHOO.util.Event.preventDefault(e);

         var o = YAHOO.util.Event.getTarget(e);           

         if(o.nodeName.toLowerCase() == 'img') {

                 var large = o.src.replace(/_s.jpg/g,'_m.jpg');

                 var a = document.createElement('a');
 
                     a.href = o.parentNode.href;

                 var img = document.createElement('img');

                     img.src = large;

                     a.appendChild(img);

                     flickrdigg.largePhoto.innerHTML = '';

                     flickrdigg.largePhoto.appendChild(a,flickrdigg.largePhoto); 
                    
                     YAHOO.util.Dom.setStyle(flickrdigg.largePhoto,'display','block');
                     YAHOO.util.Dom.setStyle(flickrdigg.largePhoto,'opacity',1);

                     YAHOO.util.Dom.setStyle(img,'opacity',0);
                     YAHOO.util.Dom.setStyle(img,'display','block');
                     YAHOO.util.Event.on(img,'load',function() {
                                                var anim = new YAHOO.util.Anim(this,{ opacity: {to: 1} }, .6);
                                                anim.animate();
					});


         };//end if

     },

     disappear: function(e) {

        var t = YAHOO.util.Event.getTarget(e);

        var anim = new YAHOO.util.Anim(t.parentNode.parentNode,{ opacity: {to: 0} }, .6);
        
            anim.animate();

            anim.onComplete.subscribe(function(){

					var x = this.getEl();
					x.style.display='none';
				});



        YAHOO.util.Event.preventDefault(e);
     }  

};

function jsonFlickrFeed(json) {

       var output = '';

       var tagsoutput = '';

       var tags = '';


       for(var i in json.items) {
 
             //var temp = json.items[i].description.match(/src=&quot;([^&]*)&quot;/)[1];

               var temp = json.items[i].description.match(/src=\"(.*?)\"/)[1];

                 temp = temp.replace(/_m.jpg/g,'_s.jpg');  

                 output += '<li><a href="'+json.items[i].link+'" title="'+json.items[i].title+'"><img src="'+ temp +'" alt="'+json.items[i].title+'"></a></li>';

                 tags +=json.items[i].tags+' ';

       };//end for

       var x = tags.split(' ');

           x.sort();

           for(var i=0;i<x.length;i++) {

                 if(i>0 && x[i] != x[i-1] && x[i]!='') {

                     tagsoutput += '<li><a href="#">'+x[i]+'</li>';
                 }
           }   

         YAHOO.util.Dom.setStyle(flickrdigg.tagsList,'opacity',0);
         YAHOO.util.Dom.setStyle(flickrdigg.photosList,'opacity',0);
         flickrdigg.tagsList.style.display = 'block';
         flickrdigg.photosList.style.display = 'block';
         flickrdigg.tagsList.innerHTML = tagsoutput;
         flickrdigg.photosList.innerHTML = output;

     var anim = new YAHOO.util.Anim(flickrdigg.tagsList,{opacity:{to: 1}}, .6);

         anim.animate();


     var anim2 = new YAHOO.util.Anim(flickrdigg.photosList,{opacity:{to: 1}}, .6);

         anim2.animate();

     var imgs = flickrdigg.photosList.getElementsByTagName('img');

         YAHOO.util.Dom.setStyle(imgs,'opacity',0);  

         YAHOO.util.Event.on(imgs,'load',flickrdigg.showImg);

         YAHOO.util.Event.on(flickrdigg.photosList,'click',flickrdigg.showPhoto);

}

YAHOO.util.Event.on(window,'load',flickrdigg.init);






