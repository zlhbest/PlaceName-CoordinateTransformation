var maptype  = "gaode";
var map;
$(document).ready(function(){
	$(":radio").click(function()
	{
	  maptype= $(this).val();
	  changemap(maptype);
	});
	changemap(maptype);
		
});
function changemap(maptype)
{
	switch (maptype)
	{
		case "baidu":
			baidu();
			break;
		case "gaode":
			gaode();
			break;
		case "tian":
			tian();
		default:
		break;
	}
}
function gaode()
{
	   map = new AMap.Map('allmap', {
       center:[117.000923,36.675807],
       zoom:11
    });
		toolBar = new AMap.ToolBar({
        visible: false
    }),
    overView = new AMap.OverView({
        visible: false
    }),
		map.addControl(toolBar);
    map.addControl(overView);
		toolBar.show();
		toolBar.showDirection();
		toolBar.showRuler();
		overView.show();
}
function baidu()
{
	map = new BMap.Map("allmap");  
	map.centerAndZoom(new BMap.Point(117.000923,36.675807), 11); 
	map.addControl(new BMap.MapTypeControl({
	mapTypes:[
		         BMAP_NORMAL_MAP,
		         BMAP_HYBRID_MAP
		    ]}));	  
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); 
	map.addControl(top_left_control);        
	map.addControl(top_left_navigation);     
	map.addControl(top_right_navigation);
	map.setCurrentCity("青岛");          
	map.enableScrollWheelZoom(true);     
}
function tian()
{
	 var config = {
		 projection: "EPSG:4326"
		 }
	  map = new TMap("allmap",config); //初始化地图对象  
    map.centerAndZoom(new TLngLat(116.40969,39.89945),12);//设置显示地图的中心点和级别-中国  
    map.enableHandleMouseScroll(); //允许鼠标双击放大地图  
		 var configmap = {
            type:"TMAP_NAVIGATION_CONTROL_LARGE",   //缩放平移的显示类型
            anchor:"TMAP_ANCHOR_TOP_LEFT",          //缩放平移控件显示的位置
            offset:[0,0],                           //缩放平移控件的偏移值
            showZoomInfo:true                       //是否显示级别提示信息，true表示显示，false表示隐藏。
        };
        //创建缩放平移控件对象
        control=new TNavigationControl(config);
        //添加缩放平移控件
        map.addControl(control);
}
 