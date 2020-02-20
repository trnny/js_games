(function(){
    var _JMQ = function(){
        var o;
        var headCt;
        var mainCt;
        var footCt;

        var headCtuName,headCtlNum,headCtoType;

        var styleEl;

        this.init = function(){
            o = document.createElement('div');
            document.body.appendChild(o);
            o.id = "q_body";

            headCt = document.createElement('div');
            o.appendChild(headCt);
            headCt.id = "q_headCt";

            let header = document.createElement('img');
            headCtuName = document.createElement('p');
            headCtlNum = document.createElement('p');
            headCtoType = document.createElement('p');

            header.src = "src/ttl.png";
            headCtuName.innerText = "QQ好友";
            headCtoType.innerText = "4G在线";

            headCt.appendChild(header);
            headCt.appendChild(headCtlNum);
            headCt.appendChild(headCtuName);
            headCt.appendChild(headCtoType);

            mainCt =document.createElement('div');
            o.appendChild(mainCt);
            mainCt.id = "q_mainCt";

            footCt = document.createElement('div');
            o.appendChild(footCt);
            footCt.id = "q_footCt";

            let footer = document.createElement('img');
            footer.src = "src/footer.png";
            footCt.appendChild(footer);

            styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            document.head.appendChild(styleEl);

            return this;
        }

        this.setFriendName = function(name){
            headCtuName.innerText = name;
            return this;
        }

        this.setFriendHeadImg = function(src){
            if(src){
                styleEl.appendChild(document.createTextNode(".u_headImg {background-image: url(" + src + ");}"));
            }
            return this;
        }

        this.setSelfHeadImg = function(src){
            if(src){
                styleEl.appendChild(document.createTextNode(".s_headImg {background-image: url(" + src + ");}"));
            }
            return this;
        }

        this.setOnlineType = function(type){
            if(type){
                headCtoType.innerText = type;
                headCtuName.style.top = "-100px";
            }else{
                headCtoType.innerText = "";
                headCtuName.style.top = "-88px";
            }
            return this;
        }

        this.sendMsg = function(msg){
            let o = document.createElement('div');
            o.className = "q_msg_s";
            mainCt.appendChild(o);
            mainCt.appendChild(document.createElement('br'));
            let head = document.createElement('p');
            head.className = "s_headImg";
            o.appendChild(head);
            let p = document.createElement('p');
            p.className = "s_msg";
            p.innerText = msg;
            o.appendChild(p);

            return this;
        }

        this.getMsg = function(msg){
            let o = document.createElement('div');
            o.className = "q_msg_u";
            mainCt.appendChild(o);
            mainCt.appendChild(document.createElement('br'));
            let head = document.createElement('p');
            head.className = "u_headImg";
            o.appendChild(head);
            let p = document.createElement('p');
            p.className = "u_msg";
            p.innerText = msg;
            o.appendChild(p);

            return this;
        }

        this.addSysMsg = function(msg){
            if(msg){
                let o = document.createElement('p');
                o.innerText = msg;
                o.className = "q_sysMsg_msg";
                mainCt.appendChild(o);
                mainCt.appendChild(document.createElement('br'));
            }
            return this;
        }

        this.addMsgTime = function(time){
            if(time){
                let o = document.createElement('p');
                o.innerText = time;
                o.className = "q_sysMsg_time";
                mainCt.appendChild(o);
                mainCt.appendChild(document.createElement('br'));
            }
            return this;
        }

        this.setLeftMsgNum = function(num){
            if(num){
                headCtlNum.innerText = "(" + num + ")";
            }else{
                headCtlNum.innerText = "";
            }
            return this;
        }
    }

    window.JMQ = new _JMQ();
})();

JMQ.init().setLeftMsgNum(3).setFriendName("靳义").setOnlineType("4G在线").addMsgTime("18:32");
JMQ.setFriendHeadImg("src/jy.jpg");
JMQ.addSysMsg("对方撤回了一条消息");
JMQ.sendMsg("2048做完没\n儿砸");
JMQ.getMsg("还没，太难了").sendMsg("叫爸爸");
JMQ.addSysMsg("对方撤回了一条消息");
JMQ.getMsg("爸爸")
JMQ.addSysMsg("你撤回了一条消息");
JMQ.sendMsg("乖儿子");