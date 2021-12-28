/* <script> */
function loadjscssfile(filename, filetype, classid){
  if (filetype=="js"){     var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){     var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    if(classid) { fileref.setAttribute("class", classid) }
      fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}


function tooltip(num) {
WidgetHelpJquery('#getbtnpopmod'+num).popModal("hide");
var find = WidgetHelpJquery('#getbtnpopmod'+num).find('.tooltipdiv');
alert(find);
if(find.html()!="") {
WidgetHelpJquery('#getbtnpopmod'+num).popModal({
html : "<div>"+find.html()+"</div>",
placement : WidgetHelpJquery('#positiontooltip').val(),
showCloseBut : true,
onDocumentClickClose : true,
onDocumentClickClosePrevent : '',
overflowContent : true,
inline : true,
asMenu : false,
beforeLoadingContent : '...',
onOkBut : function() {},
onCancelBut : function() {},
onLoad : function() {},
onClose : function() {}
});
}
}



function createWidgetHelpButton(options) {
  if(!options.settingspage) {options.settingspage='';}  if(!options.mainbackground) {options.mainbackground='#3399ff';}  if(!options.fasize) {options.fasize='2';}  if(!options.direction) {options.direction='right';}  if(!options.clockwise) {options.clockwise=false;}  if(!options.radius) {options.radius=1000000;} 
 if(!options.position) {options.position='rightbottom';} 
 if(options.position=='rightbottom') { if(options.direction=='bottom' || options.direction=='right') {options.direction='top';} }  if(options.position=='leftbottom') { if(options.direction=='bottom' || options.direction=='left') {options.direction='top';} }  if(options.position=='lefttop') { if(options.direction=='top' || options.direction=='left') {options.direction='bottom';} }  if(options.position=='righttop') { if(options.direction=='top' || options.direction=='right') {options.direction='bottom';} } 
 if(!options.iconopen) {options.iconopen="fwidgethelp-commenting-o";}  if(!options.iconclose) {options.iconclose="fwidgethelp-close";}  if(!options.maintitle) {options.maintitle="";} 

 var urltoscript = "https://getbtn.com/widget/";

 options.mainbackground1 = options.mainbackground.replace(/^#/, "");  loadjscssfile(urltoscript+"widget-button.css.php?d="+options.direction+"&c="+options.mainbackground1, "css","style1");
  loadjscssfile(urltoscript+"fonts.css", "css");
 loadjscssfile(urltoscript+"ico-fontawesome/style.css", "css");

 
 Widget = {
  created: false,
  widgetElement: null,
  show: function() {

    
    if(!options.arrbtn) {
      //var arrgetbtn=[];
      //arrgetbtn.push({"title":"Telegram","icon":"fwidgethelp-telegram"});
      //arrgetbtn.push({"title":"Facebook Messenger","icon":"fwidgethelp-facebook-messenger"});
      //arrgetbtn.push({"title":"Whatsapp","icon":"fwidgethelp-whatsapp"});
      arrgetbtn = "";
    }
    else { var arrgetbtn = options.arrbtn; }
    var htmlwidgethelpbuttons ='';

    if(arrgetbtn)
    arrgetbtn.forEach(function(btn, i, arrgetbtn) {
            //if(options.direction=="top" || options.direction=="bottom") { var atitle=''; var tooltip = '<span class="title">'+btn.title+'</span>'; } else {var tooltip=''; var atitle=btn.title;}

    //  htmlwidgethelpbuttons=htmlwidgethelpbuttons+'<li data-count="'+i+'" data-name="'+btn.title+'"><a target="_blank" title="'+btn.title+'" href="'+btn.link+'"><span class="fwidgethelp-stack fwidgethelp-1x"><span class="fwidgethelp fwidgethelp-circle fwidgethelp-stack-2x"></span><i style="background:'+btn.background+';color:'+btn.color+'" class="fwidgethelp '+btn.icon+' fwidgethelp-stack-1x fwidgethelp-inverse" title="'+btn.title+'"></i></span></a></li>';

if(!btn.target || options.settingspage==1) { btn.target1 = "_blank"; }
else {btn.target1=btn.target;}

var newbtn = '<li data-count="'+i+'" data-name="'+btn.title+'">\
      <a title="'+btn.title+'" href="'+btn.link+'" target="'+btn.target1+'">\
      <span class="fwidgethelp-stack fwidgethelp-1x">\
      <span class="fwidgethelp fwidgethelp-circle fwidgethelp-stack-2x"></span>\
      <i style="background:'+btn.background+';color:'+btn.color+'" class="fwidgethelp '+btn.icon+' fwidgethelp-stack-1x fwidgethelp-inverse" title="'+btn.title+'"></i>\
      </span>\
      </a></li>';



      htmlwidgethelpbuttons=htmlwidgethelpbuttons+newbtn;

    });



        this.widgetElement = document.createElement('div');
    this.widgetElement.setAttribute('id', 'widgethelp_uniquecssid');
    this.widgetElement.setAttribute('style', 'visibility:hidden;height:0;width:0');         this.widgetElement.setAttribute('class', options.position);
    this.widgetElement.innerHTML = ' \
                <div class="widgethelptrigger '+options.position+'" title="'+options.maintitle+'">\
    <span style="font-size:'+options.fasize+'em;" class="fwidgethelp-stack widgethelp_shadow"><i class="fwidgethelp fwidgethelp-circle fwidgethelp-stack-2x"></i><i id="widgethelp_icon"  style="color:'+options.maincolor+';" data-status="close" class="fwidgethelp '+options.iconopen+' '+options.pulse+' fwidgethelp-stack-1x fwidgethelp-inverse"></i></span>\
     <a class="widgethelptext '+options.position+'" target="_blank" href="//getbtn.com">GetBtn</a>\    </div>\
    <div style="font-size:'+options.fasize+'em" class="widgethelpbuttons '+options.position+'"><ul>'+htmlwidgethelpbuttons+'</ul></div>';
    document.body.insertBefore(this.widgetElement, document.body.firstChild);
    this.widgetElement.style.display = 'block';



        var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",urltoscript+"WidgetHelpJquery.min.js"); if (script_tag.readyState) {   script_tag.onreadystatechange = function () {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      scriptLoadHandler();
    }
  };
} else {
  script_tag.onload = scriptLoadHandler;
}
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

function scriptLoadHandler() {
                WidgetHelpJquery = WidgetHelpJquery.noConflict();
                main();
      }


      function main() {
        WidgetHelpJquery(window).load(function(){ WidgetHelpJquery('#widgethelp_uniquecssid,.widgethelpbuttons').hide().css({'visibility':'visible','height':'auto','width':'auto'}).fadeIn(); });

        WidgetHelpJquery(document).ready(function($) {
          $('.widgethelptext').hide();




                    var stack = WidgetHelpJquery('#widgethelp_uniquecssid ul').stackmenu();
          stack.stackmenu('option', 'direction', options.direction);           stack.stackmenu('option', 'clockwise', options.clockwise);           stack.stackmenu('option', 'radius', options.radius); 
          WidgetHelpJquery('.widgethelptrigger').click( function(){
            stack.stackmenu('toggle');
                if(options.settingspage==1) {                   options.iconopen = $('#openicon').val();                    if($('#pulse_effect').is(':checked')) { options.pulse='widgethelp_pulse'; } else { options.pulse=''; }
                }
                $('#widgethelp_icon').removeAttr('data-status').removeClass(options.iconopen);

                if($('#widgethelp_icon').getRotateAngle()>0) {                   var to=-720; $('#widgethelp_icon').attr('data-status','close').removeClass(options.iconclose).addClass(options.iconopen).addClass(options.pulse);
                  $('.widgethelptext').fadeOut();
                }
                else {                   var to=720; $('#widgethelp_icon').attr('data-status','open').removeClass(options.iconopen).removeClass('widgethelp_pulse').addClass(options.iconclose);
                  $('.widgethelptext').fadeIn();
                }

                WidgetHelpJquery('#widgethelp_icon').rotate({angle:0,animateTo:to});
              });


});
}


}
}
Widget.show();
}

createWidgetHelpButton(WidGetButtonOptions);