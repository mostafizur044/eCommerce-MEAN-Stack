const {
  NotFoundInCatch,
  error500,
  error404,
  error422
} = require("../lib/error");
const {
  response,
  createResponse,
  getOneResponse
} = require("../lib/response");

const Cart = require("../models/Carts");
const Products = require("../models/Products");

const create = (req, res, next) => {
  const cart = new Cart(req.body);
  cart.save()
    .then(cart => {
      createResponse(res, cart, 'Cart created successfully.');
    })
    .catch(err => {
      error422(res, err);
      error500(
        res,
        err.message || "Some error occurred while creating the cart."
      );
    });
};

const findOne = (req, res, next) => {
  Cart.findById(req.params.id)
    .select({'ProductIds._id': 0})
    .then(cartOne => {
      if (!cartOne) error404(res, "Cart not found with id " + req.params.id);
      const cart = cartOne;
      const ids = cart.ProductIds.map( m => m.ProductId);
      console.log(ids)
      const filter = { '_id': { '$in': ids}};
      Products.find().where(filter)
      // .populate('Category')
      // .populate('Origin')
      .then(
        products => {
          // console.log(products)
          const data = {
            _id: cart._id,
            ProductIds : cart.ProductIds,
            products: products
          }
          getOneResponse(res, data);
        }
      );
      
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
      error500(res, `Error retrieving cart with id ${err.value}`);
    });
};

const updateCart= (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
    Cart.findById(id).then(
      cart => {
        if (!cart) error404(res, "Cart not found with id " + id);
        // console.log({_id: `ObjectId("${id}")`}, { $push: {'ProductIds': data} })
        Cart.findOneAndUpdate({'_id': id}, { '$push': {'ProductIds': data} })
        .then(respon => {
            response(res, 'Item added to cart');
        });
      }
    )
    .catch(err => {
      NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
      error500(res, `Error updating cart with id ${err.value}`);
    });
};

const updateCartItemQty = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
    Cart.findById(id).then(
      cart => {
        // console.log(id, data)
        if (!cart) error404(res, "Cart not found with id " + id);
        Cart.findOneAndUpdate({_id: id, 'ProductIds.ProductId': data.ProductId}, { $set: {'ProductIds.$.Quantity': data.Quantity} })
        .then(cart => {
            response(res, 'Cart item updated');
        });
      }
    )
    .catch(err => {
      NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
      error500(res, `Error updating cart with id ${err.value}`);
    });
};

const deleteCartItem = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
    Cart.findById(id).then(
        cart => {
          if (!cart) error404(res, "Cart not found with id " + id);
          Cart.findOneAndUpdate({_id: id}, { $pull: {'ProductIds': { 'ProductId' : data.ProductId } } })
          .then(cart => {
            response(res, 'Cart item deleted');
          });
        }
    )
    .catch(err => {
        NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
        error500(res, `Could not delete cart with id ${err.value}`);
    });
};

const deleteCart = (req, res, next) => {
  Cart.findByIdAndRemove(req.params.id)
    .then(cart => {
      if (!cart) error404(res, "Cart not found with id " + req.params.id);
      response(res, "Cart deleted successfully");
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
      error500(res, `Could not delete cart with id ${err.value}`);
    });
};

module.exports = {
  create,
  findOne,
  updateCart,
  updateCartItemQty,
  deleteCartItem,
  delete: deleteCart
};
