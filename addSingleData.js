var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();

var docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});

var table = "Movies";

var year = 2012;
var title = "The Place Beyond the Pines";
var info = {
  directors: ["Derek Cianfrance"],
  release_date: "2012-09-07T00:00:00Z",
  rating: 7.4,
  genres: ["Crime", "Drama"],
  image_url:
    "http://ia.media-imdb.com/images/M/MV5BMjc1OTEwNjU4N15BMl5BanBnXkFtZTcwNzUzNDIwOQ@@._V1_SX400_.jpg",
  plot: "A motorcycle stunt rider turns to robbing banks as a way to provide for his lover and their newborn child, a decision that puts him on a collision course with an ambitious rookie cop navigating a department ruled by a corrupt detective.",
  rank: 64,
  running_time_secs: 8400,
  actors: ["Ryan Gosling", "Bradley Cooper", "Eva Mendes"],
};

var params = {
  TableName: table,
  Item: {
    year: year,
    title: title,
    info: info,
  },
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
