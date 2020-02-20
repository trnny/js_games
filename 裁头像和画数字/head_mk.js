var fileBtn = document.createElement('label');
    fileBtn.id = 'file_input_label';
    fileBtn.setAttribute("for", "file_input_head");
    fileBtn.innerText = "choose";
var fileEle = document.createElement('input');
    fileEle.type = 'file';
    fileEle.id = "file_input_head";

var c_div = document.createElement('div'),
    p_div = document.createElement('div'),
    p_img = document.createElement('img'),
    p_rect = document.createElement('div');

var reader = new FileReader();
var file = null;

var canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 360;
    canvas.style.width = "360px";
    canvas.style.height = "360px";
    canvas.id = 'canvas_head';
var ctx = canvas.getContext('2d');
c_div.appendChild(canvas);
c_div.id = "c_div";
p_div.id = "p_div";
p_rect.id="p_rect";

var pickRect = 0,           // 框真实大小
    max_pickRect = 0,       // 最大框
    min_pickRect = 0,       // 最小框
    _left = 0,               // 左距
    _top = 0,                // 上距
    imgwidth = 0,           // 图片宽
    imgheight = 0,          // 图片高
    max_size = 480,         // 最大显示
    _zoom = 1;              // 缩放

var ctxdraw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(p_img, _left, _top, pickRect/_zoom, pickRect/_zoom, 0, 0, canvas.width, canvas.height);
}
window.onload=function(){
    p_div.appendChild(p_img);
    p_div.appendChild(p_rect);
    p_img.onload = function(){
        _zoom = 1;
        imgwidth = this.width;
        imgheight = this.height;
        max_pickRect = imgheight > imgwidth ? imgwidth : imgheight;
        if(max_pickRect > max_size){
            _zoom = max_size / max_pickRect;
            max_pickRect = max_size;
            imgwidth = imgwidth * _zoom;
            imgheight = imgheight * _zoom;
        }
        this.style.width = imgwidth + 'px';
        this.style.height = imgheight + 'px';
        pickRect = max_pickRect;
        min_pickRect = 24;
        p_rect.style.width = pickRect+'px';
        p_rect.style.height = pickRect+'px';
        p_rect.style.display = 'block';
        _left = (imgwidth - pickRect) /2 -1;
        _top = (imgheight - pickRect) /2 -1;
        p_rect.style.left =  _left + 'px';
        p_rect.style.top =  _top + 'px';
        ctxdraw();
    };
    reader.onload = function(e){
        p_img.src = e.target.result;
    };
    fileEle.addEventListener('change', function(event){
        file = event.target.files[0];
        if(file.type.indexOf('image')==0) {
            reader.readAsDataURL(file);
        }
    });
    document.body.appendChild(fileEle);
    document.body.appendChild(fileBtn);
    document.body.appendChild(c_div);
    document.body.appendChild(p_div);

    var bbb = document.createElement('button');
    var a= 
    bbb.innerText = '点我';
    document.body.appendChild(bbb);
    bbb.onclick = ()=>{
        var a = document.createEvent("MouseEvents");
        a.initEvent('click', true, true);
        fileEle.dispatchEvent(a);
    }
}
var lastx,lasty;
p_rect.onmousedown = function(e){
    lastx = e.x;
    lasty = e.y;
    var t_left = _left, t_top = _top;
    var mclb = (e)=>{
        var _move = false;
        t_left += e.x - lastx;
        lastx = e.x;
        t_top += e.y - lasty;
        lasty =e.y;
        if(t_left>= -1 && t_left < imgwidth-pickRect){
            p_rect.style.left = t_left+'px';
            _left = t_left;
            _move = true;
        }
        if(t_top>=-1 && t_top < imgheight-pickRect){
            p_rect.style.top = t_top+'px';
            _top = t_top;
            _move = true;
        }
        if(_move){
            // 画画布
            ctxdraw();
        }
    }
    var remb = ()=>{
        window.removeEventListener('mousemove', mclb);
        window.removeEventListener('mouseup', remb);
    }
    window.addEventListener('mousemove', mclb);
    window.addEventListener('mouseup', remb);
    return false;
}
p_rect.onmousewheel = function(e){
    var _move = false;
    if(e.wheelDelta>0){ // 向上
        if(pickRect +4 <= max_pickRect){  // 放大
            pickRect += 4;
            p_rect.style.width = pickRect+'px';
            p_rect.style.height = pickRect+'px';
            _move = true;
        }
    }else{      // 向下
        if(pickRect-4>=min_pickRect){   // 缩小
            pickRect -= 4;
            p_rect.style.width = pickRect+'px';
            p_rect.style.height = pickRect+'px';
            _move = true;
        }
    }
    if(_move){
        // 画画布
        ctxdraw();
    }
}
var toBlob = function(){
    var base64Data = canvas.toDataURL("image/png");
    var blob = dataURItoBlob(base64Data);
}
var dataURItoBlob = function(base64Data){
    var byteString;
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
}