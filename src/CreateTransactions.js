import { useState } from 'react';
import axios from 'axios';

const CreateTransaction = ({ setTransactions, transactions }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const apiUrl = "http://58.105.209.166:7772/api/trainees/5/transactions";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl, {
        description,
        amount: parseInt(amount),
        category
      });
      setTransactions([...transactions, response.data]);
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Transaction</h2>
      <label>Description:</label>
      <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label>Amount:</label>
      <input type="number" placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <label>Category:</label>
      <input type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}/>
      <button type="submit">Create Transaction</button>
    </form>
  );
};

export default CreateTransaction;
