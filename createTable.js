var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();

var dynamoDB = new AWS.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});

var params = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" }, // Partition Key
    { AttributeName: "title", KeyType: "RANGE" }, // Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamoDB.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});

//get
// var table = "Order";

// var OrderId = "1";
// var CreationDate = "2022-04-05";

// var params = {
//   TableName: table,
//   Key: {
//     OrderId: OrderId,
//     CreationDate: CreationDate,
//   },
// };

// docClient.get(params, function (err, data) {
//   if (err) {
//     console.error(
//       "Unable to read item. Error JSON:",
//       JSON.stringify(err, null, 2)
//     );
//   } else {
//     console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//   }
// });

// load

// console.log("Importing movies into DynamoDB. Please wait.");

// var allMovies = JSON.parse(fs.readFileSync("moviedata.json", "utf8"));
// allMovies.forEach(function (movie) {
//   var params = {
//     TableName: "Movies",
//     Item: {
//       year: movie.year,
//       title: movie.title,
//       info: movie.info,
//     },
//   };

//   docClient.put(params, function (err, data) {
//     if (err) {
//       console.error(
//         "Unable to add movie",
//         movie.title,
//         ". Error JSON:",
//         JSON.stringify(err, null, 2)
//       );
//     } else {
//       console.log("PutItem succeeded:", movie.title);
//     }
//   });
// });
