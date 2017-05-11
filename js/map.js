/*!
 * SVG Map
 * @version v1.0.2
 * @author  Rocky(rockyuse@163.com)
 * @date    2014-01-16
 *
 * (c) 2012-2013 Rocky, http://rockydo.com
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://creativecommons.org/licenses/LGPL/2.1/
 */


;!function (win, $, undefined) {
	var SVGMap = (function () {
		function SVGMap(dom, options) {
			this.dom = dom;
			this.setOptions(options);
			this.render();
		}
		SVGMap.prototype.options = {
			mapName: 'china',
			mapWidth: 500,
			mapHeight: 400,
			stateColorList: ['ff5b26', 'ff9116', 'ffd914', '2a73aa', '29ac80'],
			stateDataAttr: ['stateInitColor', 'stateHoverColor', 'stateSelectedColor', 'baifenbi'],
			stateDataType: 'json',
			stateSettingsXmlPath: '',
			stateData: {},

			strokeWidth: 1,
			strokeColor: 'F9FCFE',

			stateInitColor: 'AAD5FF',
			stateHoverColor: 'feb41c',
			stateSelectedColor: 'E32F02',
			stateDisabledColor: 'eeeeee',

			showTip: true,
			stateTipWidth: 100,
			//stateTipHeight: 50,
			stateTipX: 0,
			stateTipY: -10,
			stateTipHtml: function (stateData, obj) {
				return obj.name;
			},

			hoverCallback: function (stateData, obj) {},
			clickCallback: function (stateData, obj) {},
			external: false
		};

		SVGMap.prototype.setOptions = function (options) {
			if (options == null) {
				options = null;
			}
			this.options = $.extend({}, this.options, options);
			return this;
		};

		SVGMap.prototype.scaleRaphael = function (container, width, height) {
			var wrapper = document.getElementById(container);
			if (!wrapper.style.position) wrapper.style.position = "relative";
			wrapper.style.width = width + "px";
			wrapper.style.height = height + "px";
			wrapper.style.overflow = "hidden";
			var nestedWrapper;
			if (Raphael.type == "VML") {
				wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup_" + container + "'><\/rvml:group>";
				nestedWrapper = document.getElementById("vmlgroup_" + container);
			} else {
				wrapper.innerHTML = '<div class="svggroup"></div>';
				nestedWrapper = wrapper.getElementsByClassName("svggroup")[0];
			}
			var paper = new Raphael(nestedWrapper, width, height);
			var vmlDiv;
			if (Raphael.type == "SVG") {
				paper.canvas.setAttribute("viewBox", "0 0 " + width + " " + height);
			} else {
				vmlDiv = wrapper.getElementsByTagName("div")[0];
			}
			paper.changeSize = function (w, h, center, clipping) {
				clipping = !clipping;
				var ratioW = w / width;
				var ratioH = h / height;
				var scale = ratioW < ratioH ? ratioW : ratioH;
				var newHeight = parseInt(height * scale);
				var newWidth = parseInt(width * scale);
				if (Raphael.type == "VML") {
					var txt = document.getElementsByTagName("textpath");
					for (var i in txt) {
						var curr = txt[i];
						if (curr.style) {
							if (!curr._fontSize) {
								var mod = curr.style.font.split("px");
								curr._fontSize = parseInt(mod[0]);
								curr._font = mod[1];
							}
							curr.style.font = curr._fontSize * scale + "px" + curr._font;
						}
					}
					var newSize;
					if (newWidth < newHeight) {
						newSize = newWidth * 1000 / width;
					} else {
						newSize = newHeight * 1000 / height;
					}
					newSize = parseInt(newSize);
					nestedWrapper.style.width = newSize + "px";
					nestedWrapper.style.height = newSize + "px";
					if (clipping) {
						nestedWrapper.style.left = parseInt((w - newWidth) / 2) + "px";
						nestedWrapper.style.top = parseInt((h - newHeight) / 2) + "px";
					}
					vmlDiv.style.overflow = "visible";
				}
				if (clipping) {
					newWidth = w;
					newHeight = h;
				}
				wrapper.style.width = newWidth + "px";
				wrapper.style.height = newHeight + "px";
				paper.setSize(newWidth, newHeight);
				if (center) {
					wrapper.style.position = "absolute";
					wrapper.style.left = parseInt((w - newWidth) / 2) + "px";
					wrapper.style.top = parseInt((h - newHeight) / 2) + "px";
				}
			};
			paper.scaleAll = function (amount) {
				paper.changeSize(width * amount, height * amount);
			};
			paper.changeSize(width, height);
			paper.w = width;
			paper.h = height;
			return paper;
		};

		SVGMap.prototype.render = function () {
			var opt = this.options,
				_self = this.dom,
				mapName = opt.mapName,
				mapConfig = eval(mapName + 'MapConfig');

			var stateData = {};

			if (opt.stateDataType == 'xml') {
				var mapSettings = opt.stateSettingsXmlPath;
				$.ajax({
					type: 'GET',
					url: mapSettings,
					async: false,
					dataType: $.browser.msie ? 'text' : 'xml',
					success: function (data) {
						var xml;
						if ($.browser.msie) {
							xml = new ActiveXObject('Microsoft.XMLDOM');
							xml.async = false;
							xml.loadXML(data);
						} else {
							xml = data;
						}
						var $xml = $(xml);
						$xml.find('stateData').each(function (i) {
							var $node = $(this),
								stateName = $node.attr('stateName');

							stateData[stateName] = {};
							// var attrs = $node[0].attributes;
							// alert(attrs);
							// for(var i in attrs){
							//     stateData[stateName][attrs[i].name] = attrs[i].value;
							// }
							for (var i = 0, len = opt.stateDataAttr.length; i < len; i++) {
								stateData[stateName][opt.stateDataAttr[i]] = $node.attr(opt.stateDataAttr[i]);
							}
						});
					}
				});
			} else {
				stateData = opt.stateData;
			};

			var offsetXY = function (e) {
					var mouseX, mouseY, tipWidth = $('.stateTip').outerWidth(),
						tipHeight = $('.stateTip').outerHeight();
					if (e && e.pageX) {
						mouseX = e.pageX;
						mouseY = e.pageY;
					} else {
						mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					mouseX = mouseX - tipWidth / 2 + opt.stateTipX < 0 ? 0 : mouseX - tipWidth / 2 + opt.stateTipX;
					mouseY = mouseY - tipHeight + opt.stateTipY < 0 ? mouseY - opt.stateTipY : mouseY - tipHeight + opt.stateTipY;
					return [mouseX, mouseY];
				};

			var current, reTimer;

			var r = this.scaleRaphael(_self.attr('id'), mapConfig.width, mapConfig.height),
				attributes = {
					fill: '#' + opt.stateInitColor,
					cursor: 'pointer',
					stroke: '#' + opt.strokeColor,
					'stroke-width': opt.strokeWidth,
					'stroke-linejoin': 'round'
				};

			var stateColor = {};

			for (var state in mapConfig.shapes) {
				var thisStateData = stateData[state],
					initColor = '#' + (thisStateData && opt.stateColorList[thisStateData.stateInitColor] || opt.stateInitColor),
					hoverColor = '#' + (thisStateData && thisStateData.stateHoverColor || opt.stateHoverColor),
					selectedColor = '#' + (thisStateData && thisStateData.stateSelectedColor || opt.stateSelectedColor),
					disabledColor = '#' + (thisStateData && thisStateData.stateDisabledColor || opt.stateDisabledColor);

				stateColor[state] = {};

				stateColor[state].initColor = initColor;
				stateColor[state].hoverColor = hoverColor;
				stateColor[state].selectedColor = selectedColor;

				var obj = r.path(mapConfig['shapes'][state]);
				obj.id = state;
				obj.name = mapConfig['names'][state];
				obj.attr(attributes);

				if (opt.external) {
					opt.external[obj.id] = obj;
				}

				if (stateData[state] && stateData[state].diabled) {
					obj.attr({
						fill: disabledColor,
						cursor: 'default'
					});
				} else {
					obj.attr({
						fill: initColor
					});

					obj.hover(function (e) {
						if (this != current) {
							this.animate({
								fill: stateColor[this.id].hoverColor
							}, 250);
						}
						if (opt.showTip) {
							clearTimeout(reTimer);
							if ($('.stateTip').length == 0) {
								$(document.body).append('<div class="stateTip"></div');
							}
							$('.stateTip').html(opt.stateTipHtml(stateData, this));
							var _offsetXY = new offsetXY(e);

							$('.stateTip').css({
								width: opt.stateTipWidth || 'auto',
								height: opt.stateTipHeight || 'auto',
								left: _offsetXY[0],
								top: _offsetXY[1]
							}).show();
						}

						opt.hoverCallback(stateData, this);
					});
/*www.198zone.com 代码笔记*/
					obj.mouseout(function () {
						if (this != current) {
							this.animate({
								fill: stateColor[this.id].initColor
							}, 250);
						}
						// $('.stateTip').hide();
						if (opt.showTip) {
							reTimer = setTimeout(function () {
								$('.stateTip').remove();
							}, 100);
						}
					});

					obj.mouseup(function (e) {
						if (current) {
							current.animate({
								fill: stateColor[current.id].initColor
							}, 250);
						}

						this.animate({
							fill: stateColor[this.id].selectedColor
						}, 250);

						current = this;
						opt.clickCallback(stateData, this);
					});
				}
				r.changeSize(opt.mapWidth, opt.mapHeight, false, false);
			}
			document.body.onmousemove = function (e) {
				var _offsetXY = new offsetXY(e);
				$('.stateTip').css({
					left: _offsetXY[0],
					top: _offsetXY[1]
				});
			};
		}
		return SVGMap;
	})();

	$.fn.SVGMap = function (opts) {
		var $this = $(this),
			data = $this.data();

		if (data.SVGMap) {
			delete data.SVGMap;
		}
		if (opts !== false) {
			data.SVGMap = new SVGMap($this, opts);
		}
		return data.SVGMap;
	};
}(window, jQuery);


$(window).load(function(){
	DoQuery();    
});


$(document).ready(
		function(){
		$("#timevar").change(function(){
				DoQuery();
		});
});


function DrawTip(data){
	$('#MapControl .list1').empty();
	$('#MapControl .list2').empty();
	$('#MapControl .list3').empty();
	var i = 1;
	
	for(k in data){
		var color = data[k].stateInitColor;
		var stateColorList = ['ff5b26', 'ff9116', 'ffd914', '2a73aa', '29ac80'];
		var styleclr = 'background-color:#' + stateColorList[color];
		//alert(styleclr);
		if(i <= 12){
			//var _cls = i < 4 ? 'active' : '';
			$('#MapControl .list1').append('<li name="'+k+'"><div class="mapInfo"><i style="'+styleclr+'">'+(i++)+'</i><span>'+chinaMapConfig.names[k]+'</span><b>'+data[k].value+'</b></div></li>')
		}else if(i <= 24){
			$('#MapControl .list2').append('<li name="'+k+'"><div class="mapInfo"><i style="'+styleclr+'">'+(i++)+'</i><span>'+chinaMapConfig.names[k]+'</span><b>'+data[k].value+'</b></div></li>')
			//$('#MapControl .list2').append('<li name="'+k+'"><div class="mapInfo"><i>'+(i++)+'</i><span>'+chinaMapConfig.names[k]+'</span><b>'+data[k].value+'</b></div></li>')
		}else{
			$('#MapControl .list3').append('<li name="'+k+'"><div class="mapInfo"><i style="'+styleclr+'">'+(i++)+'</i><span>'+chinaMapConfig.names[k]+'</span><b>'+data[k].value+'</b></div></li>')
			//$('#MapControl .list3').append('<li name="'+k+'"><div class="mapInfo"><i>'+(i++)+'</i><span>'+chinaMapConfig.names[k]+'</span><b>'+data[k].value+'</b></div></li>')
		}
	}
}

function DrawMap(data){
		var newData = CalcData(data);
		DrawTip(newData);
		$('#RegionMap').empty();
        var mapObj_1 = {};
        var stateColorList = ['ff5b26', 'ff9116', 'ffd914', '2a73aa', '29ac80'];
		//stateColorList: ['ff5b26', 'ff9116', 'ffd914', '2a73aa', '29ac80'];
		
        $('#RegionMap').SVGMap({
            external: mapObj_1,
            mapName: 'china',
            mapWidth: 450,
            mapHeight: 350,
            stateData: newData,
            //stateTipWidth: 118,
            //stateTipHeight: 47,
            //stateTipX: 2,
            //stateTipY: 0,
            stateTipHtml: function (mapData, obj) {
                var _value = mapData[obj.id].value;
                var _idx = mapData[obj.id].index;
                var active = '';
                _idx < 4 ? active = 'active' : active = '';
				
                var tipStr = '<div class="mapInfo"><i class="' + active + '">' + _idx + '</i><span>' + obj.name + '</span><b>' + _value + '</b></div>';
                //alert(tipStr);
				return tipStr;
            }
        });
		
		
        $('#MapControl li').hover(function () {
            var thisName = $(this).attr('name');
             
            var thisHtml = $(this).html();
            $('#MapControl li').removeClass('select');
            $(this).addClass('select');
            $(document.body).append('<div id="StateTip"></div');
			//alert($(document.body).html());
			//alert($(mapObj_1[thisName].node).offset().left - 50);
            $('#StateTip').css({
                left: $(mapObj_1[thisName].node).offset().left - 50,
                top: $(mapObj_1[thisName].node).offset().top - 40
            }).html(thisHtml).show();
            mapObj_1[thisName].attr({
                fill: '#ff0000'
            });
        }, function () {
            var thisName = $(this).attr('name');
            $('#StateTip').remove();
            $('#MapControl li').removeClass('select');
            mapObj_1[$(this).attr('name')].attr({
                fill: "#" + stateColorList[newData[$(this).attr('name')].stateInitColor]
            });
        });
        
		
        $('#MapColor').show();
}



function CalcData(json)
{
	var datamap = {
				"jiangsu":"1",
				"henan":"2",
				"anhui":"3",
				"zhejiang":"4",
				"liaoning":"5",
				"beijing":"6",
				"hubei":"7",
				"jilin":"8",
				"shanghai":"9",
				"guangxi":"10",
				"sichuan":"11",
				"guizhou":"12",
				"hunan":"13",
				"shandong":"14",
				"guangdong":"15",
				"jiangxi":"16",
				"fujian":"17",
				"yunnan":"18",
				"hainan":"19",
				"shanxi":"20",
				"hebei":"21",
				"neimongol":"22",
				"tianjin":"23",
				"gansu":"24",
				"shaanxi":"25",
				"macau":"26",
				"hongkong":"27",
				"taiwan":"28",
				"qinghai":"29",
				"xizang":"30",
				"ningxia":"31",
				"xinjiang":"32",
				"heilongjiang":"33",
				"chongqing":"34"};
				
	var sortBy = function (filed, reverse, primer) {  
		reverse = (reverse) ? -1 : 1;  
		return function (a, b) {  
			a = a[filed];  
			b = b[filed];  
	  
			if (typeof (primer) != "undefined") {  
				a = primer(a);  
				b = primer(b);  
			}  
	  
			if (a < b) {  
				return reverse * -1;  
			}  
			if (a > b) {  
				return reverse * 1;  
			}  
		}  
	}  
	
	json.sort(sortBy('count', true, parseInt));
	
	var total = 0;
	for(var i = 0; i < json.length; ++i){
		total += json[i].count;
	}
	
	var newjson = [];
	var taget = new Object();
	for(var i = 0; i < json.length; ++i){
		
		percent = (json[i].count / total).toFixed(2);
		
		targetdata = new Object();
		targetdata.value = percent;
		//省份的名称
		var temp = json[i].name;
		targetdata.index = datamap[temp];
		if(i<5)
		{
			targetdata.stateInitColor = "0";
		}
		else if(i < 10)
		{
			targetdata.stateInitColor = "1";
		}
		else if(i<15)
		{
			targetdata.stateInitColor = "2";
		}
		else if(i<20)
		{
			targetdata.stateInitColor = "3";
		}
		else
		{
			targetdata.stateInitColor = "4";
		}
		//alert(targetdata.index);
		//alert(targetdata.value);
		//alert(targetdata.stateInitColor);
		taget[temp] = targetdata;
	}
	
	return taget;
}


function randomInt(){
	return Math.floor(Math.random()*1000);
}
function DoQuery(){
	var time = GetTimeVar();
	//alert(time);
	$.ajax(
		{
			cache : false,
			async : true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			url   : "./php/map.php",
			type  :"POST",
			data  :{'time' : time},
			success : function(data){
				//alert(data);
				var jsondata =[
								{"name":'jiangsu', "count":randomInt()},
								{"name":'henan', "count":randomInt()},
								{"name":'anhui', "count":randomInt()},
								{"name":'zhejiang', "count":randomInt()},
								{"name":'liaoning', "count":randomInt()},
								{"name":'beijing', "count":randomInt()},
								{"name":'hubei', "count":randomInt()},
								{"name":'jilin', "count":randomInt()},
								{"name":'shanghai', "count":randomInt()},
								{"name":'guangxi', "count":randomInt()},
								{"name":'sichuan', "count":randomInt()},
								{"name":'guizhou', "count":randomInt()},
								{"name":'hunan', "count":randomInt()},
								{"name":'shandong', "count":randomInt()},
								{"name":'guangdong', "count":randomInt()},
								{"name":'jiangxi', "count":randomInt()},
								{"name":'fujian', "count":randomInt()},
								{"name":'yunnan', "count":randomInt()},
								{"name":'fujian', "count":randomInt()},
								{"name":'hainan', "count":randomInt()},
								{"name":'shanxi', "count":randomInt()},
								{"name":'hebei', "count":randomInt()},
								{"name":'neimongol', "count":randomInt()},
								{"name":'tianjin', "count":randomInt()},
								{"name":'gansu', "count":randomInt()},
								{"name":'shaanxi', "count":randomInt()},
								{"name":'macau', "count":randomInt()},
								{"name":'hongkong', "count":randomInt()},
								{"name":'taiwan', "count":randomInt()},
								{"name":'qinghai', "count":randomInt()},
								{"name":'xizang', "count":randomInt()},
								{"name":'ningxia', "count":randomInt()},
								{"name":'xinjiang', "count":randomInt()},
								{"name":'heilongjiang', "count":randomInt()},
								{"name":'chongqing', "count":randomInt()}
							];
				
				DrawMap(jsondata);
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

