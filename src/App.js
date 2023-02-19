import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import CreateTransaction from './CreateTransactions';
import EditTransaction from './EditTransaction';
import axios from 'axios';

const apiUrl = "http://58.105.209.166:7772/api/trainees/5/transactions";

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [showEditForm, setShowEditForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  

  useEffect(() => {
    fetch("http://58.105.209.166:7772/api/trainees/5/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteTransaction = async (itemId) => {
    try {
      await axios.delete(`${apiUrl}/${itemId}`);
      setTransactions(transactions.filter((transaction) => transaction.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTransaction = async (transaction) => {
    try {
      const response = await axios.put(`${apiUrl}/${transaction.id}`, transaction);
      setTransactions(transactions.map(t => t.id === transaction.id ? response.data : t));
      setShowEditForm(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
    setShowEditForm(true);
  };

  return (
    <div className="App">
      <h1>Transactions</h1> 
    <div className="container"> 
      <div className="transaction-table">
        <table className = "table">
          <thead>
            <tr>
             <th>ID</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT($)</th>
              <th>CATEGORY</th>
              <th>DATE</th>
             <th>UPDATE</th>
             <th>DELETE</th>
           </tr>
          </thead>
          <tbody>
          {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.description}</td>
                <td style={{color: transaction.amount < 0 ? "red" : "green"}}>
                  {transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
                <td><button onClick={() => handleEdit(transaction)}>Update</button></td>
                <td><button onClick={() => deleteTransaction(transaction.id)}>Delete</button></td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
        <div className="create-transaction-form">
          <CreateTransaction setTransactions={setTransactions} transactions={transactions}/>
        </div>
      </div>
      <div className='edit-transaction'>  
      {showEditForm && (
      <EditTransaction transaction={transactionToEdit} updateTransaction={updateTransaction} setShowEditForm={setShowEditForm}/>
      )}
      </div>
    </div>
  );
}

export default App;
