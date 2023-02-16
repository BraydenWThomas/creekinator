import { useState } from "react";

const CreateTransaction = ({ onSubmitForm }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Food');
    const [type, setType] = useState('credit');
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      const newTransaction = {
        id: Math.floor(Math.random() * 10000),
        description,
        amount: type === 'debit' ? -Math.abs(amount) : Math.abs(amount),
        category,
        date: new Date().toISOString(),
      };

      onSubmitForm(newTransaction)
  
      setDescription('');
      setAmount(0);
      setCategory('Food');
      setType('credit');
    };
  
    return (
      <div>
        <form onSubmit={onSubmit}>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <button type="submit">Add</button>
    </form>
      </div>
    );
}
export default CreateTransaction;