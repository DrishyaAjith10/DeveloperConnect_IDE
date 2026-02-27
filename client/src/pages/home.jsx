import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Button, Input, Heading } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    navigate(`/room/${roomId.trim()}`);
  };

  return (
    <VStack spacing={6} mt={20}>
      <Heading>Developer Connect</Heading>

      <Button colorScheme="green" size="lg" onClick={createRoom}>
        Create New Room
      </Button>

      <Input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        maxW="300px"
      />

      <Button onClick={joinRoom}>
        Join Room
      </Button>
    </VStack>
  );
};

export default Home;