

$(document).ready(

	function(){
			//查询
			$("#showchart").click(
				function(){
					DoQuery();
				}
			);
			$("#timevar").change(function(){
				//alert("change");
				DoQuery();
			});
			
			
	}
	
)

function DoQuery(){
	var time = GetTimeVar();
	//alert(time);
	$.ajax(
		{
			cache : false,
			async : true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			url   : "./php/chart.php",
			type  :"POST",
			data  :{'time' : time},
			success : function(data){
				//alert(data);
				//test();
				$("#chartHours").empty();
				$("#canvasDiv").empty();
				
				var basicData = BuildBaicData(data);
				var sortjson = JsonSort(basicData, 'value');
				//alert(sortjson.length);
				sortjson.splice(0, 18)
				//alert(sortjson.length);
				
				Draw2DRectangle(basicData);
				//DrawPie(basicData);
				//DrawColumn2D(basicData);
				DrawPie2D(basicData);
				//Draw2DArea(BuildAreaData(data));
				
				var labels = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
				DrawLineBasic2D(BuildAreaData(data), labels);
			}
		}
	);
}


function BuildBaicData(data){
	var json = eval(data); 
	//var key = ['0-1Am', '2-3Am', '4-5Am', '6-7Am', '8-9Am', '10-11Am', '12-13Pm', '14-15Pm', '16-17Pm', '18-19Pm', '20-21Pm', '22-23Pm'];
	var key = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
	var value = getnum24(json);
	var jsonstr = "[]";
	var jsonarray = eval('('+jsonstr+')');
	for(var i = 0; i < key.length; ++i)
	{
		
		var jsonTemp = {"name":key[i], "value":value[i], color:getRandomColor()};
		jsonarray.push(jsonTemp);
	}
	return jsonarray;
	//alert(JsonSort(jsonarray, 'value'));
	
}

function BuildAreaData(data){
	
	/*
	var data = [
		{name : 'H',value : 7,color:'#a5c2d5'},
	   	{name : 'E',value : 5,color:'#cbab4f'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'O',value : 15,color:'#a56f8f'},
	   	{name : 'W',value : 13,color:'#c12c44'},
	   	{name : 'O',value : 15,color:'#a56f8f'},
	   	{name : 'R',value : 18,color:'#9f7961'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'D',value : 4,color:'#6f83a5'}
	 ];*/
	 /*
	 var data = [
					{
						name : 'A产品',
						value:[2680,2200,1014,2590,2800,3200,2184,3456,2693,2064,2414,2044],
						color:'#01acb6',
						line_width:2
					}
			   ];*/
			   
	var json = eval(data); 
	var value = getnum24(json);
	//alert(value);
	areadata = [
					{
						name : '在线时间段分布',
						value: value,
						color:'#01acb6',
						line_width:2
					}
				];
	
	return areadata;

}

function GetTimeVar(){
	var index = $("#timevar").get(0).selectedIndex;
	//alert(index);
	var days = -1;
	if(0 == index)
		days = 7;
	else if(1 == index)
		days = 15;
	else if(2 == index)
		days = 30;
	else if(3 == index)
		days = 183;
	//alert(days);
	if(-1 != days)
		return CalcTimestamp(days);
	
}


function CalcTimestamp(days){
	var time = '0';
	if(days > 0){
		//alert(days);
		var date = new Date();
		time = new Date(parseInt(date.getTime()) - days*1000*60*60*24).Format("yyyy-MM-dd hh:mm:ss");
		return time;
	}
}

function getnum24(data){
		var h ;
		var time_person = new Array(24);
		time_person.fill(0);
		var end  =  data.length;
		for(var i=0; i<end; i++){
			h = data[i].time.substr(0,2);
			
			switch( h ){
			case '00':
			time_person[0] += parseInt(data[i].num);
				break;
			case '01':
				time_person[1] += parseInt(data[i].num);
				break;
			case '02':
			time_person[2] += parseInt(data[i].num);
				break;
			case '03':
				time_person[3] += parseInt(data[i].num);
				break;
			case '04':
			time_person[4] += parseInt(data[i].num);
				break;
			case '05':
				time_person[5] += parseInt(data[i].num);
				break;
			case '06':
			time_person[6] += parseInt(data[i].num);
				break;
			case '07':
				time_person[7] += parseInt(data[i].num);
				break;
			case '08':
			time_person[8] += parseInt(data[i].num);
				break;
			case '09':
				time_person[9] += parseInt(data[i].num);
				break;
			case '10':
			time_person[10] += parseInt(data[i].num);
				break;
			case '11':
				time_person[11] += parseInt(data[i].num);
				break;
			case '12':
			time_person[12] += parseInt(data[i].num);
				break;
			case '13':
				time_person[13] += parseInt(data[i].num);
				break;
			case '14':
			time_person[14] += parseInt(data[i].num);
				break;
			case '15':
				time_person[15] += parseInt(data[i].num);
				break;
			case '16':
			time_person[16] += parseInt(data[i].num);
				break;
			case '17':
				time_person[17] += parseInt(data[i].num);
				break;
			case '18':
			time_person[18] += parseInt(data[i].num);
				break;
			case '19':
				time_person[19] += parseInt(data[i].num);
				break;
			case '20':
			time_person[20] += parseInt(data[i].num);
				break;
			case '21':
				time_person[21] += parseInt(data[i].num);
				break;
			case '22':
			time_person[22] += parseInt(data[i].num);
				break;
			case '23':
				time_person[23] += parseInt(data[i].num);
				break;
				default:
				break;
			}	
		}
		
		return time_person;
}
function getnum(data){
		var h ;
		var time_person = new Array(12);
		time_person.fill(0);
		var end  =  data.length;
		for(var i=0; i<end; i++){
			h = data[i].time.substr(0,2);
			
			switch( h ){
			case '00':
			case '01':
				time_person[0] += parseInt(data[i].num);
				break;
			case '02':
			case '03':
				time_person[1] += parseInt(data[i].num);
				break;
			case '04':
			case '05':
				time_person[2] += parseInt(data[i].num);
				break;
			case '06':
			case '07':
				time_person[3] += parseInt(data[i].num);
				break;
			case '08':
			case '09':
				time_person[4] += parseInt(data[i].num);
				
				break;
			case '10':
			case '11':
				time_person[5] += parseInt(data[i].num);
				break;
			case '12':
			case '13':
				time_person[6] += parseInt(data[i].num);
				break;
			case '14':
			case '15':
				time_person[7] += parseInt(data[i].num);
				break;
			case '16':
			case '17':
				time_person[8] += parseInt(data[i].num);
				break;
			case '18':
			case '19':
				time_person[9] += parseInt(data[i].num);
				break;
			case '20':
			case '21':
				time_person[10] += parseInt(data[i].num);
				break;
			case '22':
			case '23':
				time_person[11] += parseInt(data[i].num);
				break;
				default:
				break;
			}	
		}
		
		return time_person;
}


function DrawRectangle(data){
	//定义数据
	
	//alert(data);
	var chart = new iChart.Column2D({
			render : 'myrect',//渲染的Dom目标,canvasDiv为Dom的ID
			data: data,			//绑定数据
			
			title : {
				text : '在线时间段分布',
				color : '#3e576f'
			},
			footnote : {
				text : 'loveislove',
				color : '#909090',
				fontsize : 11,
				padding : '0 38'
			},
			width : 800,//设置宽度，默认单位为px
			height : 400,//设置高度，默认单位为px
			shadow:true,//激活阴影
			shadow_color:'#c7c7c7',//设置阴影颜色
			/*coordinate:{//配置自定义坐标轴
				scale:[{//配置自定义值轴
					 position:'left',//配置左值轴	
					 start_scale:0,//设置开始刻度为0
					 end_scale:26,//设置结束刻度为26
					 scale_space:1,//设置刻度间距
					 listeners:{//配置事件
						parseText:function(t,x,y){//设置解析值轴文本
						
							return {text:t+" cm"}
						}
					}
				}]
			}*/
		});
		
	 //利用自定义组件构造左侧说明文本。
	chart.plugin(new iChart.Custom({
			drawFn:function(){
				 //计算位置
				var coo = chart.getCoordinate(),
					x = coo.get('originx'),
					y = coo.get('originy'),
					H = coo.height;
					//在左侧的位置，渲染说明文字。
					chart.target.textAlign('center')
					.textBaseline('middle')
					.textFont('600 13px Verdana')
					.fillText('在线用户数',x-50,y+H/2,false,'#6d869f', false,false,false,-90);

			}
	}));
	
	chart.draw();
}

var getRandomColor = function(){    

	return  '#' +    
    (function(color){    
		return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
		&& (color.length == 6) ?  color : arguments.callee(color);    
	})('');    
} 


		function DrawPie(data){
			
	    	
			var chart = new iChart.Donut2D({
				render : 'mypie',
				center:{
					text:'CORE\nSKILLS',
					shadow:true,
					shadow_offsetx:0,
					shadow_offsety:2,
					shadow_blur:2,
					shadow_color:'#b7b7b7',
					color:'#6f6f6f'
				},
				data: data,
				offsetx:-60,
				shadow:true,
				//background_color:'#f4f4f4',
				separate_angle:10,//分离角度
				tip:{
					enable:true,
					showType:'fixed'
				},
				legend : {
					enable : true,
					shadow:true,
					background_color:null,
					border:false,
					legend_space:30,//图例间距
					line_height:34,//设置行高
					sign_space:10,//小图标与文本间距
					sign_size:10,//小图标大小
					color:'#6f6f6f',
					fontsize:20//文本大小
				},
				sub_option:{
					label:false,
					color_factor : 0.3
				},
				showpercent:true,
				decimalsnum:2,
				width : 430,
				height : 350,
				radius:140
			});

			/**
			 *利用自定义组件构造左侧说明文本。
			 */
			
		
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						/**
						 *计算位置
						 */	
						var y = chart.get('originy');
						/**
						 *在左侧的位置，设置竖排模式渲染文字。
						 */
						chart.target.textAlign('center')
						.textBaseline('middle')
						.textFont('300 14px 微软雅黑')
						.fillText('',100,y,false,'#6d869f', 'tb',26,false,0,'middle');
						
					}
			}));
			
			chart.draw();
		};
	

	
	
	function Draw2DRectangle(data){

			var chart = new iChart.Column2D({
				render : 'myrect',
				data : data,
				title : {
					text : '在线用户数最多的6个时间',
					color : '#3e576f'
				},
				subtitle : {
					text : '',
					color : '#6d869f'
				},
				footnote : {
					text : 'baidu.com',
					color : '#909090',
					fontsize : 11,
					padding : '0 38'
				},
				width : 460,
				height : 300,
				label : {
					fontsize:11,
					color : '#666666'
				},
				shadow : true,
				shadow_blur : 2,
				shadow_color : '#aaaaaa',
				shadow_offsetx : 1,
				shadow_offsety : 0,
				column_width : 20,
				sub_option : {
					listeners : {
						parseText : function(r, t) {
							return t;
						}
					},
					label : {
						fontsize:11,
						fontweight:600,
						color : '#4572a7'
					},
					border : {
						width : 2,
						//radius : '5 5 0 0',//上圆角设置
						color : '#ffffff'
					}
				},
				coordinate : {
					background_color : null,
					grid_color : '#c0c0c0',
					//width : 680,
					axis : {
						color : '#c0d0e0',
						width : [0, 0, 1, 0]
					},
					scale : [{
						position : 'left',
						start_scale : 0,
						//end_scale : 60,
						//scale_space : 10,
						scale_enable : false,
						label : {
							fontsize:11,
							color : '#666666'
						}
					}]
				}
			});
			
			/**
			 *利用自定义组件构造左侧说明文本。
			 */
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						/**
						 *计算位置
						 */	
						var coo = chart.getCoordinate(),
							x = coo.get('originx'),
							y = coo.get('originy'),
							H = coo.height;
						/**
						 *在左侧的位置，设置逆时针90度的旋转，渲染文字。
						 */
						chart.target.textAlign('center')
						.textBaseline('middle')
						.textFont('600 13px Verdana')
						.fillText('online time num....',x-40,y+H/2,false,'#6d869f', false,false,false,-90);
						
					}
			}));
			
			chart.draw();
		};
	
	
function Draw2DArea(data){
	/*
	var data = [
		{name : 'H',value : 7,color:'#a5c2d5'},
	   	{name : 'E',value : 5,color:'#cbab4f'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'O',value : 15,color:'#a56f8f'},
	   	{name : 'W',value : 13,color:'#c12c44'},
	   	{name : 'O',value : 15,color:'#a56f8f'},
	   	{name : 'R',value : 18,color:'#9f7961'},
	   	{name : 'L',value : 12,color:'#76a871'},
	   	{name : 'D',value : 4,color:'#6f83a5'}
	 ];*/
	 
	 
		//创建数据
		
		//创建x轴标签文本   
		//var labels = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		//var labels = ['6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24', '0-2', '2-4', '4-6'];
		var labels = ['0-1Am', '2-3Am', '4-5Am', '6-7Am', '8-9Am', '10-11Am', '12-13Pm', '14-15Pm', '16-17Pm', '18-19Pm', '20-21Pm', '22-23Pm'];
		var chart = new iChart.Area2D({
				render : 'canvasDiv',
				data: data,
				title:{
					text:'在线人数分布时间段',
					color:'#eff4f8',
					background_color:'#1c4156',
					height:40,
					border:{
						enable:true,
						width:[0,0,4,0],//只显示下边框
						color:'#173a4e'
					}
				},
				subtitle:{
					text:'单位:人数',//利用副标题设置单位信息
					fontsize:14,
					color:'#eff4f8',
					textAlign:'left',
					padding:'0 40',
					height:20
				},
				footnote:{
					text:'数据来源:企业数据中心',
					color:'#708794',
					padding:'0 20',
					background_color:'#102c3c',
					height:30,
					border:{
						enable:true,
						width:[3,0,0,0],//只显示上边框
						color:'#0f2b3a'
					}
				},
				padding:'5 1',//设置padding,以便title能占满x轴
				sub_option:{
					label:false,
					hollow_inside:false,//设置一个点的亮色在外环的效果
					point_size:10
				},
				tip:{
					enable:true,
					listeners:{
						 //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
						parseText:function(tip,name,value,text,i){
							return labels[i]+"人数: <span style='color:red'>"+value+"</span>";
						}
					}
				},
				width : 1000,
				height : 400,
				background_color:'#0c222f',
				gradient:true,
				shadow:true,
				shadow_blur:2,
				shadow_color:'#4e8bae',
				shadow_offsetx:0,
				shadow_offsety:0,
				gradient_mode:'LinearGradientDownUp',//设置一个从下到上的渐变背景
				border:{
					radius:5
				},
				coordinate:{
					width : 800,
					height : 240,
					grid_color:'#506e7d',
					background_color:null,//设置坐标系为透明背景
					scale:[{
						 position:'left',	
						 label:{
							 color:'#eff4f8',
							 fontsize:14,
							 fontweight:600
						 },
						 start_scale:0
						 //end_scale:4000,
						 //scale_space:500
					},{
						 position:'bottom',	
						 label:{
							 color:'#506673',
							 fontweight:600
						 },
						 labels:labels
					}]
				}
			});
		
		chart.draw();
	};
		
		
function DrawLineBasic2D(data, labels){
	/*
			var flow=[];
			for(var i=0;i<25;i++){
				flow.push(Math.floor(Math.random()*(10+((i%16)*5)))+10);
			}
			
			var data = [
			         	{
			         		name : 'PV',
			         		value:flow,
			         		color:'#ec4646',
			         		line_width:2
			         	}
			         ];
	        
			var labels = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
			*/
			var chart = new iChart.LineBasic2D({
				render : 'canvasDiv',
				data: data,
				align:'center',
				title : {
					text:'在线人数分布时间段',
					font : '微软雅黑',
					fontsize:24,
					color:'#b4b4b4'
				},
				subtitle : {
					text:'14:00-16:00访问量达到最大值',
					font : '微软雅黑',
					color:'#b4b4b4'
				},
				footnote : {
					text:'ichartjs.com',
					font : '微软雅黑',
					fontsize:11,
					fontweight:600,
					padding:'0 28',
					color:'#b4b4b4'
				},
				width : 1000,
				height : 400,
				shadow:true,
				shadow_color : '#202020',
				shadow_blur : 8,
				shadow_offsetx : 0,
				shadow_offsety : 0,
				background_color:'#ffffff',
				tip:{
					enable:true,
					shadow:true,
					listeners:{
						 //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
						parseText:function(tip,name,value,text,i){
							return "<span style='color:#005268;font-size:12px;'>"+labels[i]+":00访问量约:<br/>"+
							"</span><span style='color:#005268;font-size:20px;'>"+value+"人</span>";
						}
					}
				},
				crosshair:{
					enable:true,
					line_color:'#ec4646'
				},
				sub_option : {
					smooth : true,
					label:false,
					hollow:false,
					hollow_inside:false,
					point_size:8
				},
				coordinate:{
					width:900,
					height:260,
					striped_factor : 0.18,
					grid_color:'#4e4e4e',
					axis:{
						color:'#345678',
						width:[0,0,4,4]
					},
					scale:[{
						 position:'left',	
						 start_scale:0,
						 //end_scale:100,
						 //scale_space:10,
						 scale_size:1,
						 scale_enable : false,
						 label : {color:'#9d987a',font : '微软雅黑',fontsize:11,fontweight:600},
						 scale_color:'#9f9f9f'
					},{
						 position:'bottom',	
						 label : {color:'#9d987a',font : '微软雅黑',fontsize:11,fontweight:600},
						 scale_enable : false,
						 labels:labels
					}]
				}
			});
			//利用自定义组件构造左侧说明文本
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						//计算位置
						var coo = chart.getCoordinate(),
							x = coo.get('originx'),
							y = coo.get('originy'),
							w = coo.width,
							h = coo.height;
						//在左上侧的位置，渲染一个单位的文字
						chart.target.textAlign('start')
						.textBaseline('bottom')
						.textFont('600 11px 微软雅黑')
						.fillText('在线人数',x-40,y-12,false,'#9d987a')
						.textBaseline('top')
						.fillText('(时间)',x+w+12,y+h+10,false,'#9d987a');
						
					}
			}));
		//开始画图
		chart.draw();
	};
	
	
	function JsonSort(json,key){
    //console.log(json);
    for(var j=1,jl=json.length;j < jl;j++){
        var temp = json[j],
            val  = temp[key],
            i    = j-1;
        while(i >=0 && json[i][key]>val){
            json[i+1] = json[i];
            i = i-1;    
        }
        json[i+1] = temp;
        
    }
    //console.log(json);
    return json;
}


function DrawColumn2D(data){	
			
	    	
	    	//是否启用动画
			var animation = true;
	    	
			var chart = new iChart.Column2D({
				render : 'mypie',
				data: data,
				title : {
					text : 'This is a sample for Combination',
					color : '#3e576f'
				},
				subtitle : {
					text : 'Top 5 Sales Person,2011',
					color : '#6d869f'
				},
				footnote : {
					text : 'ichartjs.com',
					color : '#909090',
					fontsize : 11,
					padding : '0 38'
				},
				width : 900,
				height : 460,
				animation : animation,
				//animation_duration:600,
				shadow : true,
				shadow_blur : 2,
				shadow_color : '#aaaaaa',
				shadow_offsetx : 1,
				shadow_offsety : 0,
				//column_width : 68,
				label:{
					color:'#4c4f48'
				},
				sub_option:{
					label : {
						color : '#4c4f48'
					},
					listeners:{
						parseText:function(r,t){
							//自定义柱形图上方label的格式。
							return '$'+t+'k';
						}
					}
				},
				coordinate:{
					background_color : '#4a4b4f',
					grid_color : '#676a73',
					striped_factor:0.06,
					//height:'84%',
					//width:'84%',
					scale:[{
						 position:'left',	
						 start_scale:0,
						 //scale_space:10,
						 label:{
							color:'#4c4f48'
						 },
						 listeners:{
							parseText:function(t,x,y){
							//自定义左侧坐标系刻度文本的格式。
								return {text:'$'+t+'k'}
							}
						 }
					}]
				}
			});
			var pie = new iChart.Pie2D({
				data: data,
				label:{
					color:'#4c4f48'
				},
				sub_option:{
					mini_label_threshold_angle : 60,//迷你label的阀值,单位:角度
					mini_label:{//迷你label配置项
						fontsize:10,
						fontweight:600,
						color : '#ffffff'
					},
					label : {
						background_color:null,
						sign:false,//设置禁用label的小图标
						padding:'0 4',
						border:{
							enable:false,
							color:'#666666'
						},
						fontsize:10,
						fontweight:600,
						color : '#ffe383'
					},
					listeners:{
						parseText:function(d, t){
							return d.get('value');//自定义label文本
						}
					} 
				},
				text_space : 16,
				showpercent:true,
				decimalsnum:1,
				align : 'left',
				offsetx:chart.coo.get('originx')+30,
				offsety:-(chart.get('centery')-chart.coo.get('originy')-90),
				animation : animation,
				radius:30
			});
			
			chart.plugin(pie);
			
			 //利用自定义组件构造左侧说明文本。
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						 //计算位置
						var coo = chart.getCoordinate(),
							x = coo.get('originx'),
							y = coo.get('originy'),
							H = coo.height;
						//在左侧的位置，渲染说明文字。
						chart.target.textAlign('center')
						.textBaseline('middle')
						.textFont('600 13px Verdana')
						.fillText('Sales Figure',x-50,y+H/2,false,'#6d869f', false,false,false,-90);
						
					}
			}));

			chart.draw();
		}
		
function DrawPie2D(data){
			
	    	
			var chart = new iChart.Pie3D({
				render : 'mypie',
				data: data,
				title : {
					text : '在线人数最多的6个时间段占比',
					height:15,
					fontsize : 16,
					color : '#282828'
				},
				footnote : {
					text : 'baidu.com',
					color : '#486c8f',
					fontsize : 12,
					padding : '0 38'
				},
				sub_option : {
					mini_label_threshold_angle : 40,//迷你label的阀值,单位:角度
					mini_label:{//迷你label配置项
						fontsize:15,
						fontweight:300,
						color : '#ffffff'
					},
					label : {
						background_color:null,
						sign:true,//设置禁用label的小图标
						padding:'0 4',
						border:{
							enable:false,
							color:'#666666'
						},
						fontsize:11,
						fontweight:200,
						color : '#4572a7'
					},
					border : {
						width : 2,
						color : '#ffffff'
					},
					listeners:{
						parseText:function(d, t){
							return d.get('value')+"%";//自定义label文本
						}
					} 
				},
				legend:{
					enable:true,
					padding:0,
					offsetx:20,
					offsety:10,
					color:'#3e576f',
					fontsize:20,//文本大小
					sign_size:16,//小图标大小
					line_height:28,//设置行高
					sign_space:10,//小图标与文本间距
					border:false,
					align:'left',
					background_color : null//透明背景
				}, 
				shadow : false,
				shadow_blur : 6,
				shadow_color : '#aaaaaa',
				shadow_offsetx : 0,
				shadow_offsety : 0,
				//background_color:'#f1f1f1',
				align:'right',//右对齐
				offsetx:-100,//设置向x轴负方向偏移位置60px
				offsety:20,//
				offset_angle:-90,//逆时针偏移120度
				width : 460,
				height : 300,
				radius:120
			});
			//利用自定义组件构造右侧说明文本
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						//在右侧的位置，渲染说明文字
						chart.target.textAlign('start')
						.textBaseline('top')
						.textFont('600 20px Verdana')
						.fillText('',120,80,false,'#be5985',false,24)
						.textFont('600 12px Verdana')
						.fillText('Source:ComScore,2012',120,160,false,'#999999');
					}
			}));
			
			chart.draw();
		}
		