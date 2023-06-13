const fastify = require("fastify"); // Using fastify
const app = fastify();
// const fastifyJWT = require('fastify-jwt');
require('dotenv').config();
console.log("hdsigasuidfgasuidf")
// console.log(process.env.DATABASE_URL);
async function registerApp() {
  try {
    await app.register(require('./routes/router'));
    // await app.register(fastifyJWT, {
    //     secret: 'yajur-backend',
    // });
    app.ready().then(() => {
      console.log('successfully booted!');
    }, (err) => {
      console.log('an error happened ' + err);
    });
  } catch (error) {
    console.log(error);
  }
}

const start = async () => {
  try {
    await registerApp()
    await app.listen({port : 3000})
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}
start()
