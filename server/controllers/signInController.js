const BankAccount = require('../bankAccountsService');
const { createJSONToken } = require('../utils/auth');

const checkLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAccount = await BankAccount.findOne({ userEmail: email });

        if (!existingAccount) {
            return res.status(404).json({ error: 'Email does not exist' });
        }
        
        if (existingAccount.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        authToken = createJSONToken(email, password);
        
        return res.json({ authToken });
    } catch (error) {
        console.error('Error extracting data from DB:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.checkLogin = checkLogin;
