import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CreateTransaction from './CreateTransactions';
import EditTransaction from './EditTransaction';



const App = () => {
  const [transactions, setTransactions] = useState(
    [
      {
          "id": 9,
          "description": "Computer stuff",
          "amount": -345.0,
          "category": "Entertainment",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 10,
          "description": "Wages",
          "amount": 2454.0,
          "category": "Work",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 11,
          "description": "banana",
          "amount": -10.0,
          "category": "Food",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 12,
          "description": "netflix",
          "amount": -25.0,
          "category": "Entertainment",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 13,
          "description": "Going out for dinner",
          "amount": -78.0,
          "category": "Food",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 14,
          "description": "Side Gig",
          "amount": 245.0,
          "category": "Entertainment",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 15,
          "description": "Groceries",
          "amount": -145.0,
          "category": "Food",
          "date": "2023-02-14T22:02:51.000+00:00"    },
      {
          "id": 16,
          "description": "The Movies",
          "amount": -39.95,
          "category": "Entertainment",
          "date": "2023-02-14T22:02:51.000+00:00"    }
    ]
  )

  const [editing, setEditing] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  
  const deleteTransaction = (id) => {
    setTransactions((transactions) => transactions.filter((transactions) => transactions.id !== id));
  };

  const editTransaction = (transaction) => {
    setEditing(true);
    setTransactions(transaction);
  };

  return (
    <div class="App">
      <h1>Transactions</h1> 
      <CreateTransaction setTransactions={setTransactions} transactions={transactions}/>
      <div class="TransactionList">
      <table class = "table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
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
                ${transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td><button onClick={() => editTransaction(transaction.id)}>Update</button></td>
              <td><button onClick={() => deleteTransaction(transaction.id)}>Delete</button></td>
            </tr>
        ))}
        </tbody>
      </table>
      </div>
      {editing ? (
      <EditTransaction
        transactions={transactions}
        editTransaction={editTransaction}
        transactionToEdit={transactionToEdit}
        setEditing={setEditing}
      />
    ) : null}
    </div>
  );
}

export default App;
