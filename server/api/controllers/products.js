const {
  NotFoundInCatch,
  error500,
  error404,
  error422
} = require("../lib/error");
const {
  getAllResponse,
  createResponse,
  updateResponse,
  getOneResponse,
  response
} = require("../lib/response");

const Products = require("../models/Products");

const create = (req, res, next) => {
  const products = new Products(req.body);
  products
    .save()
    .then(product => {
      createResponse(res, product);
    })
    .catch(err => {
      error422(res, err);
      error500(
        res,
        err.message || "Some error occurred while creating the product."
      );
    });
};

const findAll = (req, res, next) => {
  Products.find()
  .where(filter)
  .populate('Category')
  .populate('Origin')
    .then(products => {
      getAllResponse(res, products);
    })
    .catch(err => {
      error500(
        res,
        err.message || "Some error occurred while retrieving product."
      );
    });
};

const getProduct = (req, res, next) => {
  const filter = req.body.filter || '';
  const sort = {
    [req.body.sortKey || "_id"]: req.body.sortOrder || 1
  };
  const pageOptions = {
    page: req.body.page || 0,
    limit: req.body.limit || 10
  }
  Products.find()
  .where(filter)
  .sort(sort)
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('Category')
  .populate('Origin')
  .then(products => {
    Products.collection.countDocuments(filter).then(totalCount => {
      const data = {
        products,
        totalCount,
        ...pageOptions
      };
      getAllResponse(res, data);
    });
  })
  .catch(err => {
    error500(
      res,
      err.message || "Some error occurred while retrieving product."
    );
  });
};

const findOne = (req, res, next) => {
  Products.findById(req.params.id)
  .populate('Category')
  .populate('Origin')
    .then(product => {
      if (!product) error404(res, "Product not found with id " + req.params.id);
      getOneResponse(res, product);
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
      error500(res, `Error retrieving product with id ${err.value}`);
    });
};

const update = (req, res, next) => {
  Products.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then(product => {
      if (!product) error404(res, "Product not found with id " + req.params.id);
      updateResponse(res, product, 'Product updated successfully');
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
      error500(res, `Error updating product with id ${err.value}`);
    });
};

const deleteProduct = (req, res, next) => {
  Products.findByIdAndRemove(req.params.id)
    .then(product => {
      if (!product) error404(res, "Product not found with id " + req.params.id);
      response(res, "Product deleted successfully!");
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Product not found with id ${err.value}`);
      error500(res, `Could not delete product with id ${err.value}`);
    });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  getProduct,
  delete: deleteProduct
};
