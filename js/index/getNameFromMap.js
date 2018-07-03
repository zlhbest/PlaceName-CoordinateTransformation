 var getNamename;
 var getNameindex;
 var getindexerror;
 var geoc = new BMap.Geocoder(); 
 var pointXY;
 function getName(name,index,indexerror)
 {
 	getNamename = name;
 	getNameindex = index;
 	getindexerror = indexerror;
 	switch (maptype)
 	{
 	case "baidu":
 		getbdName();
 		break;
 	case "gaode":
 		getgdName();
 		break;
 	case "tian":
 		gettdName();
 	default:
 	break;
 	}
 }
 function gettdName()
 {
	 mapclick = TEvent.addListener(map,"click",function(p){
	 	pointXY = map.fromContainerPixelToLngLat(p);
	 	tderrorTosuccess(pointXY);
	 	TEvent.removeListener(mapclick);
	 });
 }
 function tderrorTosuccess(pointXY)
 {
	 var  geocode = new TGeocoder();
	 geocode.getLocation(pointXY,errorTosuccesstdName);
 }
 function errorTosuccesstdName(result)
 {
	 var addressComponent = result.getAddressComponent();
	 var name = addressComponent.poi;
	 var address = result.getAddress();
	 var winHtml = "地址:"+address;
	 var point = new Point(adds[getNameindex][0],adds[getNameindex][1]);
	 var marker = new TMarker(pointXY);
	 TEvent.bind(marker,"click",marker,function(){
	 	var info = this.openInfoWinHtml(winHtml);
	 	info.setTitle(name);
	 	});
	 map.addOverLay(marker);
	 zoomArr.push(pointXY);
	 addsucpoint(point,name,index);
	 removeerrpoint(getindexerror);
 }
 function getgdName()
 {
	 map.on('click',function(e){
	 	errorTosuccessgdName(e);
	 });
 }
 function errorTosuccessgdName(e)
 {
	 var point =new BMap.Point(getNamename.split(",")[0],getNamename.split(",")[1]);
	var add = [e.lnglat.getLng(),e.lnglat.getLat()];
	var geocoder = new AMap.Geocoder({
		radius: 1000,
		extensions: "all"
	});        
	geocoder.getAddress(add, function(status, result) {
		if (status === 'complete' && result.info === 'OK') {
			var address = result.regeocode.formattedAddress; 
			addsucpoint(point,address,getNameindex);
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
	removeerrpoint(getindexerror);
 }
 function getbdName()
 {
	map.addEventListener("click",errorTosuccessbdName);
 }
 function errorTosuccessbdName(e)
 {
	 geoc.getLocation(e.point, function(rs){
	 	var addComp = rs.addressComponents;
		var point =new BMap.Point(getNamename.split(",")[0],getNamename.split(",")[1]);
		var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
	 	addsucpoint(point,address,getNameindex);
	 	map.addOverlay(new BMap.Marker(e.point));
	 	removeerrpoint(getindexerror);
	 }); 
	 map.removeEventListener("click", errorTosuccessName);
 }