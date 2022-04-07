var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();

var docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});

console.log("Querying for movies from 2013.");

var params = {
  TableName: "Movies",
  KeyConditionExpression: "#yr = :yyyy",
  ExpressionAttributeNames: {
    "#yr": "year",
  },
  ExpressionAttributeValues: {
    ":yyyy": 2012,
  },
};

// var params = {
//   TableName: "Movies",
//   KeyConditionExpression: "#yr, title, info.rating",
//   FilterExpression: "#yr between :start_yr and :end_yr",
//   ExpressionAttributeNames: {
//     "#yr": "year",
//   },
//   ExpressionAttributeValues: {
//     ":start_yr": 2013,
//     ":end_yr": 2013,
//   },
// };

docClient.query(params, function (err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function (item) {
      console.log(" -", item.year + ": " + item.title);
    });
  }
});
