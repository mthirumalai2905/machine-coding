// Required dependencies
const express = require('express');
const rateLimit = require('express-rate-limit');
const debounce = require('lodash.debounce');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Throttling Middleware: Allows 5 requests per minute
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: 'Too many requests, please try again later.' }
});

// Apply throttling middleware to all routes
app.use('/api/', apiLimiter);

// Debounce Middleware
const debounceMiddleware = (fn, delay) => {
  let debouncedFn = debounce(fn, delay);
  return (req, res, next) => {
    debouncedFn(req, res, next);
  };
};

// Example route with debouncing (2 seconds delay)
app.post('/api/submit', debounceMiddleware((req, res) => {
  res.json({ message: 'Request processed successfully.' });
}, 2000));

// Default route
app.get('/', (req, res) => {
  res.send('Node.js Throttling and Debouncing API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
