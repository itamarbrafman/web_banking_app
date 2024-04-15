To run app:
*inside the server folder run 'npm install' and 'npm start'
*inside the client folder run 'npm install' and 'npm run dev'
*a link to http://localhost:5173/ will pop up, app should be running

About the project:

This project was built with React, Node js, and using a database from MongoDB.

This is a secure online banking application designed to streamline financial transactions and management for users.
The user's dashboard is protected from unauthorized access and security breaches, with sign-up verification ensured through SMS code authentication.
Ensuring the safety and confidentiality of sensitive financial information, the app allows users to seamlessly manage their accounts, check balances, transfer funds, and view transaction history with ease.

Authorization in the banking application is a crucial aspect that ensures the security and confidentiality of users' financial information. Each user is required to authenticate themselves using a unique identifier, such as a username and password combination, before gaining access to their accounts. Upon successful authentication, the user is provided with a session token or access token, which serves as proof of their identity for subsequent requests.

These tokens are managed securely on the server-side. They are generated using industry-standard encryption algorithms and are designed to be cryptographically secure, minimizing the risk of unauthorized access or tampering.

Furthermore, these tokens have a limited lifespan or are valid until the user explicitly logs out. This helps prevent unauthorized access in case the token is compromised or stolen. Once the token expires or the user logs out, they are required to re-authenticate to obtain a new token.

In addition to user authentication for accessing their accounts, each transaction within the banking application requires a separate authentication check. This means that even after a user has logged in and obtained an access token, they must re-authenticate themselves for each transaction they initiate.
