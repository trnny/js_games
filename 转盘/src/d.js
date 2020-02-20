var div_n = document.getElementById('div_n');
window.acn = function(name){
    this.name = name;
    this.e = null;
    this.init();
}

acn.al = [];
acn.clean = ()=>{
    div_n.innerHTML = '';
    acn.al = [];
    return acn.al;
}
acn.rem = (e)=>{
    var t = [];
    for(var i = 0;i < acn.al.length;i++){
        e != acn.al[i] && t.push(acn.al[i]);
    }
    acn.al = t;
}
acn.toA = ()=>{
    var t = [];
    for(var i = 0;i < acn.al.length;i++){
        t.push(acn.al[i].innerText);
    }
    return t;
}

acn.prototype = {
    init: function(){
        this.e = document.createElement('p');
        this.e.innerText = this.name;
        div_n.appendChild(this.e);
        acn.al.push(this.e);
        this.e.onclick = ()=>{
            this.del();
        }
    },
    del: function(){
        div_n.removeChild(this.e);
        acn.rem(this.e);
    }
}