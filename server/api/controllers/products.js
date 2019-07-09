const Account = require('../models/Account');

const saveAccount = (req, res, next) => {
    const account = new Account(req.body);
    account.save()
        .then(
            data => {
                res.status(201).json({
                    message: 'Data Saved',
                    account
                });
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    message: 'Error'
                });
            }
        );
}

const getAcount = (req, res, next) => {
    Account.find()
        .then(
            accounts => {
                res.status(200).json({
                    accounts
                });
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    message: 'Error'
                });
            }
        ); 
}

module.exports = {
    save: saveAccount,
    get: getAcount
}