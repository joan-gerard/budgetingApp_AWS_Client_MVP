import React, { useState } from "react";
import { useParams } from "react-router-dom";

type MonthlyBudgetProps = {
  sendMessage: ({
    budgetMonth,
    type,
    category,
    amount,
  }: SendTransactionParams) => void;
};

const MonthlyBudget: React.FC<MonthlyBudgetProps> = ({ sendMessage }) => {
  const { id } = useParams();

  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const submit = () => {
    sendMessage({ budgetMonth: id!, type, category, amount });
    setType("");
    setCategory("");
    setAmount(0);
  };

  return (
    <div>
      <div>MonthlyBudget for {id}</div>
      <div>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <button onClick={() => submit()}>Add</button>
      </div>
    </div>
  );
};

export default MonthlyBudget;
