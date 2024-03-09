/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
//const serviceUrl = "https://ug3t546pekuubymajlnqywgoda0pffhh.lambda-url.eu-west-1.on.aws/";
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


// Enable CORS for all methods
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/** DB DRIVER THINGIES PRESUNOU NEKAM SDILENE, overhead connectu neefektivni */

const { Client } = require('pg');


// Connection information
const writeConnectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';
//TODO pool instead of client
const sqlSafe = function(param){
  return "'"+param+"'";
}
//return undefined = vyhozena exception
const executeQuery = async function(query){
  if(!query){
    throw new Error("No query provided!");
  }
  const client = new Client({
    connectionString: writeConnectionString
  });
  await client.connect();
  let result = null;
  try{
    result = await client.query(query);
  }
  catch(sqlException){
    console.log(sqlException.message);
    return;
  }finally{
    client.end();
  }
  return result;
}


/** DB DRIVER THINGIES OVER  */

/** BYZN LOGIC SIDE - move somewhere else */
const createGroup = async(groupName, ownerId) =>{
  created = await executeQuery(`INSERT INTO groups(name,owner) VALUES(${sqlSafe(groupName)},${sqlSafe(ownerId)})`);
  return created;
}


const fetchUserInfoByEmail = async (email) =>{
  const user = await executeQuery(`SELECT * FROM users where email = ${sqlSafe(email)}`);
  return user;
}
const fetchGroupById = async (groupId) => {
  const group = await executeQuery(`SELECT * FROM groups WHERE id=${sqlSafe(groupId)}`);
  return group;
}

const addUserToGroup = async(userId, groupId) => {
  const result = await executeQuery(`INSERT INTO group_user_relations(user_id,group_id) VALUES (${sqlSafe(userId)},${sqlSafe(groupId)})`);
  return result;
}
/** BYZN LOGIC SIDE END  */

app.post('/group', async function(req, res) {
  const {ownerId, groupName} = req.body;
  if(!ownerId || !groupName || !Number.isInteger(ownerId)){
    res.status(400).json({"error":"missing mandatory parameter {ownerId}:int or {groupName}:string"});
    return;
  }
  const created = await createGroup(groupName,ownerId);
  //db write failed
  if(created === undefined){
    res.status(500).json({"error":`failed to create group with name: ${groupName}.`});
    return;
  }
  res.status(200).json({"message": `group with name ${groupName} created.`});
});

app.post('/group/:groupId/member',async function(req, res) {
  const email = req.body?.email;
  const groupId = req.params?.groupId;
  if(!email || !groupId){
    res.status(400).json({"error":"missing mandatory params {email} or {groupId}."});
    return;
  }
  const user = await fetchUserInfoByEmail(email);
  if(!user ||!user.rows.length){
    res.status(400).json({"error":"user with email: "+email+" doesnt exist."});
    return;
  }
  console.log(groupId,email);
  const group = await fetchGroupById(groupId);
  if(!group ||!group.rows.length){
    res.status(400).json({"error":"group with id "+groupId+" doesnt exist."});
    return;

  }
  console.log("ADD USER TO GROUP");
  const result = await addUserToGroup(user.rows[0].id,groupId);
  if(!result){
    res.status(500).json({"error":`failed to add user with email ${email} to group ${groupId}`});
  }
  //await tmp.end();
  res.status(200).json({"message": `member ${email} added to group ${groupId}.`});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
