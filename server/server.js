const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const verificationRoutes = require("./routes/verificationRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");
const signInRoutes = require("./routes/signInRoutes");
const BankAccount = require('./bankAccountsService');
const accountsData = require('./accountsData');

const dbURI = "mongodb+srv://itamarbrafman:8ooqF0HXTDpCdJsv@cluster0.xudn2yd.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.use("/api", signInRoutes);
app.use("/api", verificationRoutes);
app.use("/api", authenticationRoutes);
app.use("/api", transactionsRoutes);

async function initializeDatabase() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");

    const deleteResult = await BankAccount.deleteMany({});
    console.log(`${deleteResult.deletedCount} documents deleted.`);

    const count = await BankAccount.countDocuments();
    if (count < 4) {
      const insertResult = await BankAccount.insertMany(accountsData);
      console.log(`${insertResult.length} documents inserted.`);
    } else {
      console.log("There are already four or more documents in the collection.");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

initializeDatabase();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


