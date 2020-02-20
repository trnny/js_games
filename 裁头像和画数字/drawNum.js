/**
 * 构造`drawNum`对象
 * @param {HTMLElement} fa 父容器
 * @param {object} opt 对`drawNum`的构造的选项
 */
var drawNum = function(fa, opt){
    opt = opt || {};
    this.fa = fa || document.body;
    this.weight = opt.weight || 8;
    this.canvas = document.createElement('canvas');
    this.canvas.width = opt.width || 640;
    this.canvas.height = opt.height || 640;
    this.canvas.style.width = (opt.width || 640) + 'px';
    this.canvas.style.height = (opt.height || 640) + 'px';
    opt.style && Object.keys(opt.style).forEach((v)=>{
        this.canvas.style[v] = opt.style[v];
    });
}

drawNum.prototype = {
    route: [],
    ctx: null,
    zoomx: 1,
    zoomy: 1,
    _left: null,
    _top: null,
    _right: null,
    _bottom: null,
    /**
     * 在指定的父容器中初始化 父容器可空
     * @param {HTMLElement} fa 父容器
     */
    init: function(fa){
        // 变量初始化
        zoomx=zoomy=1;
        _left=_top=_right=_bottom=null;
        if(fa) this.fa = fa;
        this.fa = this.fa || document.body;
        this.fa.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        // 画
        var rx, ry, last_x, last_y, draw_callback = (e)=>{
            rx += (e.x - last_x)/this.zoomx;
            ry += (e.y - last_y)/this.zoomy;
            if(rx<this._left && rx>=0) this._left = rx;
            else if(rx>this._right && rx<this.canvas.width) this._right = rx;
            if(ry<this._top&&ry>=0) this._top = ry;
            else if(ry>this._bottom&&ry<this.canvas.height) this._bottom = ry;
            last_x = e.x;
            last_y = e.y;
            this.ctx.lineTo(rx, ry);
            this.ctx.stroke();
            // 判读rx, ry 保存
            return false;
        };
        this.canvas.onmousedown = (e)=>{
            console.log(e);
            rx = (e.x - this.canvas.offsetLeft + document.body.scrollLeft)/this.zoomx;
            ry = (e.y - this.canvas.offsetTop + document.body.scrollTop)/this.zoomy;
            if(this._left === null && this._right === null){
                this._left = this._right = rx;
                this._top = this._bottom = ry;
            }else{
                if(rx<this._left) this._left = rx;
                else if(rx>this._right) this._right = rx;
                if(ry<this._top) this._top = ry;
                else if(ry>this._bottom) this._bottom = ry;
            }
            last_x = e.x;
            last_y = e.y;
            this.ctx.beginPath();
            this.ctx.moveTo(rx, ry);
            this.ctx.lineWidth = this.weight/this.zoomx;
            this.ctx.strokeStyle = "black";
            this.ctx.stroke();
            window.addEventListener('mousemove', draw_callback);
            var rem = (e)=>{
                // this.ctx.stroke();
                this.ctx.closePath();
                window.removeEventListener('mousemove', draw_callback);
                window.removeEventListener('mouseup', rem);
                return false;
            }
            window.addEventListener("mouseup", rem);
            return false;
        }
        return this;
    },
    /**
     * 画板的显示大小 类似于图片的缩放
     * @param {number} w 宽
     * @param {number} h 高 默认与宽相同
     */
    setStyleSize: function(w, h){
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = (h || w) + 'px';
        this.zoomx = w / this.canvas.width;
        this.zoomy = (h || w) / this.canvas.height;
        return this;
    },
    /**
     * 画板的内容大小 类似于图片的分辨率
     * @param {number} w 宽
     * @param {number} h 高 默认与宽相同
     */
    setContentSize: function(w, h){
        this.zoomx = this.zoomx * this.canvas.width / w;
        this.zoomy = this.zoomy * this.canvas.height / (h || w);
        this.canvas.width = w;
        this.canvas.height = h || w;
        return this;
    },
    /**
     * 把画板上画的内容转化为`Base64`字符串 `Base64`字符串可作为文件传给服务器
     * @param {number} size 图像的大小 (size*size的正方形图片)
     */
    toBase64: function(size){
        size = size&&size>=28 ? size :32;
        var _c = document.createElement('canvas');
        _c.width = _c.height = size;
        var _ctx = _c.getContext('2d');
        _ctx.fillStyle = "#fff";
        _ctx.fillRect(0, 0, _c.width, _c.height);
        var _w, _h, _s, _cw, _ch;
        _w = this._right - this._left;
        _h = this._bottom - this._top;
        _s = _w > _h ? _w : _h;
        _cw = (this._left+this._right)/2;
        _ch = (this._top+this._bottom)/2;
        _ctx.drawImage(this.canvas, _cw - _s/2 - this.weight /2, _ch - _s/2 - this.weight /2 , _s+this.weight, _s+this.weight, 0.1*size, 0.1*size, 0.8*size, 0.8*size);
        return _c.toDataURL('image/jpeg', 0.95);
    },
    /**
     * 把画板上画的内容转化为`Blob`对象 `Blob`对象可作为文件传给服务器
     * @param {number} size 图像的大小 (size*size的正方形图片)
     */
    toBlob: function(size){
        var byteString, base64Data = this.toBase64(size);
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);
        else
            byteString = unescape(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    },
    /**
     * 清除画板
     */
    clean: function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this._left = null;
        this._top = null;
        this._right = null;
        this._bottom = null;
        return this;
    }
}

//  一下为测试 drawNum实例化的对象一定要在页面加载完成之后初始化

window.onload = function(){
    var draw2 = new drawNum(document.body, {
        style: {
            border: '1px solid #000'
        },
        weight: 14
    });
    draw2.init();
    draw2.setStyleSize(160);  // 单位像素
    draw2.setContentSize(160);
    var draw = new drawNum(document.body, {
        style: {
            border: '1px solid #000'
        },
        weight: 14
    });
    draw.init();
    draw.setStyleSize(320);  // 单位像素
    draw.setContentSize(320);
    document.onkeydown = ()=>{
        console.log(draw.toBase64(64));
        draw.clean();
    }
}