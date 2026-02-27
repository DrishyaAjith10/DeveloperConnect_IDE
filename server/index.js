const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); // allow all origins temporarily
app.use(express.json());

// app.post("/run", async (req, res) => {
//   try {
//     const { language, version, code } = req.body;

//     const response = await axios.post(
//       "https://emkc.org/api/v2/piston/execute",
//       {
//         language,
//         version,
//         files: [{ content: code }],
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });



app.post("/run", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { language, version, code } = req.body;

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version,
        files: [{ content: code }],
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Backend error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});






app.listen(8000, () => {
  console.log("Server running on port 8000");
});