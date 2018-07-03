var namearray = [];
var locationarray = [];
var pg;
$(function(){
	pg=document.getElementById('pg');
	});
function isChinese(str){
            if(/^[\u3220-\uFA29]+$/.test(str)){
                return true;
            }else{
                return false;
            }
        }
function Changefilter(content)
{
	pg.max = content.length;
	namearray = [];
	locationarray = [];
	for(i=0;i<=content.length;i++)
	{
		 pg.value = i;
			if(isChinese(content[i]))
			{
				namearray.push(content[i]);
			}
			else if(!isChinese(content[i]))
			{
				locationarray.push(content[i]);
			}
	}
	if(namearray.length>0)
	{
		var text  = "";
		for(index =0;index<namearray.length;index++)
		{
			text = text + namearray[index] + '\r\n';
		}
		$("#textarea_name_output_filter").val(text) ;
	}
	if(locationarray.length>0)
	{
		var text  = "";
		for(index =0;index<locationarray.length;index++)
		{
			text = text + locationarray[index] + '\r\n';
		}
	   $("#textarea_location_output_filter").val(text) ;
	}
	
}
