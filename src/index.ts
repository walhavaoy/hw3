import express from 'express';
import pino from 'pino';

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
  <h1>Hello World</h1>
  <p>Server time: ${serverTime}</p>
  <button id="greet-btn">Greet</button>
  <script>
    document.getElementById('greet-btn').addEventListener('click', function() {
      alert('Hello! Welcome to hw3!');
    });
  </script>
</body>
</html>`);
});

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server listening');
});
