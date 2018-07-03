$(document).ready(function(){
	clickchange();
});
function fileImportchange()
{
	var selectedFile = document.getElementById('change_files').files[0];
	var name = selectedFile.name;//读取选中文件的文件名
	var size = selectedFile.size;//读取选中文件的大小
	var reader = new FileReader();//这是核心,读取操作就是由它完成.
	reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
	reader.onload = function () {
		$("#textarea_input_text").val(this.result);
	}
}
function clickchange()
{
	var btnNode = document.getElementById('input_text_button');
	var inputNode = document.getElementById('change_files');
	btnNode.addEventListener('click', function (e) { 
		var evt = new MouseEvent("click", { 
		bubbles: false, 
		cancelable: true, 
		view: window 
		}); 
		inputNode.dispatchEvent(evt); 
	}, false);
}