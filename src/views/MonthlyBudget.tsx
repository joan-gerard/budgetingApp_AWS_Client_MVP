import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, SelectField, TextField } from "@aws-amplify/ui-react";

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
        <SelectField
          label=""
          value={type}
          onChange={(e) => setType(e.target.value)}
          size="small"
          descriptiveText="Type"
          errorMessage="error"
        >
          <option value="">Choose Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
        </SelectField>
        {type === "income" ? (
          <SelectField
            label=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            descriptiveText="Category"
            errorMessage="error"
          >
            <option value="">Choose Income Category</option>
            <option value="salary">Salary</option>
            <option value="dividends">Dividends</option>
          </SelectField>
        ) : (
          <SelectField
            label=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            descriptiveText="Category"
            errorMessage="error"
          >
            <option value="">Choose Expense Category</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="transport">Transport</option>
          </SelectField>
        )}
        <TextField
          descriptiveText="Enter a valid last name"
          placeholder="Amount"
          size="small"
          label=""
          errorMessage="There is an error"
          value={amount}
          onChange={(e: { target: { value: string | number } }) =>
            setAmount(+e.target.value)
          }
        />
        {/* <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        /> */}
        {/* <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}
        {/* <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        /> */}
        <button onClick={() => submit()}>Add</button>
      </div>
    </div>
  );
};

export default MonthlyBudget;
