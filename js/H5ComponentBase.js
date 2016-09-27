/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 基本图文组件对象
 * @param name 组件名称，会加入className中
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentBase = function (name, cfg) {
    var cfg = cfg || {};
    var id = ('h5_c_' + Math.random()).replace('.', '_');
    var name = 'h5_component_name_' + name;
    var cls = ' h5_component_' + cfg.type;
    var component = $('<div class="h5_component ' + name + cls + '" id="' + id + '">');
    var that = this;
    //配置文件的各项可选参数
    if(cfg.html){
        component.html(cfg.html+cfg.text||'');
    }else {
        cfg.text && component.text(cfg.text);
    }

    cfg.width && component.width(cfg.width / 2);
    cfg.height && component.height(cfg.height / 2);
    cfg.css && component.css(cfg.css);
    if (cfg.bg) {
        if (cfg.bg.indexOf('#') == 0 || cfg.bg.indexOf('rgb') == 0) {
            component.css('backgroundColor', cfg.bg);
        } else {
            component.css('backgroundImage', 'url(' + cfg.bg + ')');
        }
    }


    if (cfg.onclick !== undefined) {
        component.click(function () {
            eval(cfg.onclick);
        });
    }
    if (cfg.center === true) {
        component.css({
            marginLeft: -(cfg.width / 4),
            left: '50%'
        })
    }
    //更多自定义参数
    if (cfg.img) {
        var img = $('<img style="width: 100%" src="' + cfg.img + '">');
        component.append(img);
    }


    //自定义onLoad事件，组件加载时触发
    component.on('onLoad', function () {
        that.onload = setTimeout(function () {
            component.addClass(cls + '_load').removeClass(cls + '_leave');
            cfg.animateIn && component.animate(cfg.animateIn);
        }, cfg.delay || 0);

        return false;
    });

    //自定义onLeave事件，组件消失时触发
    component.on('onLeave', function () {
        clearTimeout(that.onload);
        component.addClass(cls + '_leave').removeClass(cls + '_load');
        component.stop(true,true);
        cfg.animateOut && component.animate(cfg.animateOut);

        return false;
    });

    return component;
};
