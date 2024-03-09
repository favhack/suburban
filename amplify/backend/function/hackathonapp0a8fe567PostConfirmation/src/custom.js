/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const writeConnectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';
const { Client } = require('pg');
const writeClient = new Client({
  connectionString: writeConnectionString
})

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));
  await insertUser(event.userName)
  return event;
}; 

async function insertUser(userName){
  await writeClient.connect()
  console.log(userName)
  try{
    result = await writeClient.query("INSERT INTO users (username) VALUES ($1)", [userName])
    console.log(result)
    writeClient.end()
    return result
  }
  catch(exeption){
    console.log(exeption)
    writeClient.end()
    return null
  }
 
}
