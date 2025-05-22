const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

app.post('/summarize', async (req, res) => {
  const { summarizeAndSend } = require('./services/cohere');

  try {
    const result = await summarizeAndSend();
    res.json({ message: 'Summary sent to Slack!', result });
  } catch (err) {
    console.error("summarize failed:", err.stack || err.message || err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
