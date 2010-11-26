/*
  Framework: Mootools
  Author: Adrian Statescu
  Project: slideshow based on Mootools
          ################################################################################
          ##create tag <script> and inject in section <head> for response a variable JSON#
          ################################################################################
*/
var Moo = new Class({
         
        initialize: function(type, format)
                    {
                     //API KEY
                     this.fApiKey = '122dfa9c426b628247dc2fdfbb7b2ca3'; 
                     this.fBaseUrl = 'http://www.flickr.com/services/';
                     this.fType = (!type)?'rest':type;
                     this.fFormat =(!format)?'json':forma;
                     this.fArgs = {};   
                       

                    },
        setFlickrUrl: function(args)
                    {

                    this.fArgs.api_key = this.fApiKey;
                    this.fArgs.format = this.fFormat;

                    //combin args in this call with those in the object instance already
                    Object.extend(this.fArgs, args);  
                    this.fUrl = this.fBaseUrl+this.fType+'/?'+Object.toQueryString(this.fArgs);
                    
                     return this.fUrl;
                    },

        callFlickrUrl: function(args)
                    {
                     //create script element and append to DOM 
                     var script = new Element('script');    
                     script.setProperties({type: 'text/javascript',src: this.setFlickrUrl(args)});
                     script.injectInside($E('head')); 
                     //alert(script.src);
                    }



});