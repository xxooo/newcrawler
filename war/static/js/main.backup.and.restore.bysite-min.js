var backupAndRestoreBySite={v:{tableId:"backupAndRestoreBySiteTable",listTableId:"backupAndRestoreBySiteListTable",webCrawlerId:null,siteId:null,webCrawlerUrl:null,interval:null,time:null},fn:{init:function(){if(backupAndRestoreBySite.v.interval){clearInterval(backupAndRestoreBySite.v.interval)}var a=new Date();backupAndRestoreBySite.v.time=a.getTime()},showRequest:function(d,a,b){var c=$("#"+backupAndRestoreBySite.v.tableId).find("#fileToUpload").val();if(c==null||c==""){showInfo(nc.i18n("res.selectFile"));return false}if(backupAndRestoreBySite.v.siteId==null||backupAndRestoreBySite.v.siteId===""){showInfo(nc.i18n("res.site.invalid.refresh"));return}d.push({name:"siteId",value:backupAndRestoreBySite.v.siteId});$("#"+backupAndRestoreBySite.v.tableId).find("#msgOutput").html("Uploading...");return true},showResponse:function(a,b){setTimeout(function(){backupAndRestoreBySite.fn.callback(a)},3000)},callback:function(a){if(a.code=="200"){$("#"+backupAndRestoreBySite.v.tableId).find("#msgOutput").html(a.message);if(isLocal()){freshWebCrawlerNode(backupAndRestoreBySite.v.webCrawlerId)}else{jsonrpc.systemResetService.resetSiteCache(function(b,c,d){freshWebCrawlerNode(backupAndRestoreBySite.v.webCrawlerId)},backupAndRestoreBySite.v.webCrawlerId,backupAndRestoreBySite.v.siteId)}}else{if(a.code=="401"){showInfo(a.message)}else{if(a.code=="501"){$("#"+share.v.formId).find("#msgOutput").html(a.message)}else{$("#"+backupAndRestoreBySite.v.tableId).find("#msgOutput").html(nc.i18n("res.file.upload.failure"));$("#trace-box #trace").html(a.message);$("#trace-box").dialog("open")}}}},backup:function(){if(backupAndRestoreBySite.v.siteId==null||backupAndRestoreBySite.v.siteId===""){showInfo(nc.i18n("res.site.select"));return}showLoading($("#"+backupAndRestoreBySite.v.tableId));var a=""+backupAndRestoreBySite.v.siteId;jsonrpc.backupService.backup(function(b,c,d){removeLoading($("#"+backupAndRestoreBySite.v.tableId));if(c){return}var e=b;if(e){showInfo(nc.i18n("res.backup"));backupAndRestoreBySite.fn.query()}},backupAndRestoreBySite.v.webCrawlerId,a,null,"true",null)},restore:function(a){if(backupAndRestoreBySite.v.siteId==null||backupAndRestoreBySite.v.siteId===""){showInfo(nc.i18n("res.site.select"));return}showInfo(nc.i18n("res.restore"));jsonrpc.backupService.restore(function(b,c,d){if(b){setTimeout(function(){showInfo(nc.i18n("res.restore.success"));jsonrpc.systemResetService.resetSiteCache(function(e,f,g){freshWebCrawlerNode(backupAndRestoreBySite.v.webCrawlerId)},backupAndRestoreBySite.v.webCrawlerId,backupAndRestoreBySite.v.siteId)},1500)}else{showInfo(nc.i18n("res.restore.failure"))}},backupAndRestoreBySite.v.webCrawlerId,backupAndRestoreBySite.v.siteId,a)},autoRefresh:function(){backupAndRestoreBySite.v.interval=setInterval(function(){backupAndRestoreBySite.fn.refresh()},2000)},refresh:function(){var ids="";$("#"+backupAndRestoreBySite.v.tableId+" #"+backupAndRestoreBySite.v.listTableId).find("tr:not(:first)").each(function(){var status=$(this).find("#status").val();if(status!="1"){var backId=$(this).find("#backId").val();if(ids!=""){ids+=","}ids+=backId}});if(ids!=""){jsonrpc.backupService.refresh(function(result,exception,profile){if(exception){return}var data=result;if(data==null){return}data=eval(data);var hasRun=false;for(var i in data){if(isNaN(i)){continue}var isRun=backupAndRestoreBySite.fn.updateRow(data[i]);hasRun=(hasRun||isRun)}if(!hasRun){showInfo(nc.i18n("res.backup.finished"));clearInterval(backupAndRestoreBySite.v.interval)}},backupAndRestoreBySite.v.webCrawlerId,ids)}else{clearInterval(backupAndRestoreBySite.v.interval)}},updateRow:function(d){var e=d.id;var a="#tr_"+backupAndRestoreBySite.v.time+"_"+e;var c=true;var b=d.status;if(b=="1"){c=false;statusDesc=nc.i18n("res.finished");$("#"+backupAndRestoreBySite.v.tableId+" #"+backupAndRestoreBySite.v.listTableId).find(a).find("#status").val(b);$("#"+backupAndRestoreBySite.v.tableId+" #"+backupAndRestoreBySite.v.listTableId).find(a).find(".statusDesc").text(statusDesc)}return c},query:function(){if(backupAndRestoreBySite.v.siteId==null||backupAndRestoreBySite.v.siteId===""){showInfo(nc.i18n("res.site.select"));removeLoading($("#"+backupAndRestoreBySite.v.tableId));return}moveAllTr(backupAndRestoreBySite.v.listTableId);queryLoading(backupAndRestoreBySite.v.listTableId);jsonrpc.backupService.query(function(result,exception,profile){var data=result;data=eval(data);moveAllTr(backupAndRestoreBySite.v.listTableId);var baseUrl=backupAndRestoreBySite.v.webCrawlerUrl;if(baseUrl==null||baseUrl==undefined){baseUrl="../../"}var backupRecJson=data;for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];var time=data[i]["createDate"];var filename=data[i]["filename"];var downurl=baseUrl+"file"+filename;var status=data[i]["status"];var statusDesc=nc.i18n("res.backup");if(status=="1"){statusDesc=nc.i18n("res.finished")}var remark=data[i]["remark"];backupAndRestoreBySite.fn.addRow(id,time,filename,downurl,status,remark,statusDesc)}removeLoading($("#"+backupAndRestoreBySite.v.tableId));backupAndRestoreBySite.fn.autoRefresh()},backupAndRestoreBySite.v.webCrawlerId,backupAndRestoreBySite.v.siteId)},addRow:function(h,e,c,g,b,f,d){var a="<tr class='simplehighlight' id='tr_"+backupAndRestoreBySite.v.time+"_"+h+"'>";a+="<td nowrap>"+e+"</td>";a+="<td nowrap>"+c+"</td>";a+="<td nowrap>"+f+"</td>";a+='<td nowrap class="statusDesc">'+d+"</td>";a+='<td nowrap><input type="hidden" id="status" value="'+b+'"/><input type="hidden" id="backId" value="'+h+'"/><a href="javascript:void(0)" onclick=backupAndRestoreBySite.fn.downloadFile(\''+g+"') title=\""+g+'">'+nc.i18n("res.download")+'</a> | <a href="javascript:void(0)" onclick=backupAndRestoreBySite.fn.remove('+h+")>"+nc.i18n("res.remove")+'</a> | <a href="javascript:void(0)" onclick=backupAndRestoreBySite.fn.restore(\''+c+"')>"+nc.i18n("res.restitute")+"</a></td>";a+="</tr>";$(a).appendTo("#"+backupAndRestoreBySite.v.listTableId);$("#"+backupAndRestoreBySite.v.listTableId+" tr:even").css("background","#EEE");$("#"+backupAndRestoreBySite.v.listTableId+" tr:odd").css("background","#FFFFFF");$("#"+backupAndRestoreBySite.v.listTableId+" .simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})},remove:function(a){if(a==null||a.length==0){showInfo(nc.i18n("res.params.errors"));return}if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+backupAndRestoreBySite.v.tableId));jsonrpc.backupService.remove(function(b,c,d){if(c){return}showLoading($("#"+backupAndRestoreBySite.v.tableId));var e=b;if(e){backupAndRestoreBySite.fn.query();showInfo(nc.i18n("res.remove.success"));return}showInfo(e)},backupAndRestoreBySite.v.webCrawlerId,a)},downloadFile:function(c){if(isLocal()){$("#"+backupAndRestoreBySite.v.tableId).find("#proxyFrame").attr("src",c);return}c=BASE64.encode(c);var a=c.length;var b="";for(var d=0;d<a;d++){b=c.charAt(d)+b}var e="../../member/file/proxydownload?u="+b;$("#"+backupAndRestoreBySite.v.tableId).find("#proxyFrame").attr("src",e)}}};