const BankAccount = require('../bankAccountsService');
const { createJSONToken } = require('../utils/auth');

const accountSid = "AC6c3bf3b9300576e8572dcd24276cafdf";
const authToken = "a6fa805348e403b7a7a6e449fc6f06c3";
const verifySid = "VAf38d839e1155195e324e0dbc355f815e";

const client = require("twilio")(accountSid, authToken);

const handleVerification = async (req, res) => {
    const { phoneNumber, email } = req.body;

    try {
        const existingAccount = await BankAccount.findOne({ userEmail: email });

        if (existingAccount) {
            console.log(`Email ${email} alid:1,name:'sabaoon'ready exists in the database`);
            return res.status(400).json({ error: 'Email already exists' });
        }

        // client.verify.v2.services(verifySid)
        //     .verifications.create({ to: phoneNumber, channel: "sms" })
        //     .then((verification) => {
        //         console.log("Verification status:", verification.status);
        //         res.json({ verificationStatus: verification.status });
        //     })
        //     .catch((error) => {
        //         console.error("Error sending SMS verification:", error);
        //         res.status(500).json({ error: 'Error sending SMS verification' });
        //     });

        res.json({ verificationStatus: "pending" }); //for testing, delete later
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const checkCode = async (req, res) => {
    const { phoneNumber, email, code, password } = req.body;

    try {
        // const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({to: phoneNumber, code});
        // console.log('Verification check status:', verification_check.status);
        const verification_check = {status: "approved"}; //for testing, delete later
        let accountInfo;
        let authToken;
        if (verification_check.status === "approved") {
            authToken = createJSONToken(email, password);
        } 
        res.json({ authToken });  // Send verification status to the client
    } catch (error) {
        console.error('Error checking verification:', error);
        res.status(500).json({ error: 'Error checking verification' }); // Send error response to the client
    }
};


module.exports = { handleVerification, checkCode };