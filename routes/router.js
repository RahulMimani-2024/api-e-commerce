const {logInUserOpts}  = require("../opts/userOpt")
const {availableSessionsOpt,addSessionOpt} = require("../opts/sessionOpt")
function routes(fastify, options, done) {
    // USER ENDPOINTS
    fastify.post('/api/login', logInUserOpts) // User to login here using userId and password
    fastify.get('/api/sessions',availableSessionsOpt) 
    fastify.post('/api/addSession',addSessionOpt)
    done()
}
module.exports = routes;
