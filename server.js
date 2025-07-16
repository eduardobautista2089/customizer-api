const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static('public'));

const sessions = {};

app.post('/customize', (req, res) => {
  const { tshirtColor, message, fontStyle } = req.body;

  if (!tshirtColor || !message || !fontStyle) {
    return res
      .status(400)
      .json({ error: 'All fields are required.' });
  }

  const sessionId = uuidv4();
  sessions[sessionId] = {
    tshirtColor,
    message,
    fontStyle,
    createdAt: new Date(),
  };

  console.log(`Session created: ${sessionId}`);
  res.status(200).json({ sessionId });
});

app.get('/customize/:sessionId', (req, res) => {
  const session = sessions[req.params.sessionId];
  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }
  res.json(session);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
