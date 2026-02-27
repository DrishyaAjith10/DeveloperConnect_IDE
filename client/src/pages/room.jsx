import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

const Room = () => {
  const { roomId } = useParams();

  return <CodeEditor roomId={roomId} />;
};

export default Room;