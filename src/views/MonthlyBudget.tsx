import React from "react";
import { useParams } from "react-router-dom";

const MonthlyBudget = () => {
  const { id } = useParams();

  return <div>MonthlyBudget for {id}</div>;
};

export default MonthlyBudget;
