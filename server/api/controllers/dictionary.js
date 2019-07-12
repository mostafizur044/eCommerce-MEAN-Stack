const { NotFoundInCatch, error500, error404, error422 } = require('../lib/error');
const { getAllResponse, createResponse } = require('../lib/response');

const Dictionary = require("../models/Dictionary");

const findAll = (req, res, next) => {
  Dictionary.find()
    .then(dictionary => {
        getAllResponse(res, dictionary);
    })
    .catch(err => {
        error500(res, err.message || "Some error occurred while retrieving dictionary.");
    });
};

const create = (req, res, next) => {
  const dictionary = new Dictionary(req.body);
  dictionary
    .save()
    .then(dictionary => {
        createResponse(res, dictionary);
    })
    .catch(err => {
      error422(res, err);
      error500(res, err.message || "Some error occurred while creating the Dictionary.");
    });
};

const deleteDic = (req, res, next) => {
  Dictionary.findByIdAndRemove(req.params.id)
    .then(dictionary => {
      if (!dictionary)
        error404(res, "Dictionary not found with id " + req.params.id);
      res.send({ message: "Dictionary deleted successfully!" });
    })
    .catch(err => {
      NotFoundInCatch(res, err, `Dictionary not found with id ${err.value}`);
      error500(res, `Could not delete dictionary with id ${err.value}`);
    });
};

module.exports = {
  findAll,
  create,
  delete: deleteDic
};
