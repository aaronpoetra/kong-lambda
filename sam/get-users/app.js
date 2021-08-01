// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const { v4 } = require('uuid')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey
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
        const users = []

        for (let index = 0; index < 5; index++) {
            const shortName = uniqueNamesGenerator({
                dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
                length: 2,
                separator: ''
            })
            users.push(
                {
                    username: shortName,
                    gender: 'male',
                    token: v4()
                }
            )
        }

        try {
            response = populateSuccessResponse(200, users)

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