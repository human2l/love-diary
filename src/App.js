import { useState } from "react";
import { Deta } from "deta";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
// name your DB
const db = deta.Base("humans");

function App() {
  const [message, setMessage] = useState("");
  const onSubmit = () => {
    addMessage();
  };
  const onFind = () => {
    fetchMessage();
  };

  async function addMessage() {
    db.put({
      name: message,
      title: "",
      has_visor: true,
    });
  }

  async function fetchMessage() {}

  return (
    <div>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onFind}>Find</button>
      <div>{message}</div>
    </div>
  );
}

export default App;
