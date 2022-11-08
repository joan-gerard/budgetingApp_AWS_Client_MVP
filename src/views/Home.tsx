import { Link } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";
import { CreateGroup } from "./CreateGroup";
import { JoinGroup } from "./JoinGroup";

interface HomeProps {
  months: MonthsDetails[];
  listMyMonths: () => void;
  joinOrCreate: (data: {
    action: string;
    budgetMonth?: string;
    groupId?: string;
  }) => void;
}

export const Home = ({ months, listMyMonths, joinOrCreate }: HomeProps) => {
  const joinGroup = ({
    action,
    groupId,
  }: {
    action: string;
    groupId: string;
  }) => {
    joinOrCreate({
      action,
      groupId,
    });
  };
  const createGroup = ({
    action,
    budgetMonth,
  }: {
    action: string;
    budgetMonth: string;
  }) => {
    joinOrCreate({
      action,
      budgetMonth,
    });
  };

  return (
    <div className="group__nav">
      <div className="joinOrCreateGroup-container">
        <JoinGroup onSubmit={joinGroup} />
        <CreateGroup onSubmit={createGroup} />
      </div>
      {months.map(({ budgetMonth }, idx) => {
        return (
          <div key={idx} className="group__name">
            <h2>{budgetMonth}</h2>
            {/* <h2>{groupId}</h2> */}
            <Link to={`month/${budgetMonth}`}>
              <AiFillWechat />
            </Link>
          </div>
        );
      })}
      <button onClick={listMyMonths}>Refresh Group</button>
    </div>
  );
};
