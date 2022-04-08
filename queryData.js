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

// KeyConditionExpression: "#yr between :start_yr and :end_yr",
// ExpressionAttributeValues: {
//   ":start_yr": { N: 2010 },
//   ":end_yr": { N: 2013 },
// },

// ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
// KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
// ExpressionAttributeNames: {
//   "#yr": "year",
// },
// ExpressionAttributeValues: {
//   ":yyyy": 2013,
//   ":letter1": "A",
//   ":letter2": "S",
// },

//   ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
//   KeyConditionExpression: "#ye =:yyyy and year between :start_yr and :end_yr",
//   ExpressionAttributeNames: {
//     "#yr": "year",
//   },
//   ExpressionAttributeValues: {
//     ":start_yr": 2011,
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
