const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { signToken } = require("../auth/tokenGenerator");
// This function if user exist or not
// Then if the entered password is wrong or right
// then if the user is valid then using the user id token will be given to the user in its header
exports.loginUser = async (req, res) => {
  try {
    let isStudent = true;
    let user = await prisma.user.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    if(user === null){
      isStudent = false;
      user = await prisma.deans.findUniqueOrThrow({
        where : {
          userId : req.body.userId,
        }
      })
    }
    if (req.body.password !== user.password) {
      throw new Error("Wrong password");
    }
    res.header(
      "Authorization",
      `Bearer ${signToken({userId : user.id,isStudent : isStudent}, "yajur-backend")}`
    );
    res.code(200).send({
      status: 200,
      message: "Success",
      data: {
        id : user.id,
      },
    });
  } catch (err) {
    const error = {
      status: 500,
      message: err.message,
      data: null,
    };
    return res.code(500).send(error);
  }
};
