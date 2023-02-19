import { useState } from 'react';

const EditTransaction = ({ transaction, updateTransaction, setShowEditForm }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction({ id: transaction.id, description, amount, category });
    setShowEditForm(false);
  };

  const handleCancel = () => {
    setShowEditForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Transaction</h2>
      <label>Description: </label>
        <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label>Amount: </label>
        <input type="text" placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <label>Category: </label>
      <input type="text" value={category} placeholder='Enter Category' onChange={(e) => setCategory(e.target.value)}/>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditTransaction;