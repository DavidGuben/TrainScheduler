// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Link to Firebase
var employeeData = new Firebase("https://trainschedulerdg.firebaseio.com/");

// 2. Button for adding Employees
$("#addEmployeeBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainInput").val().trim();
	var trainDest = $("#roleInput").val().trim();
	var trainFrequency = moment($("#startInput").val().trim(), "HH:mm").format("HH:mm");
	var nextArrival = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newEmp = {
		name:  trainName,
		role: trainDest,
		start: trainFrequency,
		rate: nextArrival
	}

	// Uploads employee data to the database
	employeeData.push(newEmp);

	// Logs everything to console
	console.log(newEmp.name);
	console.log(newEmp.role);
	console.log(newEmp.start);
	console.log(newEmp.rate)

	// Alert
	alert("Employee successfully added");

	// Clears all of the text-boxes
	$("#trainInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
employeeData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().role;
	var trainFrequency = childSnapshot.val().start;
	var nextArrival = childSnapshot.val().rate;

	// Employee Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainFrequency);
	console.log(nextArrival);

	// Prettify the employee start
	var trainFrequencyPretty = moment.unix(trainFrequency).format("MM/DD/YY");
	// Calculate the months worked using hardconre math
	// To calculate the months worked
	var empMonths = moment().diff(moment.unix(trainFrequency, 'X'), "months");
	console.log(empMonths);

	// Calculate the total billed rate
	var empBilled = empMonths * nextArrival;
	console.log(empBilled);

	// Add each train's data into the table
	$("#employeeTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequencyPretty + "</td><td>" + empMonths + "</td><td>" + nextArrival + "</td><td>" + empBilled + "</td></tr>");

	var tableRow = $("<tr>");
	var tableData1 = $("<td>");
	tableData1.html(trainName);
	var tableData2 = $("<td>");
	tableData2.html(trainDest);
	var tableData3 = $("<td>");
	var tableData4 = $("<td>");
	tableRow.append(tableData1);
	tableRow.append(tableData2);
	tableRow.append(tableData3);
	tableRow.append(tableData4);
	$("#employeeTable > tbody").append(tableRow);

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
