// middleware/cors.js
import Cors from 'cors';

// Configure CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'http://example.com', // Replace with your allowed origin(s)
});

// Middleware function to handle CORS
export default function withCORS(handler) {
  return async (req, res) => {
    await cors(req, res);
    return handler(req, res);
  };
}
