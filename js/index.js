$(function () {
    var i = 1;
    $('.table-left ul.nav li').click(function () {
        $('.table-left ul.nav li').removeClass('active');
        $(this).addClass('active');
        var tableName = $(this).find('a').attr('data-table-name');
        $('.table-right .table-main').removeClass('table-show');
        $('.' + tableName).addClass('table-show');
        if (tableName == 'table-report') {
            $('#newForm :input').not(':button').val('').removeAttr('checked');
            $('.new-group').eq(0).siblings('.new-group').remove();
            $('.redWarning').removeClass('redWarning')
        }
    })

    $('.table-report button').click(function () {
        var form = $("#newForm").serializeArray();
        switch ($(this).attr('id')) {
            case 'btnSuccess':
                if (form[0].value != '' && form[1].value != '') {
                    for (var i = 0; i < $('.new-group').length; i++) {
                        $(".table-draft tbody").append("<tr><td><input type='checkbox'></td><td>" + form[0].value + "</td><td>" + form[1].value + "</td><td>" + $(".new-group .reportTitle").eq(i).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportWeek").eq(i).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportNextWeek").eq(i).val().replace(/\n|\r\n/g, '<br/>') + "</td><td>" + $(".new-group .reportConsort").eq(i).val().replace(/\n|\r\n/g, '<br/>') + "</td></tr>");
                        // form[4+4*i].value.replace(/\n|\r\n/g,'<br/>'),输入栏导入换行
                    }
                    if ($(".table-draft tr[data-change='inChange']").length == 1) {
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
            case 'btnPrimary':
                if (form[0].value != '' && form[1].value != '' && $(".new-group .reportTitle").val() != '' &&  $(".new-group .reportWeek").val() != '' &&  $(".new-group .reportNextWeek").val() != '' ){
                    $('.success-modal').show().fadeOut(2000).text('提交成功');
                } else {
                    $('.success-modal').show().fadeOut(2000).text('提交失败');
                }
                break;
        }
    })

    $('.increase-btn').click(function () {
        var html = "<div class='new-group' data-number=" + i++ + "><hr><input type='checkbox' class='new-group-check'><div class='form-group report-title'><label class='col-sm-2 control-label'>周报标题：</label><div class='col-sm-5'><input class='form-control reportTitle' type='text' name='title'></div></div><div class='form-group report-week'><label class='col-sm-2 control-label'>本周重点工作：</label><div class='col-sm-5'><textarea class='form-control reportWeek' rows='5' name='reportWeek'></textarea></div></div><div class='form-group report-next-week'><label class='col-sm-2 control-label'>下周计划：</label><div class='col-sm-5'><textarea class='form-control reportNextWeek' rows='3' id='reportNextWeek'></textarea></div></div><div class='form-group report-consort'><label class='col-sm-2 control-label'>需领导协调事项：</label><div class='col-sm-5'><textarea class='form-control reportConsort' rows='3' name='reportConsort'></textarea></div></div></div>"
        $(html).insertBefore(".crease-btn");
        // $(".new-group").last().clone().insertBefore(".crease-btn");
        // $(".new-group").last().find('input,textarea').each(function () {
        //     $(this).val('');
        // });
    })

    $('.decrease-btn').click(function () {
        var $check = $('.new-group .new-group-check:checked');
        if ($check.length > 0) {
            $check.parents('.new-group').remove();
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
        // if ($(".new-group").length > 1) {
        //     $(".new-group").last().remove();
        // }
    })

    $('#draftDel').click(function () {
        var $check = $('.table-draft .table input:checked');
        if ($check.length > 0) {
            $check.parents('tr').remove();
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
        // if ($(".new-group").length > 1) {
        //     $(".new-group").last().remove();
        // }
    })

    $('#draftChange').click(function () {
        var $check = $('.table-draft .table-hover input:checked');
        //if()，如果new-group.length>1,删除，否则，加一
        if ($check.length == 1) {
            $check.parents('tr').attr('data-change', 'inChange')
            $check.parents('tr')
            $("[data-table-name='table-report']").click();
            if ($('.new-group').length > 1) {
                $('.new-group').eq(0).siblings('.new-group').remove();
            } else if ($('.new-group').length < 1) {
                $('.increase-btn').click();
            }
            $check.parents('tr').find('td').each(function (i) {
                switch (i) {
                    case 1:
                        $('#reportTime').val($(this).text());
                        break;
                    case 2:
                        $('#reportGroup').val($(this).text());
                        break;
                    case 3:
                        $('.reportTitle').val($(this).text());
                        break;
                    case 4:
                        $('.reportWeek').val($(this).html().replace(/<br>/g, '\n'));
                        // $('.reportWeek').val($(this).html().replace(/\n|\r\n/g,'<br/>'));
                        break;
                    case 5:
                        $('.reportNextWeek').val($(this).html().replace(/<br>/g, '\n'));
                        break;
                    case 6:
                        $('.reportConsort').val($(this).html().replace(/<br>/g, '\n'));
                        break;
                }
            })
        } else if ($check.length > 1) {
            $('.success-modal').show().fadeOut(2000).text('只能同时编辑一条周报');
        } else {
            $('.success-modal').show().fadeOut(2000).text('请选中一个选框');
        }
    })


    $('#draftSumit').click(function () {
        var $check = $('.table-draft .table input:checked');
        if ($check.length > 0) {
            $('.success-modal').show().fadeOut(2000).text('提交成功');
        } else if ($check.length == 0) {
            $('.success-modal').show().fadeOut(2000).text('请至少选中一个选框');
        }
        // if ($(".new-group").length > 1) {
        //     $(".new-group").last().remove();
        // }
    })

    $("#reportTime,#reportGroup").click(function () {
        $(this).removeClass('redWarning');
    })

    $('.table-receive tr').click(function () {
        $('#myModal').modal('show').find('.modal-title').text($(this).find('td').text())
    })

    $('.modal').on('hidden.bs.modal', function () {
        if ($('.modal.in').size() >= 1) {
            $('body').addClass('modal-open')
        }
    })
})
