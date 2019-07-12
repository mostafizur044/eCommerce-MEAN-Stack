exports.NotFoundInCatch = (res, err, message) => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({ message, code: 404, success: false, data: null });
    }
}

exports.error500 = (res, message) => {
    return res.status(500).send({ message, code: 500, success: false, data: null});
}

exports.error404 = (res, message) => {
    return res.status(404).send({ message, code: 404, success: false, data: null });
}

exports.error422 = (res, err) => {
    if (err.name == "ValidationError") {
        const validatorError = [];
        for (const key in err.errors) {
            validatorError.push({
                key, message: err.errors[key].message
            });
        }
        return res.status(400).send({code: 422, success: false, data: null, validatorError});
    }
}