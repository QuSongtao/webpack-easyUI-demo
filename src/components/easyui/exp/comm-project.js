/**
 * Created by 黄华桥 on 2017/5/25.
 * 新版UI调整相关公共操作
 */
var commmObj = {
		refreshButton: '',
		globalTooltip: $('<div class="comm_search_tooltip"><span class="frendlyWarn">在datagrid表格表头位置单机鼠标右键可自定义显示或隐藏列</span><span class="otherWarn"></span><span class="closeTooltip">×</span></div>'),
		_headerBtnStr: {
			help: "<span style='margin-right: 0;' data-btn-type='help' class='easyui-tooltip c_btn fa fa-question header-tool-btn' title='帮助'></span>"
		},

		_buildHeaderBtnStr: function (buttons) {
			var headerBtnStr = this._headerBtnStr,
				btnStr = "",
				key = null,
				i = null;

			if ($.isArray(buttons)) {
				for(i = 0; i < buttons.length; ++i) {
					if (headerBtnStr[buttons[i]]) {
						btnStr += headerBtnStr[buttons[i]];
					}
				}
			} else {
				for(key in headerBtnStr) {
					if (headerBtnStr.hasOwnProperty(key)) {
						btnStr += headerBtnStr[key];
					}
				}
			}
			return btnStr;
		},

		/**
		 * 在页面头部上直接创建按钮
		 * 为避免影响原有页面，暂时不动 refresh, refresh 还是按原有的模式进行
		 * @param {object} callback -指定每个按钮的回调函数
		 * @param {array} - 只创建数组中列出的按钮，可以取值为 help
		 */
		addHeaderButtons: function (callback, buttons) {
			var btnStr = "",
				container = $(".breadCrumb");
			
			btnStr = this._buildHeaderBtnStr(buttons);

			if (container.find(">div").length === 0) {
				container.append("<div>" + btnStr + "</div>");
			} else {
				if (container.find(">div .refresh").length === 0) {
				    container.find(">div").append(btnStr);				
				} else {
					container.find(">div .refresh").before(btnStr);
				}
			}
			$.parser.parse(container.find(">div"));

			container.on("click", function (event) {
				var target = event.target,
				    btnType = null;

				if (target && (btnType = target.getAttribute("data-btn-type"))) {
					if (callback && callback[btnType]) {
						callback[btnType](event);
					}
				}
			});
		}
	},
	contrastId = '',/*设置开始时间校验标识和结束时间校验检查标识*/
	lengthId = '';
$(function(){
	var westPanel,
		$datagrid;

	/*为页面动态追加刷新按钮*/
	if ($('.breadCrumb>div').length > 0) {
	    commmObj.refreshButton = '<span class="easyui-tooltip header-tool-btn fa fa-undo refresh" title="刷新"></span>';
	} else {
		commmObj.refreshButton = '<div><span class="easyui-tooltip header-tool-btn fa fa-undo c_btn refresh" title="刷新"></span></div>';
	}
    $('.breadCrumb').append(commmObj.refreshButton);
	
	/*为带*号的表单元素添加必填属性*/
	addRequired($('.easyui-form'));
	
	/*解析easyui组件*/
	$.parser.parse();
	westPanel = $('.easyui-layout').layout('panel','west');
	$datagrid = $('.datagrid');
	
	/*若提示框不存在，则动态添加提示框 (由于datagrid已经取消列头右键功能，所以暂时取消该tip)*/
	/*	if ($('.comm_search_tooltip').length <1) {
			commmObj.globalTooltip.insertAfter('.breadCrumb');
		}*/
	
	/*关闭搜索框tooltip*/
	$('.closeTooltip').on('click',function(){
		/*移除提示框*/
		$(this).parent().hide();
		$('div.easyui-layout').layout('resize');
	});
	
	/*高级搜索展开按钮点击事件-----------start*/
	$('.expand-advance,.collapse-advance').on('click',function(){
		/* 调用函数执行展开高级搜索条件操作 */
		toggleSearchItem($(this));
	});
	/*高级搜索收缩按钮点击事件------------end*/
	
	/*刷新按钮点击事件------------start*/
	$('.refresh').on('click',function(){
		window.location.reload();
	});
	/*刷新按钮点击事件------------end*/
	
	/*窗口改变大小时重新布局-------------start*/
	$(window).on('resize',function(){
		$('.easyui-layout').layout('resize');
	});
	function westResize() {
		var layout = $('.easyui-layout');
		if (!layout || !layout.length) return;

		$.each(layout, function(i, item){
			var wPanel = $(item).layout('panel','west');
			if ( !wPanel || !wPanel.length ) return true;
			wPanel.panel({
				onCollapse: function($datagrid){
					autofit(item);
				},
				onExpand: function(){
					/*if ($('.easyui-layout').find('.datagrid').length > 0) {//页面不存在iframe的情况
						$('.datagrid').find('.datagrid-view>table').datagrid('resize');
					} else {//center区域存在iframe的情况
						var $grids = $('.easyui-layout').find('iframe').contents().find(".datagrid");
						if ($grids.length > 0) {//每一个datagrid都重新计算大小
							$.parser.parse();
							$.each($grids,function(i,grid){

								//$(grid).find('.datagrid-view>table').datagrid().datagrid('resize');
							});
						}
					}*/
					setTimeout(function() {
						autofit(item);
					}, 600);
				}
			});
		});

		function autofit(item) {
			var cPanel = $(item).layout('panel','center');
			 if ( $(item).find('iframe').length ) {
			 	$(item).find('iframe')[0].contentWindow.$('table.datagrid-f').datagrid('resize');
			 	//电网生产带有tabs的form表单页面的自适应
			 	var formPanel = $(item).find('iframe')[0].contentWindow.$('.easyui-form.auto-fit .panel');
		 		formPanel.css({
		 			width: '100%'
		 		}).find('.panel-header').css({
		 			width: '100%'
		 		});
			 } else {
			 	cPanel.find('table.datagrid-f').datagrid('resize');
			 }
		 	$(window).resize();  //对于其它包含在layout中的、且不能自适应的元素
		}
	}
	westResize();
	/*窗口改变大小时重新布局-------------end*/
	
	/*west区域收缩时layout重新布局*/
	$('.easyui-layout').layout({
		onCollapse: function(region){
			/*layout大小重置*/
			$('.easyui-layout').layout('resize');
		}
	});
	
	/* 设置弹出层默认宽高 */
	if ($('.east-popup .tuchuBottom').length) {
		/* 初始化弹出层的宽高 */
		var eastPopup = $('.east-popup'),
			options = eastPopup.data('options'),
			styleObj = {};
		/* 如果html中传入了配置属性，设置对应样式 */
		if (options) {
			var optionsArray = options.split(',');
			if (optionsArray.length) {
				$.each(optionsArray,function(index,item){
					var array = item.trim().split(':');
					styleObj[array[0]] = array[1].indexOf('%') === -1 ? (array[1] + 'px') : array[1].replace("\'","");
				});
			}
		}
		/* 如果没有传入宽高、设置默认值 */
		!styleObj.width && (styleObj.width = '50%');
		!styleObj.height && (styleObj.height = '100%');
		/* 设置弹出层的宽高 */
		 eastPopup.css({width: styleObj.width,height: styleObj.height,right: '-' + styleObj.width});
		/* 弹出层收起按钮点击事件 */
		$('.east-popup .tuchuBottom').on('click',function() {
			toggleEastpopup();
		});
	}
	
	bindEscToParentWindow();
});

/**
 *右侧弹出层按钮点击操作处理函数
 * @param type:string 显示还是隐藏,可取值为show、hide0
 */
function toggleEastpopup(type) {
	/* 弹出层元素 */
	var $popEle = $(this).closest('.east-popup').length ? $(this).closest('.east-popup') : $('.east-popup'),
		/* 计算后的样式 */
		computedStyle,
		rightValue;
	/* 弹出层元素存在才执行下面的操作 */
	if ($popEle.length) {
		/* 折叠展开按钮 */
		var toolButton = $popEle.find('.toggle-tool');
		/* 如果按钮是展开状态点击时设置为收起状态 */
		toolButton.hasClass('layout-button-left') ?
			toolButton.removeClass('layout-button-left').addClass('layout-button-right') :
			toolButton.addClass('layout-button-left').removeClass('layout-button-right');
		/* 获取弹出层的样式 */
		computedStyle = window.getComputedStyle($popEle[0]);
		if (type) {
			/* type为show时展示该区域 */
			rightValue = type === 'hide' ? (-$popEle.width() + 'px') : '0';
		} else {
			rightValue = computedStyle.right === '0px' ? (-$popEle.width() + 'px') : '0';
		}
		/* 改变元素的right值 */
		$popEle.css({right: rightValue});
	} else {
		showToastMsg(3000,{text:'弹出层不存在!',priority:'danger'});
	}
}

/**
 * 收起/展开高级搜索区域按钮点击操作处理函数
 * @param $this
 */
function toggleSearchItem($this) {
	if ($this.closest('.easyui-form').length) {
		$this.closest('.easyui-form').toggleClass('advanceSearchItem').toggleClass('seniorBox');
		if ($this.closest('.seniorBox').length) {
			/* 新建高级搜索表单的收起按钮 */
			var boxCollBtn = $('<div></div>');
			var collapseBtn = $('<div class="easyui-tooltip tuchuBottom" title="点击鼠标收起搜索条件"><i class="fa fa-sort-asc"></i></div>');
			boxCollBtn.append(collapseBtn);
			/** 根据标题元素的位置计算出高级搜索区域的宽度和顶部距离，其中11为标题区域的下外边距（如果搜索条件上一个兄弟节点就是标题区域，才减去下边距），2为保留2位精度，10为标题区域的内边距值 */
			var hideFormTop = $this.closest('.searchItem').prev('.breadCrumb').length ?
				($this.closest('.searchItem').offset().top - 11) :
				$this.closest('.searchItem').offset().top;
			var hideFormWidth = ($this.closest('.searchItem').width()).toFixed(2);
			
			/* 设置高级搜索框的宽度和top位置 */
			$this.closest('.seniorBox').css({width: hideFormWidth + 'px', top: hideFormTop.toFixed(2) + 'px'});
		}
		/* 隐藏当前按钮 */
		$this.addClass('comm_dhide');
	}
	/*高级搜索按钮点击*/
	if ( $this.hasClass('expand-advance') ) {
		$('.collapse-advance').removeClass('comm_dhide');
		/* 点击收起按钮时为按钮组移除样式class */
		$this.parent().addClass('button-group');
		/* 向高级搜索区域添加折叠按钮 */
		$this.closest('.seniorBox').append(collapseBtn);
		$.parser.parse(boxCollBtn);
		/* 为收起按钮绑定点击收起事件 */
		$('.tuchuBottom').on('click',function() {
			toggleSearchItem($(this));
			$('.tooltip').remove(); //解决点击收起按钮tooltip不隐藏的问题
		});
	} else {
		$('.expand-advance').removeClass('comm_dhide');
		/* 点击收起按钮时为按钮组移除样式class */
		$this.parent().removeClass('button-group');
		/* 点击收缩图标 */
		$this.parent().hasClass('easyui-form') &&
		$this.parent().find('.button-group').removeClass('button-group');
		/* 移除高级搜索区域的折叠按钮 */
		$this.closest('.easyui-form').find('.tuchuBottom').remove();
	}
}

/**
 * 在每个页面加载时, 判断是否存在父窗口id (pwinId), 是则绑定Esc按键事件
 * author: chenlilang
 */
function bindEscToParentWindow() {
	if ( !window.parent ) return;
	var args = comm.parseURL().params;
	// 如果查询到有父窗口id
	if ( args.pwinId ) {
		var pwin = window.parent.window.$('#' + args.pwinId); 
		$(document).bind('keydown', function( e ) {
			if ( e.which == 27 ) {
				pwin.window('close');
			}
		})
	}
}

/**
 * 搜索、高级搜索按钮点击操作函数
 * @param opt -> obj  {dgSelector:'datagrid选择器',formSelector:'form选择器',url:'datagrid初始化url不存在时传入'}
 *
 */
function searchDatagrid(opt){
	var $dg = $(opt.dgSelector),
		$form = $(opt.formSelector),
		queryParams,
		dgOptions = $dg.datagrid('options');
	if ($form.form('validate')) {
		queryParams = $dg.datagrid('options').queryParams = {};
		$form.serializeObject(queryParams);
		if (!dgOptions.url) {
			if (!opt.url) {
				showToastMsg(3000,{text:'datagrid表格的url不存在!',priority:'danger'});
				return;
			} else {
				dgOptions.url = _cfg.api + opt.url;
				/*表格数据刷新*/
				$dg.datagrid('load');
			}
		} else {
			/*表格数据刷新*/
			$dg.datagrid('load');
		}
	}
}

/**
 *  显示toast提示消息
 * 第一个参数毫秒，可不填，默认1500毫秒
 * 第二个参数Object		{
 * 						priority : priority || 'success',
 * 						text : priority == 'success' ? sText || '数据添加成功' : sText || '服务器异常'
 * 					}
 * 第三个参数function	回调  eg:showToastMsg(4000, {text : opt.errorMsg,priority : 'danger'},function(){});
 * 说明	当第一个参数没填的时候，可以直接写showToastMsg(Object, [function])，因为是用arguments取参数，所以不用担心参数获取失败
 */
function showToastMsg() {
	var DEFAULT_TIME = 1500,
		nExistTime = DEFAULT_TIME,
		opt = {
			priority : 'success'
		},
		callback = $.noop;

	for(var i = 0, length = arguments.length; i < length; i++) {
		var argument = arguments[i],
			type = typeof argument;
		if(type === 'number') {
			nExistTime = argument;
			if (nExistTime < DEFAULT_TIME) {
				// 最少DEFAULT_TIME
				nExistTime = DEFAULT_TIME;
			}
		} else if (type === 'object') {
			opt = $.extend(opt, argument);
		} else if (type === 'function') {
			callback = argument;
		}
	}
	var sText = opt.text,
		priority = opt.priority,
		sClassName = 'comm_toast_' + priority,
		//这里取消遮罩，体验不好，恢复增加class=comm_toast_body
		html = '<div class="" style="position: fixed; top: 40%; left: 50%; width: 350px; margin-left: -175px; text-align: left; z-index: 9999;">'+
			'<div class="' + sClassName + '">' + (priority === 'success' ? sText || '数据添加成功' : sText || '服务器异常') + '</div>'+
			'</div>',
		$msgBlock = $(html);

	$(document.body).append($msgBlock);

	setTimeout(function() {
		$msgBlock.fadeOut(nExistTime - DEFAULT_TIME, function() {
			callback && callback();
			$msgBlock.remove();
		});
	}, DEFAULT_TIME);
}

/**
 * 禁用easyui所有form表单元素
 * @param formId 表单id
 * @param isDisabled 是否为只读
 * 用法：disableForm('formUser',true);
 */
function disableForm(formId,isDisabled) {
	$("#" + formId + " .easyui-textbox").textbox({disabled:isDisabled});
	$("#" + formId + " .easyui-combobox").combobox({disabled:isDisabled});
	$("#" + formId + " .easyui-combotree").combotree({disabled:isDisabled});
	$("#" + formId + " .easyui-datebox").datebox({disabled:isDisabled});
	$("#" + formId + " .easyui-datetimebox").datetimebox({disabled:isDisabled});
}

/*
 * 为带*号的label的下一个表单元素加上required为true属性
 * @param $forms 表单jq对象
 * 用法：addRequired($('#formUser'));  位置放在$.parser.parse()之前
 */
function addRequired($forms) {
	$forms.each(function(i, form) {
		var $labels = $(form).find('label');
		$labels.each(function(index, label) {
			var $label = $labels.eq(index);
			// 找i标签下面是否有*
			if ($.trim($label.find('i').html()).indexOf('*') > 0) {
				$label.nextAll('input').attr('required', true);
			}
		});
	});
}

/**
 #下拉树事件重写事件重写
 --------------------------------------------------------------------
 ##  combotree.onShowPanel() 下拉第一项文本不存在时取消图标背景
 */
$.fn.combotree.defaults.onShowPanel = function(){
	/*去掉下拉树没有文本节点的图标*/
	var treeNode = $('.tree-title');
	if (treeNode.length > 0) {
		$.each(treeNode,function(index,value) {
			if (!$(value).text()) {
				$(value).prev().css('background','none');
			}
		});
	}
};

/**
 * 验证日期框不能大于当前日期
 * @selecter 日期框选择器
 * @isTime 该变量存在时则为日期时间框
 * 使用示例：validCurrentDate('#startTime');(日期框)/validCurrentDate('#startTime'，'xxx')（日期时间框）;
 */
function validCurrentDate(selecter,isTime) {
	var currentDate = new Date(),
		selecterValue,
		endValue;
	/*如果isTime存在，则为日期时间框*/
	if (isTime) {
		selecterValue = $(selecter).datetimebox('getValue');
		/*日期时间不能大于当前日期时间*/
		$(selecter).datetimebox({
			onSelect: function(d){
				var date = new Date(d).getTime(),
					value = currentDate.toJSON().replace('T',' ').substr(0,19),
					hours = currentDate.getHours() < 10 ? ('0'+currentDate.getHours()) : currentDate.getHours(),
					minutes = currentDate.getMinutes() < 10 ? ('0'+currentDate.getMinutes()) : currentDate.getMinutes(),
					seconds = currentDate.getSeconds() < 10 ? ('0'+currentDate.getSeconds()) : currentDate.getSeconds();
				if (date > currentDate.getTime()) {
					showToastMsg(3000, {text: '所选时间不能晚于当前时间', priority: 'danger'});
					$(this).datetimebox('showPanel').datetimebox('setValue',value.substr(0,10)+' '+hours+':'+minutes+':'+seconds);
					/*$(this).datetimebox().datetimebox('calendar').calendar({
					 validator: function(date){
					 var now = new Date(formatterDate(new Date(), 'date')),
					 d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
					 return d1 >= d;
					 }
					 });*/
				}
			}
		}).datetimebox('setValue',selecterValue);
	} else {
		/*日期不能大于当前日期*/
		selecterValue = $(selecter).datebox('getValue');
		endValue = $(selecter).eq(1).datebox('getValue');
		$(selecter).datebox({
			onSelect: function(d){
				var date = new Date(d).getTime();
				if (date > currentDate.getTime()) {
					showToastMsg(3000, {text: '所选日期不能晚于今天', priority: 'danger'});
					$(this).datebox('showPanel').datebox('setValue',currentDate.toJSON().substr(0,10));
					/*$(this).datebox().datebox('calendar').calendar({
					 validator: function(date){
					 var now = new Date(formatterDate(new Date())),
					 d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
					 return d1 >= date;
					 }
					 });*/
				}
			}
		}).datebox('setValue',selecterValue);
		$(selecter).eq(1).datebox('setValue',endValue);
	}
}

/**
 * 验证时间或日期是否大于当前时间
 * @param selecter
 * @param isTime
 */
function isAfterDate(obj) {
	var selector = obj.selector,
	isTime = obj.isTime,
	selecterValue,
	$selector = $(selector);
	
	/*如果isTime存在，则为日期时间框*/
	if (isTime) {
		selecterValue = $selector.datetimebox('getValue');
		/*日期时间不能小于当前日期时间*/
		$selector.datetimebox({
			onSelect: function(d){
				var date = new Date(d).getTime(),
				currentDate = new Date(),
				value = currentDate.toJSON().replace('T',' ').substr(0,19),
				hours = currentDate.getHours() < 10 ? ('0'+currentDate.getHours()) : currentDate.getHours(),
				minutes = currentDate.getMinutes() < 10 ? ('0'+currentDate.getMinutes()) : currentDate.getMinutes(),
				seconds = currentDate.getSeconds() < 10 ? ('0'+currentDate.getSeconds()) : currentDate.getSeconds();
				if (date <= currentDate.getTime()) {
					showToastMsg(3000, {text: '所选时间必须大于当前时间', priority: 'danger'});
					$selector.datetimebox('clear');
				}
			}
		}).datetimebox('setValue',selecterValue);
	} else {
		/*日期不能小于当前日期*/
		selecterValue = $(selector).datebox('getValue');
		$selector.datebox({
			onSelect: function(d){
				var date = new Date(d).getTime(),
				currentDate = new Date();
				if (date <= currentDate.getTime()) {
					showToastMsg(3000, {text: '所选日期必须大于今天', priority: 'danger'});
					$selector.datebox('clear');
				}
			}
		}).datebox('setValue',selecterValue);
	}
}

/**
 * 默认时间格式处理函数
 * @date 默认时间格式
 * @d 是否显示时分秒，为true显示格式为年月日，否则为年月日+时分秒
 */
function formatterDate(date, d) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
		month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1),
		year = date.getFullYear(),
		hor = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
		hor = (hor <=9 ? ('0'+hor) : hor);
		min = (min <=9 ? ('0'+min) : min);
		sec = (sec <=9 ? ('0'+sec) : sec);
	return [year, month, day].join('-') + (!d && ' ' + [hor, min, sec].join(':') || '');
}

/*
 *修改easyui日期框，只显示年月
 * 用法：给元素添加class为 dataMonth和easyui-datebox
 * */
if (document.getElementsByClassName("dataMonth")) {
	var dataMonths=$(".dataMonth");
	$.each(dataMonths,function(index,value){
		$(value).datebox({
			onChange: function(n,o){
				var currentDate = new Date(),
					year = currentDate.getFullYear(),
					month = currentDate.getMonth() + 1;
				if(n){
					if (Number(n.substr(0,4)) > year){
						showToastMsg(3000, {text: '所选月份不能超过当前月份！', priority: 'danger'});
						$(value).datebox('setValue',o);
					} else if (Number(n.substr(0,4)) === year) {
						if (Number(n.substr(5,2)) > month){
							showToastMsg(3000, {text: '所选月份不能超过当前月份！', priority: 'danger'});
							$(value).datebox('setValue',o);
						}
					}
				}
			},
			onShowPanel: function() { //显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
				span.trigger('click'); //触发click事件弹出月份层
				if (!tds) setTimeout(function() { //延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
					tds = p.find('div.calendar-menu-month-inner td');
					tds.click(function(e) {
						e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
						var year = /\d{4}/.exec(span.html())[0],
							month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
						month = (month <9) ? ('0'+month) : month;
						$(value).datebox('hidePanel') //隐藏日期对象
							.datebox('setValue', year + '-' + month); //设置日期的值
					});
				}, 0);
				yearIpt.unbind(); //解绑年份输入框中任何事件
			},
			parser: function(s) {
				if (!s) return new Date();
				var arr = s.split('-');
				return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
			},
			formatter: function(d) {
				var month = (d.getMonth() <9) ? ('0'+ (d.getMonth()+1)) : (d.getMonth() + 1);
				return d.getFullYear() + '-' + month; /*getMonth返回的是0开始的，忘记了。。已修正*/
			}
		});
		var p = $(value).datebox('panel'), //日期选择对象
			tds = false, //日期选择对象中月份
			aToday = p.find('a.datebox-current'),
			yearIpt = p.find('input.calendar-menu-year'), //年份输入框
		//显示月份层的触发控件
			span = aToday.length ? p.find('div.calendar-title span') : //1.3.x版本
				p.find('span.calendar-text'); //1.4.x版本
		if (aToday.length) { //1.3.x版本，取消Today按钮的click事件，重新绑定新事件设置日期框为今天，防止弹出日期选择面板
			aToday.unbind('click').click(function() {
				var now = new Date(),
					month = (now.getMonth() <9) ? ('0'+ (now.getMonth()+1)) : (now.getMonth() + 1);
				$(value).datebox('hidePanel').datebox('setValue', now.getFullYear() + '-' + month);
			});
		}
	});
}
//递归处理树形结构
function $recursionTreeData(item,cb,ctx){
    if(!ctx){
        ctx=this;
    }
    if(!cb){
        cb=function(){}
    }
    if(item instanceof Array){
        for(var i= 0,len=item.length;i<len;i++){
            var it = item[i];
            cb.call(ctx,it);
            if(it.children && it.children.length>0){
                $recursionTreeData(it.children,cb,ctx);
            }
        }
    }else{
        cb.call(ctx,item);
        if(item.children && item.children.length>0){
            $recursionTreeData(item.children,cb,ctx);
        }
    }
}
//过滤树形结构
function $filterTreeData(items,cb){
    var _items=[];
    var that = this;
    if(items instanceof Array){
        for(var i= 0,_len=items.length;i <_len;i++){
            var item = items[i];
            cb.call(that,item) && _items.push(item);

            if(item.children && item.children.length>0){
                item.children = $filterTreeData(item.children, cb);
            }

            //item.children=$.utils.filter(item,cb);
        }
    }else{
        if(cb.call(that,items)){
            _items.push(items);
            if(items.children && items.children.length > 0){
                items.children=$filterTreeData(items.children,cb);
            }
        }
    }
    return _items;
}