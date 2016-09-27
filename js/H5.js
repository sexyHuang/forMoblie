/**
 * Created by sexyi on 2016/9/4.
 */

var jdata = [];

/**
 *   内容组织类
 * @constructor
 */
var H5 = function () {
    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.ele = $('<div class="h5" id="' + this.id + '">').hide();
    this.page = [];
    $('body').append(this.ele);

    /**
     * 新增一个页
     * @param {string} name 页的名称，会加入到ClassName中
     * @param {string} text 页内的默认文本
     * @returns {H5} H5对象，可以重复适应H5对象支持的方法
     */
    this.addPage = function (name, text) {
        jdata.push({isPage: true, name: name, text: text});
        var page = $('<div class="h5_page section">');
        if (name != undefined) {
            page.addClass('h5_page_' + name);
            page.text(text);
        }
        this.ele.append(page);
        this.page.push(page);
        if (Object.prototype.toString.call(this.whenAddPage) == '[object Function]')
            this.whenAddPage();
        return this;
    };

    /**
     * 新增一个组件
     * @param {string}name 组件的名称，会加入到ClassName中
     * @param {object}cfg 配置对象
     * @returns {H5} H5对象，可以重复适应H5对象支持的方法
     */
    this.addComponent = function (name, cfg) {
        jdata.push({isPage: false, name: name, cfg: cfg});
        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        }, cfg);
        var component;
        var page = this.page.slice(-1)[0];
        switch (cfg.type) {
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'bar_v':
                component = new H5ComponentBar_v(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'ring':
                component = new H5ComponentRing(name, cfg);
                break;
            case 'avator':
                component = new H5ComponentAvator(name, cfg);
                break;
            case 'point_r':
                component = new H5ComponentPoint_r(name, cfg);
                break;
            default:
                throw Error('Do not have this type of component');
        }
        page.append(component);
        return this;
    };

    /**
     * H5内容加载方法
     * @returns {H5}
     */
    this.loader = function (firstPage) {
        this.ele.fullpage({
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.ele.show();
        if (firstPage) {
            $.fn.fullpage.moveTo(firstPage);
        }
        return this;
    };

   /* this.initByJson = function (url) {
        this.json = {};
        var that = this;
        $.getJSON(url, function (json) {
            $.each(json, function (i, item) {
                that.json[i] = item;
            });
        });

       /!* this.whenAddPage = function () {
            $.each(that.json.whenAddPage, function (i, item) {
                that.addComponent(item.name, item.cfg);
            });
            console.log(this);
        };*!/

        $.each(that.json.addThings, function (i, item) {
            if (item.isPage) {
                that.addPage(item.name, item.text);
            } else {
                that.addComponent(item.name, item.cfg);
            }
        });
        return this;
    };*/

    this.loader = (Object.prototype.toString.call(H5_loading) == '[object Function]') ? H5_loading : this.loader;
    return this;

};


