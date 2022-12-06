let mongoose = require("mongoose"),
  express = require("express"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  router = express.Router();

let userSchema = require("../models/User");
const auth = require("../middleware/auth")
require("dotenv").config();

// CRUD

//User register
//http://localhost:5000/users/create
router.route("/create").post((req, res, next) => {
  const user = new userSchema(req.body);
  console.log(user.email);

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
  console.log(token);
  user.tokens = user.tokens.concat({ token });

  userSchema.create(user, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(201).send({ user, token });
    }
  });
});

//User login
//http://localhost:5000/users/create
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const user = await userSchema.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error({ error: "User not found!" });
    }

    console.log(password);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
    console.log(token);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/me").get(auth,(req, res, next) => {
    res.send(req.user)
})

//User Logout
router.route("/me/logout").post( auth, async (req, res) =>{
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token;
            });
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send(error);
        }
    })

router.route("/me/logoutAll").post( auth, async (req, res) => {
    try {
        req.user.token.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
