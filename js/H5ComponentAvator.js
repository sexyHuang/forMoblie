/**
 * Created by sexyi on 2016/9/22.
 */

/**
 * 头像组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentAvator = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var before = $('<div class="before">');
    var back = $('<div class="back">');
    var ding = $('<i class="ding">');
    if (cfg.aPhoto) {
        back.css('backgroundImage', 'url(' + cfg.aPhoto + ')');
    }
    if (cfg.aIcon) {
        before.css('backgroundImage', 'url(' + cfg.aIcon + ')');
    }
    if (cfg.bg) {
        component.css('backgroundColor', 'transparent');
        back.css('backgroundColor', cfg.bg);
        before.css('backgroundColor', cfg.bg);
    }
    before.on('click', function () {
       /* if (this.dataset.rotate == 0 || this.dataset.rotate === undefined) {
            this.dataset.rotate = 1;*/
            $('.h5_component_name_click_tip')&&$('.h5_component_name_click_tip').css('opacity',0);
            $(this).parent('.h5_component_avator').css({
                'zIndex': 2
            });
            $(this).css({
                'transform': 'rotate(160deg)',
                '-webkit-transform': 'rotate(160deg)'
            });
            var that = this;
            setTimeout(function () {
                $(that).parent('.h5_component_avator').css({
                    'zIndex': 4
                });
                $(that).css({
                    'transform': 'rotate(0deg)',
                    '-webkit-transform': 'rotate(0deg)'
                });
            },2000);
        /*}
        else {
            this.dataset.rotate = 0;
            $(this).css({
                'transform': 'rotate(0)'
            })
        }*/
    });
    component.append(before).append(back).append(ding);
    return component;
};
