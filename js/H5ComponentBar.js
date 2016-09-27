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
var H5ComponentBar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    $.each(cfg.data, function (idx, item) {
        var line = $('<div class="line">'),
            name = $('<div class="name">'),
            rate = $('<div class="rate">'),
            per = $('<div class="per">'),
            width = item.per*100+'%',
            bgStyle = '';

        if(item.color){
            bgStyle = 'style="background-color:'+item.color+'"';
            per.css({color: item.color});
        }
        rate.html('<div class="bg" '+bgStyle+'></div>');
        rate.width(width);
        name.text(item.name);
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);
    });

    return component;
};

