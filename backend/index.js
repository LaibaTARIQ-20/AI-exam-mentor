const express = require("express");
const cors = require("cors");
const quizRoute = require("./routes/quiz");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", quizRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
