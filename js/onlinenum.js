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


function GetUserVar(){
	var index = $("#usertype").get(0).selectedIndex;
	//alert(index);
	if(0 == index || 1 == index)
	{
		return index;
	}
}

$(window).load(function(){
	
	
	//alert(time);
	//alert(user);
	DoQuery();
    
});

$(document).ready(function(){
	$("#timevar").change(function(){
		//alert("change");
		DoQuery();
	});
	$("#usertype").change(function(){
		//alert("change");
		DoQuery();
	});
});


function DoQuery(){
	var time = GetTimeVar();
	var user = GetUserVar();
	//alert(time);
	//要执行的方法体
	$.ajax(
			{
			cache : false,
			async : true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			url   : "./php/onlinenum.php",
			type  :"POST",
			data  :{'time' : time, 'user' : user},
			success : function(data){
				//alert(data);
				//test();
				$("#onlinedetail").empty();
				var json = eval(data); 

				$.each(json, function(index){
					var action_date = json[index].action_date;  
					var jd_num = json[index].jd_num;  
					var yg_num = json[index].yg_num;  
					var tt_num = json[index].tt_num;  
					var dxgjs_num = json[index].dxgjs_num;  
					//var user = json[index].user;
					
					action_date = action_date.split("'").join("");
					jd_num = jd_num.split("'").join("");
					yg_num = yg_num.split("'").join("");
					tt_num = tt_num.split("'").join("");
					dxgjs_num = dxgjs_num.split("'").join("");
					
					if(index % 2 == 0)
						var newElement = ("<tr>" + "<td>" + 0 + "</td>"+"<td>" + action_date + "</td>"+ "<td>" + jd_num + "</td>"+ "<td>" + yg_num + "</td>"+ "<td>" + tt_num + "</td>" + "<td>" + dxgjs_num + "</td>" + "</tr>");
					else
						var newElement = ("<tr>" + "<td>" + 0 + "</td>"+"<td>" + action_date + "</td>"+ "<td>" + jd_num + "</td>"+ "<td>" + yg_num + "</td>"+ "<td>" + tt_num + "</td>" + "<td>" + dxgjs_num + "</td>" + "</tr>");
					//alert(newElement);
					$("#onlinedetail").append(newElement);
					
				})
			}
		}
	);
}


