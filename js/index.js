$(function () {
    $('.table-left ul.nav li').click(function () {
        $('.table-left ul.nav li').removeClass('active');
        $(this).addClass('active');
        var tableName = $(this).find('a').attr('data-table-name');
        $('.table-right .table-main').removeClass('table-show');
        $('.' + tableName).addClass('table-show');
    })

    $('.table-report button').click(function () {
        switch ($(this).attr('id')) {
            case 'btnPrimary':
                var form = $("#newForm").serializeArray();
                // var reportWork = $('#reportWeek .form-control').serializeArray();
                // var strWork = '';
                // for (var i = 0; i < reportWork.length; i++) {
                    // strWork = strWork + (i + 1 + '.' + reportWork[i].value + '<br>');
                // }
                $(".table-draft tbody").append("<tr><td>" + form[3].value + "</td><td>" + form[0].value + "</td><td>" + form[1].value + ' ~ ' + form[2].value + "</td><td>" + loopTable('reportWeek') + "</td><td>" + loopTable('reportNextWeek') + "</td><td>" + loopTable('reportConsort') + "</td><td><button type='button' class='btn btn-primary'>提交</button> <button type='button' class='btn btn-success'>修改</button></td></tr>");
                $('.success-modal').show().fadeOut(1000).text('提交成功');
                $("[data-table-name='table-draft']").parents('li').click();
                break;
            case 'btnSuccess':
                $('.success-modal').show().fadeOut(1000).text('保存成功');
                break;
        }
    })

    $('.increase-btn').click(function () {
        //     var i = $(this).parents('.col-sm-5').find('input').length + 1;
        //     $(this).before("<div class='increase-input'><input class='form-control' id='reportWeek' type='text' name='reportWeek' style='margin-top:15px;'placeholder='" + i + ".'><button type='button' class='btn btn-primary btn-sm' id='decreaseBtn'><span class='glyphicon glyphicon-minus'></span></button></div>");
        increase($(this));
    })

    $('.table-report').on("click", ".decrease-btn", function () {
        // var input = $(this).parents('.increase-input');
        // var inputP = input.siblings('.increase-input')
        // input.remove();
        // //    console.log(input.index());
        // for (var i = 0; i < inputP.length; i++) {
        //     inputP.eq(i).find('input').attr('placeholder', i + 2)
        // }
        decrease($(this));
    })
})

function increase(e) {
    var i = e.parents('.col-sm-5').find('input').length + 1;
    e.before("<div class='increase-input'><input class='form-control' type='text' name='reportWeek' style='margin-top:15px;'placeholder='" + i + ".'><button type='button' class='btn btn-primary btn-sm decrease-btn'><span class='glyphicon glyphicon-minus'></span></button></div>");
}

function decrease(e) {
    var input = e.parents('.increase-input');
    var inputP = input.siblings('.increase-input')
    input.remove();
    //    console.log(input.index());
    for (var i = 0; i < inputP.length; i++) {
        inputP.eq(i).find('input').attr('placeholder', i + 2)
    }
}

function loopTable(id) {
    var form = $('#'+id+' .form-control').serializeArray();
    var strWork = '';
    for (var i = 0; i < form.length; i++) {
        strWork = strWork + (i + 1 + '. ' + form[i].value + '<br>');
    }
    return strWork
}