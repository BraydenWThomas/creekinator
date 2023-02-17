import React, { useState } from "react";

const EditTransaction = ({ transaction, setTransactions, setEditing }) => {
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTransaction((transaction) => ({ ...transaction, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTransactions((transactions) =>
      transactions.map((t) =>
        t.id === editedTransaction.id ? editedTransaction : t
      )
    );
    setEditing(false);
  };

  return (
    <tr>
      <td>{transaction.id}</td>
      <td>
        <input
          type="text"
          name="description"
          value={editedTransaction.description}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="amount"
          value={editedTransaction.amount}
          onChange={handleChange}
        />
      </td>
      <td>
        <select
          name="category"
          value={editedTransaction.category}
          onChange={handleChange}
        >
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Work">Work</option>
        </select>
      </td>
      <td>{transaction.date}</td>
      <td>
        <button onClick={onSubmit}>Save</button>
      </td>
      <td>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditTransaction;
