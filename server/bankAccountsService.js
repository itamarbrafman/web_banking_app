const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const bankAccountSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    balance: {
        type: Number,
        required: true,
    },
    transactions: [transactionSchema],
    });

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;