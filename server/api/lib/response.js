exports.getAllResponse = (res, data) => {
    res.status(200).json({
        success: true,
        code: 200,
        data
    });
}

exports.createResponse = (res, data, message) => {
    res.status(201).json({
        message,
        success: true,
        code: 201,
        data
    });
}

exports.updateResponse = (res, data, message) => {
    res.send({
        message,
        success: true,
        code: 200,
        data
    });
}

exports.getOneResponse = (res, data) => {
    res.send({
        success: true,
        code: 200,
        data
    });
}

exports.response = (res, message) => {
    res.send({
        success: true,
        code: 200,
        message
    });
}