$(document).ready(function(){
	$("#success_clear").click(function(){
		data = [];
		addsucdata(data);
	});
	$("#error_clear").click(function(){
		data = [];
		adderrdata(data);
	});
	window.operateEvents = {
    'click .RoleOfedit': function (e, value, row, index) {
		if(isChinese(row.name))
		{
			getXY(row.name,row.id,index);
		}
		else if(!isChinese(row.name))
		{
			getName(row.name,row.id,index);
		}
     }
   };
	suctable();
	errtable();
});
function suctable()
{
	$('#suc_table').bootstrapTable({
		pagination: true,
		sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 3,   
		columns: [{
			field: 'id',
			title: 'ID'
		}, {
			field: 'name',
			title: '转换名称'
		}, {
			field: 'LocationX',
			title: '经度'
		}, 
		{
			field: 'LocationY',
			title: '纬度'
		}, ],
	});
}
function errtable()
{
	$('#err_table').bootstrapTable({
		pagination: true,
		sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber:1,                       //初始化加载第一页，默认第一页
		pageSize: 3, 
		columns: [{
			field: 'id',
			title: 'ID'
		}, {
			field: 'name',
			title: '转换名称'
		}, {
			field: 'reason',
			title: '原因'
		}, 
		{
			field: 'bymyself',
			title: '手动',
			events: operateEvents,
			formatter: operateFormatter
		}, ]
	});
}
function operateFormatter(value, row, index) {
   return [
   '<input type="submit" value="手动" class="RoleOfedit btn btn-primary btn-sm"   data-toggle="modal" style="display:inline">',
   ].join('');
 }
function addsucdata(data)
{
	$('#suc_table').bootstrapTable('load',data);
}
function adderrdata(data)
{
	$('#err_table').bootstrapTable('load',data);
}

