window.onload = ()=>{
    var shijian = 6, zhen = 20, drawf, movef, timer_move = null, timer_mp4 = null;
    var PBcanvas, PBctx, PBdatas, PBdatas_mp4, DScanvas, DSctx, DSdatas;
    var maxm = 120; curm = 0, up = true;
    // var pointBackground = ()=> {
    //     PBcanvas = document.createElement('canvas');  // 480 360
    //     PBcanvas.width = 480;
    //     PBcanvas.height = 360;
    //     var pixw = 480*4;
    //     PBctx = PBcanvas.getContext('2d');
    //     PBdatas = PBctx.createImageData(480,360);
    //     var PBlength = PBdatas.data.length;
    //     var p_x,p_y,random;
    //     for(var i = 0; i<PBlength-3;i +=4){
    //         p_x = i % pixw;
    //         p_y = parseInt(i / pixw);
    //         random = parseInt(Math.random() * 4); // 黑白深浅
    //         PBdatas.data[i+3] = 255;
    //         switch(random){
    //         case 0:
    //             PBdatas.data[i] = 0;
    //             PBdatas.data[i+1] = 0;
    //             PBdatas.data[i+2] = 0;
    //         case 1:
    //             PBdatas.data[i] = 255;
    //             PBdatas.data[i+1] = 255;
    //             PBdatas.data[i+2] = 255;
    //         }
    //     }
    //     // PBctx.putImageData(PBdatas, 0, 0);
    //     // document.body.appendChild(PBcanvas);
    // }
    var movePB = ()=> {
        var img = new Image(480, 480);
        img.onload = ()=>{
            PBcanvas = document.createElement('canvas');  // 480 360
            PBctx = PBcanvas.getContext('2d');
            PBcanvas.width = 480;
            PBcanvas.height = 360;
            PBctx.drawImage(img,0,0,480,360,0,0,480,360);

            DScanvas = document.createElement('canvas');
            DSctx = DScanvas.getContext('2d');
            DScanvas.width = 480;
            DScanvas.height = 360;
            DSctx.drawImage(img,0,0,480,360,0,0,480,360);

            document.body.appendChild(DScanvas);
            document.body.appendChild(PBcanvas);
            movef = ()=>{
                if(up){
                    if(curm<120){
                        DSctx.drawImage(img,0,curm,480,360,0,0,480,360);
                        PBctx.drawImage(img,0,120-curm,480,360,0,0,480,360);
                        curm++;
                    }else{
                        up = !up;
                    }
                }else{
                    if(curm>0){
                        DSctx.drawImage(img,0,curm,480,360,0,0,480,360);
                        PBctx.drawImage(img,0,120-curm,480,360,0,0,480,360);
                        curm --;
                    }else{
                        up = !up;
                    }
                }
            }
            // timer_move = setInterval(movef, 50);
        }
        img.src = 'PB.png';
    }
    var loadmp4 = ()=>{
        // pointBackground();
        var mp4 = document.createElement('video');
        document.body.appendChild(mp4);
        mp4.hidden = true;
        mp4.autoplay = true;
        mp4.preload = true;
        mp4.width = 480;
        mp4.height = 360;
        mp4.oncanplay = ()=>{
            console.log('canplay');
            movePB();
            drawf = ()=>{
                PBctx.drawImage(mp4, 0,0);
                PBdatas_mp4 = PBctx.getImageData(0, 0, 480, 360);
                DSdatas = DSctx.getImageData(0,0,480,360);
                for(var i=0; i<PBdatas_mp4.data.length; i+=4){
                    if(PBdatas_mp4.data[i]>127){
                        DSdatas.data[i] = PBdatas.data[i];
                        DSdatas.data[i+1] = PBdatas.data[i+1];
                        DSdatas.data[i+2] = PBdatas.data[i+2];
                    }
                }
                DSctx.putImageData(DSdatas, 0,0);
            }
            // timer_mp4 = setInterval(drawf, 50);
            window.onkeydown = ()=>{
                // console.log('keydown');
                if(mp4.paused){
                    mp4.play();
                }else{
                    mp4.pause();
                }
            }
            mp4.addEventListener('play', ()=>{
                if(timer_move == null)timer_move = setInterval(movef, 50);
                if(timer_mp4 == null)timer_mp4 = setInterval(drawf, 50);
            });
            mp4.addEventListener('pause', ()=>{
                clearInterval(timer_move);
                clearInterval(timer_mp4);
                timer_move = null;
                timer_mp4 = null;
            });
            mp4.addEventListener('ended', ()=>{
                clearInterval(timer_move);
                clearInterval(timer_mp4);
                timer_move = null;
                timer_mp4 = null;
            });
        }
        mp4.src = "bad apple.mp4";
    }
    loadmp4();
}