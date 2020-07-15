const router = require("express").Router();

const Shop = require("../db").import("../models/shop");

// GET
router.get("/", (req, res) => {
  Shop.findAll({
    where: {},
  })
    .then((shops) =>
      res.status(200).json({
        shops: shops,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", (req, res) => {
  const shopFromRequest = {
    nameOfShop: req.body.nameOfShop,
    address: req.body.address,
    closestTrail: req.body.closestTrail,
    hours: req.body.hours,
    owner_id: req.user.id,
  };
  Shop.create(shopFromRequest)
    .then((shop) =>
      res.status(200).json({
        shop: shop,
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
  Shop.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((shop) =>
      res.status(200).json({
        shop: shop,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.delete("/:id", (req, res) => {
  Shop.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((shop) =>
      res.status(200).json({
        shop: shop,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
