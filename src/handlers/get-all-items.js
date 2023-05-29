// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
// const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
// const dynamodb = require('aws-sdk/clients/dynamodb');
// const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
// exports.getAllItemsHandler = async (event) => {
//     if (event.httpMethod !== 'GET') {
//         throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
//     }
    // All log statements are written to CloudWatch
    // console.info('received:', event);

    // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html

    // let response = {};

    // try {
    //     const params = {
    //         TableName : tableName
    //     };
    //     const data = await docClient.scan(params).promise();
    //     const items = data.Items;

    //     response = {
    //         statusCode: 200,
    //         body: JSON.stringify(items)
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
// }



const AWS = require('aws-sdk');

const mysql = require('mysql');

exports.getAllItemshandler = async (event, context, callback) => {
  // Retrieve environment variables
  // const rdsEndpoint = process.env.DB_HOST;
  // const rdsUsername = process.env.DB_USERNAME;
  // const rdsPassword = process.env.DB_PASSWORD;
  // const dbName = process.env.DB_DATABASE;
  console.info('received:', event);

  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch

  // Create a connection pool
  const pool = mysql.createPool({
    host: rdsEndpoint,
    user: rdsUsername,
    password: rdsPassword,
    database: dbName
  });
  
  

  // console.log(pool);
  // pool.getConnection((error, connection) => {
  //   if (error) {
  //     callback(error);
  //     return error;
  //   }

  // }) 
  // // Get the data from the 'employees' table
  // const sql = 'SELECT * FROM employees';
  // console.log(event)
  pool.query("SELECT * FROM employees",(err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    // rows fetch
    console.log(data);
    return data;
  });


    // connection.query(sql, (error, results) => {
    //   connection.release();

    //   if (error) {
    //     callback(error);
    //     return;
    //   }

      // Return the retrieved data
      // const employees = results;
      // console.log(results)
      // callback(null, employees);
      
    // });
  // });
};