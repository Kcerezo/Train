var config = {
    apiKey: "AIzaSyCU94vLunRn9KmksKdlVmyYE7o8KE_N9Nc",
    authDomain: "train-hw-f7ce0.firebaseapp.com",
    databaseURL: "https://train-hw-f7ce0.firebaseio.com",
    projectId: "train-hw-f7ce0",
    storageBucket: "train-hw-f7ce0.appspot.com",
    messagingSenderId: "458119678405"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#name-input").val().trim();
    var trainLocation = $("#location-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainStart = $("#start-input" ).val().trim();
    var trainMinutes = $("#minutes-input" ).val().trim();

    var newTrain = {
      name: trainName,
      location: trainLocation,
      time: trainTime,
      start: trainStart,
      minutes: trainMinutes
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.location);
    console.log(newTrain.time);
    console.log(newTrain.start);
    console.log(newTrain.minutes);
  
    $("#name-input").val("");
    $("#location-input").val("");
    $("#time-input").val("");
    $("#start-input").val("");
    $("#minutes-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainLocation = childSnapshot.val().location;
    var trainTime = childSnapshot.val().time;
    var trainStart = childSnapshot.val().start;
    var trainMinutes = childSnapshot.val().start;

    console.log(trainName);
    console.log(trainLocation);
    console.log(trainTime);
    console.log(trainStart);
    console.log(trainMinutes);
  
    var timeTrain = moment.unix(trainStart).format('MMMM Do YYYY, h:mm:ss a');

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainLocation),
      $("<td>").text(trainTime),
      $("<td>").text(trainStart),
      $("<td>").text(trainMinutes),
    );

    $("#train-table > tbody").append(newRow);
  });
  