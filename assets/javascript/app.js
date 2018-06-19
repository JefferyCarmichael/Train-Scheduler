
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAccYQqvCsJetzt1FnkLdZm-cu6Tzs7vsY",
  authDomain: "fir-demo-c7c99.firebaseapp.com",
  databaseURL: "https://fir-demo-c7c99.firebaseio.com",
  projectId: "fir-demo-c7c99",
  storageBucket: "fir-demo-c7c99.appspot.com",
  messagingSenderId: "373578199852"
};

  firebase.initializeApp(config);
  var database = firebase.database();
  var trainName ="";
  var destination ="";
  var firstTrain ="";
  var frequency="";
  var minAway ="";
  var trainData ="";

//On click, pull in responses from Train form.  
  $("#addInfo").on("click", function(){
    event.preventDefault();
    trainName  = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain    = $("#firstTrain").val().trim();
    frequency   = $("#frequency").val().trim();
    
   //Console.log to check
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // object for train data
    trainData = {
    trainName:trainName,
    destination:destination,
    firstTrain:firstTrain,
    frequency:frequency,
    minAway:minAway
  };

  // Sends train data to database
  database.ref().push(trainData);

  //Console.log to check
  console.log(trainData.trainName);
  console.log(trainData.destination);
  console.log(trainData.firstTrain);
  console.log(trainData.frequency);

   // Clear form fields
   $("#trainName").val("");
   $("#destination").val("");
   $("#firstTrain").val("");
   $("#frequency").val("");
 });
 

 //3. Create Firebase database for train schedule
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 
   console.log(childSnapshot.val());
 
   // Store everything into a variable.
   var trainName = childSnapshot.val().trainName;
   var destination = childSnapshot.val().destination;
   var firstTrain = childSnapshot.val().firstTrain;
   var frequency = childSnapshot.val().frequency;
 
//Console.log to check
   console.log(trainData.trainName);
  console.log(trainData.destination);
  console.log(trainData.firstTrain);
  console.log(trainData.frequency);

 

  // Subtracted 1 year from time to make sure it comes before current time
  var adjustedTime = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(adjustedTime);

  // Current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var timeDelta = moment().diff(moment(adjustedTime), "minutes");
  console.log("TIME DIFFERENCE: " + timeDelta);

  // Time apart (remainder)
  var timeRemainder = timeDelta % frequency;
  console.log(timeRemainder);

  // Minutes until next train
  var timeNextTrain = frequency - timeRemainder;
  console.log("NEXT TRAIN(min): " + timeNextTrain);

  // Next train
  var nextTrain = moment().add(timeNextTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));// Assumptions
  var nextArrival =moment(nextTrain).format("hh:mm a");

  
 // Add each train's data into the table
 $("#times > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
frequency + "</td><td>" + nextArrival + "</td><td>" + timeNextTrain + "</td></tr>");
});




     
    
