const Products = require("../models/Product");
const mapperProduct = require("../mappers/product");
const { default: mongoose } = require("mongoose");

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const { subcategory } = ctx.query;

  if (!subcategory) return next();

  validateObjectId(ctx, subcategory);
  const products = await Products.find({ subcategory: subcategory });

  const normalize = products.map((product) => mapperProduct(product));

  ctx.body = { products: normalize || [] };
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Products.find();

  const normalize = products.map((product) => mapperProduct(product));

  ctx.body = { products: normalize || [] };
};

module.exports.productById = async function productById(ctx, next) {
  const { id } = ctx.params;

  validateObjectId(ctx, id);

  const product = await Products.findOne({ _id: id });
  if (!product) {
    ctx.throw(404, "not found");
    return;
  }

  ctx.body = { product: mapperProduct(product) };
};

function validateObjectId(ctx, id) {
  if (!mongoose.isValidObjectId(id)) {
    ctx.throw(400, "invalid id");
    return false;
  }
}
