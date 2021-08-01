// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const { v4 } = require('uuid')
let response = {
    statusCode: 204,
    data: {},
    message: 'no content'
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        console.log('Event: ', JSON.stringify(event))

        const body = event.body
        const decodedBody = Buffer.from(body, 'base64').toString('utf-8')
        const jsonBody = JSON.parse(decodedBody)

        console.log('Decoded: ', decodedBody)
        console.log('Parsed: ', jsonBody)
        
        const uuid = v4()

        try {
            response = populateSuccessResponse(201, {
                username: jsonBody.username,
                token: uuid,
                timestamp: Date.now()
            })

            return response
        } catch (err) {
            throw new CustomErrorException("Whoops! Sorry!")
        }

    } catch (err) {
        throw JSON.stringify(err)
    }

};

/* global populateSuccessResponse */
populateSuccessResponse = (statusCode, data) => {
    return {
        statusCode: statusCode,
        data,
        message: 'success'
    }
}

function CustomErrorException (message) {
    this.message = message
    this.statusCode = 500
    this.data = {}
}