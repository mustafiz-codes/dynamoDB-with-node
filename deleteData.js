var AWS = require("aws-sdk");
var fs = require("fs");
require("dotenv").config();

var docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
  TableName: table,
  Key: {
    year: year,
    title: title,
  },
  ConditionExpression: "info.rating <= :val",
  ExpressionAttributeValues: {
    ":val": 5.5,
  },
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to delete item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});
