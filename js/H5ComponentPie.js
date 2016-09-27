/**
 * Created by sexyi on 2016/9/4.
 */

/**
 * 饼图组件对象
 * @param name 组件名称
 * @param {object}cfg 配置文件
 * @returns {*|jQuery|HTMLElement} 返回图文组件的jQuery对象
 * @constructor
 */
var H5ComponentPie = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    //  绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    var r = w / 2;
    var that = this;
    this.drawTimer = [];
    // 加入底图层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    cns.style.zIndex = 1;
    component.append(cns);

    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 加入数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    cns.style.zIndex = 2;
    component.append(cns);

    var colors = ['red', 'green', 'blue', 'orange', 'gray'];

    var sAngel = 1.5 * Math.PI; //设置开始的角度为12点位置
    var eAngel = 0; //结束角度
    var aAngel = 2 * Math.PI;

    var step = cfg.data.length;
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i];
        var color = item.color || (item.color = colors.pop());
        eAngel = sAngel + aAngel * item.per;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.1;

        //绘制扇形
        ctx.moveTo(r, r);
        ctx.arc(r, r, r, sAngel, eAngel);
        ctx.fill();
        ctx.stroke();


        //加入所有的项目文本以及百分比
        var text = $('<div class="text">');
        text.text(cfg.data[i].name);
        var per = $('<div class="per">');
        per.text(cfg.data[i].per * 100 + '%');
        component.append(text);
        text.append(per);

        var x = r + Math.cos((sAngel+eAngel)/2) * r;
        var y = r + Math.sin((sAngel+eAngel)/2) * r;
        if (x > w / 2) text.css('left', x / 2 + 5);
        else text.css('right', (w - x) / 2 + 5);
        if (y > h / 2) text.css('top', y / 2 + 5);
        else text.css('bottom', (h - y) / 2 + 5);
        text.css('color', color);
        sAngel = eAngel;

    }

    // 加入蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    cns.style.zIndex = 3;
    component.append(cns);

    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    draw(0);

    /**
     * 蒙版层绘制函数
     * @param per
     */
    function draw(per) {
        if (per >= 1) {
           component.find('.text').css('transition','all 0s');
            // --- H5ComponentPie.reSort( component.find('.text') );
            // +++ 以下3行
            component.find('.text').each(function (i) {
                H5ComponentPie.reSort( component.find('.text').slice(i) ,r)
            });
            component.find('.text').css('transition','all 1s');
            component.find('.text').css('opacity',1);
            //ctx.clearRect(0,0,w,h);
        } else {
            component.find('.text').css('opacity', 0);

        }
        ctx.clearRect(0, 0, w, h);
        /* if(per <= 0){
         component.find('canvas:last').css('opacity',0);
         }else {
         component.find('canvas:last').css('opacity',1);
         }*/
        //设置开始的角度为12点位置
        sAngel = 1.5 * Math.PI;
        eAngel = sAngel + 2 * Math.PI * per;
        ctx.beginPath();
        ctx.moveTo(r, r);
        if (per <= 0) {
            ctx.arc(r, r, r + 1, 0, 2 * Math.PI);
        } else {
            ctx.arc(r, r, r + 1, sAngel, eAngel, true);
        }

        ctx.fill();
        ctx.stroke();

    }


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
H5ComponentPie.reSort = function (list,r) {



    //1.检测相交
    var compare = function (domA, domB) {
        //元素位置
        var offsetA = $(domA).offset();
        var offsetB = $(domB).offset();
        //domA的投影
        var shadowA_x = [offsetA.left, $(domA).width() + offsetA.left];
        var shadowA_y = [offsetA.top, $(domA).height() + offsetA.top];

        //domB的投影
        var shadowB_x = [offsetB.left, $(domB).width() + offsetB.left];
        var shadowB_y = [offsetB.top, $(domB).height() + offsetB.top];

        // 检测 x
        var intersect_x = (shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1]) ||
            (shadowA_x[1] > shadowB_x[0] && shadowA_x[1] < shadowB_x[1]);

        //检测 y
        var intersect_y = (shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1]) ||
            (shadowA_y[1] > shadowB_y[0] && shadowA_y[1] < shadowB_y[1]);

        return intersect_x && intersect_y;
    };

    //2.错开重排
    var reset = function (domA, domB) {
       // if($(domA).css('top')>r) {
            if ($(domA).css('top') != 'auto') {
                $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height());
            }
            if ($(domA).css('bottom') != 'auto') {
                $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height());

            }
       /* }else {
            if ($(domA).css('top') != 'auto') {
                $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height());
            }
            if ($(domA).css('bottom') != 'auto') {
                $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height());

            }
        }*/


    };


    var willResort = [list[0]];
    $.each(list, function (i, domTarget) {
        if (compare(willResort[willResort.length-1], domTarget)) {
            willResort.push(domTarget);
        }
        //console.log(domTarget);
    });
    if(willResort.length>1){

        $.each(willResort,function (i,domTarget) {
            if(willResort[i+1]){
                reset(domTarget, willResort[i+1]);
            }
        });
        H5ComponentPie.reSort(willResort,r);
    }


};