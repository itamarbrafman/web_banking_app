import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SymbolIcon from '../components/SymbolIcon'; 
import {OverviewIcon, MySVGComponent, BankColorRec} from '../components/SymbolIcon';
import {fetchAccountInfo, makeTransaction, getAuthToken} from './DashboardHandlers'

function DashboardPage() {
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [currTransactions, setCurrTransactions] = useState([]);
  const [currBalance, setCurrBalance] = useState(null);

  const { updatedDocument } = accountInfo || {};
  const { balance, transactions } = updatedDocument || {};

  useEffect(() => {
    setCurrTransactions(transactions);
    setCurrBalance(balance); 
  }, [transactions, balance]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getAuthToken();
      if (!token) {
        navigate('/signup');
        return;
      }

      try {
        const info = await fetchAccountInfo(token);
        setAccountInfo(info);
      } catch (error) {
        console.error('Error fetching account info:', error);
        alert('Authentication failed. Please try again.');
        navigate('/signup');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signup');
  };
  
  const handleTransactionSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();
    const formData = new FormData(event.target);
    const receiverEmail = formData.get('email');
    const amount = parseFloat(formData.get('amount'));  
  
      const newTransaction = await makeTransaction(token, receiverEmail, amount);
      if (newTransaction.error) {
        alert('Transaction failed. ' + newTransaction.error);
        return;
      }

      alert('Transaction successful');
      setCurrTransactions(prevTransactions => [...prevTransactions, newTransaction]);

      setCurrBalance(prevBalance => prevBalance - amount);
  
    setShowTransactionForm(false);
  };
  

  return (
<>  
  <SymbolIcon 
    position={{ position: 'relative', left: '0rem', top: '-0.5rem' }} 
  /> 
  <div 
    className="mybank-text" 
    style={{ position: 'relative', top: '0rem', left: '3rem'}}
  >
    myBank
  </div> 
  <h1 
    className="acount-text general1" 
    style={{ position: 'relative', top: '5rem', left: '3rem' }}
  >
    Available Balance:
  </h1>
  <h1 
    className="acount-text balance" 
    style={{ position: 'relative', top: '5rem', left: '3rem' }}
  >
    {currBalance}USD
  </h1>
  <button 
    disabled 
    className="blue-rec blue-rec-text" 
    style={{ top: '5rem', left: '0.5rem' }}
  >
    Overview
  </button>
  <OverviewIcon />
  <h1 
    className="date-text" 
    style={{ position: 'relative', top: '-10rem', left: '25rem' }}
  >
    <span style={{ color: 'black' }}>Recent Transaction From: </span> 
    <span style={{ color: 'red' }}>Today</span>
  </h1>      
  <MySVGComponent />
  {currTransactions && currTransactions.length > 0 && (
    <div 
      className="transaction-container" 
      style={{ position: 'relative', top: '-55rem', left: '22rem', maxHeight: '20rem', overflowY: 'auto' }}
    >
      {currTransactions.map((transaction, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div className="transaction-item"> 
            <h1 className="acount-text general2">{transaction.email}</h1>
            <h1 className="acount-text general2">{transaction.amount}USD</h1>
          </div>
          <h1 className="date-text" style={{ position: 'relative', top: '-10rem', left: '5rem' }}>
            {transaction.date}
          </h1>
        </div>
      ))}
    </div>
  )}
  <button 
    onClick={handleLogout} 
    id="logout-text" 
    style={{ position: 'relative', top: '-85rem', left: '105rem' }}
  >
    Log Out
  </button>
  <button 
    className="blue-rec blue-rec-text" 
    onClick={() => setShowTransactionForm(true)} 
    style={{ position: 'relative', top: '-72rem', left: '0.5rem' }}
  >
    Make a Transaction
  </button>
  {showTransactionForm && (
    <div className="popup-modal">
      <div className="popup-modal-content">
        <h2>Make a Transaction</h2>
        <form onSubmit={handleTransactionSubmit}>
          <div>
            <label>Receiver's Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Amount:</label>
            <input name="amount" required />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button className="popup-modal-close" onClick={() => setShowTransactionForm(false)}>Close</button>
      </div>
    </div>
  )}
  <BankColorRec/>
</>

  );
}

export default DashboardPage;