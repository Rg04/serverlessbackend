'use strict';
//var dbConfig = require('./dbConfig')
var AWS = require('aws-sdk');
AWS.config.update({
region: 'ap-south-1'
});

var dynamoDb = new AWS.DynamoDB({
    endpoint: 'http://localhost:8001/shell/'
});

module.exports.createUser = async (event, context, callback) => {

var em, name, pwd, num;
em = event.queryStringParameters.email;
name = event.queryStringParameters.name;
pwd = event.queryStringParameters.password;
num = event.queryStringParameters.number;

// var getItemParams = {
// TableName: 'userRecord',
// Key: {
// emailId: {
// S: 'test5@gmail.com'
// },
// fName: {
// S: 'testName5'
// }
// }
// };

var putItemParams = {
TableName: 'usersRecord',
Item: {
emailId: {
S: em
},
fName: {
S: name
},
password: {
S: pwd
},
number: {
S: num
}
}
};

//Accesing the event object
console.log(event);

// Accessing the docClient + DynamoDb Details
console.log(dynamoDb);

// ***********Putting an Item ***********************
putData(putItemParams);

// ***********Reading an Item ***********************
//getData(getItemParams);
callback(null, { statusCode: 200, body: 'Hello from Lambda' });
}

var putData = (putItemParams) => {
dynamoDb.putItem(putItemParams, (err, data) => {
console.log("Inside putItem");
if (err) {
console.log("Error", err);
} else {
console.log("Success", data);
}
});
}
// var getData = (getItemParams) => {
// dynamoDb.getItem(getItemParams, (err, data) => {
// console.log("Inside getItem");
// if (err) {
// console.log(`******Error: ${JSON.stringify(err)}`);
// } else {
// console.log(`######Success: ${JSON.stringify(data.Item)}`);
// }
// });
// }