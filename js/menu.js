
var menuArray = new Array('在线人数统计', '在线时长统计', '报表', '区域分布');
$(document).ready(function() {  
        $("#menu li").click(function() {  
					
            $(this).addClass("active").siblings().removeClass("active"); 
			var index = $(this).index();
			if(index < menuArray.length)
			{
				$(parent.frames["topFrame"].document).find("#topmenu").text(menuArray[index]);
			}
        });  
});  