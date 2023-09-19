import React, { useState } from "react"; // we need this to make JSX compile
import { useParams } from "react-router-dom";

type Props = { socket: any };

const Controller = ({ socket }: Props) => {
  const { id } = useParams();

  const [message, setMessage] = useState("");

  socket.emit("join-room", id);

  const sendMessage = () => {
    socket.emit("send-message", { message, id });
  };

  return (
    <div>
      Controller page
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
    </div>
  );
};

export default Controller;
