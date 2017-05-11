$(document).ready(
	function(){
			//查询
			$("#searchbtn").click(function(){
				DoQuery();
				}
			);
	}
	
	//下拉框事件
);


function isNull(data){ 
	return (data == "" || data == undefined || data == null) ? true : false; 
}



function DoQuery(){
	var day = $(" #dayInfo ").val();
	var user = $("#userInfo").val();
	var ip = $("#ipInfo").val();
	var time = GetTimeVar();
	if(isNull(day) && isNull(user) && isNull(ip) && isNull(time))
		return;
	$.ajax(
		{
			cache : false,
			async : true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			url   : "./php/duration.php",
			type  :"POST",
			data  :{'time' : time, 'dayInfo' : day, 'userInfo' : user, 'ipInfo' : ip},
			success : function(data){
				//alert(data);
				$("#bodylist").empty();
				var json = eval(data); 
				$.each(json, function(index){
					//alert("sssss");
					var date = json[index].date;  
					var user = json[index].user;  
					var ip = json[index].ip;  
					var company = json[index].company;  
					var on_time = json[index].on_time;  
					//var user = json[index].user;
					
					user = user.split("'").join("");
					date = date.split("'").join("");
					ip = ip.split("'").join("");
					company = company.split("'").join("");
					on_time = on_time.split("'").join("");
					
					
					var newElement = ("<tr>" + "<td>" + 0 + "</td>"+"<td>" + date + "</td>"+ "<td>" + user + "</td>"+ "<td>" + ip + "</td>"+ "<td>" + company + "</td>" + "<td>" + on_time + "</td>" + "<td>" + user + "</td>" + "</tr>");
					//alert(newElement);
					$("#bodylist").append(newElement);
					
				})
			}
		}
	);
							
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
