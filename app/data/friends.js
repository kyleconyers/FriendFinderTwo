// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reservations (DATA)
// =============================================================
var reservations = [
  {
    id: "1",
    name: "Jose",
    email: "josej@gmail.com",
    phone: "253-555-5555"
  },
  {
    id: "2",
    name: "Terresa",
    email: "t@gmail.com",
    phone: "222-222-4444"
  },
  {
    id: "3",
    name: "Kyle",
    email: "k@gmail.com",
    phone: "253-555-5555"
  },
  {
    id: "4",
    name: "Jia",
    email: "j@gmail.com",
    phone: "222-333-4444"
  },
  {
    id: "5",
    name: "Jessie",
    email: "jj@gmail.com",
    phone: "253-555-5555"
  }
];
var waitlist = [
]

var starterFriends = [
  {
  "name": "Friend0",
  "scores": [
  6,
  8,
  7,
  2,
  1,
  6,
  9,
  5,
  2,
  10
  ]
  },
  {
  "name": "Friend1",
  "scores": [
  4,
  4,
  1,
  1,
  3,
  1,
  9,
  9,
  6,
  6
  ]
  },
  {
  "name": "Friend2",
  "scores": [
  5,
  4,
  7,
  2,
  7,
  6,
  7,
  1,
  6,
  4
  ]
  },
  {
  "name": "Friend3",
  "scores": [
  7,
  7,
  6,
  10,
  2,
  4,
  2,
  4,
  9,
  8
  ]
  },
  {
  "name": "Friend4",
  "scores": [
  7,
  9,
  7,
  5,
  7,
  6,
  2,
  8,
  5,
  7
  ]
  },
  {
  "name": "Friend5",
  "scores": [
  3,
  10,
  4,
  3,
  10,
  6,
  10,
  10,
  8,
  3
  ]
  },
  {
  "name": "Friend6",
  "scores": [
  3,
  9,
  2,
  4,
  4,
  6,
  9,
  9,
  7,
  1
  ]
  },
  {
  "name": "Friend7",
  "scores": [
  10,
  8,
  5,
  9,
  7,
  8,
  4,
  1,
  4,
  10
  ]
  },
  {
  "name": "Friend8",
  "scores": [
  10,
  3,
  7,
  3,
  6,
  3,
  3,
  5,
  8,
  4
  ]
  },
  {
  "name": "Friend9",
  "scores": [
  6,
  10,
  10,
  1,
  9,
  8,
  4,
  4,
  9,
  9
  ]
  }
  ]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey.html", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

// Displays all 
app.get("/api/makereservation", function(req, res) {
    return res.json(reservations);
  });

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/friends", function(req, res) {
  // var friends = generateTestFriends(20); 
  var match = findMatch(req.body, starterFriends);
  
  
  // console.log(friends); 
  console.log(req.body)
  
  console.log(match)
  res.json(match)

});

app.get("/testrout", function(req, res){
  var friends = generateTestFriends(10)
  res.json(friends)
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  /*6. Determine the user's most compatible friend using the following as a guide:

   * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
     * Example: 
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on. 
   * The closest match will be the user with the least amount of difference.

7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
   * The modal should display both the name and picture of the closest match.*/
  function findMatch(newInput, oldInputs){
    console.log("findMatch")
    var userScores = newInput.scores;
    var totalDifference = oldInputs.map(function(input){
      console.log(input)
        var friendScores = input.scores;
        var i;
        var difference = 0;

      console.log(newInput.scores.length)
        for(i = 0; i<userScores.length; i++){
          var diff = Math.abs(parseInt(userScores[i]) - parseInt(friendScores[i]));
          console.log(diff)
          difference += diff
          console.log(difference)
        }
        return difference
        
    })
    var lowestDifference = null;
    var friendIndex = null;
        for(i = 0; i<totalDifference.length; i++){
          if (i === 0){
            lowestDifference = totalDifference[i]
          }else if(lowestDifference > totalDifference[i]){
            lowestDifference = totalDifference[i]
            friendIndex = i
          }
    }
    


    console.log(totalDifference)
    return oldInputs[friendIndex]
    
    

    // oldInputs.score  - i newInputs.scores

  }

  function generateTestFriends(numFriends){
      var friends = [];
      for(var i = 0; i<numFriends; i++){
          var friend = {};
          var score = []
          friend.name = "Friend" + i;
          for(var j = 0; j<10; j++){
              score.push(Math.floor(Math.random() * 10) + 1);
          }
          friend.scores = score;
          friends.push(friend);
      }
      return friends;
  }
  


//  starter friends array with scores
//
