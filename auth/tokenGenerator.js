const fastifyJWT = require('fastify-jwt');
const { v4: uuidv4 } = require('uuid');

// Initialize the JWT plugin separately
const jwt = require('jsonwebtoken');

// Define a function to sign the token
const signToken = (payload,secret) => {
  const token = jwt.sign({tokenId : uuidv4(),...payload},secret);
  return token;
};


// Define a function to verify the token
const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

const auth = async function (req, res, done) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const secret = 'yajur-backend'; // Replace with your actual secret key
    const decoded = verifyToken(token, secret); // Verify the token using the verifyToken function
    // Access the decoded token payload
    req.id = decoded.userId;
    req.isStudent = decoded.isStudent;
    done();
  } catch (error) {
    return res.status(401).send({
      status : 401,
      message : error.message,
      data : null
    });
  }
};

module.exports = { signToken , auth};
