/**
 * Created by xyc on 2016/8/21.
 */

function commonAjax(url,type,dataType,async,dataParam,callback){
    $.ajax({
        url : url,
        type : type,
        dataType :dataType,
        async:async,
        data:dataParam,
        success : function(data, status) {
            callback(data);
        },
        error:function(){
            callback(null);
        }
    });
}

/**
 * 获取表单的data
 * @param formID
 */
function commonSerializeFormData(formID){
    formID = "#"+formID;
    var formObj = $(formID);
    var returnData={};
    formObj.serializeArray().map(function(x){
        if(x.value != "") {
            returnData[x.name] = $.trim(x.value);
        }
    });
    return JSON.stringify(returnData);
}

function commonFormValidate(formID){
    formID = "#"+formID;
    var formObj = $(formID);
    var inputs = formObj.find("input:visible:not([type='hidden'])");
    var returnV = true;
    $.each(inputs,function(i,obj){
        var inputObj   = $(obj);
        var inputVALUE = inputObj.val();
        if( inputObj.attr("require")){

            if(inputVALUE.length == 0 ){
                inputObj.attr("data-content",inputObj.attr("message"));
                inputObj.popover('show');
                returnV = false;
            }
        }
        var valueType = inputObj.attr("valuetype");
        if( typeof(valueType) != "undefined"  && valueType!=""){
            var rule = valueType;
            var param="";
            var splitStr = valueType.indexOf(":");
            if (-1 != splitStr){
                rule = valueType.substr(0, splitStr);
                param = valueType.substr(splitStr + 1);
            }
            if(!judgeFun(rule,inputVALUE,param)){
                inputObj.attr("data-content",inputObj.attr("message"));
                inputObj.popover('show');
                returnV = false;
            }
        }

        if(typeof(inputObj.attr("valueEqual")) != "undefined" && inputObj.attr("valueEqual") != ""){
            var selecterEqual = formID+" input[name='"+inputObj.attr("valueEqual")+"']";
            var oldVal = $(selecterEqual).val();
            if(inputVALUE != oldVal){
                inputObj.attr("data-content",inputObj.attr("message"));
                inputObj.popover('show');
                returnV = false;
            }
        }
    });
    inputs.on("focus",function(){
        if($(this).attr("data-toggle") == "popover"){
            $(this).popover('hide');
        }
    });

    if(returnV){
        var selecter = formID+" [data-toggle='popover']";
        $(selecter).popover("hide");
    }
    return returnV;
}

function judgeFun(rule,value,param){
    if(rule == "char-normal"){
        var range = param.split("-");
        //parseInt(range[0]),parseInt(range[1])
        if (false == /^\w+$/.test(value)){
            return false;
        }else{
            return true;
        }
    }
    if(rule == "char-chinese"){
        return /^([\w]|[\u4e00-\u9fa5]|[ 。，、？￥“‘！：【】《》（）——+-])+$/.test(value);
    }
    if(rule == "chinese-username"){
        return /^([\w]|[\u4e00-\u9fa5]|[ 。，、？￥“‘！：【】《》（）——+-]){2,6}$/.test(value);
    }
    if(rule == "length"){
        var range = param.split("-");
        //如果长度设置为 length:6 这样的格式
        if (range.length == 1) range[1] = range[0];
        if (value.length < range[0] || value.length > range[1])
            return false;
        else
            return true;
    }
    if(rule == "phone"){
        return /^1[3-9]\d{9}$/.test(value);
    }
    if(rule == "password"){
        return /^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/.test(value);
    }
}

function formALERT(btnOBJ,result,callback){
    var formAlert = btnOBJ.parent().parent().find(".alert");
    if(result.status){
        formAlert.removeClass("alert-danger");
        formAlert.addClass("alert-success");
        formAlert.show();
        formAlert.append("保存成功!");

    }else{
        formAlert.removeClass("alert-success");
        formAlert.addClass("alert-danger");
        formAlert.append(result.msg);
        formAlert.show();
        btnOBJ.show();
    }
    callback(formAlert);
}
/**
 * 通用提示
 * @param btnSave
 * @param modalId
 * @param result
 */
function commonAlert(btnSave,modalId,result){
     if(result.status) {
         btnSave.parent().parent().find(".alert").removeClass("alert-danger").addClass("alert-success").show().append(result.msg);
         btnSave.parent().parent().find(".alert .fa").removeClass("fa-ban").addClass("fa-check");
         setTimeout(function(){
         $(modalId).modal("hide");
         btnSave.show();
         },1200);
     }else{
         btnSave.parent().parent().find(".alert").removeClass("alert-success").addClass("alert-danger").show().append(result.msg);
         btnSave.parent().parent().find(".alert .fa").removeClass("fa-check").addClass("fa-ban");
         btnSave.show();
     }
}