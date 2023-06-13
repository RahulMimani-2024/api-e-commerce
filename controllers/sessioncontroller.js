const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.sessionController = async (req, res) => {
  try {
    // Fetch all deans along with their free sessions
    if (req.isStudent === true) {
      const currentTime = new Date();
      const deansWithSessions = await prisma.deans.findMany({
        select: {
          id: true,
          Session: {
            select: {
              id: true,
              startTime: true,
              endTime: true,
            },
            where: {
              isFree: true,
              startTime: {
                gte: currentTime,
              },
            },
          },
        },
      });
      res.code(200).send({
        status: 200,
        message: "Success",
        data: {
          id: req.id,
          deansWithSessions,
        },
      });
    } else {
      const currentTime = new Date();
      const bookedSessions = await prisma.session.findMany({
        where: {
          isFree: false,
          deansId : req.id,
          startTime: {
            gte: currentTime,
          },
        },
        select: {
          startTime: true,
          endTime: true,
          userId: true,
        },
      });
      res.code(200).send({
        status: 200,
        message: "Success",
        data: {
          id: req.id,
          bookedSessions,
        },
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

exports.addSessionController = async (req, res) => {
  try {
    if (req.isStudent === false) {
      throw new Error("Unauthorized to add session");
    }
    const sessionId = req.body.sessionId;
    const userId = req.id;
    const session = await prisma.session.findUnique({
      where: { id: req.body.sessionId },
    });

    if (!session) {
      return res.status(404).send({
        status: 404,
        message: "Session not found",
        data: null,
      });
    }

    if (!session.isFree) {
      return res.status(400).send({
        status: 400,
        message: "This session is already booked",
        data: null,
      });
    }
    // Update the session to mark it as not free and associate it with the user
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        isFree: false,
        userId,
      },
    });
    res.code(200).send({
      status: 200,
      message: "Success",
      data: updatedSession,
    });
  } catch (error) {
    res.code(500).send({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
