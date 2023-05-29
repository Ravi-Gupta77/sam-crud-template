// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
// const dynamodb = require('aws-sdk/clients/dynamodb');
// const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
// const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
// exports.putItemHandler = async (event) => {
//     if (event.httpMethod !== 'POST') {
//         throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
//     }
    // All log statements are written to CloudWatch
    // console.info('received:', event);

    // // Get id and name from the body of the request
    // const body = JSON.parse(event.body);
    // const id = body.id;
    // const name = body.name;

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    // let response = {};

    // try {
    //     const params = {
    //         TableName : tableName,
    //         Item: { id : id, name: name }
    //     };
    
    //     const result = await docClient.put(params).promise();
    
    //     response = {
    //         statusCode: 200,
    //         body: JSON.stringify(body)
    //     };
    // } catch (ResourceNotFoundException) {
    //     response = {
    //         statusCode: 404,
    //         body: "Unable to call DynamoDB. Table resource not found."
    //     };
    // }

    // All log statements are written to CloudWatch
//     console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
//     return response;
// };


const mysql = require('mysql');

const AWS = require('aws-sdk');

exports.postItemhandler = (event, context, callback) => {
  // Create a connection pool to the RDS MySQL database
  const pool = mysql.createPool({
  host: 'employee-management.cmuokqciitb8.us-east-1.rds.amazonaws.com ',
  user: 'ravi',
  password: 'ravi#!123',
  database: 'employee_management'
  });
  
  // Get the data from the event
  const { firstName, lastName, email } = event;

  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
   }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Create a new record in the 'employees' table
  const sql = 'INSERT INTO employees (First_Name, Last_Name, Email_Id) VALUES (?, ?, ?)';
  const values = [firstName, lastName, email];

  pool.getConnection((error, connection) => {
    if (error) {
      callback(error);
      return;
    }

    connection.query(sql, values, (error, results) => {
      connection.release();

      if (error) {
        callback(error);
        return;
      }

      // Return the ID of the newly created record
      const insertedId = results.insertId;
      callback(null, insertedId);
    });
  });
  
};
