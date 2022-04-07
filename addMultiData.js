var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();

var docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});

console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync("moviedata.json", "utf8"));
allMovies.forEach(function (movie) {
  var params = {
    TableName: "Movies",
    Item: {
      year: movie.year,
      title: movie.title,
      info: movie.info,
    },
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add movie",
        movie.title,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", movie.title);
    }
  });
});
