import { useState } from 'react';

const EditTransaction = ({ transaction, updateTransaction, setShowEditForm }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

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
      <h2>Edit transaction</h2>
      <label>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <label>
        Amount:
        <input type="number" step="0.01" value={amount} onChange={handleAmountChange} />
      </label>
      <br />
      <label>
        Category:
        <input type="text" value={category} onChange={handleCategoryChange} />
      </label>
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditTransaction;