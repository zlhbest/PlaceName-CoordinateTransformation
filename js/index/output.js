var datasuc = [];
var dataerr = [];
var sucdata = {};
var errdata = {};
var myGeo = new BMap.Geocoder();
var index=0;
var adds ;
var map;
$(document).ready(function(){
	OutputFileName();
	OutputFlieLocation();
	OutputResult();
});
function OutputResult()
{
	$("#output_text").click(function(){
		var text = "";
		for(index =0;index<datasuc.length;index++)
		{
			text = text + datasuc[index].id+"  "+ datasuc[index].name+"  "+ datasuc[index].LocationX+"  "+ datasuc[index].LocationY+ '\r\n';
		}
		download("result.txt",text);
	});
}
//点击下载输出data.txt文件
function OutputFileName()
{
	$("#download_name_write").click(function(){
		var text = '';
		nameare =$("#textarea_name_write").val().split(/\r?\n/);
		for(index =0;index<nameare.length;index++)
		{
			text = text + nameare[index] + '\r\n';
		}
		download("namedata.txt",text);
	});
}
function OutputFlieLocation()
{
	$("#download_locaton_write").click(function(){
		var text = '';
		nameare =$("#textarea_location_write").val().split(/\r?\n/);
		for(index =0;index<nameare.length;index++)
		{
			text = text + nameare[index] + '\r\n';
		}
		download("locationdata.txt",text);
	});
}
//向成功的table中写入一行
function addsucpoint(point,name,index)
{
	sucdata = {};
	sucdata.name=name;
	sucdata.id=index;
	sucdata.LocationX = point.lng;
	sucdata.LocationY = point.lat;
	datasuc.push(sucdata);
	addsucdata(datasuc);
}
//向失败的table写入一行
function adderrpoint(name,index)
{
	errdata = {};
	errdata.name=name;
	errdata.id=index;
	errdata.reason ="未找到坐标点" ;
	errdata.bymyself = "";
	dataerr.push(errdata);
	adderrdata(dataerr);
}
function removeerrpoint(index)
{
	dataerr.splice(index,1);
	adderrdata(dataerr);
}
function bdaddMarker(point){
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	map.centerAndZoom(point, 16);
}
function gdaddMarker(point)
{
	 var marker = new AMap.Marker({
            map: map,
            position: [ point.location.getLng(),  point.location.getLat()]
        });
        var infoWindow = new AMap.InfoWindow({
            content: point.formattedAddress,
            offset: {x: 0, y: -30}
        });
        marker.on("mouseover", function(e) {
            infoWindow.open(map, marker.getPosition());
        });
}
//下载txt文本，保存在自己选择的路径中
function download(filename, text) 
{
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}