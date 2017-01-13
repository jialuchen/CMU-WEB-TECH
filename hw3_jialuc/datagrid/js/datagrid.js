function DataGrid(options) {
	this.data = options.data;
	this.rootElement = options.rootElement;
	this.columns = options.columns;
	this.pageSize = options.pageSize;
	this.onRender = options.onRender;
        var that = this;
       this.cp = 1;
       this.order =1;
       this.selectedName = this.columns[0]["dataName"];


  this.table = document.createElement("table"); 
 if (this.pageSize && this.data.length > this.pageSize) {
 var paging = document.createElement("caption");
        paging.style.textAlign = "right";
        this.table.appendChild(paging);
        displayPage.call();
    }

    var thead = document.createElement("thead");

    var tr = document.createElement("tr");
    for (var c in this.columns) {
        var th = document.createElement("th");
        th.innerHTML = this.columns[c]["name"];
        th.setAttribute("align", this.columns[c]["align"]);
        th.setAttribute("width", this.columns[c]["width"]); 
        th.setAttribute("dataname", this.columns[c]["dataName"]); 

        th.setAttribute("data-toggle", "tooltip");
        th.setAttribute("title", "Sort by " + this.columns[c]["name"]);
      th.addEventListener("click", this.sortEvent.bind(this));
        tr.appendChild(th);         
    }

    thead.appendChild(tr);
    this.table.appendChild(thead);

        var tag = this.columns[0]["dataName"];
        this.data.sort(
		function(a, b) {
			return ((a[tag] > b[tag]) ? 1 : ((a[tag] < b[tag]) ? -1 : 0));
		}
	);

	    //this.order = -1;
    this.renderTable();

    function displayPage(){

    	while (paging.lastChild) {
            paging.removeChild(paging.lastChild);
        }

    	var numPages = Math.ceil(that.data.length / that.pageSize);
    
	var prev = document.createElement("span");
   // prev.setAttribute("clickable","clickable");
	prev.innerHTML = "< Previous ";
	paging.appendChild(prev);

	var cur = document.createElement("span");
	cur.innerHTML = that.cp+' of '+numPages;
	paging.appendChild(cur);

	var next = document.createElement("span");
    //prev.setAttribute("clickable","clickable");
	next.innerHTML = " Next >";
	paging.appendChild(next);

	var prevPage = function(event) {
        that.cp = that.cp - 1;
        displayPage.call();
        that.renderTable();    }

    var nextPage = function(event){
        that.cp = that.cp + 1;
       displayPage.call();
       that.renderTable();
    }

if (that.cp <= 1) {
     next.setAttribute("clickable", "clickable");
    prev.setAttribute("clickable", "disabled");
} else {
     prev.setAttribute("clickable", "clickable");
            prev.addEventListener(
               "click", prevPage );
        }
        if (that.cp >= numPages) {
            prev.setAttribute("clickable", "clickable");
            next.setAttribute("clickable", "disabled");
        } else {
            next.setAttribute("clickable", "clickable");
            next.addEventListener(
                "click", nextPage );
        }
        
    }
};

(function(){

        DataGrid.prototype.renderTable = function() {    
        this.destroy();
        
       while (this.table.lastChild){
        	if(
        	this.table.lastChild.getAttribute("delete2") ) {
            this.table.removeChild(this.table.lastChild);
        }else
        break;}  
         	         	       

    if (this.pageSize) {
      var  startIndex = this.pageSize * (this.cp - 1);
    }
    var tbody = document.createElement("tbody");
tbody.setAttribute("delete2", "delete2");
if(this.pageSize){
for(var i = 0; i + startIndex < Math.min(this.pageSize+startIndex, this.data.length); i++ ){
		var tr = document.createElement("tr");
		for (var c in this.columns) {
			var td = document.createElement("td");
			var label = this.columns[c]["dataName"];
			td.innerHTML = this.data[i+startIndex][label];
			td.setAttribute("align", this.columns[c]["align"]);
			td.setAttribute("width", this.columns[c]["width"]);
			//td.setAttribute("class", label);
            if(label == this.selectedName){
                td.setAttribute("sel", "sel");
            }
			tr.appendChild(td);			
		}
		tbody.appendChild(tr);

	}
}else{
for (var d in this.data) {
		var tr = document.createElement("tr");
		for (var c in this.columns) {
			var td = document.createElement("td");
			var label = this.columns[c]["dataName"];
			td.innerHTML = this.data[d][label];
			td.setAttribute("align", this.columns[c]["align"]);
			td.setAttribute("width", this.columns[c]["width"]);
			td.setAttribute("class", label);
            if(label == this.selectedName){
                td.setAttribute("sel", "sel");
            }
			tr.appendChild(td);			
		}
		tbody.appendChild(tr);
	}

}

	this.table.appendChild(tbody);
	if (typeof(this.rootElement) !== 'undefined') {
		this.rootElement.appendChild(this.table);
	}

	if (this.onRender) {
        this.onRender.call();
    }
};


DataGrid.prototype.destroy = function() {
    if (typeof(this.rootElement) !== 'undefined') {
        this.rootElement.innerHTML = "";
    }
};

DataGrid.prototype.sortEvent =  function(event){
if(typeof(event.target)!== 'undefined'){
	var tag = event.target.getAttribute("dataname");
    var col = this.rootElement.getElementsByClassName(tag);
    //col.setAttribute("sel", "sel");

	if(tag == this.selectedName){
		this.order = this.order * (-1);
	}else{
this.order =1;
this.selectedName = tag;
	}

	var sort = function(a, b) {
			var compare = ((a[tag] > b[tag]) ? 1 : ((a[tag] < b[tag]) ? -1 : 0));
			return (this.order * compare);
		}
		this.data.sort(sort.bind(this));
		this.renderTable();

}

}

}
)(window);
     