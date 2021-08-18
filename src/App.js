import { useState } from "react";
import Parse from "parse/dist/parse.min.js";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "RZf7WejpHL1PBAMizHgZ7h0IdGusvsMuzqARzvEk";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "wZjOVweHgNmig8JWCtTbBiDVkDdES9Rx3ioqY1cu";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [message, setMessage] = useState("");
  const onSubmit = () => {
    addMessage();
  };
  const onFind = () => {
    fetchMessage();
  };

  async function addMessage() {
    try {
      // create a new Parse Object instance
      const Message = new Parse.Object("Message");
      // define the attributes you want for your Object
      Message.set("content", message);
      // save it on Back4App Data Store
      await Message.save();
      alert("Message saved!");
    } catch (error) {
      console.log("Error saving new Message: ", error);
    }
  }

  async function fetchMessage() {
    // create your Parse Query using the Message Class you've created
    const query = new Parse.Query("Message");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("content", message);
    // run the query
    const Message = await query.first();
    // access the Parse Object attributes
    console.log("Message: ", Message.get("content"));
    console.log("Message id: ", Message.id);
    setMessage(Message.content);
  }

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
