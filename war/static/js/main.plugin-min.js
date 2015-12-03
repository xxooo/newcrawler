function pluginManageFun(option){var pluginManage={v:{tableId:"pluginTable",formId:"pluginUploadForm",jsonData:new Array(),webCrawlerId:null,webCrawlerUrl:null},fn:{init:function(initFun){obj.v.jsonData=new Array();var actionUrl=obj.v.webCrawlerUrl+"upload";var proxyUrl="../../member/file/proxyupload";$("#"+obj.v.formId).find("#u").val(BASE64.encode(actionUrl));$("#"+obj.v.formId).attr("action",proxyUrl);var options={beforeSubmit:obj.fn.showRequest,success:obj.fn.showResponse,clearForm:false,resetForm:false,dataType:"json"};$("#"+obj.v.formId).ajaxForm(options);obj.fn.query(function(){reConfigBoxSize()});$("#"+obj.v.formId).find(".scanLocalPlugin").click(function(){obj.fn.scanLocalPlugin()});initFun(obj)},showRequest:function(formData,formObj,options){var file=$("#"+obj.v.formId).find("#fileToUpload").val();if(file==null||file==""){showInfo(nc.i18n("res.selectFile"));return false}$("#"+obj.v.formId).find("#msgOutput").html("Uploading...");return true},showResponse:function(responseText,statusText){if(responseText.code=="200"){$("#"+obj.v.formId).find("#msgOutput").html(responseText.message);obj.fn.query()}else{if(responseText.code=="501"){$("#"+obj.v.formId).find("#msgOutput").html(responseText.message)}else{$("#"+obj.v.formId).find("#msgOutput").html(nc.i18n("res.file.upload.failure"));$("#trace-box").find("#trace").html(responseText.message);$("#trace-box").dialog("open")}}},query:function(callbak){moveAllTr(obj.v.containId+" #pluginListTable");queryLoading(obj.v.containId+" #pluginListTable");jsonrpc.pluginService.query(function(result,exception,profile){moveAllTr(obj.v.containId+" #pluginListTable");var data=result;data=eval(data);obj.v.jsonData=data;for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];var time=data[i]["createDate"];var downurl=obj.v.webCrawlerUrl+data[i]["filename"];var name=data[i]["name"];var properties=data[i]["properties"];var type=data[i]["type"];type=obj.fn.getTypeText(type);var status=data[i]["status"];var platforms=data[i]["platform"];var platformDesc="";if(platforms!=null&&platforms!=""){var platformsJsonObj=eval(platforms);if($("#"+obj.v.formId).find("#platform").length==platformsJsonObj.length){platformDesc="All"}else{for(var i=0,len=platformsJsonObj.length;i<len;i++){var platform=platformsJsonObj[i];platformDesc+=$("#"+obj.v.formId).find("#platform[value='"+platform+"']").attr("title")+"\r\n"}}}obj.fn.addRow(id,time,downurl,name,properties,type,status,platformDesc)}removeLoading($("#"+obj.v.containId+" #pluginListTable"));callbak();obj.pluginConfigManage.fn.query(callbak)},obj.v.webCrawlerId)},addRow:function(id,time,downurl,name,properties,type,status,platformDesc){var newTr="<tr class='simplehighlight'>";newTr+="<td nowrap>&nbsp;&nbsp;&nbsp;"+name+"</td>";newTr+="<td nowrap>"+type+"</td>";newTr+="<td nowrap><pre>"+platformDesc+"</pre></td>";newTr+="<td nowrap>"+status+"</td>";newTr+="<td nowrap>"+time+"</td>";newTr+='<td nowrap  style="text-align:center"><input type="hidden" id="id" value="'+id+'"/><input type="hidden" id="downurl"/><a href="javascript:void(0)" title="'+downurl+'" class="downloadFile" >'+nc.i18n("res.download")+'</a> | <a href="javascript:void(0)" class="remove"  >'+nc.i18n("res.remove")+'</a> | <a href="javascript:void(0)" class="openPluginConfigBox" >'+nc.i18n("res.addConfig")+"</a> </td>";newTr+="</tr>";var newTrObj=$(newTr);newTrObj.find("#downurl").val(downurl);newTrObj.find(".downloadFile").click(function(){var downurl=$(this).parent().find("#downurl").val();obj.fn.downloadFile(downurl)});newTrObj.find(".remove").click(function(){var id=$(this).parent().find("#id").val();obj.fn.remove(id)});newTrObj.find(".openPluginConfigBox").click(function(){var id=$(this).parent().find("#id").val();obj.pluginConfigManage.fn.openPluginConfigBox("add",id)});newTrObj.appendTo("#"+obj.v.containId+" #pluginListTable");$("#"+obj.v.containId).find("#pluginList").find("tr:odd").css("background","#FFFFFF");$("#"+obj.v.containId).find("#pluginList").find("tr:even").css("background","rgb(247, 247, 247)");$("#"+obj.v.containId).find("#pluginList").find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})},remove:function(id){if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+obj.v.tableId));jsonrpc.pluginService.remove(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var msg=result;if(msg){obj.fn.query();showInfo(nc.i18n("res.remove.success"));return}showInfo(msg)},obj.v.webCrawlerId,id)},downloadFile:function(url){if(url.indexOf("localhost")!=-1||url.indexOf("127.0.0.1")!=-1||url.indexOf("192.168.")!=-1){$("#"+obj.v.tableId).find("#proxyFrame").attr("src",url);return}url=BASE64.encode(url);var len=url.length;var mystr="";for(var i=len-1;i>=0;i--){mystr+=url.charAt(i)}var proxyUrl="../../member/file/proxydownload?u="+mystr;$("#"+obj.v.tableId).find("#proxyFrame").attr("src",proxyUrl)},getTypeText:function(type){var typeText="";$("#"+obj.v.formId).find("select[name=type]").find("option").each(function(){if(this.value==type){typeText=this.text;return(false)}});return typeText},installLocalPlugin:function(){var plugins=new Array();$("#localPluginListTable").find("input[type=checkbox][name='key']").each(function(){if(this.checked){plugins.push(this.value)}});showLoading($("#"+obj.v.tableId));jsonrpc.pluginService.installLocalPlugin(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var msg=result;if(msg){showInfo(nc.i18n("res.localplugin.install.success"));obj.fn.query()}else{showInfo(nc.i18n("res.localplugin.install.failure"))}},obj.v.webCrawlerId,plugins)},scanLocalPlugin:function(){moveAllTr("localPluginListTable");queryLoading("localPluginListTable");$("#localPluginDialogWrapper").dialog("open");$(".ui-dialog-buttonset").find("#installLocalPlugin").unbind("click");$(".ui-dialog-buttonset").find("#installLocalPlugin").click(function(){obj.fn.installLocalPlugin();$("#localPluginDialogWrapper").dialog("close")});$("#localPluginListTable").find("input[type=checkbox][name='key']").each(function(){this.checked=false});showLoading($("#"+obj.v.tableId));jsonrpc.pluginService.scanLocalPlugin(function(result,exception,profile){moveAllTr("localPluginListTable");removeLoading($("#"+obj.v.tableId));var data=result;data=eval(data);for(var i in data){if(isNaN(i)){continue}var name=data[i]["name"];var depend=data[i]["depend"];var type=data[i]["type"];var platform=data[i]["platform"];var platformDesc="";if(platform!=null&&platform!=""){var platformsJsonObj=eval(platform);if($("#"+obj.v.formId).find("#platform").length==platformsJsonObj.length){platformDesc="All"}else{for(var i=0,len=platformsJsonObj.length;i<len;i++){var platform=platformsJsonObj[i];platformDesc+=$("#"+obj.v.formId).find("#platform[value='"+platform+"']").attr("title")+"\r\n"}}}obj.fn.addRowLocalPlugin(name,type,depend,platformDesc)}},obj.v.webCrawlerId)},selectAll:function(obj,parentId,eleName){$("#"+parentId).find("input[type=checkbox][name='"+eleName+"']").each(function(){this.checked=obj.checked})},addRowLocalPlugin:function(name,type,depend,platformDesc){if(depend==null||depend==""){depend="n"}depend=depend.toLowerCase();if(depend=="y"||depend=="yes"){depend=nc.i18n("res.yes")}else{depend=nc.i18n("res.no")}var spiderRelated=nc.i18n("res.yes");if(type=="4"){spiderRelated=nc.i18n("res.no")}typeDesc=obj.fn.getTypeText(type);var newTr="<tr class='simplehighlight'>";newTr+='<td nowrap><input type="checkbox" name="key" value = "'+name+'"></td>';newTr+="<td nowrap>&nbsp;&nbsp;&nbsp;"+typeDesc+"</td>";newTr+="<td nowrap>"+name+"</td>";newTr+="<td nowrap>"+depend+"</td>";newTr+="<td nowrap>"+spiderRelated+"</td>";newTr+="<td nowrap><pre>"+platformDesc+"</pre></td>";newTr+="</tr>";$(newTr).appendTo("#localPluginListTable");$("#localPluginListTable").find("tr:odd").css("background","#FFFFFF");$("#localPluginListTable").find("tr:even").css("background","rgb(247, 247, 247)");$("#localPluginListTable").find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})}}};var pluginConfigManage={v:{tableId:"pluginTable",formId:"pluginConfigForm",jsonData:{}},fn:{query:function(callbak){moveAllTr(obj.v.containId+" #pluginConfigList");queryLoading(obj.v.containId+" pluginListTable");jsonrpc.pluginConfigService.query(function(result,exception,profile){moveAllTr(obj.v.containId+" #pluginConfigList");var data=result;data=eval(data);obj.pluginConfigManage.v.jsonData=data;var key=""+obj.v.webCrawlerId;customPluginMap.put(key,data);var pluginData=obj.v.jsonData;for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];var time=data[i]["updateDate"];var name=data[i]["name"];var pluginUrl=data[i]["pluginUrl"];var mainclass=data[i]["mainclass"];var properties=data[i]["properties"];var type=data[i]["type"];type=obj.fn.getTypeText(type);for(var i in pluginData){var downurl=obj.v.webCrawlerUrl+pluginData[i]["filename"];if(downurl==pluginUrl){type+=" / "+pluginData[i]["name"];break}}obj.pluginConfigManage.fn.addRow(id,name,type,pluginUrl,time)}callbak();removeLoading($("#"+obj.v.containId+" #pluginListTable"))},obj.v.webCrawlerId)},add:function(id){var data=obj.v.jsonData;jsonrpc.webCrawlerAppService.getUrl(function(result,exception,profile){var webCrawlerUrl=result[0];for(var i in data){if(isNaN(i)){continue}if(data[i]["id"]!=id){continue}var pluginUrl=webCrawlerUrl+data[i]["filename"];var name=data[i]["name"];var properties=data[i]["properties"];var type=data[i]["type"];$("#"+obj.pluginConfigManage.v.formId).find("#id").val("");$("#"+obj.pluginConfigManage.v.formId).find("#pluginId").val(id);$("#"+obj.pluginConfigManage.v.formId).find("#name").val(name);$("#"+obj.pluginConfigManage.v.formId).find("#pluginUrl").val(pluginUrl);$("#"+obj.pluginConfigManage.v.formId).find("#properties").val(properties);$("#"+obj.pluginConfigManage.v.formId).find("#type").val(type);return}},obj.v.webCrawlerId)},edit:function(id){var data=obj.pluginConfigManage.v.jsonData;for(var i in data){if(isNaN(i)){continue}if(id!=data[i]["id"]){continue}var name=data[i]["name"];var pluginUrl=data[i]["pluginUrl"];var properties=data[i]["properties"];var type=data[i]["type"];$("#"+obj.pluginConfigManage.v.formId).find("#id").val(id);$("#"+obj.pluginConfigManage.v.formId).find("#name").val(name);$("#"+obj.pluginConfigManage.v.formId).find("#pluginUrl").val(pluginUrl);$("#"+obj.pluginConfigManage.v.formId).find("#properties").val(properties);$("#"+obj.pluginConfigManage.v.formId).find("#type").val(type);return}},create:function(){var name=$("#"+obj.pluginConfigManage.v.formId).find("#name").val();var pluginUrl=$("#"+obj.pluginConfigManage.v.formId).find("#pluginUrl").val();var properties=$("#"+obj.pluginConfigManage.v.formId).find("#properties").val();var pluginId=$("#"+obj.pluginConfigManage.v.formId).find("#pluginId").val();var type=$("#"+obj.pluginConfigManage.v.formId).find("#type").val();showLoading($("#"+obj.v.tableId));jsonrpc.pluginConfigService.create(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var id=result;if(!isNum(id)){showInfo(nc.i18n("res.addConfig.failure"));return}showInfo(nc.i18n("res.addConfig.success"));obj.pluginConfigManage.fn.query();updateSelectByCustomPlugin(id,name,type)},obj.v.webCrawlerId,name,pluginUrl,properties,pluginId)},update:function(){var id=$("#"+obj.pluginConfigManage.v.formId).find("#id").val();var name=$("#"+obj.pluginConfigManage.v.formId).find("#name").val();var pluginUrl=$("#"+obj.pluginConfigManage.v.formId).find("#pluginUrl").val();var properties=$("#"+obj.pluginConfigManage.v.formId).find("#properties").val();var type=$("#"+obj.pluginConfigManage.v.formId).find("#type").val();showLoading($("#"+obj.v.tableId));jsonrpc.pluginConfigService.update(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));id=result;if(!isNum(id)){showInfo(nc.i18n("res.updateConfig.failure"));return}showInfo(nc.i18n("res.updateConfig.success"));obj.pluginConfigManage.fn.query();updateSelectByCustomPlugin(id,name,type)},obj.v.webCrawlerId,id,name,pluginUrl,properties)},remove:function(id){if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+obj.v.tableId));jsonrpc.pluginConfigService.remove(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));var msg=result;if(msg){showInfo(nc.i18n("res.removeConfig.success"));obj.pluginConfigManage.fn.query();removeSelectByCustomPlugin(id);return}showInfo(nc.i18n("res.removeConfig.failure"))},obj.v.webCrawlerId,id)},addRow:function(id,name,type,pluginUrl,time){var newTr="<tr class='simplehighlight'>";newTr+="<td nowrap>&nbsp;&nbsp;&nbsp;"+name+"</td>";newTr+="<td nowrap>"+type+"</td>";newTr+="<td nowrap>"+time+"</td>";newTr+='<td nowrap style="text-align:center"><input type="hidden" id="id" value="'+id+'"/><a href="javascript:void(0)" class="remove">'+nc.i18n("res.remove")+'</a> | <a href="javascript:void(0)" class="openPluginConfigBox" >'+nc.i18n("res.edit")+"</a> </td>";newTr+="</tr>";var newTrObj=$(newTr);newTrObj.find(".remove").click(function(){var id=$(this).parent().find("#id").val();obj.pluginConfigManage.fn.remove(id)});newTrObj.find(".openPluginConfigBox").click(function(){var id=$(this).parent().find("#id").val();obj.pluginConfigManage.fn.openPluginConfigBox("edit",id)});newTrObj.appendTo("#"+obj.v.tableId+" #pluginConfigTable");$("#"+obj.v.tableId).find("#pluginConfigList").find("tr:odd").css("background","#FFFFFF");$("#"+obj.v.tableId).find("#pluginConfigList").find("tr:even").css("background","rgb(247, 247, 247)");$("#"+obj.v.tableId).find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})},openPluginConfigBox:function(cmd,id){$("#"+obj.pluginConfigManage.v.formId).find("#cmd").val(cmd);if(cmd=="edit"){obj.pluginConfigManage.fn.edit(id)}else{obj.pluginConfigManage.fn.add(id)}$("#pluginConfigDialogWrapper").dialog("open");$(".ui-dialog-buttonset").find("#pluginConfigSave").unbind("click");$(".ui-dialog-buttonset").find("#pluginConfigSave").click(function(){var cmd=$("#"+obj.pluginConfigManage.v.formId).find("#cmd").val();if(cmd=="edit"){obj.pluginConfigManage.fn.update()}else{obj.pluginConfigManage.fn.create()}$("#pluginConfigDialogWrapper").dialog("close")})}}};var obj=this;obj.fn=pluginManage.fn;obj.v=option;obj.pluginConfigManage=pluginConfigManage}var pluginManage=new pluginManageFun();