/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 雷达图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentRadar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var that = this;
    //  绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    this.drawTimer = [];
    // 加入一个画布，用作网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';

    var r = w / 2;
    var step = cfg.data.length;

    // 计算一个圆周上的坐标
    // 已知：圆心坐标（a,b)、半径r;角度deg
    // rad = (2*Math.PI/360)*(360/step)*i
    // x = a + Math.sin(rad)*r;
    // y = b + Math.cos(rad)*r;

    // 绘制网格背景 （分面绘制，分为10份）
    var isBlue = false;
    for (var s = 10; s > 0; s--) {
        ctx.beginPath();
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * (s / 10);
            var y = r + Math.cos(rad) * r * (s / 10);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
    }

    //伞骨绘制&名字添加
    for (var i = 0; i < step; i++) {
        rad = (2 * Math.PI / 360) * (360 / step) * i;
        x = r + Math.sin(rad) * r;
        y = r + Math.cos(rad) * r;

        //ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.moveTo(r, r);
        ctx.lineTo(x, y);
        // 输出项目文字
        var text = $('<div class="text">');
        text.text(cfg.data[i].name);

        text.css({
            'transition': 'all 1s ' + (i * .1) + 's', '-moz-transition': 'all 1s ' + (i * .1) + 's',
            '-webkit-transition': 'all 1s ' + (i * .1) + 's',
            '-o-transition': 'all 1s ' + (i * .1) + 's'
        });
        if (x > r) {
            text.css('left', x / 2 + 5);
        } else {
            text.css('right', (w - x) / 2 + 5);
        }
        if (y >= r) {
            text.css('top', y / 2 + 5);
        } else {
            text.css('bottom', (h - y) / 2 + 5);
        }
        if (cfg.data[i].color) {
            text.css('color', cfg.data[i].color);
        }
        component.append(text);

    }
    ctx.strokeStyle = '#eee';
    ctx.stroke();

    // 加入一个画布（数据层）
    cns = document.createElement('canvas');
    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    ctx.beginPath();
    /* */
    function draw(per) {
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
        per = per ? per : 1;
        ctx.clearRect(0, 0, w, h);
        //输出数据的折线
        for (var i = 0; i < step; i++) {
            var rate = cfg.data[i].per * per;
            rad = (2 * Math.PI / 360) * (360 / step) * i;
            x = r + Math.sin(rad) * r * rate;
            y = r + Math.cos(rad) * r * rate;
            if(i == 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#f00';
        ctx.stroke();
        //输出数据的点
        ctx.fillStyle = '#ff7676';
        for (var i = 0; i < step; i++) {
            var rate = cfg.data[i].per * per;
            rad = (2 * Math.PI / 360) * (360 / step) * i;
            x = r + Math.sin(rad) * r * rate;
            y = r + Math.cos(rad) * r * rate;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            //ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }


    }

    //draw(0.8);


    //js实现生长动画
        component.on('onLoad', function () {

        var s = 0;
        for (var i = 0; i < 100; i++) {
            that.drawTimer[i] = setTimeout(function () {
                s += 0.01;
                draw(s);
            }, i * 10 + cfg.delay+500);
        }
    });
    component.on('onLeave', function () {
        for (var i = 0; i < 100; i++) {
            if(that.drawTimer[i]){
                clearTimeout(that.drawTimer[i]);
            }
        }
        draw(0);
        /*var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            }, i * 10);
        }*/
    });

    return component;
};
