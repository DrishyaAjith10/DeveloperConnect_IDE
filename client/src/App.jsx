import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Room from "./pages/room";

function App() {
  return (
    <BrowserRouter>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;