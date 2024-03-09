# Requesty pro AI service

Event - request:
- body: {
    prompt: String
    realistic: Bool
}

Responses: 

200: {
    url: String 
}
Note: URL je do S3 bucketu

401: {}

500: {
    message: String
}
Note: message je custom error message


