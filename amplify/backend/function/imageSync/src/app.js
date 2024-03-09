/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.route('/image')
    .post((req, res) => {
        //TODO Only a mock
        const { fileName, base64Buffer, group } = req.body;
        if (!fileName || !base64Buffer || typeof group !== 'number') 
            return res.status(400).json({ message: 'Invalid request body or group is not a number'});
        return res.status(200).json({
            message: 'Image uploaded',
            fileName,
            group,
        });
    })
    .get(function(req, res) {
      res.json({success: 'Image test!', url: req.url, body: req.body})
    });

app.route('/image/:imageId')
    .get((req, res) => {
        res.json({image: req.params.imageId});
    })
    .delete((req, res) => {
        res.json({sucess: 'Image not deleted!'});
    });

app.post('/image/sync', (req, res) => {
    const {groupId, fileIds, tags} = req.params;
    if (!Array.isArray(fileIds) || !Array.isArray(tags))
        return res.status(400).json({message: 'Invalid body'});
    res.json({
        images: [
            {
                id: 10,
                filename: "hello.png",
                buffer: "BLA",
                groupId: 1
            }
        ],
        tags: [
            {
                id: 5,
                name: "kocka"
            }
        ]
    });
});

app.post('/image/generate', (req, res) => {
    const {prompt} = req.body;
    if (!prompt)
        return res.status(400).json({message: 'Invalid body'});
    res.json({
        id: 10,
        buffer: "TEST"
    });
})

app.listen(3000, function() {
    console.log("App started")
});

  // Add your code here
module.exports = app
