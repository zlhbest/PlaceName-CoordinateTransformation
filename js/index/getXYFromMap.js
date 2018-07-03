 var getXYname;
 var getXYindex;
 var getindexerror;
 var mapclick;
 function getXY(name,index,indexerror)
 {
	 getXYname = name;
	 getXYindex = index;
	 getindexerror = indexerror;
	 switch (maptype)
	 {
	 	case "baidu":
	 		getbdXY();
	 		break;
	 	case "gaode":
	 		getgdXY();
	 		break;
	 	case "tian":
	 		gettdXY();
	 	default:
	 	break;
	 }
 }
 function gettdXY()
 {
	 mapclick = TEvent.addListener(map,"click",function(p){
		 var point = map.fromContainerPixelToLngLat(p);
		 tderrorTosuccess(point);
		 TEvent.removeListener(mapclick);
	 });
 }
 function tderrorTosuccess(point)
 {
	 var lnglat = new TLngLat(point.getLng(),point.getLat());
	 var tdpoint = new Point(point.getLng(),point.getLat())
	 var marker = new TMarker(lnglat);
	 TEvent.bind(marker,"click",marker,function(){
	 	var info = this.openInfoWinHtml(getXYname);
	 	info.setTitle(getXYname);
	 	});
	 map.addOverLay(marker);
	 addsucpoint(tdpoint,getXYname,getXYindex);
	 removeerrpoint(getindexerror);
 }
 function getgdXY()
 {
	 map.on('click',function(e){
		 gderrorTosuccess(e);
	 });
 }
 function gderrorTosuccess(e)
 {
	 var point = new Point(e.lnglat.getLng(),e.lnglat.getLat());
	 addsucpoint(point,getXYname,getXYindex);
	   var marker = new AMap.Marker({  //加点
            map: map,
            position: [point.lng,point.lat]
        });
	 removeerrpoint(getindexerror);
 }
 function getbdXY()
 {
	 map.addEventListener("click",bderrorTosuccess);
 }
 function bderrorTosuccess(e)
 {
	 addsucpoint(e.point,getXYname,getXYindex);
	 map.addOverlay(new BMap.Marker(e.point));
	 removeerrpoint(getindexerror);
	 map.removeEventListener("click", errorTosuccess);
 }