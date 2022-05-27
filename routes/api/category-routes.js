const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include: {
      model: Product,
      require: true,
      attributes: ["product_name"],
    },
    order: [["category_name", "ASC"]],
  });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const categories = await Category.findAll({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      require: true,
      attributes: ["product_name"],
    },
  });
  // be sure to include its associated Products
  res.json(categories);
});

router.post("/", async (req, res) => {
  // create a new category
  console.log(req.body);
  const newCategory = await Category.create(req.body);
  res.status(201).send("added new category");
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(202).send("category name updated");
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
});

module.exports = router;
