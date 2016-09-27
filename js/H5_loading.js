var H5_loading = function (images,firstPage) {
//if(images !== undefined) {
    if (this._images === undefined) {
        this._images = (images || []).length;
        this._loaded = 0;
        this.firstPage = firstPage;
        var id = this.id;
        window[id] = this; //把当前对象储存在全局对象window中，用来进行某个图片加载后的回调
        if (this._images === 0) {
            window[id].loader();
        }
        for (s in images) {
            var item = images[s];
            var img = new Image;
            img.onload = function () {
                window[id].loader();
            };
            img.src = item;
        }

        $('#rate').text('0%');
        return this;
    } else {

        this._loaded++;
        $('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');
        if (this._loaded < this._images) {
            return this;
        }
    }

    window[id] = null;
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
    if (this.firstPage) {
        $.fn.fullpage.moveTo(this.firstPage);
    }
};