import json
import base64
import io
import json
import os
import sys
import boto3
from botocore.config import Config
import base64
import uuid
import logging

def lambda_handler(event, context):
    # TODO implement
    print(json.dumps(event))
    """
    event = {
        "prompt": "mmůž v plavkách na pláži",
        "realistic": "true",
        "groupId" : "100",
        "fileName" : "foo.png"
    }
    """

    cesky_prompt = event["prompt"]
    realistic = event["realistic"]
    groupId = event["groupId"]
    unique_file_name = event["fileName"] + ".png"
    
        
    module_path = ".."
    sys.path.append(os.path.abspath(module_path))
    #from utils import bedrock, print_ww
    
    
    # ---- ⚠️ Un-comment and edit the below lines as needed for your AWS setup ⚠️ ----
    
    # os.environ["AWS_DEFAULT_REGION"] = "<REGION_NAME>"  # E.g. "us-east-1"
    # os.environ["AWS_PROFILE"] = "<YOUR_PROFILE>"
    # os.environ["BEDROCK_ASSUME_ROLE"] = "<YOUR_ROLE_ARN>"  # E.g. "arn:aws:..."
    my_config = Config(
    region_name='us-west-2'
    )
    
    boto3_bedrock = boto3.client("bedrock-runtime", config=my_config)
    
    
    client = boto3.client('translate')
    
    
    try:
        response = client.translate_text(
            Text=cesky_prompt,
            TerminologyNames=[
            ],
            SourceLanguageCode='cs',
            TargetLanguageCode='en',
            Settings={
                'Formality': 'FORMAL',
                'Profanity': 'MASK',
                #'Brevity': 'Formality'
            }
        )
        
    except:
        return {
            "statusCode": 500,
            "messages": "Could not translate the text.",
        }
    
    # realistic vs simplified model 
    if realistic.lower() == 'true':
        stable_version = "realistic picture of "
        negative_prompts = "simplified, drawing, cartoon, stickman"
    else:
        stable_version = "simple stick drawing of "
        negative_prompts = "realistic, not simple, difficult"
    prompt = stable_version + response["TranslatedText"]
    
    
    
    
    request = json.dumps(
    {
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": prompt,                    # Required
            "negativeText": negative_prompts   # Optional
        },
        "imageGenerationConfig": {
            "numberOfImages": 1,   # Range: 1 to 5 
            "quality": "standard",  # Options: standard or premium
            "height": 512,        # Supported height list in the docs 
            "width": 512,         # Supported width list in the docs
            "cfgScale": 2.0,       # Range: 1.0 (exclusive) to 10.0
            "seed": 23            # Range: 0 to 214783647
        }
    }
)

    try:
        response = boto3_bedrock.invoke_model(
            body=request,
            modelId="amazon.titan-image-generator-v1",
            accept="application/json", 
            contentType="application/json"
        )
        
    except:
        return {
            "statusCode": 500,
            "messages": "Could not invoke the model.",
        }
    response_body = json.loads(response.get("body").read())
    img1_b64 = response_body["images"][0]
    img = base64.b64decode(img1_b64) #png

    
    # tagging
    model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
    input_text = "Give me simple lowercase tokens without period at the end separated by coma describing this object ordered by relevance"
    image = img1_b64
    max_tokens = 100
    
    
    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": input_text},
                    {"type": "image", "source": {"type": "base64",
                                                 "media_type": "image/jpeg", "data": img1_b64}}
                ]
            }
        ]
    })
    
    try:
        response = boto3_bedrock.invoke_model_with_response_stream(body=body, modelId=model_id)
    
    except:
        return {
            "statusCode": 500,
            "messages": "Could not invoke the model."
        }
    
    big_string = ""
    for event in response.get("body"):
        chunk = json.loads(event["chunk"]["bytes"])
    
        if chunk['type'] == 'content_block_delta':
            if chunk['delta']['type'] == 'text_delta':
                tag = str(chunk['delta']['text'])
                big_string += tag
                
    
    # UUID
    tags = big_string.split(",")
    tag = tags[0].replace(" ", "")
    file_uuid = uuid.uuid4()
    name = tag
    # unique_file_name = f"{name}-{file_uuid}" + ".png"
   
    
    # translate tags
    try:
        response = client.translate_text(
            Text=big_string,
            TerminologyNames=[
            ],
            SourceLanguageCode='en',
            TargetLanguageCode='cs',
            Settings={
                'Formality': 'FORMAL',
                'Profanity': 'MASK',
                #'Brevity': 'Formality'
            }
        )
        
    except:
        return {
            "statusCode": 500,
            "messages": "Could not translate the text.",
        }
    tags_cs = response["TranslatedText"]

    
    #decoded = base64.b64decode(coded_string)
    try:
        with open('/tmp/' + unique_file_name, 'wb') as output_file:
            output_file.write(img)
    except:
        return {
            "statusCode": 500,
            "messages": "Could not open the directory.",
        }
        
    s3_client = boto3.client('s3')
    try:
        source_filename = "/tmp/" + unique_file_name
        bucket_name = "generateimages"
        dest_filename = "/tmp/" + unique_file_name
        
        

        response = s3_client.upload_file(source_filename, bucket_name, dest_filename)
        
    
    except:
        return {
            "statusCode": 500,
            "messages": "Could not upload the file.",
        }
    
    url = "/tmp/" + unique_file_name
    
    
    
    
    # final post - successful       
    return {
    'statusCode': 200,
    'url': url,
    "tags": tags_cs,
    
    }
   
        
    
    
            