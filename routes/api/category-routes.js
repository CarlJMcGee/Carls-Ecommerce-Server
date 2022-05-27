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
  const categoryId = await Category.findOne({
    where: {
      category_name: req.body.category_name,
    },
  });
  res.status(201).send("added new category #" + categoryId.id);
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
  const category = await Category.findByPk(req.params.id);
  const deleted = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`Deleted ${category.category_name}`);
});

module.exports = router;
