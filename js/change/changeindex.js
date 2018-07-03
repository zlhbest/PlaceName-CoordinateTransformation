var changetype;
var changearray = [];
var changearrayoutpu = [];
$(document).ready(function(){
	ChangeButton();
	GetSelect();
});
function GetChangeArrayBefore()
{
	changearray = $("#textarea_input_text").val().split(/\r?\n/);
}
function OutputArray()
{
	var text = "";
	for(index =0;index<changearrayoutpu.length;index++)
	{
		text = text + changearrayoutpu[index]+ '\r\n';
	}
	$("#textarea_outpot_text").val(text);
}
function GetSelect()
{
	var Select = $("#select_changetype");
	changetype = Select.children('option:selected').val();
	Select.change(function()
	{
		changetype = Select.children('option:selected').val();
	});
}
function ChangeButton()
{
	$("#change_text_button").click(function(){
		Change();
	});
}
function Change()
{
	switch (changetype){
		case "bd09togcj02":
			BDToGCJ02();
			changearrayoutpu = [];
			break;
		case "gcj02tobd09":
		  GCJ02ToBD();
			changearrayoutpu = [];
			break;
		case "wgs84togcj02":
		  WGS84TOGCJ02();
			changearrayoutpu = [];
			break;
		case "gcj02towgs84":
		  GCJ02TOWGS84();
			changearrayoutpu = [];
			break;
		case "wgs84tobd09":
		  WGS84TOBD();
			changearrayoutpu = [];
			break;
		case "bd09towgs84":
			BDTOWGS84();
			changearrayoutpu = [];
			break;
		default:
			break;
	}
}
function BDToGCJ02()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.bd09togcj02(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		changearrayoutpu.push(point);
		OutputArray();
	}
}
function GCJ02ToBD()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.gcj02tobd09(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		changearrayoutpu.push(point);
		OutputArray();
	}
}
function WGS84TOGCJ02()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.wgs84togcj02(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		changearrayoutpu.push(point);
		OutputArray();
	}
}
function GCJ02TOWGS84()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.gcj02towgs84(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		changearrayoutpu.push(point);
		OutputArray();
	}
}
function WGS84TOBD()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.wgs84togcj02(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		var pointbd =  coordtransform.gcj02tobd09(point[0], point[1]);
		changearrayoutpu.push(pointbd);
		OutputArray();
	}
}
function BDTOWGS84()
{
	GetChangeArrayBefore();
	for(i=0;i<changearray.length;i++)
	{
		var point = coordtransform.bd09togcj02(changearray[i].split(",")[0], changearray[i].split(",")[1]);
		var pointwgs =  coordtransform.gcj02towgs84(point[0], point[1]);
		changearrayoutpu.push(pointwgs);
		OutputArray();
	}
}
