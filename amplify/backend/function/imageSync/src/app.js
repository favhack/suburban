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
const s3 = new aws.S3();

const BUCKET = "generateimages";
const FOLDER_PREFIX = "/tmp/";

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

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

const executeDdbQuery = async function(prompt,userId,realistic,groupId,filename){
    const ddb = new aws.DynamoDB();
    const params = {
        TableName: "DynamoEventHandler-v7evq7zvc5cwxnlpysjasjfmi4-ui",
        Item: {
            userId :{S: `${userId}`},
            prompt: {S:`${prompt}`},
            timestamp:{S: `${new Date().toISOString()}`},
            realistic:{S: `${realistic}`},
            groupId: {S: `${groupId}`},
            filename: {S: `${filename}`}
        }

    }
    console.log("putting item",params);
    const res = await ddb.putItem(params).promise();

    return res;

}

/** DB DRIVER THINGIES OVER  */

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


const getFileShareUrl = async (fileId) =>{
    const params = {
        Bucket: "generateimages",
        Key: fileId,
    }
    let data = null;
    try{
        data = await s3.getObject(params).promise();
    }catch(exception){
        console.log(exception);
        return null;
    }
    if(!data.Body){
        return null;
    }
    return data.Body.toString("base64");
}

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
//uploads image to s3 bucket
app.route('/image').post(async (req, res) => {
        const { fileName, base64Buffer, group } = req.body;
        if (!fileName || !base64Buffer || typeof group !== 'number') 
            return res.status(400).json({ message: 'Invalid request body or group is not a number'});
        const result = await insertImg(fileName,base64Buffer,group);
        if(!result)
            return res.status(500).json({message:"Failed to upload file."});
        return res.status(200).json({
            message: 'Image uploaded',
            fileName,
            group,
        });
    })
    .get(function(req, res) {
      res.json({success: 'Image test!', url: req.url, body: req.body})
    });

async function fetchImageUid(imageId) {
    const result = executeQuery(`SELECT uid from images WHERE id=${sqlSafe(imageId)}`);
    return result;
}

app.route('/image/:imageId')
    .get(async (req, res) => {
        console.log(req.params);
        const imageId = req.params?.imageId;
        if(!imageId)
            return res.status(400).json({message:"imageId not provided or not a number."});
        const tmp = await fetchImageUid(imageId);
        if(!tmp || !tmp.rows.length)
            return res.status(404);
        const uid = tmp.rows[0].uid;
        console.log("image uid " ,uid);
        if(tmp == null){
            return res.status(404);
        }
        const objectShare = await getFileShareUrl(uid);
        res.json({image: objectShare});
    })
    .delete((req, res) => {
        res.json({sucess: 'Image not deleted!'});
    });

app.post('/image/sync', async (req, res) => {
    const {groupId, fileIds, tags} = req.body;
    console.log(req);
    if (!Array.isArray(fileIds) || !Array.isArray(tags))
        return res.status(400).json({message: 'Invalid body'});
    console.log("FETCHING IMAGES AND TAGS");
    const missingTags = await getMissingTags(tags);
    let missingImages = await getMissingImages(fileIds, groupId);
    console.log(missingImages);
    missingImages = await getImages(missingImages);
    res.status(200).json({
        images: missingImages,
        tags: missingTags
    });
});
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function generateAiImageFname (){
    return "AI_IMAGE"+makeid(10);
}
async function generateImage(prompt, userId,realistic,groupId,filename){
    console.log("generating image",prompt,userId,realistic);
    return await executeDdbQuery(prompt,userId,realistic,groupId,filename)
}


app.post('/image/generate', async (req, res) =>{
    let {prompt,userId,realistic,groupId} = req.body;
    let filename = generateAiImageFname();
    if(!prompt || !userId || !groupId)
        return res.status(400).json({message: "param {prompt} not provided or param {userId} not provided or param {groupId} not provided."});
    console.log("generating image for prompt: "+prompt);
    if(!realistic)
        realistic = "false";
    const image = await generateImage(prompt,userId,realistic,groupId,filename);
    
    if(!image){
        return res.status(500).json({message: "failed to generate image. Try again later."});
    }
    console.log("inserting metadata");
    filename = `${filename}.png`;
    await insertImgMetadata("/tmp/"+filename,filename,groupId);
    console.log("metadata inserted");
    
    return res.status(200).json({message:"generate request added to the queue.",filename:filename});


});

async function getMissingTags(tagArray){
    const formattedString = tagArray.length >0?` WHERE id NOT IN (${tagArray.join(', ')})`:"";
    console.log("FORMATED tags",formattedString)

    try{
      const result = await executeQuery(`SELECT * FROM tags ${formattedString}`);
      if(result)
        return result.rows
    }
    catch(exception){
      console.log("Exception: "+exception.message);
    }

    return null;
}
//get shared urls for images in uidArray email
async function getImages(uidArray){
    const urls = [];
    for(let i = 0 ; i < uidArray.length; i++){
        const uid = uidArray[i].uid;
        console.log("fetching file with uid",uid);
        const id = uidArray[i].id;
        const url = await getFileShareUrl(uid);
        //failed to create url, skipping the file
        if(url == null)
            continue;
        const tmpObject = {id,url}
        urls.push(tmpObject);        
    }
    return urls;
}
//fetch all images for group groupId and id not in idArray
async function getMissingImages(idArray, groupId){
    const formattedString = idArray.length > 0? `AND id NOT IN (${idArray.join(', ')})`:"";
    console.log("FORMATED IDS",formattedString)
    try{
      let result = await executeQuery(`
      SELECT uid,images.id 
      FROM images 
      INNER JOIN image_group_relation ON  images.id = image_group_relation.image_id WHERE image_group_relation.group_id=${sqlSafe(groupId)} 
      ${formattedString}`);
      return result.rows
    }
    catch(exception){
        console.log(exception);
    }
    return null;
}

async function uploadFileToBucket(fileName,base64Buffer){   
    let buffer = null;
    let result = null;
    try{
        buffer = Buffer.from(base64Buffer,"base64");
    }
    catch(decodeException){
        console.log("Decoding from base64 failed for buffer: "+base64Buffer);
        return null;
    }
    const params = {
        Bucket: BUCKET, // The name of the bucket
        Key: FOLDER_PREFIX+fileName,      // The filename to be saved as in S3
        Body: buffer,       // The decoded file content
        ContentEncoding: 'base64', // required if you are uploading base64 encoded data
        ContentType: 'image/png' // Or the appropriate content type of your file
      };
    
    try{
        const bucketUpload = new aws.S3.ManagedUpload({params});
        result = await bucketUpload.promise();
        console.log("UPLOAD");
        console.log(result);

    }
    catch(uploadException){
        console.log(uploadException.message);
    }

    return result;

}
async function insertImgMetadata(fileKey,fileName,groupId){
    const client = new Client({
        connectionString: writeConnectionString
      });
    try {
        //not nice at all
        await client.connect();
        await client.query('BEGIN;');
        const insertImageResult = await client.query(
          `INSERT INTO images(uid,name) VALUES (${sqlSafe(fileKey)},${sqlSafe(fileName)}) RETURNING id;`);
        const imageId = insertImageResult.rows[0].id;
        console.log("IMAGE ID IS: "+imageId);
        await client.query(
          `INSERT INTO image_group_relation(group_id, image_id) VALUES (${sqlSafe(groupId)}, ${sqlSafe(imageId)});`
        );
        result = await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        console.log(error.message);
      } finally {
        client.end();
      }
      return result;
}

async function insertImg(fileName,base64Buffer,groupId){
    console.log("UPLOADING FILE: "+fileName +" TO BUCKET.");
    const s3Result = await uploadFileToBucket(fileName,base64Buffer);
    //neni 200 - mohlo spadnout na 413 - payload too large nebo generic server error
    if(!s3Result){
        return null;
    }
    const fileKey = s3Result.Key;
    
    return await insertImgMetadata(fileKey,fileName,groupId);

}

app.listen(3000, function() {
    console.log("App started")
});

  // Add your code here
module.exports = app
