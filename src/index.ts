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
  <title>Hello World - Centered Card</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{--bg:#1a1412;--surface:#2a2220;--border:#3d322e;--text:#e8ddd3;--text-dim:#9a8b7c;--accent:#d4a056;--accent-hover:#e8b86d;--error:#d32f2f}
    body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
    .card{background:var(--surface);border:1px solid var(--border);border-radius:0.75rem;padding:2.5rem;max-width:28rem;width:100%;text-align:center;box-shadow:0 0.5rem 2rem rgba(0,0,0,0.3)}
    .card h1{color:var(--accent);font-size:2rem;margin-bottom:0.75rem;font-weight:700;letter-spacing:-0.02em}
    .card p{color:var(--text-dim);font-size:1rem;line-height:1.6;margin-bottom:1.5rem}
    .card .btn{display:inline-block;background:var(--accent);color:var(--bg);border:none;padding:0.625rem 1.5rem;border-radius:0.375rem;font-size:0.95rem;font-weight:600;cursor:pointer;transition:background 0.2s}
    .card .btn:hover{background:var(--accent-hover)}
    .card .btn:disabled{background:var(--text-dim);cursor:not-allowed}
    .result{margin-top:1rem;min-height:1.5rem;font-size:1.1rem;transition:opacity 0.3s}
    .result.loading{color:var(--text-dim);font-style:italic}
    .result.error{color:var(--error)}
    .card .footer{margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border);color:var(--text-dim);font-size:0.8rem}
  </style>
</head>
<body>
  <div class="card">
    <h1 data-testid="heading">Hello World</h1>
    <p data-testid="time-display">Server time: ${serverTime}</p>
    <button id="greet-btn" class="btn" data-testid="greet-btn">Get Started</button>
    <p id="greeting-result" class="result" data-testid="greeting-result"></p>
    <div class="footer">hw3 &middot; Hello World Test App</div>
  </div>
  <script>
    var btn = document.getElementById('greet-btn');
    var res = document.getElementById('greeting-result');

    btn.addEventListener('click', function () {
      btn.disabled = true;
      res.className = 'result loading';
      res.textContent = 'Loading...';

      fetch('/api/greeting')
        .then(function (r) {
          if (!r.ok) throw new Error('Request failed');
          return r.json();
        })
        .then(function (data) {
          res.className = 'result';
          res.textContent = data.greeting || 'Hello!';
        })
        .catch(function () {
          res.className = 'result error';
          res.textContent = 'Failed to load greeting';
        })
        .finally(function () {
          btn.disabled = false;
        });
    });
  </script>
</body>
</html>`);
});

app.use('/api/greeting', greetingRouter);

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server listening');
});
