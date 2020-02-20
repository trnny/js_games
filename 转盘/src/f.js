window.RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback, 1000 / 60); };
})();

var id = (id) => {
    return document.getElementById(id);
}

var m_bl = id('m_bl'), 
    b_st = id('b_st'), 
    b_se = id('b_se'), 
    b_cv = id('b_cv');
var ipt_n = id('ipt_n'),
    btn_a = id('btn_a'),
    btn_c = id('btn_c');

var crads = [], ps = [];
var ctx = b_cv.getContext('2d'),
    vpy = b_cv.height,
    vpx = b_cv.width /2,
    vpy_3_1 = parseInt(vpy / 3),
    vpy_3_2 = parseInt(vpy * 0.667),
    vpy_2 = vpy /2;

var spd = 1, cur = 0, guf = 0, stp = false;

var Animation = function() {
    //this.init();
};

Animation.prototype = {
    isrunning: false,
    init: function() {
        crads = [];
        cur = vpy_3_1*ps.length;
        cur = cur >= vpy ? cur : vpy;
        for (var i=0; i < ps.length; i++){
            var c = new card(ps[i], i, 1);
            crads.push(c);
            c.y = vpy_3_1*(i+0.5);
            //c.visable() && c.paint();
        }
    },
    start: function() {
        this.isrunning = true;
        animate();
    },
    stop: function() {
        this.isrunning = false;
    }
}

function animate() {
    if(animation.isrunning){
        ctx.clearRect(0, 0, b_cv.width, b_cv.height);
        for (var i =0; i < crads.length; i++){
            crads[i].visable() && crads[i].paint();
        }
        crads.length > 0 && RAF(animate);
    }
}

var card = function(name, i, z){
    this.name = name;
    this.i = i;
    this.z = z;
    this.y = 0;
};

card.prototype = {
    paint: function() {
        ctx.save();
        ctx.beginPath();
        var x = 120 * this.z, y = 30 * this.z;
        //ctx.fillStyle = "ragba(255,255,255," + this.z +")";
        //ctx.fillRect(vpx - x, this.y - y, 2*x, 2*y);
        ctx.font = 40*this.z + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.name, vpx, this.y , 2*x);
        ctx.restore();
    },
    visable: function() {
        this.y += spd;
        if(this.y < vpy) {
            var d = this.y - vpy_2;
            d = d < 0 ? -d : d;
            this.z = 1 - d/700;
            if(stp && this.i == guf && this.y >= vpy_2 && this.y < vpy_3_2){
                animation.stop();
            }
            return true;
        }else{
            this.y = this.y > cur ? this.y - cur : this.y;  //this.y = this.y % cur;
            return false;
        }
    }
}

var animation = new Animation();

function luckyDog() {
    ps = acn.toA();
    guf = parseInt(Math.random() * ps.length);
}

var adp = ()=>{
    if(ipt_n.value.length > 0){
        new acn(ipt_n.value);
        ipt_n.value = "";
    }
}

var tm_a = null,tm_d = null;
var f_down = ()=>{
    animation.stop();
    luckyDog();
    spd = 0;
    tm_d != null && clearInterval(tm_d);
    tm_d = null;
    tm_a != null && clearInterval(tm_a);
    tm_a = setInterval(()=>{
        if(spd < 25){
            spd++;
            b_st.style.transform = 'scale('+ (50-spd)/50 +')';
        }
    }, 120);
},  f_up = ()=>{
    stp = false;
    if(spd < 2) spd = 2;
    b_st.style.transform = 'scale(1)';
    tm_a != null && clearInterval(tm_a);
    tm_a = null;
    tm_d != null && clearInterval(tm_d);
    tm_d = setInterval(()=>{
        if(spd > 2) spd--;
        else{
            stp = true;
            clearInterval(tm_d);
            tm_d = null;
        }
    }, 1000);
    animation.init();
    animation.start();
};

b_st.onmousedown = ()=>{
    f_down();
}
b_st.onmouseup = ()=> {
    f_up();
}

ipt_n.onkeydown = (e) =>{
    e = e || window.event;
    var c = e.keyCode || e.which || e.charCode;
    c == 13 && adp();
    c == 27 && ipt_n.blur();
}
btn_a.onclick = ()=> {
    adp();
    ipt_n.focus();
}
btn_c.onclick = ()=> {
    // ps = acn.clean();
    acn.clean();
    animation.stop();
    ctx.clearRect(0, 0, b_cv.width, b_cv.height);
}

var kfp = true;
document.body.onkeydown = (e) =>{
    e = e || window.event;
    var c = e.keyCode || e.which || e.charCode;
    if(document.body == document.activeElement && kfp && c == 32){
        kfp = false;
        f_down();
    }
}
document.body.onkeyup = (e) =>{
    e = e || window.event;
    var c = e.keyCode || e.which || e.charCode;
    if(document.body == document.activeElement && c == 32){
        kfp = true;
        f_up();
    }
}