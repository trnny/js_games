(function(){
	quz = new Array();
	key = new Array();
	
	quz[0] = {11:8,14:6,16:2,17:9,19:4,26:7,28:6,29:3,33:6,35:8,37:7,41:7,43:3,45:4,47:2,49:8,52:2,58:4,61:5,63:8,65:9,67:3,69:1,73:4,75:1,77:6,81:2,82:3,84:9,91:6,93:5,94:3,96:4,99:9};
	key[0] = "857632914492157863316489725763541298129873546548296371984715632231968457675324189";
	quz[1] = {11:1,14:9,16:4,18:3,19:7,23:7,24:5,26:1,27:2,29:4,35:3,38:5,41:7,48:6,49:5,53:1,54:2,56:6,57:8,61:3,62:9,69:2,72:7,75:2,81:6,83:9,84:3,86:5,87:7,91:2,92:5,94:1,96:8,99:6};
	key[1] = "125984637937561284468732159782413965541296873396857412873629541619345728254178396";
	quz[2] = {12:4,15:7,18:9,26:9,27:4,29:5,31:7,34:4,36:1,38:6,39:3,41:9,42:5,45:3,48:1,49:7,53:1,57:3,61:8,62:7,65:6,68:5,69:2,71:4,72:8,74:5,76:3,79:6,81:1,83:5,84:6,92:3,95:2,98:4};
	key[2] = "542376198316289475798451263954832617261795384873164952489513726125647839637928541";
	quz[3] = {11:4,12:6,14:8,16:5,19:3,23:3,25:7,32:7,33:5,34:9,36:1,38:6,42:8,43:4,48:7,51:9,54:7,56:6,59:1,62:3,67:6,68:5,72:9,74:4,76:2,77:8,78:3,85:8,87:5,91:3,94:5,96:9,98:2,99:7};
	key[3] = "469825713813674295275931468684153972952746381731298654597412836126387549348569127";
	quz[4] = {11:4,15:7,19:5,23:7,24:4,26:9,27:6,29:2,36:5,37:8,38:4,41:8,43:5,45:6,47:7,49:9,52:9,58:6,61:7,63:1,65:2,67:3,69:8,72:8,73:9,74:2,81:1,83:4,84:8,86:6,87:2,91:6,95:3,99:4};
	key[4] = "438672195517489632926315847845163729293758461761924358389247516154896273672531984";
	quz[5] = {11:6,15:3,21:3,22:5,24:9,26:1,28:7,32:9,33:8,34:7,36:6,37:5,41:2,42:6,48:5,53:4,54:2,56:8,57:7,62:8,68:3,69:1,73:5,74:6,76:3,77:1,78:2,82:2,84:4,86:7,88:8,89:6,95:8,99:5};
	key[5] = "617835492352941678498726513261379854534218769789564231845693127123457986976182345";
	key[6] = "984617532537284196612593784295731468143869275876452319428176953759328641361945827";
	key[7] = "279451683851639247436287951987526134315894762624173598143765829598312476762948315";
	key[8] = "219873654853164792746295381187539246934627518625481937392748165578316429461952873";
	return this;
})();

window.onload = function(){  //debug代码一律在此添加!!!!
	lev = 4;
	condition = "doing";
	times = 0;
	initQuz(lev);
	beaut();
	//box(35).BlockInspection();
};

function box(n){  //坐标
	n += '';
	this.o = document.getElementById('b_'+n[0]+'_'+n[1]);
	var arg = n;
	var crd = LatticeOrCoordinate(n);
	this.o.crd = crd;
	this.o.arg = arg;
	this.o.maybe = '';
	
	var Inspection = function(){
		if(this.value || condition == "done"){
			return this;
		}
		var m = "123456789";
		for(var i = 1;i<10;i++){
			if(box(this.arg[0] + i).value){
				m = m.delchar(box(this.arg[0]+i).value);
			}
			if(box(i + this.arg[1]).value){
				m = m.delchar(box(i + this.arg[1]).value);
			}
			if(box(LatticeOrCoordinate(this.crd[0]+i)).value){
				m = m.delchar(box(LatticeOrCoordinate(this.crd[0]+i)).value);
			}
		}
		if(m.length == 1){
			this.Set(m);
			document.getElementById("progressbox").innerHTML += "<p class='find'>确定了("+arg[0] + "," + arg[1] + ")的值为 " + m + "</p>";
		}else if(m.length == 0){
			condition = "Error";
			console.log("题目有误，请确认!"+this.arg);
		}else{
			this.maybe = m;
			document.getElementById("progressbox").innerHTML += "<p>("+arg[0] + "," + arg[1] + ")" + " maybe " + this.maybe + "</p>";
		}
		return this;
	}
	
	var BlockInspection = function(){  //找出该九格中确定可能的数
		if(this.value || condition == "done"){
			return this;
		}
		var mt = this.maybe;
		var b = LatticeOrCoordinate(this.arg)[0];  //所在大九格数;
		for(var j = 1;j<10;j++){
			if(j != LatticeOrCoordinate(this.arg)[1]){  
				var m = "123456789";
				var a =LatticeOrCoordinate( b + j);  //b + j 35 为九格 a 为坐标 76  78  18
				if(!box(a).value){
					for(var i = 1;i<10;i++){
						if(box(a[0] + i).value){
							m = m.delchar(box(a[0]+i).value);
							//mt = mt.delchar(box(a[0]+i).value);
						}
						if(box(i + a[1]).value){
							m = m.delchar(box(i + a[1]).value);
							//mt = mt.delchar(box(i + a[1]).value);
						}
						if(box(LatticeOrCoordinate(b + i)).value){
							m = m.delchar(box(LatticeOrCoordinate(b + i)).value);
							mt = mt.delchar(box(LatticeOrCoordinate(b + i)).value);
						}
					}
					//console.log(a + " maybe " + m);
					if(m.length == 1){
						box(a).Set(m);
						document.getElementById("progressbox").innerHTML += "<p class='find'>(中级)确定了("+a[0] + "," + a[1] + ")的值为 " + m + "</p>";
					}else{
						mt = mt.addchar(m).delsame(m);
						//document.getElementById("progressbox").innerHTML += "<p>("+a[0] + "," + a[1] + ")" + " maybe " + m + "</p>";
					}
				}else{
					mt = mt.delchar(box(a).value);
				}
			}
		}
		if(mt.length == 1){
			this.Set(mt);
			console.log(this.arg + " is " +mt);
		}
		
		return this;
	}
	
	var Set = function(num){
		this.readOnly = false;
		this.value = num;
		this.style.color = "#00ff7f";
		return this;
	}
	
	this.o.Inspection = Inspection;
	this.o.BlockInspection = BlockInspection;
	this.o.Set = Set;
	return this.o;
}

function LatticeOrCoordinate(n){  //切换坐标和九宫格 coordinate lattice
	n += '';
	var m = '';
	m += (parseInt((n[0]-1)/3)*3 + Math.ceil(n[1]/3));
	m += ((n[0]-1)%3*3 + (n[1]-1)%3 +1);
	return m;
}

function initQuz(a){
	sodukuClear();
	if(quz.length > a){
		var q = quz[a]
		for (var n in q) {
			var te = new box(n);
			te.value = q[n];
			te.maybe = "";
			te.readOnly = true;
			te.style.color = "#000";
		}
	}
}

String.prototype.delchar = function(c){
	return this.replace(c,'');
}

String.prototype.delsame = function(c){
	var tep = this;
	for(var i =0;i<c.length;i++){
		tep = tep.replace(c[i],'');
	}
	return tep;
}

String.prototype.addchar = function(c){
	var tep = this;
	for(var i =0;i<c.length;i++){
		if(tep.indexOf(c[i]) == -1) tep += c[i];
	}
	return tep;
}

function inspect(){
	if(key.length > lev){
		var ind = 0;
		var k = key[lev];
		for(var i=1;i<10;i++){
			for(var j=1;j<10;j++){
				if(box(i+''+j).value == k[ind]) ind++;
				else return false;
			}
		}
		condition = "done";
		console.log("完成！共计尝试" + times + "次");
		return true;
	}else{
		return "未添加答案，自行检查";
	}
}

function attempt(){
	//inspect();
	if(condition == "doing"){
		times ++;
		document.getElementById("progressbox").innerHTML += "<p class='attempt'>第" + times + "次的尝试:</p>";
		var maybe = new Array();
		for(var i = 1;i<10;i++){
			for(var j = 1;j<10;j++){
				var n = '' + i + j;
				var te = new box(n);
				te.Inspection().BlockInspection();
			}
		}
	}else if(condition == "Error"){
		document.getElementById("progressbox").innerHTML += "<p class='error'>题目有误，请确认</p>"
	}else{
		alert("已经完成了");
	}
	
}

function beaut(){
	for(var i = 1;i<10;i+=2){
		for(var j=1;j<10;j++){
			box(LatticeOrCoordinate(i*10+j)).style.backgroundColor = "#f1f0f1";
		}
	}
}

function sodukuClear(){
	times = 0;
	condition = "doing";
	document.getElementById("progressbox").innerHTML = "";
	for(var i = 1;i<10;i++){
		for(var j=1;j<10;j++){
			var te = box(i*10+j);
			te.readOnly = false;
			te.value = '';
			te.style.color = "#ffa500";
		}
	}
}

function clean(){
	initQuz(lev);
	console.log(lev);
}

function nextlev(){
	lev++;
	initQuz(lev);
	console.log(lev);
}

function prevlev(){
	if(lev > 0){
		lev--;
		initQuz(lev);
	}
}