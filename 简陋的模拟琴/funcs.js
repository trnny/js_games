(function(){
    var _JPiano = function(){
        var pianoBtns = [];  //钢琴键的数组
        var pianoAdos = [];  //声音的数组
        //init();

        this.init = function(){  //向页面添加钢琴键
            var pianoBtn;
            var pianoAdo;
            var pianoBlk;
            pianoBlk = document.createElement("div");
            pianoBlk.className = "pianoBlk";
            document.body.appendChild(pianoBlk);
            for(var i = 0;i < 21;i++){
                pianoBtn = document.createElement("p");
                pianoBtn.className = "pianoBtn";
                pianoAdo = document.createElement("audio");
                pianoAdo.preload = "auto";
                pianoAdos.push(pianoAdo);
                pianoBtn.appendChild(pianoAdo);
                pianoBtns.push(pianoBtn);
                pianoBlk.appendChild(pianoBtn);
                pianoBtn.onclick = function(){
                    this.lastElementChild.currentTime = 0;
                    this.lastElementChild.play();
                }
            }

            return this;
        }

        this.start = function(){
            document.onkeydown = function(e){
                var keyCode = e.which || e.keyCode;
                keyCode > 64 && keyCode < 65 + pianoBtns.length && pianoBtns[keyCode - 65].onclick();
            }
            return this;
        };

        this.loadSongs = function(){
            //var that = this;
            let songscript = document.createElement('script');
            songscript.type = "text/javascript";
            songscript.src = "songs.js";
            document.head.appendChild(songscript);
            songscript.onload = function(){
                var b = document.createElement("div");
                b.className = "sBtnsBlk";
                for(var i = 0;i < songs.length;i++){
                    b.innerHTML += "<input type='button' value='"+ songsName[i] + "' onclick='JPiano.playSong(songs["+ i +"])'>";
                }
                document.body.appendChild(b);
            }
            return this;
        }

        var playSonginterval = 0;
        var timer;
        var msCount = 0;
        var msTimer;

        this.playSong = function(song){
            song = song.toUpperCase();
            song = song.replace(/,|\|/g,'');
            var durn = 350;
            var halfDurn = 200;
            var idx;
            var playChar = function(){
                idx = song[playSonginterval++].charCodeAt() - 65;
                idx >= 0 && idx < pianoBtns.length && pianoBtns[idx].onclick();
                if(idx == -3){
                    idx = song[++playSonginterval];  //跳过音
                    if(idx == ' ' || idx == '.'){  //音后面的符号是空格或.
                        //idx = song[++playSonginterval];   //空格或.后的音
                        playSonginterval++;
                    }
                    //idx >= 0 && idx < pianoBtns.length && pianoBtns[idx].onclick();
                }
                if(playSonginterval < song.length){
                    idx = song[playSonginterval].charCodeAt() - 65;
                    if(idx == -19){
                        playSonginterval < song.length - 1 && playSonginterval++;  //跳过这个
                        timer = setTimeout(function(){
                            playChar();
                        },halfDurn);
                    }
                    else{
                        timer = setTimeout(function(){
                            playChar();
                        },durn);
                    }
                }else{
                    playSonginterval = 0;
                    clearTimeout(timer);
                    timer = null;
                    clearInterval(msTimer);
                    msTimer = null;
                    console.log("ended: " + msCount/1000);
                    msCount = 0;
                }
            };

            if(timer){
                clearTimeout(timer);
                timer = null;
                clearInterval(msTimer);
                msTimer = null;
            }else{
                if(playSonginterval < song.length){
                    msTimer = setInterval(function(){
                        msCount += 100;
                    },100);
                    playChar();
                }else{
                    playSonginterval = 0;
                }
            }

            return this;
        }

        this.showA = function(){
            for(var i = 0;i < pianoBtns.length;i++){
                pianoBtns[i].appendChild(document.createTextNode(String.fromCharCode(i+65)));
            }
            return this;
        }

        this.loadPiano = function(){
            for(var i = 0;i < pianoAdos.length;i++){
                pianoAdos[i].src = "src/piano/" + i + ".mp3";
            }
            return this;
        }

        this.loadPiano24 = function(){
            for(var i = 0;i < pianoAdos.length;i++){
                pianoAdos[i].src = "src/piano24/sound24-" + (i + 1) + ".m4a";
            }
            return this;
        }

        this.loadBass = function(){
            return this;
        }
        this.loadBass2 = function(){
            return this;
        }
        this.loadDrum = function(){
            return this;
        }
    }

    window.JPiano = new _JPiano();
})();

console.time('JPiano loaded');
JPiano.init().loadPiano24().start().loadSongs();
console.timeEnd('JPiano loaded');
