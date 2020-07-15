const router = require("express").Router();

const Trail = require("../db").import("../models/trail");

// GET
router.get("/", (req, res) => {
  Trail.findAll({
    where: {},
  })
    .then((trails) =>
      res.status(200).json({
        trails: trails,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", (req, res) => {
  const trailFromRequest = {
    nameOfPark: req.body.nameOfPark,
    address: req.body.address,
    length: req.body.length,
    trailOptions: req.body.trailOptions,
    owner_id: req.user.id,
  };
  Trail.create(trailFromRequest)
    .then((trail) =>
      res.status(200).json({
        trail: trail,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// UPDATE BY ID
router.put("/:id", (req, res) => {
  Trail.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((trail) =>
      res.status(200).json({
        trail: trail,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.delete("/:id", (req, res) => {
  Trail.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((trail) =>
      res.status(200).json({
        trail: trail,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
