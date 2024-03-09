/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const aws = require('aws-sdk')
const s3 = new aws.S3({ apiVersion: '2006-03-01' })
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const connectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ro-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';
const writeConnectionString = 'postgresql://postgres:suburbanhackathon2024@hack-rds-2.cluster-ch0wsekc6bds.eu-west-1.rds.amazonaws.com:5432/postgres';

const readClient = new Client({
    connectionString: connectionString
  })
  
  const writeClient = new Client({
    connectionString: writeConnectionString
  })

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.route('/image').post(async (req, res) => {
        //TODO Only a mock
        const { fileName, base64Buffer, group } = req.body;

        if (!fileName || !base64Buffer || typeof group !== 'number') 
            return res.status(400).json({ message: 'Invalid request body or group is not a number'});
        
        
        result = await insertImg(fileName,base64Buffer,group)
        if(result)
            return res.status(200).json({
            message: 'Image uploaded',
            fileName,
            group,
            });
        
        else
            return res.status(500).json({
            message: 'Erro inserting into database',
            });
    })
    .get(async function(req, res) {
        result = await getAllImg()
        if(result)
            return res.status(200).json({
            message: 'Image found',
            fileName,
            group,
            });
    
        else
            return res.status(400).json({
            message: 'Immage not found',
            });
    });

app.route('/image/:imageId')
    .get(async (req, res) => {
        var imgId = req.params.imageId
        result = await getImg(imgId)
        if(result)
            return res.status(200).json({
            message: 'Image found',
            fileName,
            group,
            });

        else
            return res.status(400).json({
            message: 'Immage not found',
            });
    })
    .delete(async (req, res) => {
        var imgId = req.params.imageId
        result = await removeImg(imgId)
        if(result)
            return res.status(200).json({
            message: 'Image deleted',
            fileName,
            group,
            });

        else
            return res.status(400).json({
            message: 'Immage not deleted',
            });
    });

app.post('/image/sync', async (req, res) => {
    const {groupId, fileIds, tags} = req.params;
    if (!Array.isArray(fileIds) || !Array.isArray(tags))
        return res.status(400).json({message: 'Invalid body'});
    
    missingUid = await getMissinguIdImgs(fileIds)
    missingTags = await getMissingTags(tags)
   
    res.json({
        images: missingUid,
        tags: missingTags
    });
});




/******
 * Database conections * 
                *******/

async function getMissingTags(tagArray){
    const formattedString = `(${tagArray.join(', ')})`;
    console.log("FORMATED tags",formattedString)

    readClient.connect()
    try{
      let result = await readClient.query("SELECT uid FROM images WHERE id NOT IN "+id)
      readClient.end()
      return result.rows
    }
    catch(exeption){
      readClient.end()
      return null
    }
}



async function getMissinguIdImgs(idArray){
    const formattedString = `(${idArray.join(', ')})`;
    console.log("FORMATED IDS",formattedString)

    readClient.connect()
    try{
      let result = await readClient.query("SELECT uid FROM images WHERE id NOT IN ?", [id])
      readClient.end()
      return result.rows
    }
    catch(exeption){
      readClient.end()
      return null
    }
}

async function removeImg(imgId){
    writeClient.conect()
    try{
        let result = await writeClient.query("DELETE FROM  images where id= ?",[imgId])
        writeClient.end()
        return true
    }
    catch(exeption){
        writeClient.end()
        return false
    }

}
async function getAllImg(){
    readClient.connect()
    try{
      let result = await readClient.query("SELECT id,uid FROM images")
      readClient.end()
      return result.rows
    }
    catch(exeption){
      readClient.end()
      return null
    }
}

async function getImg(imgId){
    readClient.connect()
    try{
      let result = await readClient.query("SELECT uid FROM images WHERE id=?",[imgId])
      readClient.end()
      return result.rows
    }
    catch(exeption){
      readClient.end()
      return null
    }
}

async function insertImg(fileName,uid){
    writeClient.conect()
    try{
        let result = await writeClient.query("INSERT INTO  images (uid, name) VALUES (?,?)",[uid,fileName])
        writeClient.end()
        return true
    }
    catch(exeption){
        writeClient.end()
        return false
    }

}

app.listen(3000, function() {
    console.log("App started")
});




  // Add your code here
module.exports = app
