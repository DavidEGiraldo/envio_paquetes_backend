let jwt = require("jsonwebtoken");

let userSchema = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, process.env.JWT_KEY);

  try {
    const user = await userSchema.findOne({
      email: data.email,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this" });
  }
};

module.exports = auth;
