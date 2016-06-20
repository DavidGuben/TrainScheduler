

// Link to Firebase
var employeeData = new Firebase("https://trainschedulerdg.firebaseio.com/");

// Button on click function for adding Trains
$("#add-train-btn").on("click", function(){

	// Grabs user input
	var trainName = $("#train-input").val().trim();
	var trainDest = $("#role-input").val().trim();
	var trainFrequency = $("#train-start").val().trim();
	var nextArrival = $("#train-frequency").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: trainDest,
		frequency: trainFrequency,
		arrival: nextArrival
	}

	// Uploads train data to the database
	employeeData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.frequency);
	console.log(newTrain.arrival);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#train-start").val("");
	$("#train-frequency").val("");

	// Prevents moving to new page
	return false;
});


// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
employeeData.on("child_added", function(childSnapshot, prevChildKey){

	//----------------------- MOMENT.JS CODE START --------------------//
	// pull values for frequency of the train and the first train time
	var tFrequency = $("#train-frequency").val().trim();
	var firstTime = $("#train-start").val(); //HH:mm

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	//document.write(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	//document.write("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	//document.write("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	//document.write(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;
	//document.write("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	//document.write("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	//----------------------- MOMENT.JS CODE END --------------------//

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFrequency = childSnapshot.val().frequency;
	var nextArrival = childSnapshot.val().arrival;

	// Train Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainFrequency);
	console.log(nextArrival);

	// Add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + nextTrain + "</td><td>" + nextArrival + "</td></tr>");
/*
	var tableRow = $("<tr>");
	var tableData1 = $("<td>");
	tableData1.html();
	var tableData2 = $("<td>");
	tableData2.html();
	var tableData3 = $("<td>");
	var tableData4 = $("<td>");
	tableRow.append(tableData1);
	tableRow.append(tableData2);
	tableRow.append(tableData3);
	tableRow.append(tableData4);
	$("#train-table > tbody").append(tableRow);
*/
});
