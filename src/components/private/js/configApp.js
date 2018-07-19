/**
 * 描述：应用公共配置，可变配置项
 * 开发配置
 *
 * @author qust on 2017/5/25.
 */
var ACS_CFG = {
	baseUrl             : "../../../../src/",   // 前端地址
	frameworkServer     : "/framework/",        // 框架组件服务地址
	taskmgrServer       : "/taskmgr/",          // 业务任务管理地址
	apiServer           : "/api/",              // 对外接口服务地址
    busiServer          : "/busi/",             // 业务管理地址
	loading             : "正在加载数据...",     // 加载状态文字显示

	TYPE_CODE_B004		: "B004",				// 字典代码任务状态
	TYPE_CODE_B006		: "B006",				// 字典代码任务详情状态
	TYPE_CODE_B007		: "B007",				// 字典代码专业分类
	TYPE_CODE_B008		: "B008",				// 接口处理状态
    TYPE_CODE_B009		: "B009",				// 日志类型
    TYPE_CODE_B010		: "B010",				// 电压等级
    TYPE_CODE_B100		: "B100",				// 是否
    TYPE_CODE_B015		: "B015",				// 审批状态
    TYPE_CODE_B014		: "B014",				// 审核状态
    ROLE_ID_CJRY		: "0e28d2f5-4551-11e8-a2d1-000c296dc798",				// 采集人员角色id
    // 居中提示框
    ctAlert: function (msg) {
        $.messager.alert('提示', msg, 'info');
    },

    // 右下角提示框
    rbAlert: function (msg) {
        top.$.messager.show({title: '提示', msg: msg, timeout: 3000});
    },

    // 二次确认提示框
    cfAlert: function (msg, callBack) {
        $.messager.confirm('确认', msg, callBack);
    },

    /**
     * 加载系统代码combox
     * @param $selector
     * @param code
     */
    loadCodeCombobox: function ($selector,code) {
        $selector.combobox({
            url: "/framework/code/" + code,
            valueField: 'code',
            textField:  'name',
            method: 'GET'
        });
    },
    /**
	 * 查询公共代码
     * @param code 代码code
     * @returns {Array}
     */
    queryCode: function (code) {
        var tmpResult = [];
        $.ajax({
            type: 'GET',  //提交方式
            url: "/framework/code/" + code,
            async: false,
            success: function (result) {
                if (!result) {
                    ACS_CFG.rbAlert('<font color="red">字典[' + code + ']查询失败!</font>')
                }
                tmpResult = result
            },
            error: function () {
                ACS_CFG.rbAlert('<font color="red">字典查询失败，请联系管理员!</font>');
            }
        });
        return tmpResult;
    },
    /**
     * combobox过滤处理
     * @param q
     * @param row
     * @returns {Boolean}
     */
    comboboxFilter:function comboboxFilter(q, row) {
		var opts = $(this).combobox('options');
		return row[opts.textField].indexOf(q) >= 0;
	},

    /**
     * combobox grid code翻译
     * @param vars  翻译对象关系
     * @param codeDefault code值
     * @returns {*}
     */
    comboboxTranslateCode:function (vars,codeDefault){
        var returnVal = codeDefault;
        $.each(vars, function(i,val){
            if(codeDefault === val.code){
                returnVal = val.name;
                return returnVal;
            }
        });
        return returnVal;
    },

	/**
	 * combobox 限制只能选择所选项
	 */
	comboboxOnHidePanel:function () {
		var opts = $(this).combobox('options');
		var checkVal = $(this).combobox('getValue');
		var rows = $(this).combobox('getData'); //获取控件中所有的值
		var ok = "0";
		for (var i = 0; i < rows.length; i++) {
			var value = rows[i][opts.valueField];
			if (value == checkVal) {
				ok = "1";
				break;
			}
		}
		if (ok == "0") {
			$(this).combobox('setValue', '');
		}
	},
    /**
     * form校验
     * @param $selector     form选择器
     * @returns {boolean}   true:校验通过，false：校验失败
     */
	validateForm:function($selector){
        var t = $selector;
        t.find('.validatebox-text:not(:disabled)').validatebox('validate');
        var invalidbox = t.find('.validatebox-invalid');
        invalidbox.filter(':not(:disabled):first').focus();
        if(invalidbox.length >0){
            var arr = new Array(invalidbox.length);
            for(var i=0;i<invalidbox.length;i++){
                var label = labelName = $(invalidbox[i]).parent().siblings("label");
                if(label){
                    var labelName = labelName[0].innerText;
                    if(labelName.endsWith("：")){
                        labelName = labelName.substr(0,labelName.length-1);
                    }
                    arr[i]=labelName;
                }
            }
            ACS_CFG.rbAlert('参数<font color="red">'+arr.join()+'</font>,请填写完整后再点击【保存】！')
            return false; // 如果验证不通过，终止表单提交
        }
        return true;
    },
    /**
     * 获取登录信息
     */
    getLoginInfo:function(){
        //查找缓存是否存在，存在就直接返回
        var userInfoStr = window.sessionStorage.getItem("userInfoStr")
        if(userInfoStr && userInfoStr!=null){
            return JSON.parse(userInfoStr);
        }

        var userInfo={};
        var token = window.sessionStorage.getItem('access_token');
        $.ajax({
            type : 'GET',  //提交方式
            url: ACS_CFG.frameworkServer+"user/tokeninfo/" + token,
            async:false,
            success: function (result) {
                if (result["meta"]["code"] == 0) {
                    ACS_CFG.rbAlert('<font color="red">'+result["meta"]["message"]+',查询用户信息失败!</font>')
                }else{
                    userInfo=result["data"];
                    window.sessionStorage.setItem("userInfoStr",JSON.stringify(userInfo));
                }
            },
            error:function(){
                ACS_CFG.rbAlert('<font color="red">字典查询失败，请联系管理员!</font>');
            }
        });
        return userInfo;
    },

    //禁用form表单中所有的input[文本框、复选框、单选框],select[下拉选],多行文本框[textarea]
    disableForm:function(formId,isDisabled) {
        var $0 = $("#"+formId+" .easyui-textbox");
        $.each($0, function (i, v) {
            $("#"+v.id).textbox("readonly",isDisabled)
        })

        var $1 = $("#"+formId+" .easyui-combobox");
        $.each($1, function (i, v) {
            $("#"+v.id).combobox("readonly",isDisabled)
        })

        var $2 = $("#"+formId+" .easyui-datetimebox");
        $.each($2, function (i, v) {
            $("#"+v.id).datetimebox("readonly",isDisabled)
        })

        var $4 = $("#"+formId+" .easyui-datebox");
        $.each($4, function (i, v) {
            $("#"+v.id).datebox("readonly",isDisabled)
        })

        var $3 = $("#"+formId+" .easyui-validatebox");
        $.each($3, function (i, v) {
            $("#"+v.id).validatebox("readonly",isDisabled)
        })

    },
    /**
     * uuid生产器
     * @param len
     * @param radix
     * @returns {string}
     */
    uuid:function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
};
