import { useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "@aws-amplify/ui-react";

interface Props {
  onSubmit: ({
    action,
    budgetMonth,
  }: {
    action: string;
    budgetMonth: string;
  }) => void;
}

export const CreateGroup = ({ onSubmit }: Props) => {
  const [month, setMonth] = useState("");
  const [showModal, setShowModal] = useState(false);

  const create = () => {
    onSubmit({
      budgetMonth: month,
      action: "createMonth",
    });
    setShowModal(false);
  };

  console.log({ month });

  return (
    <>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>Choose Month</h2>
        <div>
          <Button onClick={() => setMonth("2022-11")}>November 2022</Button>
          <Button onClick={() => setMonth("2022-12")}>December 2022</Button>
          <Button onClick={() => setMonth("2023-01")}>January 2023</Button>
        </div>
        <button onClick={() => create()}>Create</button>
      </Modal>
      <button onClick={() => setShowModal(true)} className="createGroup-button">
        Create Group
      </button>
    </>
  );
};
