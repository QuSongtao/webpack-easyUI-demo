/**
 * 说明：该扩展主要为营销系统对easyui的扩展功能
 * Created on 2017/6/28.
 */


/**
 * 修改easyui日期控件的格式
 * 目前将easyui源码日期控件格式由斜杠替换成横线 (注: chenlilang)
 */
if ($.fn.datebox) {
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
/*	$.fn.datebox.defaults.formatter = function (date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
	};
	$.fn.datebox.defaults.parser = function (s) {
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0], 10);
		var m = parseInt(ss[1], 10);
		var d = parseInt(ss[2], 10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
			return new Date(y, m - 1, d);
		} else {
			return new Date();
		}
	};*/
}
if ($.fn.datetimebox && $.fn.datebox) {
	$.extend($.fn.datetimebox.defaults, {
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}

/*
 * tooltip问题
 */
/*$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = undefined;
	}
});
*/

/**
 * 修改easyui组件默认值
 */
$.fn.textbox.defaults.width = 180; //宽度
$.fn.textbox.defaults.height = 30; //高度
$.fn.combo.defaults.width = 180; //宽度
$.fn.combo.defaults.height = 30; //高度
$.fn.combobox.defaults.onShowPanel = onCbxShowPanel; //下拉框面板弹出的回调
$.fn.combobox.defaults.onHidePanel = onCbxHidePanel; //下拉框面板隐藏的回调
$.fn.combobox.defaults.width = 180; //宽度
$.fn.combobox.defaults.height = 30; //高度
$.fn.combobox.defaults.panelHeight = 'auto';//下拉框 下拉框板最小高度
$.fn.combobox.defaults.panelMaxHeight = 180;//下拉框 下拉框板最大高度
$.fn.combobox.defaults.prompt = '-请选择-';//默认提示文字
$.fn.combotree.defaults.width = 180; //宽度
$.fn.combotree.defaults.height = 30; //高度
$.fn.combotree.defaults.panelHeight = 'auto';//下拉树 下拉树板最小高度
$.fn.combotree.defaults.panelMaxHeight = 180;//下拉树 下拉树板最大高度
$.fn.combotree.defaults.prompt = '-请选择-';//默认提示文字
$.fn.combotree.defaults.onShowPanel = onCbTreeShowPanel; //下拉框面板弹出的回调
$.fn.combotree.defaults.onHidePanel = onCbTreeHidePanel; //下拉框面板隐藏的回调
$.fn.numberbox.defaults.width = 180; //宽度
$.fn.numberbox.defaults.height = 30; //高度
$.fn.datebox.defaults.width = 180; //宽度
$.fn.datebox.defaults.height = 30; //高度
$.fn.datebox.defaults.editable = false; //日期框不可编辑
$.fn.datebox.defaults.onShowPanel = onDateboxShowPanel; //下拉框面板弹出的回调
$.fn.datebox.defaults.onHidePanel = onDateboxHidePanel; //下拉框面板弹出的回调
$.fn.datetimebox.defaults.width = 180; //宽度
$.fn.datetimebox.defaults.height = 30; //高度
$.fn.datetimebox.defaults.editable = false; //日期框不可编辑
$.fn.datetimebox.defaults.onShowPanel = onDateTimeShowPanel; //下拉框面板弹出的回调
$.fn.datetimebox.defaults.onHidePanel = onDateTimeHidePanel; //下拉框面板弹出的回调
$.fn.numberbox.defaults.width = 180; //宽度
$.fn.numberspinner.defaults.width = 180; //宽度
$.fn.numberspinner.defaults.height = 30; //高度
$.fn.datagrid.defaults.method = 'GET'; //方法
$.fn.datagrid.defaults.pagination = true; //分页
$.fn.datagrid.defaults.fit = true; //是否撑满父元素
$.fn.datagrid.defaults.fitColumns = true; //自适应列
$.fn.datagrid.defaults.rownumbers = true; //行编号
$.fn.datagrid.defaults.idField = 'id'; //行编号
$.fn.datagrid.defaults.sortable = true; //可排序
$.fn.datagrid.defaults.headerCls = 'dg-header'; //表头class
$.fn.datagrid.defaults.height = 350; //表头class
$.fn.datagrid.defaults.colsConfigurable = true; //表头是否可配置（自定义）
$.fn.datagrid.defaults.colsNumber = 10;         //默认显示的表头数量（自定义）
$.fn.datagrid.defaults.onLoadSuccess = onLoadSuccess; //datagrid默认onLoadSuccess事件
$.fn.datagrid.defaults.onAfterEdit = onDgAfterEdit; //datagrid默认onAfterEdit事件
$.fn.datagrid.defaults.onEndEdit = onDgAfterEdit; //datagrid默认onEndEdit事件
$.fn.datagrid.defaults.onCheckAll = onCheckAll; //datagrid默认onCheckAll事件
$.fn.datagrid.defaults.onUncheckAll = onUncheckAll; //datagrid默认onUncheckAll事件
$.fn.datagrid.defaults.pageList = $.fn.pagination.defaults.pageList = [20, 30, 50, 100, 300];//分页条数
$.fn.datagrid.defaults.links = $.fn.pagination.defaults.links = 5;//分页链接数
$.fn.pagination.defaults.layout = ['info', 'list', 'sep', 'first', 'prev', 'links', 'next', 'last', 'refresh', 'manual'];
$.fn.tree.defaults.lines = true; //树节点虚线
$.fn.tree.defaults.animate = true; //树节点展开动画
$.fn.treegrid.defaults.onLoadSuccess = onLoadSuccess; //树表treegrid默认onLoadSuccess事件
$.fn.layout.defaults.fit = true; //layout 的fit为true
$.fn.layout.defaults.expandMode = 'dock'; //layout 折叠效果
$.fn.panel.defaults.border = false; //panel去掉边框

/**
 * combobox下拉面板弹出后的回调
 */
function onCbxShowPanel() {
/*	var firstItem = $(this).combo('panel').find('.combobox-item:eq(0)');
	if ( firstItem && !firstItem.html() ) {
		firstItem.addClass('empty-item');
	}*/
	_showPanel(this, 'combobox');
}

/**
 * combotree下拉面板弹出后的回调
 */
function onCbTreeShowPanel() {
	_showPanel(this, 'combotree');
}


function _showPanel(t, cb) {
	var ctrl = cb == 'combobox' ? cb : 'combotree'
	//下拉框面板高度自适应
	var obj = $(t);
	var panel = obj[ctrl]("panel");
	var height =  panel.height();
	22 * panel[0].childElementCount < height && panel.height("auto");
	
	//添加清除按钮
	if (height > 0) {
		var icon = obj[ctrl]("getIcon", 0);
		if (icon.hasClass("icon-clear")) {
			icon.show();
		} 
		else {
			var clearIcon = $("<a href='javascript:void(0)' class='textbox-icon icon-clear' icon-index='0' tabindex='-1' style='width: 18px; height: 24px;'></a>");
			clearIcon.prependTo(icon.parent());
			clearIcon.click(function (e) {
				$(obj)[ctrl]("clear");
			});
		}
	}
}

/**
 * combobox下拉面板隐藏后的回调
 */
function onCbxHidePanel () {
	_hidePanel(this, 'combobox');
}

/**
 * combotree下拉面板隐藏后的回调
 */
function onCbTreeHidePanel () {
	_hidePanel(this, 'combotree');
}

function _hidePanel(obj, cb) {
	var ctrl = cb == 'combobox' ? cb : 'combotree'
	var icon = $(obj)[ctrl]("getIcon", 0);
	icon.hasClass("icon-clear") && icon.hide();
}

/**
 * datebox下拉面板弹出后的回调
 */
function onDateboxShowPanel () {
	_dbShowPanel(this, 'datebox');
}

/**
 * datetimebox下拉面板弹出后的回调
 */
function onDateTimeShowPanel () {
	_dbShowPanel(this, 'datetimebox');
}

function _dbShowPanel(obj, cb) {
	var ctrl = cb == 'datebox' ? cb : 'datetimebox'
	var me = $(obj);
	var icon = me[ctrl]('getIcon', 0);
	if (!icon.hasClass("icon-clear")) {
		var clearIcon = $('<a href="javascript:void(0)" class="textbox-icon icon-clear" icon-index="0" tabindex="-1" style="width: 18px; height: 24px;"></a>');
		clearIcon.prependTo(icon.parent());
		clearIcon.click(function (e) {
			me[ctrl]('clear');
		});
	} else {
		icon.show();
	}
}

/**
 * datebox下拉面板隐藏后的回调
 */
function onDateboxHidePanel() {
	_dbHidePanel(this, 'datebox');
}

/**
 * datetimebox下拉面板隐藏后的回调
 */
function onDateTimeHidePanel() {
	_dbHidePanel(this, 'datetimebox');
}

function _dbHidePanel(obj, cb) {
	var ctrl = cb == 'datebox' ? cb : 'datetimebox'
	var icon = $(obj)[ctrl]('getIcon', 0);
	if (icon.hasClass("icon-clear")) {
		icon.hide();
	}
}

/**
 * 扩展datagrid可配置列的菜单按钮（不支持冻结列）
 * 说明：默认只显示前10个字段列
 * @param grid 表格对象
 * @param menuId 下拉菜单框的id
 * @param boxConfig 下拉菜单框的父容器
 * By: chenlilang
 */
function createColsConfigContextMenu( grid, menuId, boxConfig ) {
	var spdiv = $('<div id="'+ menuId +'"></div>');
	var fields = grid.datagrid('getColumnFields'),
	    options = grid.datagrid('options'),
		showFields = []; //showFields 保存初始化时不是隐藏的字段
	//构建 显示全部列 和 还原默认
	$('<div iconCls="tree-checkbox1" id="_all" field="_all"/>').html('显示全部列').appendTo(spdiv);
	$('<div class="menu-sep"></div>').appendTo(spdiv);
	var counter = 1;
	var len = fields.length;
	//构建 显示/隐藏列
	for (var i = 0; i < len; i++) {
		var fildOption = grid.datagrid('getColumnOption', fields[i]);
		if (!fildOption.hidden
			&& fildOption.field != '_ck'
			&& fildOption.field != 'ck'
			&& fildOption.field != 'handle'
		) {
			showFields.push(fields[i]);
			var iconCls = counter > options.colsNumber ? 'tree-checkbox0' : 'tree-checkbox1'
			$('<div iconCls="' + iconCls + '" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(spdiv);
			if ( counter > options.colsNumber ) {
				grid.datagrid('hideColumn', fields[i]);
			}
			counter++;
		}
	}
	spdiv.appendTo('body');

	$.parser.parse(boxConfig);
	//设置全选复选框的状态
	if ( counter - 1 > options.colsNumber ) {
		$('#' + menuId).menu("setIcon", {
			target: $('#' + menuId).children('div.menu-item:first'),
			iconCls: 'tree-checkbox2'
		});
	}

	$('#' + menuId).menu({
		hideOnUnhover: true,
		onClick: function (item) {
			var menuBtn = $(this);
			var fieldProperty = $(item.target).attr('field');
			if (fieldProperty == '_all') {
				$.each(showFields, function (i, t) {
					grid.datagrid("showColumn", t)
				});
				$(this).menu("setIcon", {
					target: $(item.target).parent().children("div.menu-item:first"),
					iconCls: 'tree-checkbox1'
				});
				$(item.target).parent().find('div.menu-item:gt(0)').each(function (i, t) {
					menuBtn.menu("setIcon", { target: $(this), iconCls: "tree-checkbox1" })
				});
			} else {
				if (item.iconCls == 'tree-checkbox1') {
					grid.datagrid('hideColumn', fieldProperty);
					$(this).menu('setIcon', {
						target: item.target,
						iconCls: 'tree-checkbox0'
					});
				}
				if (item.iconCls == 'tree-checkbox0') {
					grid.datagrid('showColumn', fieldProperty);
					$(this).menu('setIcon', {
						target: item.target,
						iconCls: 'tree-checkbox1'
					});
				}

				//渲染 显示全部列 前面的图标
				var count = 0;
				var allCheckboxItem = $(item.target).parent().children("div.menu-item:first");
				$.each(showFields, function (i, t) {
					var fildOption = grid.datagrid('getColumnOption', showFields[i]);
					if (!fildOption.hidden && fildOption.field != '_ck') {
						count++;
					}
				});
				$(this).menu("setIcon", {
					target: allCheckboxItem,
					iconCls: count >= showFields.length ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2")
				});
				// if ( count >= showFields.length ){
				// 	menuBtn.menu('disableItem', allCheckboxItem)
				// } else {
				// 	menuBtn.menu('enableItem', allCheckboxItem)
				// }
			}

			menuBtn.menu('show');
			$(item.target).parent().show(); //点击菜单项不隐藏菜单列表
		}
	});
	// 默认表格的前两个列字段禁止隐藏
	$('#' + menuId).find('div.menu-item:gt(0)').each(function (i, t) {
		if ( i == 0 || i == 1 ) {
			$('#' + menuId).menu('disableItem', t);
		}
	});
}

/**
 * 列表全选操作的回调
 * 使用prop代替attr方法，可以有效解决删除属性产生的错误（jquery 1.6之前的bug）
 * by: chenlilang
 */
function onCheckAll(rows) {
	var cbAllBox = $(this).datagrid('getPanel').find('.dg-checkAllDiv');
	cbAllBox.find('.bottom_cbox input[type="checkbox"]:eq(0)').prop('checked', 'true');
}

/**
 * 列表取消全选操作的回调
 */
function onUncheckAll(rows) {
	var cbAllBox = $(this).datagrid('getPanel').find('.dg-checkAllDiv');
	cbAllBox.find('.bottom_cbox input[type="checkbox"]:eq(0)').removeProp('checked', 'true');
}

/**
 * 列表行编辑完成的回调
 */
function onDgAfterEdit(index, row, changes) {
	var handleBox = $(this).datagrid('getPanel').find('div.datagrid-body td[field = "handle"] .datagrid-cell');
	handleBox.length && handleBox.empty();
	var data = $(this).datagrid('getData');
	onLoadSuccess.call(this, data);
}

/**
 * datagrid加载成功事件重写
 * -------------------------------------------------
 * datagrid.onLoadSuccess() 注册datagrid行提示效果
 * (鼠标移动未显示完字段时会显示全部内容)
 */
function onLoadSuccess(result) {
	var $datagrid = $(this),
		dgOPtions = $datagrid.datagrid('options'),
		checkAll = $('<div class="dg-checkAllDiv comm_float_left comm_pa_l"></div>'),
		selectedRow = $datagrid.datagrid('getSelected');

	// 清空缓存 (clearselections会触发一次onUnselectAll事件 注:chenlilang)
	//$datagrid.datagrid('clearSelections');
	
	/* 加载完成后如果高级搜索框存在则收起高级搜索框 */
	$('.seniorBox').length > 0 && ($('.seniorBox').find('.tuchuBottom').trigger('click'));
	
	/*datagrid重置大小*/
	$('.datagrid').find('.datagrid-view>table').datagrid('resize');
	
	/* 页面中只有一个表格的时候设置datagrid滚动事件 */
	// ($('.datagrid').length === 1 && $('.datagrid-btable').height() > $('.datagrid-body').height()) &&
	($('.datagrid-btable').height() > $('.datagrid-body').height()) &&
		$datagrid.closest('.datagrid ').ScrollDocument();

	//自定义分页
	dgOPtions.customPager && dgOPtions.customPager($datagrid);
	
	/*显示序号表头*/
	$('.datagrid-header-row div.datagrid-header-rownumber').text('序号');
	$datagrid.parent().next('.datagrid-pager.pagination').find('.dg-checkAllDiv').remove();
	$datagrid.parent().next('.datagrid-pager.pagination').prepend(checkAll);

	//列配置按钮
	dgOPtions.colsConfigurable && renderConfigButton($datagrid);

	/*若datagrid的buttons(全局操作)属性存在，则动态添加全局按钮到title区域*/
	if (dgOPtions.buttons && dgOPtions.buttons.length > 0) {
		/*移除原有的按钮*/
		$datagrid.parent().parent().prev().find('.panel-title>a').remove();
		$datagrid.parent().next().find('.dg-checkAllDiv a').remove();
		$('.breadCrumb>div a').remove();

		/*调button渲染函数*/
		gridButtonsRender($datagrid, dgOPtions.buttons);
	}

	if (result && result.rows && result.rows.length > 0) {
		//显示提示框
		$(this).datagrid('tooltip');
		//表格刷新后，清空选择数据
		$datagrid.datagrid('clearSelections').datagrid('clearChecked');

		/*默认选中第一条数据 (由于某些需要多选的业务模块会受影响)*/
		//!selectedRow && $datagrid.datagrid('clearSelections').datagrid('clearChecked').datagrid('selectRow',0);
		//!selectedRow && $datagrid.datagrid('clearChecked').datagrid('selectRow',0);

	} else {
		/*提示加载失败信息*/
		( result && result.errorMsg ) && showToastMsg(4000, { text: result.errorMsg, priority: 'danger' });
	}

	/*调用页面自定义的datagrid加载成功函数*/
	dgOPtions.onCustomLoadSuccess && dgOPtions.onCustomLoadSuccess(result);
}

/**
 * 渲染表头可配置按钮
 * @dg dg.posColsConfig 列配置按钮的位置 默认放在搜索区域
 * By: chenlilang
 */
function renderConfigButton( dg ) {
	var menuId = comm.Guid();
	var options = dg.datagrid('options');
	var configBtnBox = $('.searchItem:eq(0)');
	switch ( options.posColsConfig ) {
		case 'toolbar':
			configBtnBox = dg.datagrid('getPanel').find('.datagrid-toolbar:eq(0)');
			configBtnBox = configBtnBox.length ? configBtnBox : dg.datagrid('getPanel').prev().find('.panel-title');
			configBtnBox.find('.btn_config_cols').remove();
			break;
		case 'top':
			configBtnBox = $('.breadCrumb:eq(0)');
			$('.breadCrumb:eq(0) .btn_config_cols').remove();	
			break;
		default:
			$('.searchItem:eq(0) .btn_config_cols').remove();	
	}
	if ( !configBtnBox.length ) return;
	var boxConfig = $('<div class="btn_config_cols"></div>');
	var btnConfig = $('<div class="easyui-menubutton config_menubtn" title="列表默认显示前' +　options.colsNumber　+ '项字段" data-options="menu:\'#'+ menuId +'\'"><i class="fa fa-cog c_btn setting" aria-hidden="true"></i></div>')
	boxConfig.append(btnConfig);
	configBtnBox.append(boxConfig);

	createColsConfigContextMenu( dg, menuId, boxConfig );

	$('.config_menubtn').tooltip({
		content: '列表默认显示前' +　options.colsNumber　+ '项',
		showDelay: 100,
		onShow: function(e) {
			var tip = $(this).tooltip('tip');
			$(tip).width(116);
		}
	});

	setTimeout(function(){
		$('.config_menubtn').unbind('mouseenter'); //解除列配置按钮的mouseenter事件
		$('.config_menubtn').bind('mouseenter', function( e ) {
			$(this).tooltip('show');
		});
	}, 0);
}

/**
 * 根据模版和数据，生成对应的字符串
 * @param {string} template - 对应的模版
 * @param {object} data - 对应的数据
 * @returns {string} 替换过后的字符串
 */
function replaceTemplateByData(template, data) {
	return template.replace(/#{\s*(\w+)\s*}/g, function (match, key) {
		return data[key];
	});
}

/**
 * 在构建 datagrid 的按钮时，根据不同的按钮类型生成不同的按钮
 * @param {object} buttonConfig - 对应按钮的配置
 * @returns {object} 生成的按钮结点
 */
function buildGridButtonByConfig(buttonConfig) {
	if (buttonConfig.buttonType === "icon") {
		return buildGridIconButton(buttonConfig);
	}
	return buildGridTextButton(buttonConfig);
}

/**
 * 构建 datagrid 的文本类型的按钮
 * @param {object} buttonConfig - 对应的按钮配置
 * @returns {object} 生成的按钮结点
 */
function buildGridTextButton(buttonConfig) {
	var template = "<a href='javascript:void(0)' id='#{id}' class='#{className}'>#{text}</a>",
		domStr = replaceTemplateByData(template, buttonConfig);

	return $(domStr);
}

/**
 * 构建 datagrid 的图标按钮
 * @param {object} buttonConfig - 对应的按钮配置
 * @returns {object} 生成的按钮结点
 */
function buildGridIconButton(buttonConfig) {
	var iconMap = {
			"print": "iconfont icon-piaojudayin",
			"export": "iconfont icon-xiazai",
			"import": "iconfont icon-shangchuan",
			"help": "fa fa-question"
		},
		buttonIcon = iconMap[buttonConfig.buttonIcon],
		template = "<a href='javascript:void(0)' id='#{id}' class='#{className} icon-btn' data-options='iconCls: \"#{iconClass}\"'></a>",
		domStr = null;

	domStr = replaceTemplateByData(template, $.extend({}, buttonConfig, {iconClass: buttonIcon}));
		
	return $(domStr);
}

/**
 * datagrid加载成功处理函数（片段）
 */
function gridButtonsRender(grid, buttons) {
	var gridTitle = grid.datagrid('options').title,
		handleCell = grid.datagrid('getPanel').find('div.datagrid-body td[field = "handle"]'),
		inlineButtonNum = 0,
		defaultNum = grid.defaultInlineNum || 3, //支持设置默认的行内按钮数
		dgRows = grid.datagrid('getRows'),
		gridButtons = [],
		inline_i = 0,
		bottom_i = 0;

	/* 首先清空操作列所有的按钮 */
	grid.datagrid('getPanel').find('td[field="handle"] div.datagrid-cell:not(:first-child)').empty();		
	/* 遍历传入的全局操作按钮，去掉不显示的按钮数据 */
	$.each(buttons, function (i, button) {
		!button.isHidden && gridButtons.push(button);
		if ( button.isGlobal === 'inline' ) inlineButtonNum++;
	});
	/*遍历传入的全局操作按钮追加到相应dom位置*/
	$.each(gridButtons, function (index, item) {
		var golHandleContainer,
			gloElement,
			flagElement = '<div class="moreHandle">更多<i class="fa fa-angle-down comm_ma_l5"></i><ul class="menubutton"></ul></div>',
			className = 'easyui-linkbutton',
			disableClass = item.isDisable ? 'dgbutton_disable' : '',
			buttonDomConfig = null,
			guid = comm.Guid();
		
		item.isActive && (className += ' active');
		if (item.extraClass) {
			className = className + " " + item.extraClass;
		}
		buttonDomConfig = {
			className: className,
			id: item.id,
			text: item.text,
			buttonIcon: item.buttonIcon,
			buttonType: item.buttonType
		};
		switch (item.isGlobal) {
			case 'top':    //页面右上角
				renderTopBtn(golHandleContainer, gloElement, item, className, buttonDomConfig);
				break;

			case 'inline': //行内操作按钮（超过三个显示'更多'下拉按钮)
				inline_i++;
				renderInlineBtn(
					inline_i, handleCell, inlineButtonNum, defaultNum, item, disableClass, flagElement, grid
				);			
				break;

			case 'bottom': //显示在分页左侧
				renderBottomBtn(
					golHandleContainer, grid, bottom_i, gloElement, item
				);
				bottom_i++;
				break;

			default:       //显示在datagrid标题右边
				renderDgToolbarBtn(
					gridTitle, golHandleContainer, gloElement, item, className, grid, buttonDomConfig
				);
		}

		/* 添加提示信息 */
		if ( item.tooltip ) {
			$('#' + item.id).tooltip(item.tooltip);
			$('#' + item.id).click(function(){
				$('.tooltip').remove(); //解决点击按钮tooltip不隐藏的问题
			});
		}
		if (item.handle && !item.isDisable) {
			$('#' + item.id).on('click',function(){
				var selections = grid.datagrid('getSelections');
				item.isGlobal === 'bottom' ? item.handle(selections) : item.handle($(this));
			});
		}
		if ( item.menubutton 
			 && item.menubutton instanceof Array 
			 && item.menubutton.length
		) {
			setTimeout(function() {
				$.each(item.menubutton, function( j, jItem ) {
					if (!jItem.isDisable) {
						$('#' + jItem.id).unbind('click').on('click',function(){
							var selections = grid.datagrid('getSelections');
							jItem.handle && jItem.handle(selections);
						});
					} else {
						/* 如果当前对象传入子读属性，设置按钮为只读 */
						$('#' + jItem.id).linkbutton('disable');
					}
				});
			}, 0);
		}
		$.parser.parse('.datagrid');
		/* 如果当前对象传入子读属性，设置按钮为只读(在按钮渲染完成后才能执行该操作) */
		item.isDisable && $('#' + item.id).linkbutton('disable').linkbutton({disabled: true});
		$.parser.parse('.breadCrumb');
	});

	// 列表支持buttonsFormatter：与buttons.formatter一样可以处理行操作按钮的筛选，方式不一样而已。
 	var gridOpts = grid.datagrid('options');
	if (gridOpts.buttonsFormatter && typeof gridOpts.buttonsFormatter === 'function') {
	 	var btnItems = [], curPageData = [];
		$.each(gridButtons, function (index, item) { 
			if (item.isGlobal === 'inline') {
				btnItems.push(handleCell.find('.datagrid-cell .' + item.id));
				curPageData = grid.datagrid('getData');
			}
		});
		gridOpts.buttonsFormatter( curPageData, btnItems );
	}

	/*document点击隐藏menumubutton*/
	$(document).on('click', function (e) {
		if (!$(e.target).hasClass('moreHandle') && !$(e.target).hasClass('menubutton') && e.target.nodeName !== 'LI') {
			$(this).find('.datagrid-view td[field="handle"] .menubutton').is(":visible") && $(this).find('.datagrid-view td[field="handle"] .menubutton').hide();
		}
		if ($(e.target).hasClass('fa-angle-down')) {
			if ($(e.target).next('.menubutton').is(":hidden")) {
				$('.datagrid-view td[field="handle"] .menubutton').hide();
				$(e.target).next('.menubutton').show();
			} else {
				$(e.target).next('.menubutton').hide();
			}
		}
	});
}

/**
 * 页面右上角按钮区域
 */
function renderTopBtn(golHandleContainer, gloElement, item, className, buttonDomConfig) {
	if ($('.breadCrumb>div:eq(0)').length > 0) {
		golHandleContainer = $('.breadCrumb>div:eq(0)');
		gloElement = buildGridButtonByConfig(buttonDomConfig);
	}
	golHandleContainer && golHandleContainer.append(gloElement);	
}

/**
 * datagrid标题右方按钮,如果title存在，
 * 则动态添加设置按钮到表头位置，否则添加到搜索区域
 */
function renderDgToolbarBtn(
	gridTitle, golHandleContainer, gloElement, item, className, grid, buttonDomConfig
) {
	if (gridTitle) {
		golHandleContainer = grid.closest('.datagrid-wrap').prev().find('.panel-title');
		gloElement = $('<a href="javascript:void(0)" id="'+ item.id +'" class="'+ className + '">'+ item.text+'</a>');
	} else {
		if (grid.closest('.panel-body').prev('.panel-header').length > 0) {//center区域存在title
			golHandleContainer = grid.closest('.panel-body').prev('.panel-header').find('.panel-title');
		} else {//center区域title和datagrid标题都不存在时
			golHandleContainer = $('.breadCrumb>div');
		}
	}
	gloElement = buildGridButtonByConfig(buttonDomConfig);
	golHandleContainer && golHandleContainer.append(gloElement);
}

/**
 * datagrid行内编辑按钮
 */
function renderInlineBtn(
	inline_i, handleCell, inlineButtonNum, defaultNum, item, disableClass, flagElement, grid
) {
	var dgRows = grid.datagrid('getRows');
	if (!handleCell || !handleCell.length) return;
	
	if ( inlineButtonNum > defaultNum && inline_i > defaultNum - 1 ) {
		/*行内操作按钮超过2个的自动处理成下拉按钮的显示方式*/
		$.each(handleCell, function (h, handle) {
			var $liItem = $('<li class="' + item.id + ' '+ disableClass +'">' + item.text + '</li>');
			/*防止出现循环添加更多操作按钮*/
			if ($(handle).find('.datagrid-cell .moreHandle').length < 1) {
				/*为每一行操作td添加按钮元素*/
				$(handle).find('.datagrid-cell').append($(flagElement));
			}
			$(handle).find('.datagrid-cell ul').append($liItem);
			
			/*为每一个下拉按钮绑定点击事件*/
			if (!item.isDisable) {
				$liItem.on('click', function(e){
					e.stopPropagation();
					var index = $(this).closest('.datagrid-row').attr('datagrid-row-index');
					grid.datagrid('selectRow', index);
					item.handle && item.handle(dgRows[index]);
					$('.datagrid-view td[field="handle"] .menubutton').hide();
				});
			}
			/*点击更多按钮显示/因此下拉按钮*/
			$(handle).find('.moreHandle').unbind('click').bind('click', function(e){
				e.stopPropagation();
				var index = $(this).closest('.datagrid-row').attr('datagrid-row-index');
				grid.datagrid('selectRow', index);
				/* 不可操作状态下的行按钮不执行回调函数中的操作 */
				if (!$(this).closest('.datagrid-row').hasClass('datagrid-row-disabled')) {
					var nodeName = e.target.nodeName;
					if ( nodeName === 'DIV' || nodeName === 'I' ) {
						/*menubutton隐藏显示切换*/
						if ($(this).find('.menubutton').is(":hidden")) {
							$('.datagrid-view td[field="handle"] .menubutton').hide();
							$(this).find('.menubutton').show();
						} else {
							$(this).find('.menubutton').hide();
						}
					}
				}
				return true;
			});
		});
	} else {
		var itemBtn = $('<a href="javascript:void(0)" class="'+ item.id + ' '+ disableClass +'">'+ item.text+'</a>');
		handleCell.find('.datagrid-cell').append(itemBtn);
		if ( item.tooltip ) {
			itemBtn.tooltip(item.tooltip);
			itemBtn.on('click', function(){
				$('.tooltip').remove();
			});
		}
		/* 为每一个td操作项添加行内操作按钮并绑定点击事件 */
		if (!item.isDisable) {
			$('.' + item.id).on('click',function(e){
				e.stopPropagation();
				var index = $(this).closest('.datagrid-row').attr('datagrid-row-index');
				grid.datagrid('selectRow', index);
				/* 不可操作状态下的行按钮不执行回调函数中的操作 */
				if (!$(this).closest('.datagrid-row').hasClass('datagrid-row-disabled')) {
					var index = $(this).closest('.datagrid-row').attr('datagrid-row-index');
					item.handle && item.handle((grid.datagrid('getRows') || [])[index]);
				}
			});
		}
	}
	// 支持buttons.formatter：可以处理行操作按钮的筛选
	if ( item.formatter && typeof item.formatter === 'function' ) {
		var btnItems = handleCell.find('.datagrid-cell .' + item.id);
		var curPageData = grid.datagrid('getData');
		item.formatter( curPageData, btnItems );
	}
}

/**
 * datagrid左下角批量操作按钮
 */
function renderBottomBtn(
	golHandleContainer, grid, bottom_i, gloElement, item, guid
) {
	/*批量操作按钮，分页左侧*/
	golHandleContainer = grid.datagrid('getPanel').find('.dg-checkAllDiv');
	if ( !bottom_i ) {
		var cbox = $('<div class="datagrid-header-check bottom_cbox"><input id="cb_'+guid+'" type="checkbox"/></div>')
		golHandleContainer.append(cbox).find('input[type="checkbox"]').unbind('click').bind('click', function( e ){
			var st = $(this).is(':checked');
			if ( st ) {
				grid.datagrid("checkAll");
			} else {
				grid.datagrid("uncheckAll");
			}
		});
	}
	gloElement = $('<a href="javascript:void(0)" class="easyui-linkbutton" id="' + item.id + '">' + item.text + '</a>');
	/**
	 * 左下角按钮设置为菜单按钮
	 * author: chenlilang	
	 */
	if (item.menubutton
		&& item.menubutton instanceof Array
		&& item.menubutton.length
	) {
		var mBtn = [
			'<a href="javascript:void(0)" id="mb_' + item.id + '" class="easyui-menubutton"' +
			' data-options="menu:\'#mm_' + item.id + '\'">' + item.text || item.menubutton[0].text + '</a>',
			'<div id="mm_' + item.id + '" style="width:80px;">'
		];
		$.each(item.menubutton, function (j, jItem) {
			mBtn.push('<div id="' + jItem.id + '">' + jItem.text + '</div>');
		});
		mBtn.push('</div>');
		gloElement = $(mBtn.join(''));
	}

	golHandleContainer && golHandleContainer.append(gloElement);
}

/**
 * 扩展easyui tree的搜索方法
 */
(function($) {

    $.extend($.fn.tree.methods, {
        /**
         * 扩展easyui tree的搜索方法
         * @param tree easyui tree的根DOM节点(UL节点)的jQuery对象
         * @param searchText 检索的文本
         * @param this-context easyui tree的tree对象
         */

        search: function(jqTree, searchText) {

            //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
            var tree = this;
            //获取所有的树节点
            var nodeList = getAllNodes(jqTree, tree);

            //如果没有搜索条件，则展示所有树节点
            searchText = $.trim(searchText);
            if (searchText == "") {
                for (var i=0; i<nodeList.length; i++) {
                    $(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
                    $(nodeList[i].target).show();
                }
                //展开已选择的节点（如果之前选择了）
                var selectedNode = tree.getSelected(jqTree);
                if (selectedNode) {
                    tree.expandTo(jqTree, selectedNode.target);
                }
                return;
            }

            //搜索匹配的节点并高亮显示
            var matchedNodeList = [];
            if (nodeList && nodeList.length>0) {
                var node = null;
                for (var i=0; i<nodeList.length; i++) {
                    node = nodeList[i];
                    if (isMatch(searchText, node.text)) {
                        matchedNodeList.push(node);
                    }
                }

                //隐藏所有节点
              /*  for (var i=0; i<nodeList.length; i++) {
                    $(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
                    $(nodeList[i].target).hide();
                }*/


                //折叠所有节点
                tree.collapseAll(jqTree);

                //展示所有匹配的节点以及父节点
                for (var i=0; i<matchedNodeList.length; i++) {
                    showMatchedNode(jqTree, tree, matchedNodeList[i]);
                }

            }
        },

        /**
         * 展示节点的子节点（子节点有可能在搜索的过程中被隐藏了）
         * @param node easyui tree节点
         */
        showChildren: function(jqTree, node) {
            //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
            var tree = this;

            //展示子节点
            if (!tree.isLeaf(jqTree, node.target)) {
                var children = tree.getChildren(jqTree, node.target);
                if (children && children.length>0) {
                    for (var i=0; i<children.length; i++) {
                        if ($(children[i].target).is(":hidden")) {
                            $(children[i].target).show();
                        }
                    }
                }
            }
        },

        /**
         * 将滚动条滚动到指定的节点位置，使该节点可见（如果有滚动条才滚动，没有滚动条就不滚动）
         * @param param {
         *    treeContainer: easyui tree的容器（即存在滚动条的树容器）。如果为null，则取easyui tree的根UL节点的父节点。
         *    targetNode:  将要滚动到的easyui tree节点。如果targetNode为空，则默认滚动到当前已选中的节点，如果没有选中的节点，则不滚动
         * }
         */
        scrollTo: function(jqTree, param) {
            //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
            var tree = this;

            //如果node为空，则获取当前选中的node
            var targetNode = param && param.targetNode ? param.targetNode : tree.getSelected(jqTree);

            if (targetNode != null) {
                //判断节点是否在可视区域
                var root = tree.getRoot(jqTree);
                var $targetNode = $(targetNode.target);
                var container = param && param.treeContainer ? param.treeContainer : jqTree.parent();
                var containerH = container.height();
                var nodeOffsetHeight = $targetNode.offset().top - container.offset().top;
                if (nodeOffsetHeight > (containerH - 30)) {
                    var scrollHeight = container.scrollTop() + nodeOffsetHeight - containerH + 30;
                    container.scrollTop(scrollHeight);
                }
            }
        }
    });




    /**
     * 展示搜索匹配的节点
     */
    function showMatchedNode(jqTree, tree, node) {
        //展示所有父节点
        $(node.target).show();
        $(".tree-title", node.target).addClass("tree-node-targeted");
        var pNode = node;
        while ((pNode = tree.getParent(jqTree, pNode.target))) {
            $(pNode.target).show();
        }
        //展开到该节点
        tree.expandTo(jqTree, node.target);
        //如果是非叶子节点，需折叠该节点的所有子节点
        if (!tree.isLeaf(jqTree, node.target)) {
            tree.collapse(jqTree, node.target);
        }
    }

    /**
     * 判断searchText是否与targetText匹配
     * @param searchText 检索的文本
     * @param targetText 目标文本
     * @return true-检索的文本与目标文本匹配；否则为false.
     */
    function isMatch(searchText, targetText) {
        return $.trim(targetText)!="" && targetText.indexOf(searchText)!=-1;
    }

    /**
     * 获取easyui tree的所有node节点
     */
    function getAllNodes(jqTree, tree) {
        var allNodeList = jqTree.data("allNodeList");
        if (!allNodeList) {
            var roots = tree.getRoots(jqTree);
            allNodeList = getChildNodeList(jqTree, tree, roots);
            jqTree.data("allNodeList", allNodeList);
        }
        return allNodeList;
    }

    /**
     * 定义获取easyui tree的子节点的递归算法
     */
    function getChildNodeList(jqTree, tree, nodes) {
        var childNodeList = [];
        if (nodes && nodes.length>0) {
            var node = null;
            for (var i=0; i<nodes.length; i++) {
                node = nodes[i];
                childNodeList.push(node);
                if (!tree.isLeaf(jqTree, node.target)) {
                    var children = tree.getChildren(jqTree, node.target);
                    childNodeList = childNodeList.concat(getChildNodeList(jqTree, tree, children));
                }
            }
        }
        return childNodeList;
    }
})(jQuery);

/**
 * validatebox扩展方法
 */
$.extend($.fn.validatebox.defaults.rules, {
	// 验证整数
	int: {
		validator: function (value) {
			return /^[0-9]*$/i.test(value);
		},
		message: '请输入整数'
	},
	intLength: {
		validator: function (value, param) {
			var reg = new RegExp("^\\d{" + param[0] + "}$");
			return reg.test(value);
		},
		message: '请输入{0}位正整数'
	},
	maxLength: {
		validator: function (value, param) {
			if (value.length > param) {
				return false;
			} else {
				return true;
			}
		},
		message: '长度不能超过{0}位'
	},
	minLength: {
		validator: function (value, param) {
			if (value.length < param) {
				return false;
			} else {
				return true;
			}
		},
		message: '长度不能低于{0}位'
	},
	//正数或者正小数的判断
	number: {
		validator: function (value, param) {
			var int = param[0] < 1 ? 1 : (param[0] - 1),
				reg = new RegExp("^([1-9]{1}\\d{0," + int + "}|0)(\\.\\d{0," + param[1] + "})?$");
			return reg.test(value);
		},
		message: '格式不正确,整数位数不大于{0}位,小数位数不大于{1}位'
	},
	// 正数，param[0]是小数保留的位数
	positiveNumberVariable: {
		validator: function (value, param) {
			var reg = new RegExp('^(([1-9]\\d*)|0)(\\.\\d{1,' + param[0] + '})?$');
			return reg.test(value);
		},
		message: '格式不正确，最多保留{0}位小数'
	},
	money: {
		validator: function (value, param) {
			var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
			return reg.test(value);
		},
		message: '请输入大于等于0的数'
	},
	telNum: {
		validator: function (value) {
			return /(^(\d{3}-)?\d{8}$)|(^(\d{4}-)?\d{7}$)|(^1(3|4|5|7|8)\d{9}$)/.test(value);
		},
		message: '请输入正确的手机号码或座机号码'
	},
	identifyNum: {
		/*身份证号码验证*/
		validator: function (value) {
			return /(^\d{18}$)|(^\d{17}[xX]$)/.test(value);
		},
		message: '请输入18位身份证号码'
	},
	string: {
		validator: function (value) {
			return /^([\u4e00-\u9fa5]|[a-zA-Z])*$/.test(value);
		},
		message: '请输入汉字或英文'
	},
	positiveNumber: {//正数
		validator: function (value) {
			if (value < 0) {
				return false;
			} else {
				return true;
			}
		},
		message: '请输入大于0的数'
	},
	numBertow: {
		validator: function (value) {
			var reg = /^\d{1,8}(\.\d{1,2})?$/;
			return reg.test(value);
		},
		message: '请输入整数小于8位,小数点最大为2位的数'
	},
	positiveInteger: {//正整数
		validator: function (value) {
			var reg = /^[1-9]\d*$/;
			return reg.test(value);
		},
		message: '请输入大于0的整数'
	},
	greaterthanOne: {//大于1的树
		validator: function (value) {
			if (value < 1) {
				return false;
			} else {
				return true;
			}
		},
		message: '请输入大于1的数'
	},
	integerss: {
		validator: function (value) {
			var parnt = /^[0-9]\d*(\.\d+)?$/;
			if (parnt.exec(value)) {
				if (value > 0) {
					return true;
				}
			}
		},
		message: '请输入大于0的整数'
	},
	integers: {//0-1之间的小数
		validator: function (value) {
			if (value > 0 && value < 1) {
				return true;
			}
		},
		message: '请输入大于0并且小于1的数字'
	},
	startLength: {/*长度相等验证，开始验证输入框*/
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = $node.textbox('getText');
			if (value) {
				if (val) {
					// 设置开始标识和结束检查标识
					lengthId = (lengthId === "" && lengthId !== 'E') ? param[0] : "";
					// 是否需要检查结束时间
					if (lengthId === 'S') {
						$node.textbox('setValue', '').textbox('setValue', val);
					}
					return val.length === value.length;
				} else {
					return true;
				}
			}
		},
		message: '起始编号长度必须和结束编号长度相等'
	},
	endLength: {/*长度相等，结束验证输入框*/
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = $node.textbox('getText');
			if (value) {
				if (val) {
					// 设置开始标识和结束检查标识
					lengthId = (lengthId === "" && lengthId !== 'S') ? param[0] : "";
					// 是否需要检查结束时间
					if (lengthId === 'E') {
						$node.textbox('setValue', '').textbox('setValue', val);
					}
					return val.length === value.length;
				} else {
					return true;
				}
			}
		},
		message: '结束编号长度必须和起始编号长度相等'
	},
	startTime: {// 验证开始时间小于结束时间【用法：validType="startTime['S/E','cancelTime','提示信息','time']"，S/E：开始时间/结束时间标识(开始/结束),cancelTime:结束时间input的id,‘提示信息’：选填，默认为开始日期应小于结束日期，可传入自定义提示信息,'time':选填，是否为日期时间框，若不是则不传参】
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = param[3] ? $node.datetimebox('getText') : $node.datebox('getText');
			if (value) {
				if (param) {
					$.fn.validatebox.defaults.rules.startTime.message = (param[2] ? param[2] : "开始日期应小于结束日期");
				}
				if (val) {
					// 设置开始标识和结束检查标识
					contrastId = (contrastId === "" && contrastId !== 'E') ? param[0] : "";
					// 是否需要检查结束时间
					if (contrastId === 'S') {
						param[3] ? $node.datetimebox('setValue', '').datetimebox('setValue', val) : $node.datebox('setValue', '').datebox('setValue', val);
					}
					return (new Date(value).toJSON()) <= (new Date(val).toJSON());
				} else {
					return true;
				}
			}
		},
		message: ''
	},
	endTime: {// 验证结束时间小大于结束时间
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = param[3] ? $node.datetimebox('getText') : $node.datebox('getText');
			if (value) {
				if (param) {
					$.fn.validatebox.defaults.rules.endTime.message = (param[2] ? param[2] : "结束日期应大于开始日期");
				}
				if (val !== '') {
					// 设置开始标识和结束检查标识
					contrastId = (contrastId === "" && contrastId !== 'S' ? param[0] : "");
					// 是否需要检查开始时间
					if (contrastId === 'E') {
						param[3] ? $node.datetimebox('setValue', '').datetimebox('setValue', val) : $node.datebox('setValue', '').datebox('setValue', val);
					}
					return (new Date(value).toJSON()) >= (new Date(val).toJSON());
				} else {
					return true;
				}
			}
		},
		message: ''
	},
	startMonth: {// 验证开始月份小于结束月份
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = $node.datebox('getText');
			if (value) {
				if (param) {
					$.fn.validatebox.defaults.rules.startMonth.message = (param[2] ? param[2] : "开始月份应小于结束月份");
				}
				if (val !== '') {
					// 设置开始标识和结束检查标识
					contrastId = (contrastId === "" && contrastId !== 'E') ? param[0] : "";
					// 是否需要检查结束时间
					if (contrastId === 'S') {
						$node.datebox('setValue', '').datebox('setValue', val);
					}
					if (Number(value.substr(0, 4)) === Number(val.substr(0, 4))) {
						if (Number(value.substr(5, 2)) >= Number(val.substr(5, 2))) {
							return false;
						} else {
							return true;
						}
					} else if (Number(value.substr(0, 4)) < Number(val.substr(0, 4))) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		},
		message: ''
	},
	endMonth: {// 验证开始月份小于结束月份
		validator: function (value, param) {
			var $node = $("#" + param[1]),
				val = $node.datebox('getText');
			if (value) {
				if (param) {
					$.fn.validatebox.defaults.rules.endMonth.message = (param[2] ? param[2] : "结束月份应大于开始月份");
				}
				if (val !== '') {
					// 设置开始标识和结束检查标识
					contrastId = (contrastId === "" && contrastId !== 'S' ? param[0] : "");
					// 是否需要检查开始时间
					if (contrastId === 'E') {
						$node.datebox('setValue', '').datebox('setValue', val);
					}
					if (Number(value.substr(0, 4)) === Number(val.substr(0, 4))) {
						if (Number(value.substr(5, 2)) <= Number(val.substr(5, 2))) {
							return false;
						} else {
							return true;
						}
					} else if (Number(value.substr(0, 4)) > Number(val.substr(0, 4))) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		},
		message: ''
	},
	positiveRangeNum: {//param[0,1]参数范围内的取值
		validator: function (value, param) {
			if (isNaN(value)) {
				return false;
			}
			var min = param[0],
				max = param[1];
			value = parseFloat(value);
			return value > min && value <= max;
		},
		message: '只能填写大于{0}并且小于等于{1}的数字'
	}
});

/**
 * form扩展方法
 */
$.extend($.fn.form.methods, {
	/**
	 * 重置表单数据：若表单默认有初始化数据，调用方法时传入form的id或class,
	 * 调用示例：$('.easyui-form').form('resetFormData',{beginYM: "2017-02", endYM: "2017-05"});
	 */
	resetFormData: function (jq, params) {
		return jq.each(function () {
			var $form = $(this);
			$form.form('clear');
			// 主动调用，传递默认值
			if (params) {
				/*重新加载查询表单默认值*/
				$form.form('load', params);
				return;
			}

			// 通过form的data设置默认值
			var data = $form.data('data');
			if (data) {
				$form.form('load', data);
			}
		});
	}
});
