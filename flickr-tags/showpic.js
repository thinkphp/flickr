
/*
##########################################################################
# Author: Adrian Statescu                                                #
# Project:Show images receive from format JSON (JavaScriptObjectNotation)#
# Framework: Mootools                                                    #  
##########################################################################
*/
//border size for photo.
//var borderSize = 0;

//get current photo id from url
//var curURL = document.location.href;
//var splitURL = curURL.split("#");
//var photoId = splitURL[1];


//if not photoId then set default 0
//var photoId = (!photoId)? 0 : photoId;
 
//var borderSize = borderSize * 2;

//var hasThumbs = false;


var ShowPhotos = new Class({

           initialize: function(rsp)
                   {

                       this.hasThumbs = false;

                       this.registerEvents();
		       this.tweenTimer = 500;
		       this.playTimer = 5000;
                       this.tweenType = Fx.Transitions.quintOut;
		       this.loadDelay = 0;
		       this.loadTimer = this.tweenTimer + this.loadDelay;
		       this.photoNum = rsp.photos.photo.length;
		       this.photoInfo = {};
		       this.rsp = rsp;                       

                    //loop through to build object with each photo s info
                        
                        for(var i=0 ; i < this.photoNum; i++)
                          {
                               this.photoInfo[i] = {
                                                      'id': rsp.photos.photo[i].id,
                                                      'owner': rsp.photos.photo[i].owner,
                                                      'src': 'http://static.flickr.com/'+rsp.photos.photo[i].server+'/'+rsp.photos.photo[i].id+'_'+rsp.photos.photo[i].secret+'.jpg',
                                                      'title': rsp.photos.photo[i].title   
                                                    }

                                   if(i == this.photoNum - 1) this.initSwap();
                            //alert("Load..."+this.photoInfo[i].title+'-'+photoId);
                          }//end for


                   }, //end initialize


              
                    //Remove all elements from div ThumbContainer
                   removeThumb: function(){

                                            $('ThumbContainer').empty();photoId = 0;

                                          },
                    
                   //Remove all events
                   removeEv: function(){

                                        $('NextLink').removeEvents('click');

                                        $('PrevLink').removeEvents('click');

                                        this.stopAutoPlay();

                                        $('PlayToggle').removeEvents('click');

                                        $('ViewThumbs').removeEvents('click');

                                       }, 


              setNewPhotoParams: function()
                  {
                    //get source (src) of new image and set up
                    $('Photo').setProperty('src',this.photoInfo[photoId].src);
                    
                  },   




              
             showPhoto: function()
                  {
                     //show photo block but hide loading graphic
                     $('Photo').setStyle('display','block');
                     $('Loading').setStyle('display','none');

                        //Fade photo in 
                          $('Photo').effect('opacity').custom(0,1).chain(function(){
			                                                            $('Controls').setStyle('display','block');
		                                                                   });

                  },







             startResize: function(pid)
                 { 
                   //get current photo dimansions width and height
                    this.wCurr = $('Container').getStyle('width').toInt();  
                    this.hCurr = $('Container').getStyle('height').toInt();  

                   //get new photo dimensions from response
                     new Moo().callFlickrUrl({method: 'flickr.photos.getSizes',photo_id: pid});
                 },





              endResize: function(rsp)
                { //alert("Resize..."+photoId);

                 //set new image dimensions from response

                    this.wNew = rsp.sizes.size[3].width;    
                    this.hNew = rsp.sizes.size[3].height;    

                    if(this.wNew == this.wCurr && this.hNew == this.hCurr) this.setNewPhotoParams.delay(10,this); 

                          else {

                                   // Set photo source and links
                                     this.setNewPhotoParams();
                                     
                                   // Only resize if needed
                                  var myPhoto = new Fx.Styles('Container', { duration: this.tweenTimer, transition: this.tweenType });
                                                        myPhoto.start({
				                                         'height': [this.hCurr, this.hNew],
                                                                          'width': [this.wCurr, this.wNew]
                                                                      });

			          var myCaption = new Fx.Styles('CaptionContainer', { duration: this.tweenTimer, transition: this.tweenType }).custom({
                                                         'width': [this.wCurr, this.wNew]
                                                                      });
		              }//end else



                },

                






             setCaption: function()
                {
                 $('Caption').setHTML(this.photoInfo[photoId].title);  
                 $('Counter').setHTML((photoId+1) + '/'+ (this.photoNum));
                },









             initSwap: function()
                  {

                     //Show loading graphics
                      $('Loading').setStyle('display','block');

                     //hide photo, caption, navigation
                      $('Photo').setStyles({opacity: 0, display: 'none'});
                      $('Controls').setStyle('display','none');

                     //resize Container and set Caption
                       this.startResize(this.photoInfo[photoId].id);
                       this.setCaption();

                     //highlight the selected image of thumbnail view
                       this.setActiveThumb(); 

                  },



 
                  jumpToPhoto: function(id)
                    {
                     
                      photoId = id;
                      this.initSwap();

                    },

                 

                 setActiveThumb: function()
                    { 

                    $$('#ThumbContainer a').each(function(el,key){
                                
                                         el.removeClass('selected');

                                         if( key == photoId)  el.addClass('selected');
 
                                                });  
 

                    }, 


                 




                createThumbs: function(rsp)
                    {
                        var thumbLink = {};
                        var thumbImage = {};
 
                        var my_obj=this;
                    
                    var elem = new Element('span').setStyles({'color':'#0099ff','font-family':'Verdana','letter-space':'5px','font-size':'22px','font-weight':'bold'}).setHTML('/photos/tags/'+tagName).injectInside('ThumbContainer');

                    //loop through photos to generate gallery
                    rsp.photos.photo.each( function(value,key){

         
                     //Create links to large photos
                     thumbLink[key] = new Element('a',{
                                                      'href': 'javascript://', 
                                                      'title': value.title,
                                                      'events': {
                                                                 click: function(){  
                                                                                    my_obj.jumpToPhoto(key);  
                                                                                    $('ThumbContainer').setStyle('display','none');
                                                                                    $('Container').setStyle('display','block');
                                                                                    $('CaptionContainer').setStyle('display','block');
                                                                                   }
                                                                }



                                                      }).injectInside($('ThumbContainer'));
 



                      thumbImage[key] = new Element('img',{
                                                              'height': 75,
                                                              'width': 75, 
                                                              'alt': value.title,
                                                              'src': 'http://static.flickr.com/'+value.server+'/'+value.id+'_'+value.secret+'_s.jpg',
                                                              'border': 0, 
                                                              'events': {
                                                                          mouseenter: function() {  this.setStyle('opacity',1,0);  },
                                                                          mouseleave: function()  {  this.setStyle('opacity',0.3); }
                                                                        }

                                                           }).setStyle('opacity',0.3).injectInside(thumbLink[key]); 
                                                         

                                               });//end each                
                                        

                                      
                     this.hasThumbs = true;
                  },  



                  nextImage: function()
                    {
                    (photoId == (this.photoNum - 1)) ? photoId = 0 : photoId++;
                    //photoId = (photoId == (this.photoNum - 1) ) ? 0 : photoId + 1; alert('next='+photoId);
                    this.initSwap();  

                    },




                  prevImage: function()
                    {
                    (photoId == 0) ? photoId = this.photoNum - 1 : photoId--;
                    //photoId = (photoId == 0 ) ? (this.photoNum - 1) : photoId - 1; alert('prev'+photoId);
                    this.initSwap();  

                    },


                 toggleAutoPlay: function(timer)
                    {

                    if(this.iTimerID) this.stopAutoPlay();
                                  else
                                      {
                                       this.nextImage();
                                       this.startAutoPlay(timer);                                         
                                      }

                    },

                 startAutoPlay: function(timer)
                    {
                     this.iTimerID = ( function(){ this.nextImage();}.bind(this) ).periodical(timer);                    
                    },

                 stopAutoPlay: function()
                    {

                    $clear(this.iTimerID); 
                    this.iTimerID = null;

                    },
                  


                registerEvents: function()
                    {

                // Pop all links in paragraphs in new windows
		$$('p a').each(function(el) {
			el.addEvent("click", function(e) {
				window.open(el.href);
				new Event(e).stop()
			});
		                            });






                    //AddEvents for slideShow

                    $('Photo').addEvent('load',function(){this.showPhoto.delay(this.loadTimer)}.bind(this)); 
                    $('Controls').addEvent('mouseover',function(){$('Controls').setStyle('opacity','1.0'); }.bind(this)); 
                    $('Controls').addEvent('mouseout',function(){$('Controls').setStyle('opacity','0.3'); }.bind(this)); 
                    $('Photo').addEvent('mouseover',function(){$('Controls').setStyle('opacity','1.0'); }.bind(this)); 
                    $('Photo').addEvent('mouseout',function(){$('Controls').setStyle('opacity','0.3'); }.bind(this)); 
                   
                    $('NextLink').addEvent('click',function(){ this.nextImage();this.stopAutoPlay();}.bind(this)); 
                    $('PrevLink').addEvent('click',function(){ this.prevImage();this.stopAutoPlay();}.bind(this)); 
                    $('PlayToggle').addEvent('click',function(){this.toggleAutoPlay(this.playTimer);}.bind(this));

                    $('ViewThumbs').addEvent('click', function(){

                                     //stopAutoplay
                                     if(this.iTimerID) this.stopAutoPlay(); 

                                     //create Thumbs only once   
                                     if(this.hasThumbs == false) {this.createThumbs(this.rsp);this.setActiveThumb();}

                                     $('ThumbContainer').setStyle('display','block'); 
                                     $('Container').setStyle('display','none');
                                     $('CaptionContainer').setStyle('display','none');
                         }.bind(this));
                                                 


                  }//end register






});