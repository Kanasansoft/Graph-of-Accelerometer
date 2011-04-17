var initial=function(){

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

	window.addEventListener("devicemotion",function(evt){

		var gravity=evt.accelerationIncludingGravity;

		var dtm=new Date().getTime();
		var x=gravity.x;
		var y=gravity.y;
		var z=gravity.z;
		var acc=pow(pow(x,2)+pow(y,2)+pow(z,2),1/2);

		data.push({"x":x,"y":y,"z":z,"acc":acc,"dtm":dtm});

		valuex.textContent=x;
		valuey.textContent=y;
		valuez.textContent=z;
		valueacc.textContent=acc;
		interval.textContent=dtm-predtm;

		predtm=dtm;

		var diffdtm=dtm-basedtm;

		svg.setAttribute("viewBox",[diffdtm-10000,-5000,10000,10000].join(" "));
		upperline .setAttribute("points",diffdtm-10000+",-2500 "+diffdtm+" -2500");
		middleline.setAttribute("points",diffdtm-10000+    ",0 "+diffdtm+    " 0");
		lowerline .setAttribute("points",diffdtm-10000+ ",2500 "+diffdtm+ " 2500");

		var aryx=[];
		var aryy=[];
		var aryz=[];
		var aryacc=[];
		data.forEach(function(obj){
			aryx.push(obj.dtm-basedtm+","+Math.round(-obj.x*250));
			aryy.push(obj.dtm-basedtm+","+Math.round(-obj.y*250));
			aryz.push(obj.dtm-basedtm+","+Math.round(-obj.z*250));
			aryacc.push(obj.dtm-basedtm+","+Math.round(-obj.acc*250));
		});
		svgx.setAttribute("points",aryx.join(" "));
		svgy.setAttribute("points",aryy.join(" "));
		svgz.setAttribute("points",aryz.join(" "));
		svgacc.setAttribute("points",aryacc.join(" "));

		while(data.length!=0){
			if(data[0].dtm<=dtm-10000){
				data.shift();
			}else{
				break;
			}
		}

	},false);

};

window.addEventListener("load",initial,false);
