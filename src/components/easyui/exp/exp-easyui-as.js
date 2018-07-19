/**
 * Created by 黄华桥 on 2017/7/3.
 */
(function ($, undefined){
	var messager = {
		prompt : $.messager.prompt
	};

	/**
	 * 2017年5月18日10:08:10
	 * 最简单的方式，是只传递一个callback即可，提示信息默认是删除，如果是发布，type值传递publish即可
	 *
	 * $.messager.prompt({
		 * 		callback : function() {
		 * 			$.ajax(...);
		 * 		}
		 * });
	 *
	 * @param {Object}	option
	 * 默认删除一条数据
	 * 可以自定义msg，这时需要传递code参数
	 */
	$.messager.prompt = function(option) {
		// 验证码
		var code = option.code || parseInt(10000 * Math.random()),
			opt = {
				msg : '',
				/*错误提示*/
				errorMsg : '',
				/*默认删除一条数据*/
				count : 1,
				// 类型默认是删除	['delete', 'publish','logout','movetoBefore','movetoAfter']，分别对应删除、发布、注销、移动到**前、移到**后
				type : 'delete',
				title : '提示',
				// 确定、取消成功时回调
				callback : $.noop
			};

		opt = $.extend(true, opt, option);
		/*未传入自定义msg*/
		if (!opt.msg) {
			if (opt.type === 'delete') {/*删除提示*/
				opt.msg = '<p>'
					+ '确定要删除 <i class="comm_size_hint comm_color_warn">' + opt.count + '</i> 条数据吗？'
					+ '</p>'
					+ '<p>'
					+ '所选记录将被彻底删除，且无法恢复！'
					+ '</p>'
					+ '<p style="margin-left: 42px;">'
					+ '确认请输入验证码：[ <i class="comm_color_warn">' + code + '</i> ]'
					+ '</p>';
			} else if (opt.type === 'publish') {/*发布提示*/
				opt.msg = '确认发布请输入验证码：[ <i class="comm_size_hint comm_color_warn">' + code + '</i> ]';
			} else if (opt.type === 'logout') {/*注销提示*/
				opt.msg =  '<p>'+
					'确定要注销 <i class="comm_size_hint comm_color_warn">' + opt.count + '</i> 条数据吗？' +
					'</p>' +
					'<p style="margin-left: 42px;">'+
					'确认请输入验证码：[ <i class="comm_color_warn">' + code + '</i> ]' +
					'</p>';
			} else if (opt.type === 'movetoBefore') {/*移动到*前*/
				opt.msg =  '<p>移动到**前</p>';
			} else if (opt.type === 'movetoAfter') {/*移动到*后*/
				opt.msg =  '<p>移动到**后</p>';
			}
		}

		// easyui底层封装的方法有点扯淡，所有按钮的点击事件都是同一个fn
		opt.fn =  function(result) {
			// 取消时,fn没有传值
			if (result !== undefined) {
				if (['movetoBefore', 'movetoAfter'].indexOf(opt.type) != -1) {
					opt.callback(result);
					return false;
				}

				// 确定，并且验证码正确
				if (result == code) {
					opt.callback(result);
				} else {
					if (opt.errorMsg) {
						showToastMsg(4000, {text : opt.errorMsg,priority : 'danger'});
					} else {
						showToastMsg(4000, {text : '验证码错误，操作失败!',priority : 'danger'});
					}
				}
			}
		};

		messager.prompt(opt);
	};
})(jQuery, undefined);
