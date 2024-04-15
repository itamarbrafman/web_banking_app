const BankAccount = require('../bankAccountsService');

const addTransaction = async (req, res) => {
    const { receiverEmail, amount } = req.body;
    const senderEmail = req.token.email;

    try {
        const receiverBankAccount = await BankAccount.findOne({ userEmail: receiverEmail });
        if (!receiverBankAccount) {
            return res.status(404).json({ error: `${receiverEmail}'s Bank account not found` });
        }
        const senderBankAccount = await BankAccount.findOne({ userEmail: senderEmail });
        if (!senderBankAccount) {
            return res.status(404).json({ error: `${senderEmail}'s Bank account not found` });
        }
        
        senderBankAccount.balance -= amount;
        if(senderBankAccount.balance < 0){
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        receiverBankAccount.balance += amount;
        const receiverNewTransaction = {
            email: senderEmail,
            amount: amount,
            date: 'Today' 
        };
        const senderNewTransaction = {
            email: receiverEmail,
            amount: -amount,
            date: 'Today' 
        };

        receiverBankAccount.transactions.push(receiverNewTransaction);
        senderBankAccount.transactions.push(senderNewTransaction);

        await receiverBankAccount.save();
        await senderBankAccount.save();

        return res.status(200).json(senderNewTransaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addTransaction };
