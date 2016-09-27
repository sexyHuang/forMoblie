/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 柱图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentBar_v = function (name, cfg) {
    var component = new H5ComponentBar(name, cfg);
    var lines = component.find('.line');
    var rates = lines.find('.rate');
    var names = lines.find('.name');
    var pers = lines.find('.per');
    var lineWidth = cfg.width/lines.length/2;
    var width = parseInt(lineWidth*0.7);
    lines.width(width+'px');
    var marginLeft =  parseInt((lineWidth - width)/2);
    var margin = '0 '+marginLeft + 'px';


    names.css({left: '-'+marginLeft+'px',width: lineWidth+'px'});
    pers.css({left: '-'+marginLeft+'px',width: lineWidth+'px'});
    lines.css({margin: margin});
    rates.width('100%');
    lines.height('100%');

    $.each(cfg.data, function (idx, item) {
        var height =  item.per*100+'%';
        rates[idx].style.height = height;

    });
    return component;
};
