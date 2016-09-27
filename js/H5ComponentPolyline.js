/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 折线图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    //  绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布，用作网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';

    //  水平网格线  100份 -> 10份
    var step = 10;

    var y, x;
    for (var i = 0; i < step + 1; i++) {
        y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);

    }
    // 垂直网格线（根据项目的个数去分）&添加项目名称
    step = cfg.data.length + 1;
    var text_w = w / step;
    for (i = 0; i < step + 1; i++) {
        x = w / step * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        if (cfg.data[i]) {
            var text = $('<div class="text">');
            text.width(text_w);
            text.text(cfg.data[i].name);
            text.css({
                'left': x / 2, 'transition': 'all 1s ' + (i * .1) + 's',
                '-moz-transition': 'all 1s ' + (i * .1) + 's',
                '-webkit-transition': 'all 1s ' + (i * .1) + 's',
                '-o-transition': 'all 1s ' + (i * .1) + 's'
            });
            component.append(text);
        }
    }

    ctx.stroke();

    // 加入一个画布（数据层）
    cns = document.createElement('canvas');
    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);


    function draw(per) {
        per = per ? per : 1;
        if (per >= 1) {
            component.find('.text').css('opacity', 1);
        } else {
            component.find('.text').css('opacity', 0);
        }
        if(per <= 0){
            component.find('canvas:last').css('opacity',0);
        }else {
            component.find('canvas:last').css('opacity',1);
        }
        ctx.clearRect(0, 0, w, h);

        //  绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8878';
        x = 0, y = h;
        //ctx.moveTo(10,10);
        //ctx.arc(10,10,5,0,2*Math.PI);
        step = cfg.data.length + 1;
        //画点&写数据
        for (i in cfg.data) {
            ctx.beginPath();
            var item = cfg.data[i];
            y = (1 - item.per * per) * h;
            x = (w / step) * (i * 1 + 1);
            //console.log(1+i*1);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.font = "15px Microsoft Yahei";
            ctx.fillStyle = '#ff8878';
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = item.color ? item.color : '#595959';
            ctx.fillText(((item.per * 100) >>> 0) + '%', x - 10, y - 10);
        }
        //画线
        ctx.moveTo(w / step, (1 - cfg.data[0].per * per) * h);
        for (i in cfg.data) {
            var item = cfg.data[i];
            y = (1 - item.per * per) * h;
            x = (w / step) * (i * 1 + 1);
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        //绘制阴影
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineTo(x, h);
        ctx.lineTo(w / step, h);
        ctx.fillStyle = 'rgba(255,136,120,0.2)';
        ctx.fill();

        ctx.stroke();
    }

    //draw();


    //js实现生长动画
    component.on('onLoad', function () {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += 0.01;
                draw(s);
            }, i * 10 + 1000);
        }
    });
    component.on('onLeave', function () {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            }, i * 10);
        }
    });

    return component;
};
