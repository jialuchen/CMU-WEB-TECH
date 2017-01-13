(function() {
	this.data =  "";
	var that = this;
	

	//$("input[type='button']").on("click", doAjax);

	
//	function doAjax() {
	
		/*
		 * Sending an AJAX request using jQuery is very easy. We 
		 * specify a URL and some options and jQuery
		 * will handle the rest. 
		 * 
		 * Instead of having to deal with readyState directly jQuery gives us some
		 * events we can listen to.
		 */
		//function init() {
		jQuery.ajax(
			"http://csw08724.appspot.com/breeds.ajax",
			{
				dataType: "json",
				type: "GET", //GET is the default but just wanted to show this option
				error: function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
				},
				success: function(data, textStatus, jqXHR) {
					/*
					 * jQuery will automatically parse the returned JSON so 
					 * data should be our deserialized object.
					 */
					 that.data = data;
					var htmlString = "";
				//	var timeID = 0;
					data.forEach(
						function(val, index, array) {
							htmlString += "<option>" + val.name + "</option>";
						}
					);
					$("select").html(htmlString);
					doAjax.call();
				}
			}
		);

		$("#select").on("change", doAjax);
	//}

		function doAjax(){
var options=$("#select option:selected");
for(var i = 0; i<that.data.length; i++){
	//data.forEach(
if(options.text() == that.data[i]["name"]){
var id = that.data[i]["id"];
break;
}
}
var site =  "http://csw08724.appspot.com/breed.ajax?id="+id;
jQuery.ajax(
			site,
			{
				dataType: "json",
				type: "GET", //GET is the default but just wanted to show this option
				error: function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
				},
				success: function(data, textStatus, jqXHR) {
//for(var m = 0; m<data.length; m++)
//					console.log(data[m].description);
					/*
					 * jQuery will automatically parse the returned JSON so 
					 * data should be our deserialized object.
					 */
					 $("#select")[0].selectedIndex = id-1;
					var htmlName = options.text();
					$("h2").html(htmlName);
					var htmlDescription = data.description;
					$("#description").html(htmlDescription);
					var htmlOrigin = data.origins;
					$("#origins").html(htmlOrigin);
					var htmlRFY = data.rightForYou;
					$("#rightForYou").html(htmlRFY);
					var htmlImg = "";
				/*	$("#img").attr({
						"src": "http://csw08724.appspot.com/" + data.imageUrl
					});*/

					data.extraImageUrls.splice(0,0,data.imageUrl);
				// console.log(data.extraImageUrls);
				var timeID =0;
				var index = 0;
				$("#img").attr("src", "http://csw08724.appspot.com/" + data.extraImageUrls[index]);

				timeID = setInterval(function(){
						$("#slide").hide("slide", {"direction":"left"}, 1000, next).delay(200).show("slide", {"direction":"right"}, 1000);				
					}, 5000);

//next.call();

				function next() {
					index++;
					if (index === data.extraImageUrls.length) {
						index = 0;
					}
					$("#img").attr("src", "http://csw08724.appspot.com/" + data.extraImageUrls[index]);
				}
				}
			}
			);
		}
	//	);
		
//	}
	
})();








