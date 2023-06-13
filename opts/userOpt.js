const userController = require("../controllers/usercontroller")

const logInUserOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                userId : { type: 'number' },
                password : {type : 'string'}
            }
        },
    },
    handler: userController.loginUser,
}

module.exports = { logInUserOpts }