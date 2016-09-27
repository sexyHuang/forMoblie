/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 环图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentRing = function (name, cfg) {
    cfg.type = 'pie';
    if(cfg.data.length>1){
        cfg.data = [cfg.data[0]];
    }
    var component = new H5ComponentPie(name, cfg);
    component.addClass('h5_component_ring');
    var mark = $('<div class="mark">');
    var text  = component.find('.text');
    text.attr('style','');
    if(cfg.data[0].color){
        text.css('color',cfg.data[0].color);
    };

    mark.append(text);
    component.append(mark);
    return component;
};
