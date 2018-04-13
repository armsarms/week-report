$(function () {
    //全局变量i，作为新建周报模块里面的data-number标记
    var i = 1;
    //点击导航
    $('.table-left ul.nav li').click(function () {
        $(".table-draft tr[data-change='inChange']").attr('data-change', '');
        $('.table-left ul.nav li').removeClass('active');
        $(this).addClass('active');
        var tableName = $(this).find('a').attr('data-table-name');
        $('.table-right .table-main').removeClass('table-show');
        $('.' + tableName).addClass('table-show');
        //点击新建周报时，清空表单
        if (tableName == 'table-report') {
            $('#newForm :input').not(':button').val('').removeAttr('checked');
            $('.new-group').eq(0).siblings('.new-group').remove();
            $('.redWarning').removeClass('redWarning')
        }
    })
    //新建周报内按钮
    $('.table-report button').click(function () {
        var form = $("#newForm").serializeArray();
        var time = getWeekToDate();
        switch ($(this).attr('id')) {
            //点击保存
            case 'btnSuccess':
                if (form[0].value != '' && form[1].value != '') {
                    for (var i = $('.new-group').length; i > 0; i--) {
                        //插入草稿箱
                        if (i == 1) { //第一条有合并单元格的时间和单选框，其余的删掉
                            $(".table-draft tbody").prepend("<tr><td rowspan='" + $('.new-group').length + "'><input type='checkbox'></td><td style='display:none'>" + form[0].value + "</td><td class='time-contorl' rowspan='" + $('.new-group').length + "'>" + time[0] + '~' + time[4] + "</td><td rowspan='" + $('.new-group').length + "'>" + form[1].value + "</td><td>" + $(".new-group .reportTitle").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportWeek").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportNextWeek").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportConsort").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td></tr>");
                        } else {
                            $(".table-draft tbody").prepend("<tr><td  style='display:none'><input type='checkbox'></td><td style='display:none'>" + form[0].value + "</td><td class='time-contorl' style='display:none'>" + time[0] + '~' + time[4] + "</td><td style='display:none'>" + form[1].value + "</td><td>" + $(".new-group .reportTitle").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportWeek").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportNextWeek").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportConsort").eq(i - 1).val().replace(/\n|\r\n/g, '<br/>') + "</td></tr>");
                        }
                        // form[4+4*i].value.replace(/\n|\r\n/g,'<br/>'),输入栏导入换行
                        $('html,body').animate({ scrollTop: '0px' }, 200);//滚动到顶部
                    }
                    //将原来的删除掉
                    if ($(".table-draft tr[data-change='inChange']").length > 0) {
                        $(".table-draft tr[data-change='inChange']").remove();
                    }
                    $('.success-modal').show().fadeOut(2000).text('保存成功');
                    $("[data-table-name='table-draft']").parents('li').click();
                } else {
                    if (form[0].value == '') {
                        $("#reportTime").addClass('redWarning');
                    }
                    if (form[1].value == '') {
                        $("#reportGroup").addClass('redWarning');
                    }
                    $('.success-modal').show().fadeOut(2000).text('保存失败');
                }
                break;
            //点击提交
            case 'btnPrimary':
                if (form[0].value != '' && form[1].value != '' && $(".new-group .reportTitle").val() != '' && $(".new-group .reportWeek").val() != '' && $(".new-group .reportNextWeek").val() != '') {
                    $('.success-modal').show().fadeOut(2000).text('提交成功');
                } else {
                    $('.success-modal').show().fadeOut(2000).text('提交失败');
                }
                break;
            //点击取消
            case 'btnWarning':
                $("[data-table-name='table-report']").click();
        }
    })
    //增加项目
    $('.increase-btn').click(function () {
        var html = "<div class='new-group' data-number=" + i++ + "><hr><input type='checkbox' class='new-group-check'><div class='form-group report-title'><label class='col-sm-2 control-label'>周报标题：</label><div class='col-sm-5'><input class='form-control reportTitle' type='text' name='title'></div></div><div class='form-group report-week'><label class='col-sm-2 control-label'>本周重点工作：</label><div class='col-sm-5'><textarea class='form-control reportWeek' rows='5' name='reportWeek'></textarea></div></div><div class='form-group report-next-week'><label class='col-sm-2 control-label'>下周计划：</label><div class='col-sm-5'><textarea class='form-control reportNextWeek' rows='3' id='reportNextWeek'></textarea></div></div><div class='form-group report-consort'><label class='col-sm-2 control-label'>需领导协调事项：</label><div class='col-sm-5'><textarea class='form-control reportConsort' rows='3' name='reportConsort'></textarea></div></div></div>"
        $(html).insertBefore(".crease-btn");
    })
    // 减少项目
    $('.decrease-btn').click(function () {
        var $check = $('.new-group .new-group-check:checked');
        if ($check.length > 0) {
            $check.parents('.new-group').remove();
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
    })
    //删除项目
    $('#draftDel').click(function () {
        var $check = $('.table-draft .table input:checked');
        if ($check.length > 0) {
            $check.parents('tr').remove();
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
    })
    // 修改草稿
    $('#draftChange').click(function () {
        var $check = $('.table-draft .table-hover input:checked');
        //if()，如果new-group.length>1,删除，否则，加一
        if ($check.length == 1) {
            $("[data-table-name='table-report']").click();
            var sameTime = $check.parents('td').siblings('.time-contorl').text();
            $('.table-draft .table-hover td.time-contorl').each(function () {
                if ($(this).text() == sameTime) {
                    $(this).parents('tr').attr('data-change', 'inChange');
                }
            })

            for (var i = 0; i < $("[data-change='inChange']").length - 1; i++) {
                $('.increase-btn').click();
            }
            // if ($('.new-group').length > 1) {
            //     $('.new-group').eq(0).siblings('.new-group').remove();
            // } else if ($('.new-group').length < 1) {
            //     $('.increase-btn').click();
            // }
            for (var x = 0; x < $("[data-change='inChange']").length; x++) {
                $("[data-change='inChange']").eq(x).find('td').each(function (i) {
                    switch (i) {
                        // 0为单选框，1为隐藏的周数，2为显示的具体日期，3为组别，4工作，6计划，7领导
                        case 1:
                            $('#reportTime').val($(this).text());
                            break;
                        case 3:
                            $('#reportGroup').val($(this).text());
                            break;
                        case 4:
                            $('.reportTitle').eq(x).val($(this).text());
                            break;
                        case 5:
                            $('.reportWeek').eq(x).val($(this).html().replace(/<br>/g, '\n'));
                            // $('.reportWeek').val($(this).html().replace(/\n|\r\n/g,'<br/>'));
                            break;
                        case 6:
                            $('.reportNextWeek').eq(x).val($(this).html().replace(/<br>/g, '\n'));
                            break;
                        case 7:
                            $('.reportConsort').eq(x).val($(this).html().replace(/<br>/g, '\n'));
                            break;
                    }
                })
            }

        } else if ($check.length > 1) {
            $('.success-modal').show().fadeOut(2000).text('只能同时编辑一条周报');
        } else {
            $('.success-modal').show().fadeOut(2000).text('请选中一个选框');
        }
    })
    // 提交草稿
    $('#draftSumit').click(function () {
        var $check = $('.table-draft .table input:checked');
        if ($check.length > 0) {
            $('.success-modal').show().fadeOut(2000).text('提交成功');
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
    })
    //点击输入框清除标红样式
    $("#reportTime,#reportGroup").click(function () {
        $(this).removeClass('redWarning');
    })
    //点击接收周报内的表格，获取到表名
    $('.table-receive tr').click(function () {
        $('#myModal').modal('show').find('.modal-title').text($(this).find('td').text())
    })
    //模态框嵌套，解决关闭一个后另一个滚动条消失的问题
    $('.modal').on('hidden.bs.modal', function () {
        if ($('.modal.in').size() >= 1) {
            $('body').addClass('modal-open')
        }
    })
})
// 根据周数算出该周工作日的日期
function getDates(currentTime) {//JS获取当前周从星期一到星期天的日期
    var currentDate = new Date(currentTime)
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
        dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '.'));
    }
    return dates
}
function getWeekToDate() {//由周数计算出该周内的某一日期
    var week = $('#reportTime').val().split('-W');
    var thisYear = new Date(week[0] + '-01-01');
    var timesStamp = thisYear.getTime() + ((week[1] - 1) * 7 * 24 * 60 * 60 * 1000);
    return getDates(timesStamp);
}
//--------end------------