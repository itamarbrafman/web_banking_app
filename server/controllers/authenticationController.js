const { NotAuthError } = require('../utils/errors');
const BankAccount = require('../bankAccountsService');
const { validateJSONToken } = require('../utils/auth');

const extractDataFromDB = async (req, res) =>{
    const { email, password } = req.token;
    try {
      
      let updatedDocument = await BankAccount.findOne({ userEmail: email });
      if(!updatedDocument){

        updatedDocument = await BankAccount.findOneAndUpdate(
            { userEmail: { $exists: false } },
            { userEmail: email, password: password },        
            { new: true }
        );
      }
  
      res.status(200).json({ updatedDocument });
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

function checkAuth(req, res, next) {

  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);

    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}

exports.extractDataFromDB = extractDataFromDB;
exports.checkAuth = checkAuth;
