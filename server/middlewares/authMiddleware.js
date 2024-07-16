import jwt from "jsonwebtoken";

//Decode token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        message: "Access denied",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.send({
      message: "Invalid token",
      success: false,
    });
  }
};

export default authMiddleware;
