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

// 常用公用方法




function gl_ajax(URL,METHOD,DATA=null,async_param=true,loading_alert="加载中"){
    var result=false
    $.ajax({
        url : URL,
        type : METHOD,
        dataType: "html",
        data:DATA,
        async:async_param, // 异步参数
        // 等待中
        beforeSend:function() {
           index = parent.layui.layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
              ,title:loading_alert
            });
           // index=parent.layui.layer.msg('尼玛，打个酱油', {icon: 4});
        },
        // 加载完成
        complete:function(data) {
            parent.layui.layer.close(index);
          },
        success : function(data) {
            // console.info("接受返回值")
            // console.info(data)
            // console.info(typeof data)
            result=JSON.parse(data)
            // return result
        }
    })
    return result
}


// 日期计算
function last_date_count(current_date,plan_date) {
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(current_date));
    var a2 = Date.parse(new Date(plan_date));
    var less_day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    return less_day
}


// 判断字符是否包含中文字符
function isChinese(temp){
    var re=/[^\u4E00-\u9FA5]/;
    if (re.test(temp)) return false ;
    return true ;
}


function gl_tips(tipsByElementId,tipsMessage) {
    var layer=layui.layer
    layer.tips(tipsMessage, "#"+tipsByElementId);
}



// 匹配IP地址,只匹配第一个
function re_the_ip(label_string) {
    var reg_name=/(\d{1,3}\.){3}\d{1,3}/;
    // var reg_name=/^(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)$/;
    var result=reg_name.exec(label_string)  // 大写处理再匹配
    if(result==null){
        // console.log("写入错误")
        return false
    }else{
        return result[0]
    }
}



// 解析 运行状态
execute_status_dic={
    0:"none",
    1:"padding",
    2:"done",
}
// 解析 测试结果状态
execute_result_dic={
    "-1":"未开始",
    "1":'<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>',
    "0":"已结束",
}
// 解析 数据来源
execute_source_dic={
    0:"gitlab",
    1:"broswer",
    2:"test",
}

}
/*
     FILE ARCHIVED ON 03:08:58 Sep 09, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:24:30 Feb 18, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.884
  exclusion.robots: 0.034
  exclusion.robots.policy: 0.02
  esindex: 0.014
  cdx.remote: 80.563
  LoadShardBlock: 631.037 (3)
  PetaboxLoader3.resolve: 335.513 (3)
  PetaboxLoader3.datanode: 953.308 (4)
  load_resource: 842.435
*/