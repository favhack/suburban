/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const connectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ro-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';
const writeConnectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';
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


const readClient = new Client({
  connectionString: connectionString
})

const writeClient = new Client({
  connectionString: writeConnectionString
})

/**********************
 * Example get method *
 **********************/

app.get('/schedule', async function(req, res) {
  var gId = req.body?.groupId
  var sId = req.body?.scheduleId
  if(  !gId && !sId){
    res.status(400).json("Missing mandatory values  id or type")
    console.log("Missing mandatory values  id or type")
    return res
  }

  if(!gId){
    console.log("gotgId")
    var result= await getScheduleById(sId)//getData(id,type) //
    if(!result){
      res.status(400).json("No schedule ")
      console.log("No schedule ")
      return res
    }
  }
  else{
    var result= await getScheduleByGroup(gId)//getData(id,type) //

    if(!result){
      res.status(400).json("No schedule ")
      console.log("No schedule ")
      return res
    }
  }

  if(result!= null){
    res.status(200).json({"result":result})
    return res
  }
  else{
    res.status(400).json("No schedule ")
    console.log("No schedule ")
    return res
  }
});



/****************************
* Example post method *
****************************/

app.post('/schedule', async function(req, res) {
  
  var activities = req.body?.activity
  var groupId = req.body?.groupId
  
  if(!activities || !groupId){
    res.status(400).json("Missing mandatory atribute activity or groupId")
    console.log("Missing mandatory atribute activity")
    return res
  }

  
  if(await validateSchedule(activities)){
    await writeClient.connect()
    result = await addSchedule(activities,groupId)
    writeClient.end()
    if(result){
      res.status(200).json({success: 'post call succeed!', url: req.url, body: req.body})
    }
    else{
      res.status(500).json("error in comiting to database")
    }
    return res
  }else{
    res.status(400).json("id of img not found in database")
    console.log("id of img not found in database")
    return res
  }

});

async function validateSchedule(activity){
  
  const numbersArray = activity.split(',');

// Join the array elements with commas inside parentheses
  const resultString = `(${numbersArray.join(', ')})`;
  await readClient.connect();
  var result =await getImgById(resultString)
  
 
  if(result.rowCount != numbersArray.length){ // !chekId(id)
    readClient.end()
    return false
  }
  
  readClient.end()
  return true
}
/****************************
* Data functions *
****************************/


async function  getImgById(id){
  try{
    let result = await readClient.query("SELECT * FROM images WHERE id IN "+id)
    return result
  }
  catch(exeption){
      return null
  }

 

}

async function addSchedule(schedule,groupId){
  try{
    let result = await writeClient.query("INSERT INTO  schedules (group_id, activities) VALUES ("+groupId+",'"+schedule+"')")
    return true
  }
  catch(exeption){
    return false
  }
  

}

async function  getScheduleById(id){
  readClient.connect()
  try{
    let result = await readClient.query("SELECT * FROM schedules WHERE id="+id)
    readClient.end()
    return result.rows
  }
  catch(exeption){
    readClient.end()
    return null
  }


}

async function getScheduleByGroup(gId){
  console.log("IN getScheduleByGroup")
  readClient.connect()
  try{
    console.log("IN TRy")
    let result = await readClient.query("SELECT * FROM schedules WHERE group_id="+gId)
    readClient.end()
    return result.rows
  }
  catch(exeption){

    readClient.end()
    return null
  }


}


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
