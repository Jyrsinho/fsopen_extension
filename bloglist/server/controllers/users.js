const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// TODO - Täällä kun userit haetaan pitää aggregoida blogeista kunkin userin lisäämien blogien määrä
/*
1. Hae kaikki blogit
2. Filtteröi blogit joilla on käyttäjä
3.
 */
usersRouter.get("/", async (request, response) => {
  const users = await User.aggregate([
    {
      $lookup: {},
    },
  ]);
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password)
    return response.status(400).send({ error: "Password is required" });

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
