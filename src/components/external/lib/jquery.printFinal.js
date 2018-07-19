// -----------------------------------------------------------------------
//printFinal 1.0
//jQuery 打印插件
//作者：JsonZou
//时间：2013-10-31
//修改：增加载入页面style样式，提供在预览界面的打印按钮    yinc 2017-5-2
//eg: $("#dzForm").printFinal();
//------------------------------------------------------------------------

(function($) {

  var printFinal = {};	//printFinal应用容器
  var printOption = {};	//printFinal应用配置
  printFinal.defaults = {	//printFinal默认配置
	  preview: true,		//打印预览
	  impcss:true		//引入css文件	  
  };
  
  printFinal.print = function(options){
   
    printOption=$.extend({},printFinal.defaults,options);
    var $e= (this instanceof $) ? this : $(this);
    //1.0打印容器创建
	        //预览模式下，第一次点击显示预览，第二次点击隐藏预览 
			if(printOption.preview){
			 if($("div.printfinal-container-div-0").length>0){
				 if($("div.printfinal-container-div-0").is(":hidden")){
					  
					  $("div.printfinal-container-div-0").show();
				 }else{
					  
					   $("div.printfinal-container-div-0").hide();
				 }
				 return;
			   }
			 }else{
     			 $("div.printfinal-container-div-0").remove();
			 }

            //打印容器
			var $containerDiv = $("<div class='printfinal-container-div-0' style='border:1px solid #ccc;display:none;position:fixed;background:white;left:0px; bottom:0px;top:0px;width:100%;height:100%;' ></div>");
			//打印容器top
			var $containerTopDiv = $("<div class='printfinal-container-top-div-0' style='margin:0px 0px 5px 0px; padding:3px;padding-left:5px;color:#333;width:100%;height:25px;line-height:25px;overflow:hidden;border-bottom:1px solid #ddd;text-align:left;font-size:14px;font-weight:bold;'></div>");
			//打印容器top显示的标题
            var $containerTopTitleDiv = $("<div class='printfinal-container-top-title-div-0' style='width:100px;float:left;'>打印预览</div>");
			//打印容器top显示的关闭按钮div
			var $containerTopCloseBtnDiv = $("<div class='printfinal-container-top-closebtn-div-0' style='float:left;position:absolute;right:3px;margin:0px 5px 0px 0px;height:22px;'></div>");
			
			//打印容器top关闭按钮				
			var $containerTopCloseBtnDivBtn = $("<button class='printfinal-container-top-closebtn-div-btn-0' style='font-size: 12px;width: auto;font-weight:bold;color:#444;border:1px solid #ddd;background:#fff;line-height:22px;'>关闭</button>");
			var $containerTopPrintBtnDivBtn = $("<button class='printfinal-container-top-printbtn-div-btn-0' style='font-size: 12px;width: auto;font-weight:bold;color:#444;border:1px solid #ddd;background:#fff;line-height:22px;'>打印</button>");
            
			//打印内容iframe
			var $containerContentIframe = $("<iframe id='printWin' style='margin-left:5px;' width='100%' marginwidth='0' marginheight='0' frameborder='0' scrolling='auto'></iframe>");
		 
			$containerContentIframe.height($("body").height() - $containerTopTitleDiv.height() - 40);
            //装载容器
			$containerDiv.append($containerTopDiv);

			$containerTopDiv.append($containerTopTitleDiv);

			$containerTopDiv.append($containerTopCloseBtnDiv);
			
			$containerTopCloseBtnDiv.append($containerTopPrintBtnDivBtn);
			$containerTopCloseBtnDiv.append($containerTopCloseBtnDivBtn);
			
			

			$containerDiv.append($containerContentIframe);
			 
			$("body").append($containerDiv);
			
            //关闭事件
            $containerTopCloseBtnDivBtn.click(function(){ $containerDiv.remove(); });
            //打印事件
            $containerTopPrintBtnDivBtn.click(function(){
            	$containerContentIframe[0].contentWindow.print();
            });
            
            if(printOption.preview){$containerDiv.show();}
            var iDoc = $containerContentIframe[0].contentWindow.document;
            
            //2.0引入css文件
			if (printOption.impcss)
			{
				if ($("link[media=print]").length > 0) 
				{
					$("link[media=print]").each( function() {
						iDoc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
					});
				}
				else 
				{
					$("link").each( function() {
						iDoc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");											
					});
				}
				
				//+ 增加页面自带样式引入
				$("style").each(function() {
					var _style = $(this).html();
					if( _style != "" ) {
						iDoc.write("<style>"+ _style +"</style>");
					}
				});
			}
		debugger;
		//3.0导入打印内容        
        iDoc.write($($('<div></div>').html($e.clone(true))).html()) 
        iDoc.close();
        
        //4.0打印        
		if(!printOption.preview){
			setTimeout( function() {$containerContentIframe[0].contentWindow.print()}, 1000);
		}
		
		//+ 解决form表单不显示问题 yinc 2017-5-2
		$e.find("input").each(function(){
			var _val = $(this).val();
			var _id = $(this).attr("id");		
			$("input#" + _id,iDoc).val(_val);
		});	
		//+ 解决form表单不显示问题 yinc 2017-5-2
		$e.find("textarea").each(function(){
			var _val = $(this).val();
			var _id = $(this).attr("id");		
			$("textarea#" + _id,iDoc).val(_val);
		});	
  }
  
//5.0扩展到jQuery方法
$.fn.printFinal=printFinal.print;


})(jQuery);