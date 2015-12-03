function loadJs(a){document.script=document.createElement("script");document.script.setAttribute("type","text/javascript");document.script.setAttribute("src",a);document.body.appendChild(document.script)}function getBaseUrl(){var d="http://";var b=document.URL;var a=b.indexOf("/",d.length);var c=b.substr(0,a);return c}function selectAll(e,c){var d=document.getElementsByName(c);for(var b=0,a=d.length;b<a;b++){d[b].checked=e.checked}}function moveAllTr(b){var a=$("#"+b).get(0);var d=a.rows.length;for(var c=d-1;c>0;c--){a.deleteRow(c)}}function getSelectText(c,a,b){var d="";$("#"+c+" select[name='"+a+"'] option").each(function(){if(this.value==b){d=this.text;return(false)}});return d}function getRadio(d){var b=document.getElementsByName(d);for(var c=0,a=b.length;c<a;c++){if(b[c].checked){return b[c].value}}return""}function selectRadio(e,d){var b=document.getElementsByName(e);d=","+d+",";for(var c=0,a=b.length;c<a;c++){if(d.indexOf(","+b[c].value+",")!=-1){b[c].checked=true}else{b[c].checked=false}}}function getCheckbox(d){var c=document.getElementsByName(d);for(var b=0,a=c.length;b<a;b++){if(c[b].checked){return c[b].value}}return""}function selectCheckbox(e,d){var c=document.getElementsByName(e);d=","+d+",";for(var b=0,a=c.length;b<a;b++){if(d.indexOf(","+c[b].value+",")!=-1){c[b].checked=true}else{c[b].checked=false}}}function getCheckbox(b,c){var a=$("#"+b+" input[@type=checkbox][name='"+c+"'][checked]").val();if(a!=null&&a!=undefined&&a!="undefined"){return a}return""}function selectCheckbox(b,c,a){a=","+a+",";$("#"+b+" input[@type=checkbox][name='"+c+"']").each(function(){if(a.indexOf(","+$(this).val()+",")!=-1){this.checked=true}else{this.checked=false}})}function getRadio(b,c){var a=$("#"+b+" input[@type=radio][name='"+c+"'][checked]").val();if(a!=null&&a!=undefined&&a!="undefined"){return a}return""}function selectRadio(b,c,a){a=","+a+",";$("#"+b+" input[@type=radio][name='"+c+"']").each(function(){if(a.indexOf(","+$(this).val()+",")!=-1){this.checked=true}else{this.checked=false}})}function addOption(d,e,c,b,a){if(a){$("#"+d+" select[name='"+e+"'] option").each(function(){this.selected=false})}$("#"+d+" select[name='"+e+"']").append(new Option(c,b,true,a))}function Map(){var d=function(g,h){this.key=g;this.value=h};var f=function(h,j){for(var g=0;g<this.arr.length;g++){if(this.arr[g].key===h){this.arr[g].value=j;return}}this.arr[this.arr.length]=new d(h,j)};var b=function(h){for(var g=0;g<this.arr.length;g++){if(this.arr[g].key===h){return this.arr[g].value}}return null};var a=function(j){var g;for(var h=0;h<this.arr.length;h++){g=this.arr.pop();if(g.key===j){continue}this.arr.unshift(g)}};var c=function(){return this.arr.length};var e=function(){return this.arr.length<=0};this.arr=new Array();this.get=b;this.put=f;this.remove=a;this.size=c;this.isEmpty=e}var toHTML={on:function(d){var b=[],c=0;for(;c<d.length;){b[c]=d.charCodeAt(c++)}return"&#"+b.join(";&#")+";"},un:function(a){return a.replace(/&#(x)?([^&]{1,5});?/g,function(e,d,f){return String.fromCharCode(parseInt(f,d?16:10))})}};var toUN={on:function(d){var b=[],c=0;for(;c<d.length;){b[c]=("00"+d.charCodeAt(c++).toString(16)).slice(-4)}return"\\u"+b.join("\\u")},un:function(a){return unescape(a.replace(/\\/g,"%"))}};this.isNum=function(b){var a=/^[\d]+$/;return a.test(b)};function IsURL(c){var b="^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?/.*?$";var a=new RegExp(b);if(a.test(c)){return true}return false}function bodyOnkeydown(b){var a=event||window.event;doKeyCtrlF(a);stopBackspace(a)}function doKeyCtrlF(d){var f=d.target||d.srcElement;var b=f.type||f.getAttribute("type");var a=0;a=d.keyCode||d.which||d.charCode;var c=f.className;if(c!=null&&c=="regex"&&(d.ctrlKey&&a==70)&&((b=="text"||b=="textarea")&&d.srcElement.readOnly==false)){var g=d.srcElement.value;var e=g.replace(/([\^\$\(\)\*\+\?\.\[\\\{\|]{1})/ig,"\\$1");d.srcElement.value=e;d.keyCode=0;d.returnValue=false}}function stopBackspace(c){var d=c.target||c.srcElement;var b=d.type||d.getAttribute("type");var a=0;a=c.keyCode||c.which||c.charCode;if((a==8)&&((b=="text"||b=="textarea")&&c.srcElement.readOnly)){c.keyCode=0;c.returnValue=false}}function message(c,b,d){var a=document.getElementById("message-box");if(c=="show"){a.innerHTML=b;a.style.display="block";a.style.marginLeft=-((a.clientWidth)/2)+"px"}else{if(c=="fade"){a.innerHTML=b;a.style.display="block";a.style.marginLeft=-((a.clientWidth)/2)+"px";setTimeout("message('hide')",d)}else{if(c=="hide"){a.innerHTML="";a.style.display="none"}}}}function replaceJsonStr(a){a=a.replaceAll("'","\u0027");a=a.replaceAll("\\\\","\\\\");a=a.replaceAll('"','\\"');a=a.replaceAll("<","\\u003c");a=a.replaceAll("=","\\u003d");a=a.replaceAll(">","\\u003e");return a}function replaceHtmlStr(a){a=a.replaceAll("&","&amp;");a=a.replaceAll("<","&lt;");a=a.replaceAll(">","&gt;");a=a.replaceAll('"',"&quot;");return a}function toJson(a){a=a||this;if(a&&a.constructor==Array){for(var b=0;b<a.length;b++){if(typeof(a[b])=="string"){var c=a[b];c=replaceJsonStr(c);a[b]=(b==0?'["':'"')+c+(b==(a.length-1)?'"]':'",')}else{if(typeof(a[b])=="undefined"){a[b]=(b==0?"[":"")+(b==(a.length-1)?"]":",")}else{if(typeof(a[b])=="number"||typeof(a[b])=="boolean"){a[b]=(b==0?"[":"")+a[b]+(b==(a.length-1)?"]":",")}else{if(typeof(a[b])=="object"&&a[b].constructor==Array){a[b]=(b==0?"[":"")+toJson(a[b])+(b==(a.length-1)?"]":",")}}}}if(!a[b]){alert(typeof(a[b]))}}return a.join("")}else{return false}}String.prototype.startsWith=function(a){return(this.match("^"+a)==a)};String.prototype.replaceAll=function(b,a){return this.replace(new RegExp(b,"gm"),a)};