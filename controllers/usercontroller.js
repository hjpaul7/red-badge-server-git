const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userRole: "user",
  }).then(
    (createSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "user created",
        sessionToken: token,
      });
    }),
    (createError = (err) => res.send(500, err))
  );
});

// Login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "You have succesfully logged in",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Bad Gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "Failed to authenticate" });
      }
    },
    (err) => res.status(501).send({ error: "Failed to process" })
  );
});

// Update User (Admin)
router.put("/:id", (req, res) => {
  User.update(req.body.user, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) =>
      res.status(200).json({
        user: user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;

// Get Users (Admin)
router.get("/", (req, res) => {
  User.findAll({
    where: { id: req.user.id }, include: ['times']
  })
    .then((users) =>
      res.status(200).json({
        users: users,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// Admin Signup User
router.post("/adminregister", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userRole: req.body.userRole,
  }).then(
    (createSuccess = (user) => {
      res.json({
        user: user,
        message: "user created",
      });
    }),
    (createError = (err) => res.send(500, err))
  );
});

// Admin User Delete
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((user) =>
    res.status(200).json({
      user: user,
    })
  );
});

// User Portal Get User by ID`
router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
      // id: req.params.id,
      // id: req.user.id,
    },
  })
    .then((user) =>
      res.status(200).json({
        user: user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});
