const sessionController = require("../controllers/sessioncontroller");
const { auth } = require("../auth/tokenGenerator");
const availableSessionsOpt = {
  schema: {
    headers: {
      type: "object",
      properties: {
        Authorization: { type: "string", minLength: 1 },
      },
      required: ["Authorization"],
    },
  },
  preHandler: [auth],
  handler: sessionController.sessionController,
};

const addSessionOpt = {
    schema : {
        body: {
            type: 'object',
            properties: {
                sessionId : { type: 'string' }
            }
        },
    },
    preHandler : [auth],
    handler : sessionController.addSessionController
}

module.exports = { availableSessionsOpt , addSessionOpt };
