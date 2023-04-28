const Category = require("../models/Category");
const mapperCategory = require("../mappers/category");

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();

  const normalize = categories.map((category) => {
    return mapperCategory(category);
  });

  ctx.body = { categories: normalize };
};
