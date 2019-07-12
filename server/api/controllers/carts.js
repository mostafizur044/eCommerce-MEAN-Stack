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
    .then(cart => {
      if (!cart) error404(res, "Cart not found with id " + req.params.id);
      getOneResponse(res, cart);
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Cart not found with id ${err.value}`);
      error500(res, `Error retrieving cart with id ${err.value}`);
    });
};

const updateCartItem = (req, res, next) => {
    Cart.findById(req.params.id).then(
      cart => {
        if (!cart) error404(res, "Cart not found with id " + req.params.id);
        cart.ProductIds = [...cart.ProductIds, req.body];
        Cart.findByIdAndUpdate(req.params.id, { ...cart }, { new: true })
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
    Cart.findById(req.params.id).then(
        cart => {
          if (!cart) error404(res, "Cart not found with id " + req.params.id);
          cart.ProductIds = cart.ProductIds.filter( item => item.ProductId !== res.body.ProductId);
          Cart.findByIdAndUpdate(req.params.id, { ...cart }, { new: true })
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
  updateCartItem,
  deleteCartItem,
  delete: deleteCart
};
