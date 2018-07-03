var name_write;//用来存放手动输入地址数组
var name_text;//用来存放文件中的地址数组
var loaction_write;//用来存放手动输入的坐标
var location_text;//用来处理文件中的坐标数组
$(document).ready(function(){
	//手动输入转换
	InputNameWrite();
	//text转换
	InputNameText();
	//手动输入坐标
	InputLocationWrite();
	//上传text
	InputLocationText();
	//模拟input上传
	clicknamefiles();
	clickcoofiles();
});
//点击转换获取第一个框内（namewrite）内容,并传到change.js中
function InputNameWrite()
{
	$("#change_name_write").click(function(){
		name_write = $("#textarea_name_write").val().split(/\r?\n/);
		Change(maptype,"name",map,name_write);
	});
}
function InputNameText()
{
	$("#change_name_text").click(function(){
		name_text = $("#textarea_name_text").val().split(/\r?\n/);
		Change(maptype,"name",map,name_text);
	});
}
function InputLocationWrite()
{
	$("#change_location_write").click(function(){
		loaction_write = $("#textarea_location_write").val().split(/\r?\n/);
		Change(maptype,"location",map,loaction_write);
	});
}
function InputLocationText()
{
	$("#change_locatiuon_text").click(function(){
		location_text = $("#textarea_location_text").val().split(/\r?\n/);
		Change(maptype,"location",map,location_text);
	});
}
//读取地址文件并将文件放置在txtarea中
 function fileImportname() 
{
        var selectedFile = document.getElementById('name_files').files[0];
        var name = selectedFile.name;
        var size = selectedFile.size;
		var reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.onload = function () {
			$("#textarea_name_text").val(this.result);
        }
}
//读取坐标文件并将文件放置在txtarea中
function fileImportcoo()
{
	var selectedFile = document.getElementById('coo_files').files[0];
	var name = selectedFile.name;//读取选中文件的文件名
	var size = selectedFile.size;//读取选中文件的大小
	var reader = new FileReader();//这是核心,读取操作就是由它完成.
	reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
	reader.onload = function () {
		$("#textarea_location_text").val(this.result);
	}
}
//点击div代替点击input file效果
function clicknamefiles()
{
	var btnNode = document.getElementById('name_upload');
	var inputNode = document.getElementById('name_files');
	btnNode.addEventListener('click', function (e) { 
		var evt = new MouseEvent("click", { 
		bubbles: false, 
		cancelable: true, 
		view: window 
		}); 
		inputNode.dispatchEvent(evt); 
	}, false);
}

//点击div代替点击input file效果
function clickcoofiles()
{
	var btnNode = document.getElementById('coo_upload');
	var inputNode = document.getElementById('coo_files');
	btnNode.addEventListener('click', function (e) { 
		var evt = new MouseEvent("click", { 
		bubbles: false,
		cancelable: true, 
		view: window 
		}); 
		inputNode.dispatchEvent(evt); 
	}, false);
}
