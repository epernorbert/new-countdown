import { useEffect } from "react";
import { useParams } from "react-router-dom";

type Props = { socket: any };

const Client = ({ socket }: Props) => {
  const { id } = useParams();

  socket.emit("join-room", id);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log(data.message);
    });
  }, [socket]);

  return <div>Client page</div>;
};

export default Client;
