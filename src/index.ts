import express from 'express';
import pino from 'pino';
import greetingRouter from './routes/greeting.js';

const logger = pino({ name: 'hw3' });
const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', (_req, res) => {
  const serverTime = new Date().toISOString();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1 data-testid="heading">Hello World</h1>
  <p data-testid="time-display">Server time: ${serverTime}</p>
  <button id="greet-btn" data-testid="greet-btn">Greet</button>
  <p id="greeting-result" data-testid="greeting-result"></p>
  <script>
    document.getElementById('greet-btn').addEventListener('click', function() {
      document.getElementById('greeting-result').textContent = 'Hello! Welcome to hw3!';
    });
  </script>
</body>
</html>`);
});

app.use('/api/greeting', greetingRouter);

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server listening');
});
