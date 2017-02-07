//initialize function called when the script loads
function initialize(){
	cities();
	jQueryAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
	//call the functions "addColumns(cityPop)" and "addEvents()" in the end when "function cities()" is executed
    addColumns(cityPop);
    addEvents();
};

//function to add a new column "City Size" to the city-population table
function addColumns(cityPop){
    //execute function(i) for each row in the table
    $('tr').each(function(i){
		//for the row whose index is 0 (the first row), execute the code within if statement
    	if (i == 0){
			//add the "City Size" column to the header row
			//Correction: changed "apend" to "append"
    		$(this).append('<th>City Size</th>');
    	} else {
			//define or declare variable "citySize"
    		var citySize;
			//for variable "cityPop" whose population is less than 100000, assign string "Small" to the relevant variable "citySize"
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
			//for variable "cityPop" whose population is less than 500000 while equal to or greater than 100000, assign string "Medium" to the relevant variable "citySize"
    		} else if (cityPop[i-1].population < 500000){
				//Correction: changed "citysize" to "citySize"
    			citySize = 'Medium';
			//for variable "cityPop" whose population is equal to or greater than 500000, assign string "Large" to the relevant variable "citySize"
    		} else {
    			citySize = 'Large';
    		};
			//add the citySize info to each corresponding row
			//Correction 1: changed "$this" to "$(this)"
			//Correction 2: changed '<td' to '<td>'
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

//function to add clicking effect and text-color-changing effect to the city-population table
function addEvents(){
	//when the mouse pointer is over the table, execute the function()
	//Correction: changed '#table' to 'table'
	$('table').mouseover(function(){
		//define or declare variable "color" then assign string "rgb(" to it
		var color = "rgb(";
		//execute for loop starting from index 0, increase index by 1 every time the for loop is executed, and the loop will not be broken until index becomes equal to or greater than 3
		for (var i=0; i<3; i++){
			//define or declare variable "random" then assign a random number generated from range [0,255)
			var random = Math.round(Math.random() * 255);
			//concatenate a random number to variable "color" every time when the for loop is executed
			//Correction: changed "random" to random
			color += random;
			//when the index is less than 2, concatenate a "," right after the last random number
			if (i<2){
				color += ",";
			//when the index is equal to or greater than 2, concatenate ")" to the last random number
			} else {
				color += ")";
		};
		//assign the randomly generated RGB color to the city-population table by using the method ".css"
		$(this).css('color', color);
	  //Correction: add a "}" to pair with the for loop's "{" above
	  };
	});
	//define the specific reaction when the table is clicked by using a function "clickme()"
	function clickme(){
		//when the table is clicked, display a dialogue frame with content "Hey, you clicked me!"
		alert('Hey, you clicked me!');
	};
	//only execute the function "clickme()" when the city-population table is clicked
	$('table').on('click', clickme);

};


//function to send an AJAX request to the server 
function jQueryAjax(){
	//Correction: commented out 'mydata'
	//var mydata;
	//create an AJAX request then open the server connection based on the address provided
	$.ajax("data/MegaCitiesGeo.geojson", {
		//set the server response data type as "json" 
		dataType: 'json',
		/*Correction: changed 
		success: function(response){
			jQueryCallback(mydata);
		}
		to
		success: jQueryCallback
		*/
		//when a response is revceived from the server, the response/data will then be sent to the callback function "jQueryCallback"
		success: jQueryCallback
		
	});
	//Correction: commented out '$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));'
	//$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
	
};
//Correction: commented out '$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));'
//$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));

//function to execute and write the script that makes use of the response/data retrieved from the server
function jQueryCallback(response){
	//define or declare a variable htmlString then set it equal to a string '<br>GeoJSON data: </br>'
	//Correction: added 'var htmlString="<br>GeoJSON data: </br>";'
	var htmlString="<br>GeoJSON data: </br>";
	//concatenate each stringified item included in the response received from the server to variable htmlString
	//Correction: added 'htmlString+=JSON.stringify(response);'
	htmlString+=JSON.stringify(response);
	//append variable htmlString (as paragraph) to the container <div id="mydiv"></div> in 'index.html'
	//Correction 1: changed $(mydiv) to $("#mydiv")
	//Correction 2: changed 'append('GeoJSON data: ' + JSON.stringify(mydata))' to 'append('<p>'+htmlString+'</p>')'
	$("#mydiv").append('<p>'+htmlString+'</p>');
	
	//check the data
	console.log(response);
};

	//check the data
	//console.log(response);

//assign the onload event to whatever is returned from the initialize function when the code is executed. 
window.onload=initialize();
