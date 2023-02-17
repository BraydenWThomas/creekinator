import { useState } from 'react';

const CreateTransaction = ({ setTransactions, transactions }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const createTransactionHandler = () => {
    const date = new Date().toISOString();
    const newTransaction = {
      id: transactions.length+10,
      description,
      amount: parseFloat(amount),
      category,
      date,
    };
    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div>
      <h2>New Transaction</h2>
      <label>
        Description:
        <input
          type="text"
          placeholder='Enter Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          placeholder='Enter Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Category:
        <input 
          type="text"
          placeholder='Enter Category'
          value={category} 
          onChange={(e) => setCategory(e.target.value)}>
        </input>
      </label>
      <br />
      <button onClick={createTransactionHandler}>Add Transaction</button>
    </div>
  );
};

export default CreateTransaction;
