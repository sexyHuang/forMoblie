var h5 = new H5();
$.getJSON('data.json', function (json) {

    h5.json_wap = json.whenAddPage;
    if (json.whenAddPage.length !== 0) {
        h5.whenAddPage = function () {
            var that = this;
            $.each(this.json_wap, function (i, item) {
                that.addComponent(item.name, item.cfg);
            });
        };
    }

    $.each(json.addThings, function (i, item) {
        if (item.isPage) {
            h5.addPage(item.name, item.text);
        } else {
            h5.addComponent(item.name, item.cfg);
        }
    });
    h5.loader(json.imgs);
    var nav_li = h5.ele.find('.h5_component_name_nav').find('.point');
    $.each(nav_li, function (idx, item) {
        $(item).on('click', function () {
            $(this).addClass('click');
            $(this).parent('.h5_component_name_nav').css('zIndex', 10);
            $(this).css('zIndex', 10);
            var that = this;
            setTimeout(function () {
                $(that).parent('.h5_component_name_nav').css('zIndex', 2);
                $(that).css('zIndex', 1);
                $.fn.fullpage.silentMoveTo(idx + 2);
                $(that).removeClass('click');

            }, 500);
        })
    });
    var color = ['', '#f58535', '#99c1ff', '#e8d89d', '#60bda2', '#d23d4c'];
    var page_mbs = h5.ele.find('.h5_component_name_mb');
    $.each(page_mbs, function (idx, item) {
        if (color[idx] != '')
            $(item).css('backgroundColor', color[idx]);
    });

    var desk = h5.ele.find('.h5_component_name_desk');
    var workBox = h5.ele.find('.h5_component_name_work_box');
    var buttons = h5.ele.find('.h5_component_name_button');
    var deg = 360 / workBox.length;
    var bodyWidth = document.body.offsetWidth;
    var r = (bodyWidth * 0.9) / 2 / Math.tan(deg / 360 * Math.PI);
    var btnTimer = null;
    var pers = bodyWidth * 3;
    desk.css({
        'perspective': pers+'px',
        '-webkit-perspective': pers+'px'
    });
    $.each(workBox, function (idx, item) {
        item.dataset.rotateY = -idx * deg;
        $(item).css({
            'transition': 'all 1s',
            '-webkit-transition': 'all 1s',
            'transform': 'rotateY(-' + idx * deg + 'deg) translateZ(' + r + 'px)',
            '-moz-transform': 'rotateY(-' + idx * deg + 'deg) translateZ(' + r + 'px)',
            '-webkit-transform': 'rotateY(-' + idx * deg + 'deg) translateZ(' + r + 'px)'

        })
    });
    $.each(buttons, function (idx, item) {
        $(item).addClass('iconfont');
        $(item).css({
            'transform': 'translateZ(' + r + 'px)',
            '-webkit-transform': 'translateZ(' + r + 'px)',
        });
        if (idx == 0) {
            $(item).addClass('icon-left');
            $(item).on('click', function () {
                $(this).animate({
                    "left": "-=5px"
                }, 100).animate({
                    "left": "+=5px"
                }, 100);

                desk.css({
                    'transform': 'rotateX(-4deg)',
                    '-webkit-transform': 'rotateX(-4deg)',
                    '-moz-transform': 'rotateX(-4deg)',
                    'perspective': pers*2+'px',
                    '-webkit-perspective': pers*2+'px'

                });

                $.each(workBox, function (idx, item) {

                    item.dataset.rotateY -= deg;

                    $(item).css({
                        'transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',
                        '-moz-transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',
                        '-webkit-transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',

                    })
                });
                clearTimeout(btnTimer);
                btnTimer = setTimeout(function () {
                    desk.css({
                        'transform': 'rotateX(0deg)',
                        '-webkit-transform': 'rotateX(0deg)',
                        '-moz-transform': 'rotateX(0deg)',
                        'perspective': pers+'px',
                        '-webkit-perspective': pers+'px'
                    });

                }, 1500);

            })
        } else {
            $(item).addClass('icon-right');
            $(item).on('click', function () {
                desk.css({
                    'transform': 'rotateX(-4deg)',
                    '-webkit-transform': 'rotateX(-4deg)',
                    '-moz-transform': 'rotateX(-4deg)',
                    'perspective':  pers*2+'px',
                    '-webkit-perspective':  pers*2+'px'
                });
                $(this).animate({
                    "right": "-=5px"
                }, 100).animate({
                    "right": "+=5px"
                }, 100);
                $.each(workBox, function (idx, item) {
                    item.dataset.rotateY -= (-deg);
                    $(item).css({
                        'transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',
                        '-moz-transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',
                        '-webkit-transform': 'rotateY(' + item.dataset.rotateY + 'deg) translateZ(' + r + 'px)',

                    })
                });
                clearTimeout(btnTimer);
                btnTimer = setTimeout(function () {
                    desk.css({
                        'transform': 'rotateX(0deg)',
                        '-webkit-transform': 'rotateX(0deg)',
                        '-moz-transform': 'rotateX(0deg)',
                        'perspective':  pers+'px',
                        '-webkit-perspective':  pers+'px'
                    });

                }, 1500);
            });
        }
    });
    desk.append(workBox).append(buttons);
});/**
 * Created by sexyi on 2016/9/27.
 */
