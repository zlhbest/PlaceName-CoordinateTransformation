var datasuc = [];
var dataerr = [];
var sucdata = {};
var errdata = {};
var myGeo = new BMap.Geocoder();
var index=0;
var adds ;
var add;
var map;
var localsearch;
var geocode;
var zoomArr = [];
function Change(maptype,changetype,map,name)
{
	if(changetype==="name")
	{
		ChangeName(maptype,map,name);
	}
	else if(changetype==="location")
	{
		ChangeLocation(maptype,map,name);
	}
}
function ChangeLocation(maptype,map,location)
{
	switch (maptype)
	{
		case "baidu":
			BaiduChangeLocation(map,location);
			break;
		case "gaode":
			GaodeChangeLocation(map,location);
			break;
		case "tian":
			 TianChangeLocation(map,location);
		default:
		break;
	}
}
function ChangeName(maptype,map,name)
{
	switch (maptype)
	{
		case "baidu":
			BaiduChangeName(map,name);
			break;
		case "gaode":
			GaodeChangeName(map,name);
			break;
		case "tian":
			TianChangeName(map,name);
		default:
		break;
	}
}
function GaodeChangeLocation(map,location)
{
	datasuc = [];
	dataerr = [];
	adds = location;
	for(i=0;i<location.length;i++)
	{
		adds[i] = [location[i].split(",")[0],location[i].split(",")[1]];
	}
	map = map;
	gdGEOL(index,adds);	
}
function gdGEOL()
{
	var add = adds[index];
	setTimeout(function(){
		index++;
		gdGeocoderL(add,index);
		}, 500);
}
function gdGeocoderL(add,index)
{
	if(index<=adds.length)
	{
		var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });        
        geocoder.getAddress(add, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                geocoderl_CallBack(result,index,add);
            }
			else
			{
				adderrpoint(add[0]+","+add[1],index);
			}
        });        
        var marker = new AMap.Marker({  //加点
            map: map,
            position: add
        });
        map.setFitView();
		gdGEOL(index,adds);
	}
}
function geocoderl_CallBack(data,index,add) {
	var address = data.regeocode.formattedAddress; //返回地址描述
	var point = new Point(add[0],add[1]);
	addsucpoint(point,address,index);
    }
function GaodeChangeName(map,name)
{
	datasuc = [];
	dataerr = [];
	adds= name;
	map = map;
	gdGEO(index,adds);	
}
function gdGeocoder(name,index)
{
	if(index<=adds.length)
	{
		var geocoder = new AMap.Geocoder();
			geocoder.getLocation(name, function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
					geocoder_CallBack(result,index);
					}
				else
				{
					adderrpoint(name,index);
				}
		});
		gdGEO(index,adds);
	}
}
function gdGEO(map,name) {
	var add = adds[index];
	setTimeout(function(){
		index++;
		gdGeocoder(add,index);
		}, 500);
}
function geocoder_CallBack(data,index) {
	var geocode = data.geocodes;
	for (var i = 0; i < geocode.length; i++) {
		gdaddMarker(geocode[i]);
		var point = new Point(geocode[i].location.getLng(),geocode[i].location.getLat() );
		addsucpoint(point,geocode[i].formattedAddress,index);
		}
		map.setFitView();
    }
function TianChangeName(map,name)
{
	datasuc = [];
	dataerr = [];
	adds= name;
	map = map;
	var config = {
		onSearchComplete:localSearchResult  //接收数据的回调函数
	};
	localsearch = new TLocalSearch(map,config);
	tGEO(index,adds);
}
function TianChangeLocation(map,location)
{
	datasuc = [];
	dataerr = [];
	adds = location;
	for(i=0;i<location.length;i++)
	{
		adds[i] = [location[i].split(",")[0],location[i].split(",")[1]];
	}
	map = map;
	tGEOL(index,adds);	
}
function tGEOL(index,adds)
{
	geocode = new TGeocoder();
	var add = adds[index];
	var lnglat = new TLngLat(add[0],add[1]);
	setTimeout(function(){
		index++;
		geocode.getLocation(lnglat,searchResult);
		}, 500);
}
function searchResult(result)
{
	if(index<adds.length)
	{
		var a = result.getAddress();
		if(result.getAddress()!= null)
		{
			address(result);
		}
		else
		{
			adderrpoint(adds[index][0]+","+adds[index][1],index);
		}
		index++;
		tGEOL(index,adds);
	}
	map.setViewport(zoomArr);
}
function address(result)
{
	var addressComponent = result.getAddressComponent();
	var name = addressComponent.poi;
	var address = result.getAddress();
	var winHtml = "地址:"+address;
	var point = new Point(adds[index][0],adds[index][1]);
	var lnglat = new TLngLat(adds[index][0],adds[index][1]);
	var marker = new TMarker(lnglat);
	TEvent.bind(marker,"click",marker,function(){
		var info = this.openInfoWinHtml(winHtml);
		info.setTitle(name);
		});
	map.addOverLay(marker);
	zoomArr.push(lnglat);
	addsucpoint(point,address,index);
}
function tGEO(index,adds)
{
	var add = adds[index];
	setTimeout(function(){
		index++;
		localsearch.search(add,7);
		}, 500);
}
function localSearchResult(result)
{
	if(index<adds.length)
	{
		if(result.getPois())
		{
			pois(result.getPois());
		}
		else
		{
			adderrpoint(adds[index],index);
		}
		index++;
		tGEO(index,adds);
	}
	map.setViewport(zoomArr);
}
function pois(obj)
{

    var name = obj[0].name;
	var address = obj[0].address;
	var winHtml = "地址:"+address;
	var lnglatArr = obj[0].lonlat.split(" ");
	var point = new Point(lnglatArr[0],lnglatArr[1]);
	var lnglat = new TLngLat(lnglatArr[0],lnglatArr[1]);
	var marker = new TMarker(lnglat);
	TEvent.bind(marker,"click",marker,function(){
		var info = this.openInfoWinHtml(winHtml);
		info.setTitle(name);
		});
	map.addOverLay(marker);
	zoomArr.push(lnglat);
	addsucpoint(point,adds[index],index);
}
function BaiduChangeName(map,name)
{
	datasuc = [];
	dataerr = [];
	adds= name;
	map = map;
	bdGEO(index,adds);	
}
function BaiduChangeLocation(map,location)
{
	datasuc = [];
	dataerr = [];
	adds = location;
	for(i=0;i<location.length;i++)
	{
		adds[i] = new BMap.Point(location[i].split(",")[0],location[i].split(",")[1]);
	}
	map = map;
	bdGEOL(index,adds,location);	
}
function bdGEOL(index,adds,location)
{
	var add = adds[index];
	setTimeout(function(){
		geocodeSearchL(add,index,location); 
		}, 500);
}
function bdGEO(index,adds){
	var add = adds[index];
	setTimeout(function(){
		geocodeSearch(add,index); 
		}, 500);
}
//百度转换文件并输
function geocodeSearch(add,index){
		myGeo.getPoint(add, function(point){
			if(index<adds.length)
			{
				if (point) {
					bdaddMarker(point);
					var pointbd = new Point(point.lng,point.lat)
					addsucpoint(point,add,index);
				}
				else
				{
					adderrpoint(add,index);
				}
				index++;
				bdGEO(index,adds);
			}
			
		});
		
	}
//百度坐标转地名
function geocodeSearchL(add,index,location)
{
	myGeo.getLocation(add, function(rs){
		if(index<adds.length)
		{
			var addComp = rs.addressComponents;
			if (addComp.city!="") {
				bdaddMarker(add);
				var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
				var point = new Point(add.lng,add.lat);
				addsucpoint(point,address,index);
			}
			else
			{
				adderrpoint(location[index].lng+","+location[index].lat,index);
			}
			index++;
			bdGEOL(index,adds,location);
		}
		
	});
	
}
