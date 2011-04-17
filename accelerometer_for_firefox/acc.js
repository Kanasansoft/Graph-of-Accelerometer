var initial=function(){

	var size=10000;

	var $=function(id){return document.getElementById(id);};
	var pow=Math.pow;

	var basedtm=new Date().getTime();
	var predtm=new Date().getTime();

	var valuex=$("valuex");
	var valuey=$("valuey");
	var valuez=$("valuez");
	var valueacc=$("valueacc");
	var interval=$("interval");

	var svg=$("svg");
	var svgx=$("svgx");
	var svgy=$("svgy");
	var svgz=$("svgz");
	var svgacc=$("svgacc");
	var upperline=$("upperline");
	var middleline=$("middleline");
	var lowerline=$("lowerline");

	var data=[];

	svg.setAttribute("viewBox",[-10000,-5000,10000,10000].join(" "));
	upperline .setAttribute("points","-10000,-2500 0,-2500");
	middleline.setAttribute("points","-10000,    0 0,    0");
	lowerline .setAttribute("points","-10000, 2500 0, 2500");

	window.addEventListener("MozOrientation",function(evt){

		var dtm=new Date().getTime();
		var x=evt.x;
		var y=evt.y;
		var z=evt.z;
		var acc=pow(pow(x,2)+pow(y,2)+pow(z,2),1/2);

		data.push({"x":x,"y":y,"z":z,"acc":acc,"dtm":dtm});

		valuex.textContent=x;
		valuey.textContent=y;
		valuez.textContent=z;
		valueacc.textContent=acc;
		interval.textContent=dtm-predtm;

		predtm=dtm;

	},false);

	setInterval(function(){

		var dtm=new Date().getTime();
		var diffdtm=dtm-basedtm;

		while(data.length!=0){
			if(data[0].dtm<=dtm-size*1){
				data.shift();
			}else{
				break;
			}
		}

		var aryx=[];
		var aryy=[];
		var aryz=[];
		var aryacc=[];
		data.forEach(function(obj){
			aryx.push(obj.dtm-dtm+","+Math.round(-obj.x*size/4));
			aryy.push(obj.dtm-dtm+","+Math.round(-obj.y*size/4));
			aryz.push(obj.dtm-dtm+","+Math.round(-obj.z*size/4));
			aryacc.push(obj.dtm-dtm+","+Math.round(-obj.acc*size/4));
		});
		svgx.setAttribute("points",aryx.join(" "));
		svgy.setAttribute("points",aryy.join(" "));
		svgz.setAttribute("points",aryz.join(" "));
		svgacc.setAttribute("points",aryacc.join(" "));

	},500);

};

window.addEventListener("load",initial,false);
