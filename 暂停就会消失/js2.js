window.onload = ()=>{
    var PBcanvas, PBctx, PBdatas;
    var pointBackground = ()=> {
        PBcanvas = document.createElement('canvas');  // 480 360
        PBcanvas.width = 480;
        PBcanvas.height = 480;
        PBctx = PBcanvas.getContext('2d');
        PBdatas = PBctx.createImageData(480,480);
        var PBlength = PBdatas.data.length;
        var random;
        for(var i = 0; i<PBlength;i +=4){
            random = parseInt(Math.random() * 3); // 黑白深浅
            PBdatas.data[i+3] = 255;
            if(random == 0){
                PBdatas.data[i] = 0;
                PBdatas.data[i+1] = 0;
                PBdatas.data[i+2] = 0;
            }else{
                PBdatas.data[i] = 255;
                PBdatas.data[i+1] = 255;
                PBdatas.data[i+2] = 255;
            }
        }
        PBctx.putImageData(PBdatas, 0, 0);
        document.body.appendChild(PBcanvas);
    }
    pointBackground();
}