mooflickrbadge = new Class({
         Implements: [Options, Events],
         options: {
             containerClass: 'flickrbadge',
             openClass: 'flickrbadgeopen',
             originClass: 'flickrlink',
             listClass: 'flickritems',
             bigImageClass: 'flickrimage',
             CSSURL: 'flickrbadge.css',
             prevHTML: '<img src="la.gif" alt="prev"/>',
             nextHTML: '<img src="ra.gif" alt="next"/>',
             seeAllLabel: 'see all photos',
             navClass: 'flickrnav',
             currentClass: 'current'
         },
  
         bs: [],

         initialize: function(options) {
     
               this.setOptions(options);     

             var c = new Element('link');

                 c.setProperty('rel','stylesheet');                        

                 c.setProperty('type','text/css');

                 c.setProperty('href',this.options.CSSURL);

                 document.getElementsByTagName('head')[0].appendChild(c);

             var a = $$('.'+this.options.containerClass); 

                 a.each(function(el,index){ 

                     this.init(el);

                 }.bind(this));  
         },

         compute: function(o) { 

               var reg = /\/|:|@|\./g;

               var chunks = o.link.split('/');

                   chunks[4] = o.items[0].author_id;

               var id = chunks.join('/').replace(reg,'');

               var ori = $(id);

               var oldori = o.link.replace(reg,'');

                   if(!ori) {

                         if(oldori) { ori = oldori; }

                               else

                                    { return; }
                   }

               var out = ''; 

               var list = new Element('ul');

                   list.addEvent('click',function(e){this.show(e,id)}.bindWithEvent(this));

                     $(list).addClass(this.options.listClass); 

                    for(var i=0;o.items[i];i++) {

                             if(i%5 === 0) {

                                                if(i > 0) {

                                                   out += '</ul></li>';  
                                                };

                                            out +='<li><ul>'; 

                                           } 

                       out +='<li><a href="' +o.items[i].link + '"><img src="' + o.items[i].media.m.replace('_m','_s') + '" alt="' + o.items[i].title +'"></a></li>';

                    } 

                   list.innerHTML = out;

                   ori.appendChild(list);

                var outlist = new Element('ul');
                  $(outlist).addClass(this.options.navClass);

                var li = new Element('li');
                var back = new Element('a').set('href','#').addEvent('click',function(e){this.navigate(e,-1,id)}.bind(this)).set('html', this.options.prevHTML).injectInside(li); 
                    li.injectInside(outlist); 

                var li = new Element('li');
                var span = new Element('span').set('text','1 / 4');
                    this.bs[id] = {};
                    this.bs[id].count = span;
                    li.appendChild(span);
                    outlist.appendChild(li);                       

                var li = new Element('li');
                var fwd = new Element('a').set('href','#').addEvent('click',function(e){this.navigate(e,1,id)}.bind(this)).set('html',this.options.nextHTML).injectInside(li);
                    li.injectInside(outlist); 

                   outlist.injectInside(ori);   

                   this.bs[id].sets = list.getElementsByTagName('ul');

                 var p = new Element('p');
                 var a = new Element('a');

                     a.setProperty('href',o.link).set('html', this.options.seeAllLabel);
                     p.appendChild(a);
                     ori.appendChild(p); 

                 this.bs[id].current = 0;

                  $(this.bs[id].sets[0]).addClass(this.options.currentClass);
         },  

         show: function(e,id) {;

                 new Event(e).stop();

              var t = $(e.target);

                     if(t.nodeName.toLowerCase() === 'img') { 

                          if(this.bs[id].img) { this.bs[id].img.parentNode.removeChild(this.bs[id].img); }


                       var img = new Element('img').addClass('flickrimage').setProperty('src',t.src.replace('_s','_m')).addClass(this.options.bigImageClass);

                       var asus = this; 

                           img.addEvent('click',function(e){
                                                            this.parentNode.removeClass(asus.options.openClass);
                                                            this.parentNode.removeChild(this);
                                                            asus.bs[id].img = null;
                                                           });

                           t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(img);

                           t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.addClass(this.options.openClass);

                           this.bs[id].img = img;
                     }          
             
         },

         navigate: function(e,dir,id) {

                   new Event(e).stop();

               var b = this.bs[id];

                   $(b.sets[b.current]).removeClass(this.options.currentClass);

                   b.current = b.current + dir;

                   if(b.current == 4) b.current = 0; 

                   if(b.current == -1) b.current = 3;    

                   b.count.innerHTML = (b.current+1) + ' / 4 ';

                   $(b.sets[b.current]).addClass(this.options.currentClass);
               
         },


         sanitizeUrl: function(url) {

                                var url = url.replace(/\/$/,''); 

                                var realname = (url.indexOf('#') !== -1) ? url.split('#')[1] : null;

                                    url = url.split('#')[0];

                                var chunks = url.split('/');

                                var all = chunks.length;

                                var apiurl = 'http://flickr.com/services/feeds/photos_public.gne?id=';

                                      if(url.indexOf('tags') !== -1) {

                                             var feedURL = apiurl + chunks[all-3] + '&tags=' + chunks[all-1] + '&format=json';

                                                chunks[all-3]=realname || chunks[all-3];

                                                                                        
                                      } else {

                                             var feedURL = apiurl + chunks[all-1] + '&format=json';

                                                 chunks[all-1] = realname || chunks[all-1];
                                             }      

                                 var id = chunks.join('/').replace(/\/|:|@|\.|#.*/g,'');

                                    return[feedURL,id];                                                    

         },

         init: function(o) {

                 var src = o.getElementsByTagName('a')[0];
                     
                    $(src).addClass(this.options.originClass);

                 var data = this.sanitizeUrl(src.href.replace('%40','@'));

                     o.id = data[1];

                var s = new Element('script');

                    s.setProperty('type','text/javascript');

                    s.setProperty('src',data[0]); 
 
                    document.getElementsByTagName('head')[0].appendChild(s);                     
         } 

});


function jsonFlickrFeed(json) { 

    mflickrbadge.compute(json);

};



var mflickrbadge = new mooflickrbadge();



