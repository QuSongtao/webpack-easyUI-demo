/**
 * jQuery扩展,只依赖jQuery
 * 设置jQuery Ajax全局的参数 $.ajaxSetup({beforeSend:function(jqXHR, settings){},error:function(jqXHR, textStatus, errorThrown){}
 */
(function ($){
	/**
	 * ajax重写
	 * $._ajax 对原生ajax备份
	 */
	$._ajax = $.ajax;//可使用原生ajax跳过扩展

	/**
	 * $.ajax 重写ajax方法(beforeSend/error/success)
	 * 扩展增强处理 统一错误拦截，请求自动追加参数_v,追加header X-Token，保存在localStorage
	 */
	$.ajax = function(opt){
		//备份opt中原方法
		var fn = {
			error:function(XMLHttpRequest, textStatus, errorThrown){},
			success:function(data, textStatus){},
			beforeSend:function(jqXHR, settings){}
		};
		fn = $.extend(fn, opt);

		var _opt = $.extend(opt,{
			//contentType: 'application/json;charset=utf-8',
			beforeSend:function(jqXHR, settings,c){
                //读取sessionStorage中的access_token
                var _access_token = window.sessionStorage.getItem('access_token');
                //设置请求头header的access_token
                $.trim(_access_token) !== '' && jqXHR.setRequestHeader("access_token", _access_token);
                
				fn.beforeSend(jqXHR, settings);//追加执行自定义的beforeSend
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				//console.error('请求错误!',XMLHttpRequest);
				$.easyui&&$.easyui.waitOff();//为了防止error报错造成complete被中断,主动在success之前调用waitOff
				//错误方法增强处理
				var msg = "返回格式不规范！需要此格式：{data:{}, meta:{msg:'', code:''}}";
				if(XMLHttpRequest.responseJSON){
					msg = XMLHttpRequest.responseJSON.message ? (XMLHttpRequest.responseJSON.message +":"+
					XMLHttpRequest.responseJSON.exception): XMLHttpRequest.responseJSON.meta.message;
				}else{
					msg = (!!XMLHttpRequest.responseText) ? XMLHttpRequest.responseText : XMLHttpRequest.statusText;
				}

				switch (XMLHttpRequest.status){
					case(0)://解决iframe 请求cancel 时报错问题
						return false;
						//$.showTips({msg:'请求太频繁，请稍后再试！',xhr:XMLHttpRequest});
						break;
					case(401):
                        // 未认证则跳转到登录页面
                        top.$.messager.alert("提示", "认证失效,点击<b>确定</b>返回登录界面!<br/>1.检查用户是否在其它终端登录。<br/>2.缓存清除后会出现认证失效。", "info", function () {
                                top.location.href = "../../../../acs/portal/index.html";
                            }
                        );
                        break;
					case(403):
						//$.showTips({msg:'无权限执行此操作！',xhr:XMLHttpRequest});
						showToastMsg(3000, {text: '无权限执行此操作！', priority: 'danger'});
						break;
					case(404):
						//$.showTips({msg:'请求地址未找到！',xhr:XMLHttpRequest});
						showToastMsg(3000, {text: '请求地址未找到！', priority: 'danger'});
						break;
					case(500):
						//$.showTips({msg:'系统提示('+XMLHttpRequest.status+'):' + msg, xhr:XMLHttpRequest});
						showToastMsg(3000, {text: '系统提示('+XMLHttpRequest.status+')', priority: 'danger'});
						break;
					default:  //other
						//msg = msg == '' ? '请求发生异常,请稍后再试！' : msg;
						//showToastMsg({msg:'异常信息('+XMLHttpRequest.status+'):' + msg, xhr:XMLHttpRequest});
						showToastMsg(3000, {text: '异常信息('+XMLHttpRequest.status+')', priority: 'danger'});
						break;
				}
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success:function(data, textStatus, request){
				$.easyui&&$.easyui.waitOff();
				fn.success(data, textStatus, request);
			}
		});
		$._ajax(_opt);
	};

	/**
	 * 新增方法
	 * $.serializeObject() 将form表单元素的值序列化成对象
	 * 参数 o 将结果保存到o对象，可以不传递
	 * 参数 flag 是否移除值为空的对象，默认true
	 * $('.easyui-form').serializeObject();
	 * $('.easyui-form').serializeObject(null, false)
	 */
	$.prototype.serializeObject = function (o, append) {
		var $form;
		append = append==false ? false : true;
		!o && (o = {});

		/*如果是高级搜索的序列化，遍历form中所有的input，删除高级搜索中的input*/
		if (!$(this).hasClass('advanceSearchItem')) {
			/*高级搜索*/
			$form = this;			
		} else {
			/*普通搜索*/
			$form = this.clone().addClass('comm_dhide').appendTo($('body'));
			/*if ($form.children().length > 0 && $form.hasClass('advanceSearchItem')) {
				$.each($form.children(),function(index,item){
					if ($(item).hasClass('hideItem')) {
						$(item).remove();
					}
				});
			}*/
		}
		$.each($form.serializeArray(), function (index) {
			var k = $.trim(this['name']),
				v = $.trim(this['value']);

			if(append && v) {
				if(o[k]) {
					o[k] += ',' + v;
				} else {
					o[k] = v;
				}
			} else if (v) {
				o[k] = v;
			}
		});
		
		if ($form.hasClass('advanceSearchItem')) {
			$form.remove();
		}
		return o;
	};

	/**
	 * $.showTips(opt) 报错提示
	 * 如不想使用可在项目中重写此方法
	 */
	$.showTips=function(opt){
		if($.trim(opt.msg)==''){
			opt.msg='请稍后重试!';
		}
		alert(opt.msg, '提示');
	};
})(jQuery);