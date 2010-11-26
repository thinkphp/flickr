/*
  viewsHandler - a framework for DOM-based Applications
  Version: 1.0  
*/


viewsHandler = function() {

    var CSS = {

       classes: {

          hideClass: 'hiddenview' 

       }

    };


     var labels = {

        switchto: 'Switch to ' 

     };




    function createViews(canvas,views) {

        this.views = views;

        if(typeof canvas === 'string') {

              var canvas = document.getElementById(canvas);
 
        };//endif

        for(var i in views) { 

            var div = document.createElement('div');
 
                div.className = CSS.classes.hideClass;

                views[i].container = div;

                canvas.appendChild(div);

                   if(views[i].create) {

                          views[i].create();
                 
                   }
 
           
        };//endfor

    };//end function createViews


    function changeView(view) {

         var views = this.views;

         if(views.current) {

                      views[views.current].container.className = CSS.classes.hideClass;

         };//endif

         views[view].container.className = '';

         views.current = view;

    };//end function changeView


    function appendToContainer(view,item) {

         var views = this.views;

          if(typeof item === 'string') {

              var item = document.createTextNode(item);

          }//endif

         if(views[view]) {

               views[view].container.appendChild(item);

         }//endif


    };//end function appendToContainer

    function createSwitchLink(viewTo,label) {
             
         var a = document.createElement('a');

             a.href = labels.switchto + viewTo;

             a.appendChild(document.createTextNode(label));

             a.onclick = function() {

                  viewsHandler.view(viewTo);

                return false; 
             };

      return a;

    };//end function createSwitchLink   


    function defineLabel(view,field,item) {

        var views = this.views;

          if(views[view])  {

                views[view][field] = item; 

          }//endif      
     

    };//end function defineLabel 

    function setValue(view,field,value) {

        var views = this.views;

        if(views[view] && views[view][field]) {

               var field = views[view][field];

               if(typeof value === 'string' || typeof value === 'number') {

                    var value = document.createTextNode(value);
               }

               if(field.hasChildNodes()) {

                   field.replaceChild(value,field.firstChild);                    

               } else {

                   field.appendChild(value); 
               }  

        }//endif        



    };//end function setValue

        
    return {
      create: createViews,
      add: appendToContainer,
      define: defineLabel,
      view: changeView,
      linkto: createSwitchLink,
      set: setValue
    };



         

}();