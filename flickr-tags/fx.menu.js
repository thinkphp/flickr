var myMenu = new Class({


        //constructorul class myMenu
        initialize: function(List,options)
             {

              this.List = List;
                
          var my_default = options['defaultLI'];
          

     if(navigator.appVersion.indexOf("MSIE") != -1)
            { 

            this.List.each(function(list){
                       
                     var child = list.getFirst();


                     if( '#' + my_default == child ) 
                              {
                                list.setStyle('background-color','#D0EB6A');
                                child.setStyle('color','#1a1a1a');
                                list.selected=true;
                                tagName = my_default;
                                new Moo().callFlickrUrl({method: 'flickr.photos.search',user_id:'23455178@N06',tags: my_default});
                              }

                                       });//end each
            }

            else { 


                  this.List.each(function(list){
                       
                     var child = list.getFirst();

                     var myLocation = window.location.href.split("#")[0];

                     if( myLocation +"#"+ my_default == child ) 
                              {
                                list.setStyle('background-color','#D0EB6A');
                                child.setStyle('color','#1a1a1a');
                                list.selected=true;
                                tagName = my_default; 
                                new Moo().callFlickrUrl({method: 'flickr.photos.search',user_id:'23455178@N06',tags: my_default});
                              }

                                       });//end each



                }//end else
                 

 
              this.registerEvents(); 

             },//end constructor



         
         registerEvents: function()
             {

               var objList = this.List;  

               var opt = this.options;
 
               var initSwap = this.fn;
                            
                   this.List.each(function(list){
                             

                            var child=list.getFirst();

                            
                            var fx1 = new Fx.Styles(list, {duration: 200,wait: false});

                            var fx2 = new Fx.Styles(child, {duration: 200,wait: false});

                                list.addEvent('mouseenter',function(){   
                                                                       
                                                                         fx1.start({'margin-left':'20'});

                                                                         if(!list.selected) {fx2.start({'color':'#D0EB6A'}); }
         
                                                                        });



                                list.addEvent('mouseleave',function(){  
             
                                                                         if(!list.selected){ fx2.start({'color':'#fff'}); }

                                                                         fx1.start({'margin-left':'0'}); 
                                                                        
                                                                                
                                                                        });



                                list.addEvent('click',function(e){    

                                                                     fx1.stop();

                                                                     fx2.stop();

                                                                     var my_obj = this;

                                                                                objList.each(function(list)
                                                                                            {   
                                                                                               var child=list.getFirst();
                                                                                               if(list != my_obj) {list.setStyle('background-color','#333');child.setStyle('color','#fff');list.selected=false;}
                                                                                                                 else
                                                                                                                  {list.setStyle('background-color','#D0EB6A');child.setStyle('color','#1a1a1a');list.selected=true;}
                                                                      
                                                                                            }); 


                                                                      var child=list.getFirst();

                                                                          var afterHref = child.href.split("#")[1];
                                                                          
                                                                            tagName=afterHref; 
                                                                            new Moo().callFlickrUrl({method: 'flickr.photos.search',user_id:'23455178@N06',tags: afterHref});
                                                                                                                    
                                                                     new Event(e).stop();
                                                                       
                                                                   }); 

                                 
                            

                                            });



              
                           
             }

 
 
});