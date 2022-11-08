import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import { Route, Link, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "./views/Home";
import { MessageInterface } from "./views/MessageInterface";
import "./App.css";
import MonthlyBudget from "./views/MonthlyBudget";

const websocketUrl = process.env.REACT_APP_WS_URL;

function App(props: { signOut: ((data?: any) => void) | undefined }) {
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [socket, setSocket] = useState<WebSocket>();
  const [months, setMonths] = useState<MonthsDetails[]>([]);

  // connect to WS
  const websocketConnect = async () => {
    if (socket) return;
    const user = await Auth.currentSession();
    const token = user.getIdToken().getJwtToken();

    const ws = new WebSocket(websocketUrl + `?token=${token}`);

    setSocket(ws);
  };

  useEffect(() => {
    websocketConnect();
  }, []);

  // fetch created Months
  const listMyMonths = () => {
    const data = {
      action: "listMyMonths",
    };
    socket?.send(JSON.stringify(data));
    return;
  };

  // socket events
  socket?.addEventListener("open", () => {
    listMyMonths();
  });

  socket?.addEventListener("message", function (event) {
    try {
      const messageData = JSON.parse(event.data);
      console.log("messageData", messageData);
      if (messageData.message === "Internal server error") return;

      switch (messageData.type) {
        case "err":
          toast(messageData.message);
          return;
        case "message":
          const { groupId, ...rest } = messageData;

          setMessages({
            ...messages,
            [groupId]: [...messages[groupId], rest],
          });
          return;
        case "monthData":
          setMonths(messageData.data);
          return;
        case "info":
          toast(messageData.message);
          return;
        default:
          toast(`unrecognised message type: ${messageData.type}`);
      }
    } catch (e) {
      console.log("error in event listener", e);
      toast("unable to parse the event");
    }
  });
  socket?.addEventListener("close", function (event) {
    console.log("Websocket disconnected");
    setSocket(undefined);
  });

  // create or join Month
  const joinOrCreate = (data: JoinOrCreateParams) => {
    console.log({ joinOrCreate: data });
    socket?.send(JSON.stringify(data));
    setTimeout(() => {
      listMyMonths();
    }, 1000);
  };

  // emit messages
  const sendMessage = ({
    budgetMonth,
    type,
    category,
    amount,
  }: SendTransactionParams) => {
    console.log("SEND Transaction");
    const data = {
      action: "transaction", // triggers lambda
      budgetMonth,
      type,
      category,
      amount,
    };

    socket?.send(JSON.stringify(data));
    // setMessages({
    //   ...messages,
    //   [groupId]: [
    //     ...(messages[groupId] || []),
    //     { message, mine: true, type: "message" },
    //   ],
    // });
  };

  const handleRequest = ({
    action,
    requestId,
    groupId,
    userId,
  }: HandleRequestParams) => {
    const data = {
      action,
      requestId,
      groupId,
      userId,
    };

    socket?.send(JSON.stringify(data));
  };

  // fetch groupDetails and MessageHistory using http endpoints
  const setInitialMessages = ({
    initialMessages,
    groupId,
  }: SetInitialMessagesParams) => {
    console.log("setInitialMessages");

    setMessages({
      ...messages,
      [groupId]: [...initialMessages],
    });

    console.log({ storedMessages: messages });
  };

  return (
    <div className="App">
      <ToastContainer />
      {!socket ? (
        <>
          <h2>Connecting</h2>
        </>
      ) : (
        <div>
          <nav className="nav">
            <Link to="">
              <button>Home</button>
            </Link>
            <button onClick={props.signOut}>Sign Out</button>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  months={months}
                  listMyMonths={listMyMonths}
                  joinOrCreate={joinOrCreate}
                />
              }
            />
            <Route
              path="/month/:id"
              element={
                <MonthlyBudget sendMessage={sendMessage} />

                // <MessageInterface
                //   messages={messages}
                //   sendMessage={sendMessage}
                //   setInitialMessages={setInitialMessages}
                //   handleRequest={handleRequest}
                // />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
