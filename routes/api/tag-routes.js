const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    // be sure to include its associated Product data
    include: [Product],
    order: [["tag_name", "ASC"]],
  });
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tag = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [Product],
    order: [["tag_name", "ASC"]],
  });
  res.json(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  const createTag = await Tag.create(req.body);
  const tag = await Tag.findOne({
    where: {
      tag_name: req.body.tag_name,
    },
  });

  res.status(201).send(`New tag #${tag.id}: ${tag.tag_name} created`);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.findByPk(req.params.id);
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(202).send(`tag #${tag.id}: ${tag.tag_name} updated`);
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tag = await Tag.findByPk(req.params.id);
  const deleted = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`tag #${tag.id}: ${tag.tag_name} deleted`);
});

module.exports = router;
