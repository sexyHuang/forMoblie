/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 散点图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentPoint = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var base = cfg.data[0].per;

    //除基准点外的点集合
    var points = [];
    $.each(cfg.data, function (idx, item) {

        //散点图对象
        var point = {};

        point = $('<div class="point point_' + idx + '" >');
        var name = $('<div class="name" >' + item.name + '</div>');
        var rate = $('<div class="per" >' + item.per + '</div>');
        name.append(rate);
        point.append(name);
        var per = ((item.per / base) * 100 ) + '%';

        point.width(per).height(per);

        /*if (idx == 0) {
            point.dom.css('z-index', '10');
        }*/
        if (item.color) {
            point.css('background-color', item.color);
        }
        if(item.zIndex) {
            point.css('z-index', item.zIndex);
        }
        point.css({'transition':'all 1s '+idx*.5+'s',
                    '-moz-transition':'all 1s '+idx*.5+'s',
                    '-webkit-transition':'all 1s '+idx*.5+'s',
                    '-o-transition':'all 1s '+idx*.5+'s',
                    'left':item.left,'top':item.top});

      /*  if (item.top !== undefined && item.left !== undefined) {
            //设置元素位置为基准点的中点
            point.centerPos = ((1 - item.per) / 2) * 100 + '%';
            point.dom.css('opacity', 0);
            point.dom.css('left', point.centerPos).css('top', point.centerPos);
            point.animate = item.animate ? item.animate : {left: item.left, top: item.top, opacity: 1};
            points.push(point);
        }*/

        component.append(point);
    });

   /* //添加除了基准点外的散点图的加载动画
    component.on('onLoad', function () {
        if (points.length > 0) {
            //延时执行动画
            setTimeout(function () {
                for (var i = 0; i < points.length; i++) {
                    points[i].dom.animate(points[i].animate);
                }
            }, 500);
        }
        return false;
    });

    //添加除了基准点外的散点图的消失动画
    component.on('onLeave', function () {
        if (points.length > 0) {
            for (var i = 0; i < points.length; i++) {
                points[i].dom.animate({left: points[i].centerPos, top: points[i].centerPos, opacity: 0});
            }
        }
        return false;
    });*/
    component.find('.point').click(function () {
        component.find('.point').removeClass('focus_point');
        $(this).addClass('focus_point');
        return false;
    }).eq(0).addClass('focus_point');

    return component;
};
