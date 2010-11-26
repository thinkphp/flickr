var tags = new Class({
        
        //constructor class tags 
        initialize: function(rsp)
               {
                this.tags = rsp.who.tags.tag;

                this.tagsNum = rsp.who.tags.tag.length;
 
                this.tagsInfo = {};

                for(var i=0; i< this.tagsNum; i++)
                    
                       this.tagsInfo[i] = {

                                           _content: rsp.who.tags.tag[i]._content

                                          }   
                 
                 this.injectTags();      
                 
               },//end constructor

           
            injectTags: function()
               {

               var loadMenu=function()
                        {

                                 var list = $$("#myTags li");
                                 new myMenu(list,{defaultLI:'nepot'});
                       };



                 var createTag = function(element)
                       {
 
                           var el = new Element('li');
                           var link = new Element('a',{href: '#'+element}).setHTML(element).injectInside(el);
                           $(el).effect('width',{duration: 1000,transition: Fx.Transitions.Bounce.easeOut}).start(0,100);
                           el.injectInside($('myTags'));

                       };


                   var x = new Chain();

                        this.tags.each(function(element){ x.chain( function(){createTag(element._content); });});  

                        x.chain(function(){loadMenu();});  
                       

                   var runTags = function()
                              {
                
                                 x.callChain();
  
                                 if(x.chains.length == 0) runTags = $clear(timer);     
                              };
                    

                        timer = runTags.periodical(500); 
           
           
                 }


          
         

});