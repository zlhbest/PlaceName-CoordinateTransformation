var filterarray;
$(document).ready(function(){
	clickfilter();
	$("#change_filter").click(function(){
		filterarray = $("#textarea_filter").val().split(/\r?\n/);
		Changefilter(filterarray);
	});
});
function fileImportfilter()
{
	var selectedFile = document.getElementById('filter_files').files[0];
	var name = selectedFile.name;//读取选中文件的文件名
	var size = selectedFile.size;//读取选中文件的大小
	var reader = new FileReader();//这是核心,读取操作就是由它完成.
	reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
	reader.onload = function () {
		$("#textarea_filter").val(this.result);
	}
}
function clickfilter()
{
	var btnNode = document.getElementById('input_filter_button');
	var inputNode = document.getElementById('filter_files');
	btnNode.addEventListener('click', function (e) { 
	document.getElementById('pg').value = 0;
		var evt = new MouseEvent("click", { 
		bubbles: false, 
		cancelable: true, 
		view: window 
		}); 
		inputNode.dispatchEvent(evt); 
	}, false);
}