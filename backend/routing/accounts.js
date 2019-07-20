const express = require('express');
const Account = require('../models/account');

// Use express.Router() to return a smaller version of an Express app
const router = express.Router();

// Get the maxId to be used
function getMaxAccountId(accounts) {
    let maxAccountId = -1;
    for(let i = 0; i < accounts.length; i++) {
        if(accounts[i].id > maxAccountId) {
            maxAccountId = accounts[i].id;
        }
    }
    return ++maxAccountId;
}

function getAccounts(res) {
    Account.find()
    .then(accounts => {
        getMaxAccountId(accounts);
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
}

function emailAvailable(account, res) {
    Account.findOne({email: account.email})
    .then(identicalEmailAccount => {
        if(!identicalEmailAccount) {
            account.save()
            .then(() => {
                res.status(200).json({message: 'We saved an account!'});
            })
            .catch(error => {
                res.status(500).json({
                    error: 'Failed to save account ' + error
                });
            });
        } else {
            res.status(500).json({
                message: 'An account with that email already exists!'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: 'FindOne() failed: ' + error
        });
    });
}

router.get('/getMaxId', (req, res) => {
    Account.find()
    .then(accounts => {
        const maxAccountId = getMaxAccountId(accounts);
        res.status(200).json({id: maxAccountId});
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
});
// Get all of the accounts (to generate the account list)
router.get('/', (req, res) => {
    getAccounts(res);
});

// Get a single account (to generate the account detail)
router.get('/:email', (req, res) => {
    Account.findOne({email: req.params.email})
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

// Add an account
router.post('/', (req, res) => {
    const account = new Account({
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });
    emailAvailable(account, res);
});

// Login to an account
router.post('/login', (req, res) => {
    Account.findOne({
        email: req.body.accountEmail, 
        password: req.body.accountPassword
    })
    .then(account => {
        if(account) {
            res.status(200).json(account);
        } else {
            res.status(200).json({
                message: 'Email or password is incorrect'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
});

// Change an account
router.patch('/:id', (req, res) => {
    Account.findOne({id: req.params.id}, (error, account) => {
        if(error || !account) {
            return res.status(500).json({
                message: 'ERROR: Account ' + req.params.id + ' not found!'
            });
        }

        account.id = req.params.id;
        account.name = req.body.name;
        account.phone = req.body.phone;
        account.email = req.body.email;
        account.password = req.body.password;

        account.save()
        .then(() => {
            // res.status(200).json({message: 'Updated account ' + req.params.id});
         getAccounts(res);
        })
        .catch(error => {
            res.status(500).json({error: 'Failed to update account ' + req.params.id});
        });
    });
});

// Delete an account
router.delete('/:id', (req, res) => {
    Account.findOne({id: req.params.id}, (error, account) => {
        if(error || !account) {
            res.status(500).json({
                error: 'Unable to find account ' + req.params.id
            });
        }

        Account.deleteOne({id: req.params.id})
        .then(() => {
            getAccounts(res);
            // res.status(200).json({message: 'Deleted account ' + req.params.id});
        })
        .catch(error => {
            res.status(500).json({error: 'Unable to delete account ' + req.params.id});
        });
    });
});

module.exports = router;