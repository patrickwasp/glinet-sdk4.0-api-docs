var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// 初始化加载    api-docs


// 获取接口相关信息
// params:data {version}  Please specify the interface version information, otherwise the default is the latest.
function get_api_data(version = null) {
    var data = {
        "version": window.localStorage.getItem("version_id")
    }
    var api_data = gl_ajax("/docs/api_docs_api/", 'get', data, false)
    // console.info("返回数据值")
    // console.info(api_data.data)
    api_docs_load(api_data.data)
    layui.use("element", function () {
        var element = layui.element;
        element.init();
    })
    return api_data
}


// html 重载
// 以 模块进行分组
function api_docs_load(api_data) {
    var cache_list = [];
    var all_html = '';
    for (var i = 0; i < api_data.length; i++) {
        var dom_data = api_data[i];
        all_html+=make_module_dom(dom_data);
        // var data = dom_data.case_groups_data // 模组接口数据
        // for (var key in data) {
        //     let item = data[key];
        //     cache_list.push(item.module_name + "/" + item.data.title)
        // }
    }

    // console.info("last")
    // console.info(all_html)
    // window.localStorage.setItem("dom_list", JSON.stringify(cache_list))
    // document.getElementById("api-show").innerHTML += all_html
    document.getElementById("api-show").innerHTML=all_html
    if (api_data.length == 0) {
        document.getElementById("api-show").innerHTML = "<h2>No API data in current version, please try to switch version.</h2><a onclick='scroll_top()'>Back to top<切换版本></a>"
    }
}

// Scroll to the top
function scroll_top() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}


// 模块节点构建
function make_module_dom(dom_data) {
    // var cache_list=[];
    var data = dom_data.case_groups_data // 模组接口数据
    // console.info(data)
    var middle_html = "";
    for (var key in data) {
        let item = data[key]
        // console.info("middle_data")
        // console.info(item)
        middle_html += make_api_dom(item)

    }
    // document.getElementsByClassName("fun").innerHtml=all_html
    // console.info("以下打印数据")
    // console.info(all_html)
    // document.getElementById("api-show").innerHTML=all_html
    // console.info(middle_html)

    return middle_html
}


// 接口节点构建
function make_api_dom(api_data, create_input = true, create_rpc = true, create_audit_show = true) {
    var data = api_data.data;
    // console.info("last")
    // console.info(api_data)
    var params = api_data.params;
    var results = api_data.results;
    // Authentication样式处理
    // console.log(data.caseID_api__audit)
    if (data.caseID_api__audit === true) {
        var audit_html = '    <button type="button" class="layui-btn layui-btn-radius  layui-btn-normal layui-btn-xs">Authentication:true</button>\n'
    } else {
        var audit_html = '    <button type="button" class="layui-btn layui-btn-primary layui-btn-radius layui-btn-xs">Authentication:false</button>\n'
    }
    // 是否渲染输入框
    if (create_input) {
        var params_input_html = "<div class='says'>Parameter Definition</div>" + create_params_edit_html(params, api_data.module_name, data.title, data.caseID_api__audit)
    } else {
        var params_input_html = ""
    }
    // 是否渲染rpc代码Example
    if (create_rpc) {
        // var rpc_show="<br><pre class='layui-code'>"+ create_rpc_eg(api_data) +"</pre>"
        // console.info(data)
        // console.info(data.id)
        // console.info(api_data.in_example)
        var rpc_in = "" + pannel_example_layui(data.id, api_data.in_example, ex_type = "in")
        var rpc_out = "" + pannel_example_layui(data.id, api_data.out_example, ex_type = 'out')
    } else {
        var rpc_in = ""
        var rpc_out = ""
    }
    // 是否渲染 RPC抬头
    if (create_audit_show) {
        var rpc_head = '<button type="button" class="layui-btn layui-btn-radius layui-btn-xs">RPC</button>\n' + audit_html;
    } else {
        var rpc_head = "";
    }
    var dom_html = "<div class='fun'>" +
        // "    <div class=''>"+ data.title+"</div>\n" +
        "    <a name=\"" + api_data.module_name + "/" + data.title + "\" style='visibility: visible'></a>\n" +
        '<h1 class="layui-elem-field layui-field-title" style="margin-top: 20px;" name="' + api_data.module_name + "/-" + data.title + '">' + api_data.module_name + "/" + data.title + '</h1>' +
        "    <span class='ri'><em><b>" + data.desp + "</b></em></span><br>\n" +
        "    <span class='le' style='display:none;'>#.<em>" + api_data.module_name + "/" + data.title + "</em> </span>\n" +

        // "    <span class='ri' style='float: right;padding-right: 2px;'>方式:<em> RPC</em></span>\n" +
        rpc_head +
        params_input_html +
        rpc_in +
        rpc_out +
        // "    <br><span class='ri' >ExampleURL:<em> <a href='#' target='_blank'><host>/rpc</a></em></span>\n" +
        // "    <span class='ri' style='float: right;padding-right: 2px'>验证:<em>"+ data.caseID_api__audit +"</em></span>\n" +
        "    <div class='says'>Request parameters：\n" +
        // "<pre class=\"layui-code-notepad intersays\">\n" +
        my_padding(params) +
        "</div>\n" +
        "<div class='says'>Response parameters：\n" +
        // "<pre class=\"layui-code-notepad intersays\">\n" +
        my_padding(results) +
        // "</pre> \n" +
        "</div></div>"
    return dom_html
}

// 重复某字符串
function repeat_string(mystring, repeat = 0) {
    var last_string = "";
    for (var i = 0; i < repeat; i++) {
        last_string += mystring;
    }
    return last_string;
}


// json转表格 处理
function my_padding(obj) {
    // console.log("obj")
    //console.log(obj)
    if (Object.keys(obj).length == 0) {
        return "<br><blockquote class=\"layui-elem-quote layui-quote-nm\">No parameters</blockquote>"
    }
    // var obj_json_list=JSON.stringify(obj,null,4).split("\n")
    var table_html = "<table class='layui-table' lay-skin='row' lay-even=''><tr class='layui-table-header' style='background-color:grey'><th  width='20%'>Field</th><th  width='15%'>Type</th><th  width='15%'>Default</th><th  width='50%'>Description</th></tr>"
    var array_list = match_array_string(obj)
    // console.log(array_list)
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        var keyName = option_params_deal(item.keyName, array_list)
        // console.info("1213213213"+JSON.stringify([keyName,item.keyName]))
        var keyValue = item.keyValue
        var dataType = item.dataType__name
        var desp = item.desp;
        table_html += "<tr><td>" + keyName + "</td><td>" + dataType + "</td><td>" + keyValue + "</td><td>" + desp + "</td></tr>"
    }
    table_html += "</table>"

    return table_html
}


// 参数JSON构建
function params_json(params_data) {

    var params_dic = {};
    // $.each(params_data, function(myKey, myVal) {
    //    myOut += myKey.padding(20) + " = " + myVal + "\r\n";
    //
    // });
    for (var i = 0; i < params_data.length; i++) {
        var item = params_data[i];
        var keyValue = item.keyValue
        params_dic[item.keyName] = my_padding(item.keyName, num = 20) + keyValue + "<span style='padding-left: 15%'># " + item.desp + "</span>";// .toString() + "# "+item.desp;
    }
    // console.info(JSON.stringify(params_dic,null,4))
    // console.info(JSON.stringify(params_dic,null,4).split("\n"))
    // JSON.stringify(params_dic,null,4).replace("<br>",my_padding(item.keyName+":"+keyValue)+ "#"+item.desp)
    return my_padding(params_dic)
}


// 构建接口调用html
function create_rpc_code() {

}


function match_array_string(obj) {
    var array_list = [];

    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        // var keyName = option_params_deal(item.keyName)
        // console.info("1213213213"+keyName)
        var keyName = item.keyName
        var dataType = item.dataType__name
        if (dataType == "array") {
            let kw = keyName.split(".")[keyName.split(".").length - 1]
            array_list.push(kw.replaceAll("?", ""))
        }
        // table_html += "<tr><td>" + keyName + "</td><td>" + dataType + "</td><td>" + keyValue + "</td><td>" + desp + "</td></tr>"
    }
    return array_list;
}


// Optional parameters样式识别加载
function option_params_deal(param_string, array_list) {
    // console.log([array_list,param_string])
    if (param_string.includes(".") == true) {
        var param_list = param_string.split(".");
        for (var i = 0; i < param_list.length; i++) {
            let kw = param_list[i];
            if (array_list.includes(kw.replaceAll("?", "")) == true && param_string.endsWith(kw) == false) {
                var last_string = kw + "<span>[<span style='color:orange'>x</span>]</span>"
                param_string = param_string.replaceAll(kw, last_string)
            }
        }
    }
    if (param_string.slice(0, 1) === "?") {
        // Optional parameters
        return param_string.slice(1,) + '<span class="layui-badge" style="float:right;background-color:grey">optional</span>'
    } else {
        // 正常参数
        return param_string
    }
}

function option_params_deal_form_label(param_string) {
    if (param_string.slice(0, 1) === "?") {
        // Optional parameters
        return '<span class="layui-badge" style="float:right;background-color:grey">?</span>' + param_string.slice(1,)
    } else {
        // 正常参数
        return param_string
    }
}


// rpcExample of callhtml构建
function create_rpc_eg(data) {
    var eg_html = "# eg of " + data.module_name + "." + data.data.title + "\n";
    var params = data.params;
    var middle_params = {};
    for (var i = 0; i < params.length; i++) {
        middle_params[params[i].keyName.replaceAll("?", "").trim()] = params[i].keyValue;
    }
    // if(data.method==='call'){
    //     var params=["",data.module_name,data.data.title,middle_params]
    // }else{
    //     var params=middle_params;
    // }
    // console.info("insert api data")
    // console.info(data)
    // console.info(middle_params)
    // main method
    if (middle_params['main_method'] == undefined) {
        var main_method = "call"
        var last_params = ["", data.module_name[0], data.data.title, middle_params]
    } else {
        var main_method = middle_params['main_method']
        var last_params = middle_params;
    }
    var device_host = "192.168.8.1"
    var url = "http://" + device_host + "/rpc"
    var payload = {
        jsonrpc: "2.0",
        method: main_method,
        params: last_params,
        id: 1
    }
    // var payload_string=JSON.stringify(payload,null,2)
    // eg_html+=payload_string;
    // eg_html+="# example for curl\n"

    eg_html += "curl -k " + url + " -H 'glinet: 1' -d \"" + JSON.stringify(payload).replaceAll('"', '\\"') + "\""
    return eg_html
}


// rpc接口调用  && 固件后端不允许跨域访问  && 预留
function get_rpc_result(data) {
    if (data.method === 'call') {
        var params = ["", data.module, data.sub_method, data.params]
    } else {
        var params = data.params
    }
    var device_host = "192.168.8.1"
    var url = "http://" + device_host + "/rpc"
    var payload = {
        jsonrpc: "1.0",
        method: data.method,
        params: params,
        id: 1
    }
    var result = gl_ajax(url, 'post', payload)
    // console.log(result)
}


// 搜索框监听
function search_filter(main_key) {
    var cache_dom = window.localStorage.getItem("dom_list")
    if (cache_dom == null) {
        // 获取所有节点
        var dom_html = $(".menu").text().split(" ")
        var dom_list = [];
        for (var i = 0; i < dom_html.length; i++) {
            if (dom_html[i].includes("/") == true) {
                dom_list.push(dom_html[i])
            }
        }
        window.localStorage.setItem("dom_list", JSON.stringify(dom_list))
    } else {
        var dom_list = JSON.parse(cache_dom)
    }
    // 搜索到的相关节点
    if (main_key.trim() == "") {
        default_Navigation_Bar()
        return true
    } else {
        var search_list = [];
        for (var j = 0; j < dom_list.length; j++) {
            if (dom_list[j].includes(main_key) == true) {
                // var search_item=dom_list[j].replaceAll(main_key,"<span style='background-color: #yellow;'>"+ main_key +"</span>")
                search_list.push(dom_list[j])
                // console.info(search_item)
                // search_list.push(search_item)
            }
        }
        create_Navigation_Bar(search_list, main_key)
        return true
    }
}


// 导航栏的重载
function create_Navigation_Bar(dom_list, mk = null) {
    var bar_html = "";
    for (var i = 0; i < dom_list.length; i++) {
        $(".menu").append(" <li><a href='#" + $(this).text() + "'>" + $(this).text() + "</a></li>");
        if (mk == null) {
            var middle = " <li><a href='#" + dom_list[i] + "'>" + dom_list[i] + "</a></li>"
        } else {
            var search_item = dom_list[i].replaceAll(mk, "<span style='color:yellow;'>" + mk + "</span>")
            var middle = " <li><a href='#" + dom_list[i] + "'>" + search_item + "</a></li>"
        }

        bar_html += middle
    }
    // 渲染
    $(".menu").html(bar_html)
}


// 搜索框监听
function search_filter_listen() {
    $("#search_mk").bind("input propertychang", function (event) {
        var search_key = this.value;
        search_filter(search_key)
    })
}


// 导航栏恢复
function default_Navigation_Bar() {
    var payload = {
        "version_id": window.localStorage.getItem("version_id")
    }
    var url = "/docs/module_review_status_api/"
    var data = gl_ajax(url, "get", payload, false)
    var cache_dom = ''
    if (data.code == 0) {
        cache_dom = JSON.stringify(data.dom_list)
    }
    window.localStorage.setItem("dom_list", cache_dom)

    // var cache_dom = window.localStorage.getItem("dom_list");
    var dom_list = JSON.parse(cache_dom);
    var module_array = [];
    var bar_html = '';
    for (var j = 0; j < dom_list.length; j++) {
        let module = dom_list[j].split("/")[0];
        if (module_array.includes(module) == true) {
            bar_html += "<li><a href='#" + dom_list[j] + "'>" + dom_list[j] + "</a></li>"
        } else {
            module_array.push(module)
            if (module_array.length == 1) {
                var dd_html = ""
            } else {
                var dd_html = "</dd>"
            }
            bar_html += dd_html + "<dl><dt><h2 class='layui-panel'><a href='#none'>&nbsp;" + module + "</a></h2></dt><dd style=\"display: none;\">"
            bar_html += "<li><a href='#" + dom_list[j] + "'>" + dom_list[j] + "</a></li>"
        }
    }
    bar_html += "</dd>"
    $(".menu").html(bar_html)

    $(function () {
        $(".menu dl dd").hide();
        $(".menu dl dt").click(function () {
            $(".menu dl dd").not($(this).next()).hide();
            $(".menu dl dt").not($(this).next()).removeClass("current");
            $(this).next().slideToggle(500);
            $(this).toggleClass("current");
        });
    });
    module_review_style_render(data);
}


// 参数编辑输入栏生成
// 传入 参数 数组
function create_params_edit_html(data, module_name, method_name, user_audit) {
    var param_dom = '  <div class="layui-form-item layui-form-pane">' +
        '<label class="layui-form-label">URL</label>' +
        '<div class="layui-input-block">' +
        '  <input class="' + module_name + '-' + method_name + '-URL' + ' layui-input" type="text" name="' + module_name + '-' + method_name + '-URL" lay-verify="required" placeholder="eg:http://127.0.0.1/rpc" autocomplete="off" class="layui-input" value="https://web.archive.org/web/20230909030858/http://127.0.0.1/rpc">' +
        '</div>' +
        // '<div class="layui-form-mid layui-word-aux">'+param_type+':'+param_value+'</div>'+
        '</div>'
    if (user_audit == undefined) {

    } else {
        param_dom += '  <div class="layui-form-item layui-form-pane">' +
            '<label class="layui-form-label">SID</label>' +
            '<div class="layui-input-block">' +
            '  <input class="' + module_name + '-' + method_name + '-SID' + ' layui-input" type="text" name="' + module_name + '-' + method_name + '-URL" lay-verify="required" placeholder="Please enter the access tokensid(There is a method to get it at the top of the page)" value="">' +
            '</div>' +
            // '<div class="layui-form-mid layui-word-aux">'+param_type+':'+param_value+'</div>'+
            '</div>'
    }
    var array_list = match_array_string(data)
    for (var i = 0; i < data.length; i++) {
        var param_name = data[i].keyName;
        // var param_name=option_params_deal(param_name,array_list)
        if (param_name.includes(".") == true) {
            var param_name = param_name.replaceAll(".", "[<span style='color:orange'>x</span>].")

        }
        if (data[i].keyValue) {
            var param_value = "null";
        } else {
            var param_value = JSON.stringify(data[i].keyValue);
        }


        // console.info(param_name)
        // if(param_name=='?encryption'){
        //     console.info(param_value)
        //     console.info(data[i])
        // }


        var param_type = data[i].dataType__name;
        var param_desp = data[i].desp;

        var middle_line = '  <div class="layui-form-item layui-form-pane">' +
            '<label class="layui-form-label">' + option_params_deal(param_name, array_list) + '</label>'
        // '<div class="layui-input-block">'
        if (param_type == 'bool') {
            middle_line += '<div class="layui-input-inline">'
            // middle_line+='  <input class="'+ module_name+'-'+method_name +' layui-input" type="text" name="'+ module_name +'-'+ method_name +'-'+param_name+'" lay-verify="required" placeholder="type:'+param_type+';default:'+param_value+';desc:'+param_desp+'" autocomplete="off" class="layui-input" value="'+ param_value +'">'
            middle_line += '<select style="width:100%" name="' + module_name + '-' + method_name + '-' + param_name + '" lay-filter="" class="layui-select ' + module_name + '-' + method_name + '" my="' + param_type + '">' +
                '<option value="false">false</option>' +
                '<option value="true" selected>true</option>' +
                '</select>' +
                '</div>' +
                '<div class="layui-form-mid layui-word-aux">type:' + param_type + ';default:' + param_value + ';desc:' + param_desp + '</div>'
        } else {
            middle_line += '<div class="layui-input-block">'
            middle_line += '  <input class="' + module_name + '-' + method_name + ' layui-input" type="text" name="' + module_name + '-' + method_name + '-' + param_name + '" lay-verify="required" placeholder="type:' + param_type + ';default:' + param_value + ';desc:' + param_desp + '" autocomplete="off" class="layui-input" value="" my="' + param_type + '">'
            middle_line += '</div>'
        }

        middle_line += '</div>'
        // '<div class="layui-form-mid layui-word-aux">'+param_type+':'+param_value+'</div>'+
        // '</div>'
        param_dom += middle_line
    }
    param_dom += "<button class='layui-btn-sm' onclick='create_curl_cmd_btn(\"" + module_name + "\",\"" + method_name + "\")' style='cursor: pointer'>Generate Shell Command</button>"
    return param_dom
}


// 一键生成+复制 curl 调用CMD
function create_curl_cmd_btn(module_name, method_name) {
    // CMD命令构建
    var URL = $("." + module_name + "-" + method_name + "-URL")[0].value
    try {
        var SID = $("." + module_name + "-" + method_name + "-SID")[0].value
    } catch (e) {
        //
        console.info(e)
        var SID = ""
    }
    var key_type_data = {}
    console.info(module_name)
    var payload_params = {};

    $("." + module_name + "-" + method_name).each(function () {
        var cut_name_index = this.name.split("-").length - 1
        var params_type = $(this).attr("my");
        console.log('params_type', params_type)
        if (this.name.includes("?")) {
            var param_name = this.name.split("-")[cut_name_index].replaceAll("?", "").trim();
            if (this.name.split("-")[cut_name_index].includes("?") && this.value.trim() == "") {
                key_type_data[param_name] = params_type;
                return true;
            }
            if (this.name.split("-")[cut_name_index].includes("?") && this.value.trim() == "null") {
                key_type_data[param_name] = params_type;
                return true;
            } else {
                var param_name = this.name.split("-")[cut_name_index].replaceAll("?", "").trim();
            }
        } else {
            var param_name = this.name.split("-")[cut_name_index].replaceAll("?", "").trim();    // .replaceAll("[<span style='color:orange'>x</span>]","").trim();
            // last_obj=payload_params;
        }

        // 键值对 处理
        var specil_str = "[<span style='color:orange'>x</span>]"
        var params_name = this.name.split("-")[cut_name_index].replaceAll("?", "").trim()
        var obj_key_list = [];
        var key_list = params_name.split(".");
        if (key_list.length != 1) {
            // console.log("poit<>")
            // 处理可能出现的 对象
            for (var i = 0; i < key_list.length; i++) {
                if (key_list[i].includes(specil_str)) {
                    let middle_key = key_list[i].replaceAll(specil_str, "").replaceAll("?", '')
                    obj_key_list.push(middle_key)
                }
            }
            // 参数构建和定义  && 通过浅拷贝 进行 构建
            // var middle_obj=payload_params;
            // for(var j=0;j<obj_key_list.length;j++){
            //     if(obj_key_list[j] in middle_obj){
            //         // pass
            //     }else{
            //         middle_obj[obj_key_list[j]]={}
            //     }
            //     middle_obj=middle_obj[obj_key_list]
            // }
            var param_name = key_list[key_list.length - 1]
            // last_obj=middle_obj
        } else {
            var param_name = this.name.split("-")[cut_name_index].replaceAll("[<span style='color:orange'>x</span>]", "").replaceAll("?", '').trim();
            // last_obj=payload_params
        }

        var param_value = this.value;
        console.log('param_value',param_value)
        // var main_msg=this.placeholder;
        // var params_type=main_msg.split(";")[0].split(":")[1]
        key_type_data[param_name] = params_type
        // console.log("当前数据类型>>>"+params_type+">>"+param_name+"\n"+this.name)
        if (params_type == "array") {
            // 暂时不考虑 数组对象情况
            try {
                // console.info([param_value])
                // console.info([param_value.split(",")])
                var array_list = param_value.split(",")
                var last_list = []
                for (var i = 0; i < array_list.length; i++) {
                    last_list.push(eval(array_list[i]))
                    // console.info([eval(array_list[i])])
                }
                // console.info(last_list)
                var last_value = JSON.stringify(last_list)
                // console.info(last_value)
                // if(Array.isArray(last_value)!=true){layer.alert('请输入规范的array数据类型');return false;}
            } catch (e) {
                layer.alert('Please enter a standard array data type')
                console.log(e)
                return false;
            }
            ;

        } else if (params_type == "object") {
            // payload_params[param_name]={};
            return true
        } else if (params_type == "string") {
            if (param_value == "null") {
                var last_value = '""'
            } else {
                var last_value = '"' + param_value + '"'
            }
        } else if (params_type == 'bool') {
            if (param_value == '') {
                var last_value = '""'
            }else {
                var last_value = JSON.parse(param_value)
            }
        } else if (params_type == "number") {
            if (param_value == '') {
                var last_value = '""'
            }else {
                var last_value = JSON.parse(param_value)
            }
        } else {
            if (param_value == "null") {
                var last_value = '""'
            } else {
                var last_value = '"' + param_value + '"'
            }
        }
        var last_obj = "payload_params"
        console.log(obj_key_list)
        if (obj_key_list.length != 0) {
            // let middle_key_obj_list=[];
            for (var i = 0; i < obj_key_list.length; i++) {

                last_obj += "." + obj_key_list[i]
                if (eval(last_obj) == undefined) {
                    // console.log(last_obj)
                    eval(last_obj + "={}")
                    // middle_obj=middle_obj[obj_key_list[i]]
                } else {
                    // middle_obj=middle_obj[obj_key_list[i]]
                }
                // middle_key_obj_list.push(obj_key_list[i])

            }
            // last_obj+="."+param_name+'='+last_value
            // eval(last_obj)
            // last_obj.push(last_value)
        } else {
            // last_obj[param_name]=last_value
        }
        // console.info(last_obj)
        last_obj += "." + param_name + '=' + last_value
        console.info("last_obj")
        console.info(last_obj)
        eval(last_obj)
        console.info(last_obj)
    })

    console.info(key_type_data)
    console.info(payload_params)
    for (var key in payload_params) {
        if (key_type_data[key] == 'array') {
            payload_params[key] = [payload_params[key]]
        }
    }


    if (payload_params['main_method'] == undefined) {
        var main_method = "call"
        var last_params = [SID, module_name, method_name, payload_params]
    } else {
        var main_method = payload_params['main_method']
        var last_params = payload_params;
    }

    // var device_host="192.168.8.1"
    // var url="http://"+device_host+"/rpc"
    var payload = {
        jsonrpc: '2.0',
        method: main_method,
        params: last_params,
        id: 1
    }
    console.log(payload)
    var CMD = "curl -k " + URL + " -H 'glinet: 1' -d '" + JSON.stringify(payload) + "'"
    // console.log(CMD)
    // var text = document.getElementById("text").innerText;
    var input = document.getElementById("input");
    input.value = CMD; // 修改文本框的内容
    // inputElement.value = CMD;
    input.select();//选中input框的内容
    document.execCommand("Copy");// 执行浏览器复制命令
    layer.msg('Copied successfully.！');
    return CMD
}


// 询问框输入 sid
function sid_confirm() {

}


// 快速获取sid接口调用
function get_sid_comfirm() {

}


// 版本切换监听
function version_select_chagne() {
    $('#version_id').change(() => {
        var version_id = $("#version_id").val()
        window.localStorage.setItem("version_id", version_id)
        // location.reload();
        var url = window.location.href;
        url = url.split('#')[0].split('?')[0]+"?version="+version_id
        window.location.replace(url)
        // // 重载导航栏
        // default_Navigation_Bar();
        // // 框架方法加载
        // load_method_type();
        // // console.log(version_id);
        // get_api_data(version_id);
    });
}


// METHOD-TYPE 加载
function load_method_type() {
    var version_id = window.localStorage.getItem("version_id")
    var href = "/docs/api_method_type_docs_api/?version=" + version_id
    var data = {version: version_id}
    var result = gl_ajax(href, "get", data, false)
    if (result.code == 0) {
        // 获取数据成功
        create_method_type_table(result.data)
    } else {
        console.incfo("数据获取失败")
        console.incfo(result)
        // 数据获取失败
        var show_html = "api异常"
    }

}


// METHOD-TYPE 表格创建
function create_method_type_table(data) {
    // console.info("渲染")
    var html_text = "";
    var create_data = [];
    for (var i = 0; i < data.length; i++) {
        // 重构JSON结构
        var params = [];
        var results = [];
        var module_name = ""
        var title = data[i]['method_type']
        var desp = data[i]['method_desc']
        for (var j = 0; j < data[i]["params"].length; j++) {
            var item = {
                keyValue: data[i]["params"][j].value,
                keyName: data[i]["params"][j].name,
                desp: data[i]["params"][j].desp,
                dataType__name: data[i]["params"][j].dataType__name,

            }
            if (data[i]["params"][j].item_type == 'in') {
                params.push(item)
            } else {
                results.push(item)
            }
        }
        // main_method_dic = {
        //     keyName: "main_method",
        //     keyValue: title,
        //     desp: "method-type: " + title,
        //     dataType__name: "string"
        // }
        // params.push(main_method_dic)
        var middle_data = {
            module_name: module_name,
            main_method: title,
            data: {title: title, desp: desp},
            params: params,
            results: results
        }
        create_data.push(middle_data)
        html_text += make_api_dom(middle_data)
    }
    // var api_data={code:0,data:create_data}

    // console.info(create_data)
    // console.info(api_data)
    // var html_text=make_api_dom(api_data,create_input=false,create_rpc=false)
    // console.info(html_text)
    // document.getElementById("method-type-show")
    $("#method-type-show").html(html_text)
}


// 监听 ESC ，清空搜索框
function esc_clear_filter_input() {
    $(document).ready(function () {
    }).keydown(function (e) {
        if (e.which === 27) {
            //自定义逻辑
            $("#search_mk").val("")
            // 重载导航栏
            default_Navigation_Bar();
        }
    });
}


function pannel_example(skd_api_id, data, ex_type = 'in') {
    try {
        var json_data = JSON.stringify(JSON.parse(data.replaceAll("\\", "")), null, 4)
    } catch (e) {
        // console.info(e)
        var json_data = null
    }
    if (ex_type == 'in') {
        var pannel_title = "<i class='layui-icon'>&#xe624;</i>  Expand request example"
    } else {
        var pannel_title = "<i class='layui-icon'>&#xe624;</i>  Expand response example"
    }

    var innerHTML = '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + skd_api_id + '-' + ex_type + '">' +
        pannel_title +
        '</a></h4></div >' +
        '<div id="collapse' + skd_api_id + '-' + ex_type + '" class="panel-collapse collapse"><pre>' +  //<div class="panel-body">
        json_data +
        '</pre></div></div>' //</div>
    // console.info(innerHTML) 
    return innerHTML
}


function pannel_example_layui(skd_api_id, data, ex_type = 'in') {
    try {
        var json_data = JSON.stringify(JSON.parse(data.replaceAll("\\", "")), null, 4)
    } catch (e) {
        // console.info(e)
        var json_data = null
    }
    if (ex_type == 'in') {
        var pannel_title = "Expand request example"
    } else {
        var pannel_title = "Expand response example"   //<i class='layui-icon'>&#xe624;</i>
    }

    var innerHTML = '<div class="layui-collapse" lay-filter="test"><div class="layui-colla-item">' +
        // '<div class="panel-heading">'+
        // '<h4 class="panel-title">'+
        '<h2 class="layui-colla-title">' + pannel_title + '</h2>' +
        // pannel_title+
        // '</a></h4></div >'+
        '<div class="layui-colla-content"><pre>' + json_data + '</pre></div>' +  //<div class="panel-body">
        '</div></div>' //</div>
    // console.info(innerHTML) 
    return innerHTML
}


// 默认值处理
function default_value_deal(param, param_type) {
    // 默认值处理
    if (param_type == "string") {

    } else if (param_type == "object") {

    }
}


// 模块审核状态样式加载
function module_review_style_render(data) {
    // var payload = {
    //     "version_id": $("#version_id").val()
    // }
    // var url = "/docs/module_review_status_api/"
    // var data = gl_ajax(url, "get", payload, false)
    if (data.code == 0) {
        var review_data = data.data;
        var review_dic = {};
        for (var j = 0; j < review_data.length; j++) {
            review_dic[review_data[j]["module_id__name"]] = {
                "time": review_data[j]["time"],
                "review_status": review_data[j]["review_status"]
            }
        }
        // console.info(review_dic)
        window.localStorage.setItem("review_dic", JSON.stringify(review_dic))
        // 渲染 API标题的徽章
        // api_title_render(review_dic)
        // 加载样式
        // var dom_list=document.getElementsByClassName("layui-panel")
        $(".layui-panel").each(function () {
            var item = this;
            var moduleName = item.innerText.trim()
            // console.info(moduleName)
            if (review_dic[moduleName] != undefined) {
                // 有状态记录
                let config = {1: "In Review", 2: "Reviewed", 3: "修改中", 0: "修改中"}
                let review_status = review_dic[moduleName].review_status;
                let review_time = review_dic[moduleName].time.replace("T", " ");
                let alert_msg = config[review_status] + "--" + review_time;
                if (review_status == 3) {
                    var color = "orange"
                    var badge = ' <span class="layui-badge layui-bg-orange" onmouseout="close_tips()" id="' + moduleName + '-tips-id" onmouseover="over_tip(\'' + alert_msg + '\',\'' + moduleName + '-tips-id\')">' + config[review_status] + '</span>'
                } else if (review_status == 2) {
                    var color = "";
                    var badge = ""
                    // var color="green"
                    // var badge=' <span class="layui-badge layui-bg-green" onmouseout="close_tips()" id="'+ moduleName +'-tips-id" onmouseover="over_tip(\''+ alert_msg +'\',\''+ moduleName +'-tips-id\')">Reviewed</span>'
                } else if (review_status == 1) {
                    var color = "gray"
                    var badge = ' <span class="layui-badge layui-bg-gray" onmouseout="close_tips()" id="' + moduleName + '-tips-id" onmouseover="over_tip(\'' + alert_msg + '\',\'' + moduleName + '-tips-id\')">' + config[review_status] + '</span>'
                } else {
                    var color = "orange"
                    var badge = ' <span class="layui-badge layui-bg-orange" onmouseout="close_tips()" id="' + moduleName + '-tips-id" onmouseover="over_tip(\'' + alert_msg + '\',\'' + moduleName + '-tips-id\')">' + config[3] + '</span>'
                }

            } else {
                var color = "";
                var badge = "";
                // var alert_msg='In Review'
                // var color="orange"
                // var badge=' <span class="layui-badge layui-bg-orange" onmouseout="close_tips()" id="'+ moduleName +'-tips-id" onmouseover="over_tip(\''+ alert_msg +'\',\''+ moduleName +'-tips-id\')">In Review</span>'
            }
            m_innerText = moduleName + badge
            this.innerHTML = m_innerText
            this.style = "font-size:15px;font-weight: 600;color:" + color  // 最后样式

        })
    }
}


// 悬浮提示
function over_tip(msg, selectID) {
    layui.layer.tips(msg, "#" + selectID, {
        time: 20000, //20s后自动关闭
    });
}

// 悬浮终止
function close_tips() {
    layui.layer.closeAll()
}


// API 标题渲染
function api_title_render(review_dic) {
    $(".fun h1.layui-field-title").each(function () {
        if (this.innerHTML.endsWith("</h1>")) {
            return false;
        }
        let title = this.innerText;
        let moduleName = title.split("/")[0]
        if (review_dic[moduleName] != undefined) {
            let review_status = review_dic[moduleName].review_status;
            if (review_status == 3) {
                // var color="gray"
                var badge = ' <h1 class="layui-badge layui-bg-orange">修改中</h1>'
            } else if (review_status == 2) {
                // var color="green"
                var badge = ' <h1 class="layui-badge layui-bg-green")">Reviewed</h1>'
            } else if (review_status == 1) {
                // var color="orange"
                var badge = ' <h1 class="layui-badge layui-bg-gray">In Review</h1>'
            } else if (review_status == 0) {
                var badge = ' <h1 class="layui-badge layui-bg-orange">In Review</h1>'
                // var badge=' <span class="layui-badge layui-bg-gray" id="'+ moduleName +'-tips-id" onmouseover="over_tip(\''+ review_time +'\',\''+ moduleName +'-tips-id\')">未</span>'
            } else {
                var badge = ' <h1 class="layui-badge layui-bg-orange">In Review</h1>'
            }
            // this.innerHTML=title+badge
        } else {
            var badge = ' <h1 class="layui-badge layui-bg-orange">In Review</h1>'
        }

        this.innerHTML = title + badge
    })
}

}
/*
     FILE ARCHIVED ON 03:08:58 Sep 09, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:24:29 Feb 18, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.059
  exclusion.robots: 0.052
  exclusion.robots.policy: 0.03
  esindex: 0.024
  cdx.remote: 107.985
  LoadShardBlock: 403.628 (3)
  PetaboxLoader3.datanode: 316.629 (4)
  load_resource: 410.679
  PetaboxLoader3.resolve: 136.933
*/