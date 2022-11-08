interface MonthsDetails {
  budgetMonth: string;
}

type Message = UserMessage | InfoMessage | GroupDataMessage;

interface InfoMessage {
  type: "info";
  message: string;
}
interface GroupDataMessage {
  type: "groupData";
  data: GroupDetails[];
}

interface UserMessage {
  type: "message";
  message: string;
  from: string;
  date: number;
  mine?: boolean;
}

interface MessageHistory {
  messages: UserMessage[];
}

// App.tsx - start
type JoinOrCreateParams = {
  action: string;
  budgetMonth?: string;
  groupId?: string;
};
type SendTransactionParams = {
  budgetMonth: string;
  type: string;
  category: string;
  amount: number;
};
type HandleRequestParams = {
  action: "acceptJoinRequest" | "rejectJoinRequest";
  requestId: string;
  groupId: string;
  userId: string;
};
type SetInitialMessagesParams = {
  initialMessages: any[];
  groupId: string;
};
// App.tsx - end
