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
var H5ComponentPoint_r = function (name, cfg) {
    cfg.type = 'point';
    var component = new H5ComponentPoint(name, cfg);
    component.addClass('h5_component_point_r');
    var $points = component.find('.point');
    $points.css({
        'left': -113,
        'transition': 'all 1s',
        '-moz-transition': 'all 1s',
        '-webkit-transition': 'all 1s',
        '-o-transition': 'all 1s'
    });
    var delay = cfg.delay +500;
    setTimeout(function () {
        $.each($points, function (idx, item) {
            $(item).css({

                'transform': 'rotate(' + cfg.data[idx].rotate + 'deg)',
                '-webkit-transform': 'rotate(' + cfg.data[idx].rotate + 'deg)'
            });
            $(item).find('.name').css({
                'transform': 'rotate(' + (0 - cfg.data[idx].rotate) + 'deg)',
                '-webkit-transform': 'rotate(' + (0 - cfg.data[idx].rotate) + 'deg)'
            })
        });
    }, delay);

    return component;
};
