const AWS = require("aws-sdk");

const db = new AWS.DynamoDB({
  accessKeyId: "AKIA4JRSDAMUOMF3ASEP",
  secretAccessKey: "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",
  region: "us-east-2",
});

// const getLicense = (licenseKey) => {
//   {
//     const result = db
//       .get({
//         TableName: "Order",
//         Key: { licenseKey },
//       })
//       .promise();

//     console.log(result);
//     return result;
//   }
// };

// db.get(params, function (err, data) {
//     if (err) {
//       console.error(
//         "Unable to create table. Error JSON:",
//         JSON.stringify(err, null, 2)
//       );
//     } else {
//       console.log(
//         "Created table. Table description JSON:",
//         JSON.stringify(data, null, 2)
//       );
//     }
